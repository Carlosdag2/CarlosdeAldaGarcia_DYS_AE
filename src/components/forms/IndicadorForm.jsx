import { useState } from 'react';
import { createIndicador } from '../../lib/api';
import Message from '../ui/Message';

export default function IndicadorForm() {
    const [formData, setFormData] = useState({
        tipo: '',
        categoria: '',
        nombre: '',
        descripcion: '',
        valor: '',
        unidad: '',
        fecha: new Date().toISOString().split('T')[0],
        ambito: ''
    });
    
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const indicador = {
            ...formData,
            descripcion: formData.descripcion.trim() || null,
            unidad: formData.unidad.trim() || null,
            fecha: new Date(formData.fecha).toISOString()
        };

        try {
            const { ok, text } = await createIndicador(indicador);
            
            if (ok) {
                setMessage({ type: 'success', text });
                resetForm();
                setTimeout(() => {
                    if (confirm("Indicador creado correctamente. ¿Deseas ver el listado?")) {
                        window.location.href = "/indicadores";
                    }
                }, 500);
            } else {
                setMessage({ type: 'danger', text: `Error: ${text}` });
            }
        } catch (error) {
            setMessage({ type: 'danger', text: `Error de red: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            tipo: '',
            categoria: '',
            nombre: '',
            descripcion: '',
            valor: '',
            unidad: '',
            fecha: new Date().toISOString().split('T')[0],
            ambito: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="form-floating">
                        <input 
                            type="text" 
                            className="form-control" 
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
                            className="form-control" 
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
                            className="form-control" 
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
                            className="form-control" 
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
                            className="form-control" 
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
                            className="form-control" 
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
                            className="form-control" 
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
                            className="form-control" 
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

            <div className="d-flex gap-3 flex-wrap">
                <button type="submit" className="btn btn-green btn-lg" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Guardando...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-check-circle me-2"></i>Guardar Indicador
                        </>
                    )}
                </button>
                <button type="button" className="btn btn-outline-secondary btn-lg" onClick={resetForm}>
                    <i className="bi bi-arrow-counterclockwise me-2"></i>Limpiar
                </button>
                <a href="/indicadores" className="btn btn-outline-dark btn-lg">
                    <i className="bi bi-x-circle me-2"></i>Cancelar
                </a>
            </div>

            <Message 
                type={message.type} 
                text={message.text} 
                onClose={() => setMessage({ type: '', text: '' })} 
            />
        </form>
    );
}
