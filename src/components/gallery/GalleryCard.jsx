import { categoryNames } from '../../data/galleryData';

export default function GalleryCard({ image, onClick }) {
    return (
        <div className="card gallery-card h-100" onClick={onClick}>
            <img 
                src={image.src} 
                className="card-img-top gallery-img" 
                alt={image.title}
            />
            <div className="card-body">
                <h5 className="card-title">
                    <i className={`bi ${image.icon} ${image.iconColor} me-2`}></i>
                    {image.title}
                </h5>
                <p className="card-text text-muted small">{image.description}</p>
                <span className={`badge ${image.badgeClass}`}>
                    {categoryNames[image.category]}
                </span>
            </div>
        </div>
    );
}
