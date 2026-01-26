import { useState } from 'react';

export default function Message({ type, text, onClose }) {
    if (!text) return null;
    
    const icon = type === 'success' ? 'check-circle' : 'exclamation-triangle';
    
    return (
        <div className={`alert alert-${type} alert-dismissible fade show mt-4`} role="alert">
            <i className={`bi bi-${icon} me-2`}></i>
            {text}
            {onClose && (
                <button type="button" className="btn-close" onClick={onClose}></button>
            )}
        </div>
    );
}
