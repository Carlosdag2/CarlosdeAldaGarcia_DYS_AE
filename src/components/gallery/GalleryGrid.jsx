import { useState } from 'react';
import { galleryImages, galleryCategories } from '../../data/galleryData';
import GalleryFilters from './GalleryFilters';
import GalleryCard from './GalleryCard';
import GalleryModal from './GalleryModal';

export default function GalleryGrid() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);

    const filteredImages = activeFilter === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === activeFilter);

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <GalleryFilters 
                categories={galleryCategories}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
            />

            <div className="row g-4">
                {filteredImages.map(image => (
                    <div 
                        key={image.id} 
                        className="col-md-6 col-lg-4 gallery-item"
                    >
                        <GalleryCard 
                            image={image} 
                            onClick={() => handleImageClick(image)}
                        />
                    </div>
                ))}
            </div>

            {filteredImages.length === 0 && (
                <div className="text-center py-5">
                    <i className="bi bi-images display-4 text-muted"></i>
                    <p className="text-muted mt-3">No hay imágenes en esta categoría</p>
                </div>
            )}

            <GalleryModal 
                image={selectedImage}
                show={selectedImage !== null}
                onClose={handleCloseModal}
            />
        </>
    );
}
