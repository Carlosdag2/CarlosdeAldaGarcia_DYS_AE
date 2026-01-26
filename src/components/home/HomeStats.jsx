import { useState, useEffect } from 'react';
import { 
    fetchIndicadores, 
    fetchTotalPorTipo, 
    fetchTotalPorCategoria, 
    fetchTotalPorAmbito,
    formatDate 
} from '../../lib/api';

export default function HomeStats() {
    const [stats, setStats] = useState({
        total: '--',
        tipos: '--',
        categorias: '--',
        ambitos: '--'
    });
    const [ultimos, setUltimos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [indicadores, porTipo, porCategoria, porAmbito] = await Promise.all([
                fetchIndicadores(),
                fetchTotalPorTipo(),
                fetchTotalPorCategoria(),
                fetchTotalPorAmbito()
            ]);

            setStats({
                total: indicadores.length,
                tipos: Object.keys(porTipo).length,
                categorias: Object.keys(porCategoria).length,
                ambitos: Object.keys(porAmbito).length
            });

            setUltimos(indicadores.slice(-5).reverse());
        } catch (error) {
            console.error("Error loading stats:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Stats Cards */}
            <div className="row g-4 mb-5">
                <div className="col-6">
                    <div className="stat-card">
                        <div className="stat-number">{stats.total}</div>
                        <p className="text-muted mb-0">Indicadores Registrados</p>
                    </div>
                </div>
                <div className="col-6">
                    <div className="stat-card">
                        <div className="stat-number text-primary">{stats.tipos}</div>
                        <p className="text-muted mb-0">Tipos Diferentes</p>
                    </div>
                </div>
                <div className="col-6">
                    <div className="stat-card">
                        <div className="stat-number text-warning">{stats.categorias}</div>
                        <p className="text-muted mb-0">Categorías</p>
                    </div>
                </div>
                <div className="col-6">
                    <div className="stat-card">
                        <div className="stat-number text-info">{stats.ambitos}</div>
                        <p className="text-muted mb-0">Ámbitos</p>
                    </div>
                </div>
            </div>
        </>
    );
}