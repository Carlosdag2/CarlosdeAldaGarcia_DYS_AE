export default function LoadingSpinner({ text = "Cargando...", variant = "success" }) {
    return (
        <div className="text-center py-5">
            <div className={`spinner-border text-${variant}`} role="status"></div>
            <p className="mt-2 text-muted mb-0">{text}</p>
        </div>
    );
}
