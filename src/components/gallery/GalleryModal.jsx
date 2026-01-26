export default function GalleryModal({ image, show, onClose }) {
    if (!show || !image) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="modal fade show" 
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.7)' }}
            onClick={handleBackdropClick}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className={`bi ${image.icon} ${image.iconColor} me-2`}></i>
                            {image.title}
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body text-center p-0">
                        <img 
                            src={image.src.replace('w=600&h=400', 'w=1200&h=800')} 
                            className="img-fluid w-100" 
                            alt={image.title}
                        />
                    </div>
                    <div className="modal-footer">
                        <p className="text-muted mb-0 me-auto">{image.description}</p>
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
