import React, { useState } from 'react';
import './PropertyDetailsOverlay.css';

const PropertyDetailsOverlay = ({ listing, onClose }) => {
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!listing) return null;

  const handleOpenGallery = (index) => {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setGalleryOpen(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{listing.description}</h2>
        <p>Price: ${parseFloat(listing.price).toFixed(2)}</p>
        <p>Status: {listing.is_for_sale ? 'For Sale' : 'Not for Sale'}</p>
        <p>Available From: {new Date(listing.available_from).toLocaleDateString()}</p>

        {listing.images.length > 0 && (
          <img
            src={listing.images[0].image_url}
            alt={`Property ${listing.property_id}`}
            className="representative-image"
            onClick={() => handleOpenGallery(0)}
          />
        )}
      </div>

      {isGalleryOpen && (
        <div className="gallery-overlay" onClick={handleCloseGallery}>
          <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={handlePrevImage} className="nav-button">❮</button>
            <img
              src={listing.images[currentImageIndex].image_url}
              alt={`Property ${listing.property_id} - ${currentImageIndex + 1}`}
              className="enlarged-image"
            />
            <button onClick={handleNextImage} className="nav-button">❯</button>
            <div className="image-counter">
              {currentImageIndex + 1} / {listing.images.length} images
            </div>
            <button className="close-gallery-button" onClick={handleCloseGallery}>
              Close Gallery
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsOverlay;