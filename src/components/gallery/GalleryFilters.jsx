export default function GalleryFilters({ categories, activeFilter, onFilterChange }) {
    return (
        <div className="row mb-4">
            <div className="col-12">
                <div className="btn-group flex-wrap" role="group">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`btn ${activeFilter === cat.id ? 'btn-green' : 'btn-outline-success'}`}
                            onClick={() => onFilterChange(cat.id)}
                        >
                            <i className={`bi ${cat.icon} me-1`}></i>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
