export default function LoadingOverlay({ show = true, text = "Cargando..." }) {
    if (!show) return null;
    
    return (
        <div className="loading-overlay">
            <div className="spinner-border text-warning" style={{ width: '3rem', height: '3rem' }} role="status"></div>
            <p className="mt-3 text-muted">{text}</p>
        </div>
    );
}
