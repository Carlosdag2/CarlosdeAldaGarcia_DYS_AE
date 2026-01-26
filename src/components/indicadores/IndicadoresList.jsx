import { useState, useEffect } from 'react';
import { 
    fetchIndicadores, 
    fetchIndicadoresByTipo, 
    fetchIndicadoresByCategoria, 
    fetchIndicadoresByAmbito,
    fetchTotalPorTipo,
    fetchTotalPorCategoria,
    fetchTotalPorAmbito,
    deleteIndicador,
    formatDate 
} from '../../lib/api';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function IndicadoresList() {
    const [indicadores, setIndicadores] = useState([]);
    const [filteredIndicadores, setFilteredIndicadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filters
    const [filtros, setFiltros] = useState({
        tipo: '',
        categoria: '',
        ambito: '',
        buscar: ''
    });
    
    // Filter options
    const [filterOptions, setFilterOptions] = useState({
        tipos: {},
        categorias: {},
        ambitos: {}
    });

    // Modal state
    const [selectedIndicador, setSelectedIndicador] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [data, tipos, categorias, ambitos] = await Promise.all([
                fetchIndicadores(),
                fetchTotalPorTipo(),
                fetchTotalPorCategoria(),
                fetchTotalPorAmbito()
            ]);
            
            setIndicadores(data);
            setFilteredIndicadores(data);
            setFilterOptions({ tipos, categorias, ambitos });
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFiltros(prev => ({ ...prev, [key]: value }));
    };

    const applyFilters = async () => {
        let result = [...indicadores];
        
        try {
            if (filtros.tipo) {
                result = await fetchIndicadoresByTipo(filtros.tipo);
            }
            
            if (filtros.categoria) {
                if (filtros.tipo) {
                    result = result.filter(i => i.categoria === filtros.categoria);
                } else {
                    result = await fetchIndicadoresByCategoria(filtros.categoria);
                }
            }
            
            if (filtros.ambito) {
                if (filtros.tipo || filtros.categoria) {
                    result = result.filter(i => i.ambito === filtros.ambito);
                } else {
                    result = await fetchIndicadoresByAmbito(filtros.ambito);
                }
            }
            
            if (filtros.buscar) {
                const search = filtros.buscar.toLowerCase();
                result = result.filter(i => 
                    i.nombre.toLowerCase().includes(search) ||
                    (i.descripcion && i.descripcion.toLowerCase().includes(search))
                );
            }
            
            setFilteredIndicadores(result);
        } catch (err) {
            console.error("Error applying filters:", err);
        }
    };

    const clearFilters = () => {
        setFiltros({ tipo: '', categoria: '', ambito: '', buscar: '' });
        setFilteredIndicadores(indicadores);
    };

    const handleDelete = async (id) => {
        if (!confirm(`¿Estás seguro de que quieres eliminar el indicador con ID ${id}?`)) {
            return;
        }

        try {
            const { ok, text } = await deleteIndicador(id);
            if (ok) {
                alert("✅ " + text);
                loadData();
            } else {
                alert("❌ Error al eliminar: " + text);
            }
        } catch (err) {
            alert("❌ Error de red: " + err.message);
        }
    };

    const handleSearchInput = (e) => {
        handleFilterChange('buscar', e.target.value);
        // Debounce search
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => applyFilters(), 300);
    };

    if (loading) {
        return <LoadingSpinner text="Cargando indicadores..." />;
    }

    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <i className="bi bi-exclamation-triangle display-6"></i>
                <p className="mt-2">Error: {error}</p>
                <button className="btn btn-outline-danger" onClick={loadData}>
                    <i className="bi bi-arrow-clockwise me-2"></i>Reintentar
                </button>
            </div>
        );
    }

    return (
        <>
            {/* Filtros */}
            <div className="card filter-card mb-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">
                        <i className="bi bi-funnel me-2"></i>Filtros de búsqueda
                    </h5>
                    <div className="row g-3">
                        <div className="col-md-6 col-lg-3">
                            <label className="form-label fw-semibold">Tipo</label>
                            <select 
                                className="form-select" 
                                value={filtros.tipo}
                                onChange={(e) => handleFilterChange('tipo', e.target.value)}
                            >
                                <option value="">Todos los tipos</option>
                                {Object.entries(filterOptions.tipos).map(([tipo, count]) => (
                                    <option key={tipo} value={tipo}>{tipo} ({count})</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <label className="form-label fw-semibold">Categoría</label>
                            <select 
                                className="form-select" 
                                value={filtros.categoria}
                                onChange={(e) => handleFilterChange('categoria', e.target.value)}
                            >
                                <option value="">Todas las categorías</option>
                                {Object.entries(filterOptions.categorias).map(([cat, count]) => (
                                    <option key={cat} value={cat}>{cat} ({count})</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <label className="form-label fw-semibold">Ámbito</label>
                            <select 
                                className="form-select" 
                                value={filtros.ambito}
                                onChange={(e) => handleFilterChange('ambito', e.target.value)}
                            >
                                <option value="">Todos los ámbitos</option>
                                {Object.entries(filterOptions.ambitos).map(([amb, count]) => (
                                    <option key={amb} value={amb}>{amb} ({count})</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <label className="form-label fw-semibold">Buscar</label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="bi bi-search"></i></span>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre..."
                                    value={filtros.buscar}
                                    onChange={handleSearchInput}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-green me-2" onClick={applyFilters}>
                            <i className="bi bi-filter me-1"></i>Aplicar filtros
                        </button>
                        <button className="btn btn-outline-secondary" onClick={clearFilters}>
                            <i className="bi bi-x-circle me-1"></i>Limpiar
                        </button>
                    </div>
                </div>
            </div>

            {/* Resultados */}
            <div className="results-info mb-3 d-flex justify-content-between align-items-center">
                <span className="text-muted">
                    <i className="bi bi-check-circle me-1"></i>
                    Mostrando <strong>{filteredIndicadores.length}</strong> indicador(es)
                </span>
                <button className="btn btn-sm btn-outline-success" onClick={loadData}>
                    <i className="bi bi-arrow-clockwise me-1"></i>Actualizar
                </button>
            </div>

            {/* Tabla */}
            <div className="card table-card">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="green">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Tipo</th>
                                <th>Categoría</th>
                                <th>Valor</th>
                                <th>Unidad</th>
                                <th>Ámbito</th>
                                <th>Fecha</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIndicadores.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center py-5 text-muted">
                                        <i className="bi bi-inbox display-6"></i>
                                        <p className="mt-2">No se encontraron indicadores</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredIndicadores.map(ind => (
                                    <tr key={ind.id}>
                                        <td><strong>{ind.id}</strong></td>
                                        <td>{ind.nombre}</td>
                                        <td><span className="badge badge-tipo">{ind.tipo}</span></td>
                                        <td><span className="badge badge-categoria">{ind.categoria}</span></td>
                                        <td>{ind.valor}</td>
                                        <td>{ind.unidad || '-'}</td>
                                        <td><span className="badge badge-ambito">{ind.ambito}</span></td>
                                        <td><small className="text-muted">{formatDate(ind.fecha)}</small></td>
                                        <td className="text-center">
                                            <button 
                                                className="btn btn-info btn-action me-1" 
                                                onClick={() => setSelectedIndicador(ind)}
                                                title="Ver detalle"
                                            >
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <a 
                                                href={`/editar-indicador?id=${ind.id}`} 
                                                className="btn btn-warning btn-action me-1"
                                                title="Editar"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </a>
                                            <button 
                                                className="btn btn-danger btn-action" 
                                                onClick={() => handleDelete(ind.id)}
                                                title="Eliminar"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Detalle */}
            {selectedIndicador && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header modal-header-custom">
                                <h5 className="modal-title">
                                    <i className="bi bi-info-circle me-2"></i>Detalle del Indicador
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close btn-close-white" 
                                    onClick={() => setSelectedIndicador(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="detail-item">
                                            <div className="detail-label">ID</div>
                                            <div>{selectedIndicador.id}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Nombre</div>
                                            <div className="fw-semibold">{selectedIndicador.nombre}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Tipo</div>
                                            <div><span className="badge badge-tipo">{selectedIndicador.tipo}</span></div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Categoría</div>
                                            <div><span className="badge badge-categoria">{selectedIndicador.categoria}</span></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="detail-item">
                                            <div className="detail-label">Valor</div>
                                            <div className="fs-5 fw-bold text-success">
                                                {selectedIndicador.valor} {selectedIndicador.unidad || ''}
                                            </div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Ámbito</div>
                                            <div><span className="badge badge-ambito">{selectedIndicador.ambito}</span></div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Fecha</div>
                                            <div>{formatDate(selectedIndicador.fecha)}</div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="detail-item border-bottom-0">
                                            <div className="detail-label">Descripción</div>
                                            <div>
                                                {selectedIndicador.descripcion || 
                                                    <span className="text-muted fst-italic">Sin descripción</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setSelectedIndicador(null)}
                                >
                                    Cerrar
                                </button>
                                <a 
                                    href={`/editar-indicador?id=${selectedIndicador.id}`} 
                                    className="btn btn-warning"
                                >
                                    <i className="bi bi-pencil me-1"></i>Editar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
