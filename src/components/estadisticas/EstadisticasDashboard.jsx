import { useState, useEffect } from 'react';
import { 
    fetchIndicadores, 
    fetchTotalPorTipo, 
    fetchTotalPorCategoria, 
    fetchTotalPorAmbito 
} from '../../lib/api';

export default function EstadisticasDashboard() {
    const [total, setTotal] = useState(null);
    const [porTipo, setPorTipo] = useState({});
    const [porCategoria, setPorCategoria] = useState({});
    const [porAmbito, setPorAmbito] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        setLoading(true);
        try {
            const [indicadores, tipos, categorias, ambitos] = await Promise.all([
                fetchIndicadores(),
                fetchTotalPorTipo(),
                fetchTotalPorCategoria(),
                fetchTotalPorAmbito()
            ]);

            setTotal(indicadores.length);
            setPorTipo(tipos);
            setPorCategoria(categorias);
            setPorAmbito(ambitos);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderStatItems = (data, type) => {
        const entries = Object.entries(data);
        
        if (entries.length === 0) {
            return (
                <div className="text-muted text-center py-4">
                    <i className="bi bi-inbox"></i> No hay datos disponibles
                </div>
            );
        }

        const maxValue = Math.max(...entries.map(([_, count]) => count));

        return entries.map(([nombre, count]) => {
            const porcentaje = (count / maxValue) * 100;
            return (
                <div className="stat-item" key={nombre}>
                    <span className="stat-name">{nombre}</span>
                    <div className="progress">
                        <div 
                            className={`progress-bar progress-bar-${type}`}
                            role="progressbar" 
                            style={{ width: `${porcentaje}%` }}
                            aria-valuenow={porcentaje} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <span className={`stat-count ${type}`}>{count}</span>
                </div>
            );
        });
    };

    return (
        <>
            {/* Total General */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="total-card">
                        {loading ? (
                            <div className="loading-spinner">
                                <div className="spinner-border spinner-border-lg text-white mb-3" role="status"></div>
                                <p className="mb-0">Cargando estadísticas...</p>
                            </div>
                        ) : error ? (
                            <>
                                <i className="bi bi-exclamation-triangle display-3 mb-3"></i>
                                <p className="fs-4 mb-0">Error: {error}</p>
                            </>
                        ) : (
                            <>
                                <i className="bi bi-bar-chart-fill display-3 mb-3"></i>
                                <div className="total-number">{total}</div>
                                <p className="fs-4 mb-0 opacity-75">Indicadores Registrados</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="row mb-4 g-4">
                <div className="col-md-4">
                    <div className="card summary-card tipos">
                        <i className="bi bi-tags display-4 mb-2"></i>
                        <div className="summary-number">
                            {loading ? '-' : Object.keys(porTipo).length}
                        </div>
                        <small>Tipos Diferentes</small>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card summary-card categorias">
                        <i className="bi bi-folder display-4 mb-2"></i>
                        <div className="summary-number">
                            {loading ? '-' : Object.keys(porCategoria).length}
                        </div>
                        <small>Categorías</small>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card summary-card ambitos">
                        <i className="bi bi-globe display-4 mb-2"></i>
                        <div className="summary-number">
                            {loading ? '-' : Object.keys(porAmbito).length}
                        </div>
                        <small>Ámbitos</small>
                    </div>
                </div>
            </div>

            {/* Estadísticas Detalladas */}
            <div className="row g-4">
                <div className="col-lg-4">
                    <div className="card stats-card tipo">
                        <div className="card-header">
                            <i className="bi bi-tags me-2"></i>Por Tipo
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <div className="loading-spinner">
                                    <div className="spinner-border text-primary" role="status"></div>
                                </div>
                            ) : error ? (
                                <div className="text-danger text-center py-4">
                                    <i className="bi bi-exclamation-triangle"></i> {error}
                                </div>
                            ) : (
                                renderStatItems(porTipo, 'tipo')
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card stats-card categoria">
                        <div className="card-header">
                            <i className="bi bi-folder me-2"></i>Por Categoría
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <div className="loading-spinner">
                                    <div className="spinner-border text-success" role="status"></div>
                                </div>
                            ) : error ? (
                                <div className="text-danger text-center py-4">
                                    <i className="bi bi-exclamation-triangle"></i> {error}
                                </div>
                            ) : (
                                renderStatItems(porCategoria, 'categoria')
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card stats-card ambito">
                        <div className="card-header">
                            <i className="bi bi-globe me-2"></i>Por Ámbito
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <div className="loading-spinner">
                                    <div className="spinner-border text-warning" role="status"></div>
                                </div>
                            ) : error ? (
                                <div className="text-danger text-center py-4">
                                    <i className="bi bi-exclamation-triangle"></i> {error}
                                </div>
                            ) : (
                                renderStatItems(porAmbito, 'ambito')
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Botón Refresh */}
            <div className="text-center mt-5">
                <button className="btn btn-refresh" onClick={loadAll}>
                    <i className="bi bi-arrow-clockwise me-2"></i>Actualizar Estadísticas
                </button>
            </div>
        </>
    );
}
