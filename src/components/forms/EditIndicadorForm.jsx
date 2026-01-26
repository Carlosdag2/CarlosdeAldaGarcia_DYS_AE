import { useState, useEffect } from 'react';
import { fetchIndicadorById, updateIndicador, deleteIndicador, formatDateForInput } from '../../lib/api';
import Message from '../ui/Message';
import LoadingOverlay from '../ui/LoadingOverlay';

export default function EditIndicadorForm({ indicadorId: propId }) {
    const [formData, setFormData] = useState({
        tipo: '',
        categoria: '',
        nombre: '',
        descripcion: '',
        valor: '',
        unidad: '',
        fecha: '',
        ambito: ''
    });
    
    const [indicadorNombre, setIndicadorNombre] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [indicadorId, setIndicadorId] = useState(propId || '');

    useEffect(() => {
        // Obtener ID de la URL en el cliente si no viene como prop
        if (!indicadorId) {
            const params = new URLSearchParams(window.location.search);
            const urlId = params.get('id');
            if (urlId) {
                setIndicadorId(urlId);
                return;
            }
        }
        
        if (!indicadorId || indicadorId === '') {
            setMessage({ type: 'danger', text: 'No se especificó ID de indicador' });
            setLoading(false);
            return;
        }
        loadIndicador();
    }, [indicadorId]);

    const loadIndicador = async () => {
        try {
            const indicador = await fetchIndicadorById(indicadorId);
            
            setIndicadorNombre(indicador.nombre);
            setFormData({
                tipo: indicador.tipo || '',
                categoria: indicador.categoria || '',
                nombre: indicador.nombre || '',
                descripcion: indicador.descripcion || '',
                valor: indicador.valor || '',
                unidad: indicador.unidad || '',
                fecha: formatDateForInput(indicador.fecha),
                ambito: indicador.ambito || ''
            });
        } catch (error) {
            setMessage({ type: 'danger', text: `Error al cargar: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        const indicador = {
            ...formData,
            descripcion: formData.descripcion.trim() || null,
            unidad: formData.unidad.trim() || null,
            fecha: new Date(formData.fecha).toISOString()
        };

        try {
            const { ok, text } = await updateIndicador(indicadorId, indicador);
            
            if (ok) {
                setMessage({ type: 'success', text });
                setTimeout(() => {
                    if (confirm("Indicador actualizado correctamente. ¿Deseas volver al listado?")) {
                        window.location.href = "/indicadores";
                    }
                }, 500);
            } else {
                setMessage({ type: 'danger', text: `Error al editar: ${text}` });
            }
        } catch (error) {
            setMessage({ type: 'danger', text: `Error de red: ${error.message}` });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm(`¿Estás seguro de que quieres eliminar este indicador (ID: ${indicadorId})?\n\nEsta acción no se puede deshacer.`)) {
            return;
        }

        try {
            const { ok, text } = await deleteIndicador(indicadorId);
            
            if (ok) {
                alert("✅ " + text);
                window.location.href = "/indicadores";
            } else {
                setMessage({ type: 'danger', text: `Error al eliminar: ${text}` });
            }
        } catch (error) {
            setMessage({ type: 'danger', text: `Error de red: ${error.message}` });
        }
    };

    if (loading) {
        return <LoadingOverlay show={true} text="Cargando indicador..." />;
    }

    return (
        <div className="card form-card">
            <div className="card-header orange d-flex justify-content-between align-items-center flex-wrap">
                <h5 className="mb-0">
                    <i className="bi bi-pencil me-2"></i>
                    Editando: {indicadorNombre}
                </h5>
                <span className="id-badge">ID: {indicadorId}</span>
            </div>
            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input 
                                    type="text" 
                                    className="form-control form-control-orange" 
                                    id="tipo" 
                                    placeholder="Tipo"
                                    value={formData.tipo}
                                    onChange={handleChange}
                                    required 
                                />
                                <label htmlFor="tipo"><i className="bi bi-tag me-1"></i>Tipo *</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input 
                                    type="text" 
                                    className="form-control form-control-orange" 
                                    id="categoria" 
                                    placeholder="Categoría"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                    required 
                                />
                                <label htmlFor="categoria"><i className="bi bi-folder me-1"></i>Categoría *</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-floating">
                                <input 
                                    type="text" 
                                    className="form-control form-control-orange" 
                                    id="nombre" 
                                    placeholder="Nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required 
                                />
                                <label htmlFor="nombre"><i className="bi bi-card-text me-1"></i>Nombre del Indicador *</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-floating">
                                <textarea 
                                    className="form-control form-control-orange" 
                                    id="descripcion" 
                                    placeholder="Descripción" 
                                    style={{ height: '100px' }}
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                ></textarea>
                                <label htmlFor="descripcion"><i className="bi bi-text-paragraph me-1"></i>Descripción (opcional)</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input 
                                    type="text" 
                                    className="form-control form-control-orange" 
                                    id="valor" 
                                    placeholder="Valor"
                                    value={formData.valor}
                                    onChange={handleChange}
                                    required 
                                />
                                <label htmlFor="valor"><i className="bi bi-123 me-1"></i>Valor *</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input 
                                    type="text" 
                                    className="form-control form-control-orange" 
                                    id="unidad" 
                                    placeholder="Unidad"
                                    value={formData.unidad}
                                    onChange={handleChange}
                                />
                                <label htmlFor="unidad"><i className="bi bi-rulers me-1"></i>Unidad (opcional)</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input 
                                    type="date" 
                                    className="form-control form-control-orange" 
                                    id="fecha"
                                    value={formData.fecha}
                                    onChange={handleChange}
                                    required 
                                />
                                <label htmlFor="fecha"><i className="bi bi-calendar me-1"></i>Fecha *</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input 
                                    type="text" 
                                    className="form-control form-control-orange" 
                                    id="ambito" 
                                    placeholder="Ámbito"
                                    value={formData.ambito}
                                    onChange={handleChange}
                                    required 
                                />
                                <label htmlFor="ambito"><i className="bi bi-globe me-1"></i>Ámbito *</label>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="d-flex gap-3 flex-wrap justify-content-between">
                        <div className="d-flex gap-3 flex-wrap">
                            <button type="submit" className="btn btn-warning-custom btn-lg" disabled={saving}>
                                {saving ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>Guardar Cambios
                                    </>
                                )}
                            </button>
                            <a href="/indicadores" className="btn btn-outline-secondary btn-lg">
                                <i className="bi bi-x-circle me-2"></i>Cancelar
                            </a>
                        </div>
                        <button type="button" className="btn btn-danger btn-lg" onClick={handleDelete}>
                            <i className="bi bi-trash me-2"></i>Eliminar
                        </button>
                    </div>
                </form>

                <Message 
                    type={message.type} 
                    text={message.text} 
                    onClose={() => setMessage({ type: '', text: '' })} 
                />
            </div>
        </div>
    );
}
