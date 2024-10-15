import React from 'react';
import './PropertyDetailsOverlay.css';

const PropertyDetailsOverlay = ({ listing, onClose }) => {
  if (!listing) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{listing.description}</h2>
        <p>Price: ${parseFloat(listing.price).toFixed(2)}</p>
        <p>Status: {listing.is_for_sale ? 'For Sale' : 'Not for Sale'}</p>
        <p>Available From: {new Date(listing.available_from).toLocaleDateString()}</p>

        <div className="image-gallery">
          {listing.images.map((image, index) => (
            <img
              key={index}
              src={image.image_url}
              alt={`Property ${listing.property_id} - ${index + 1}`}
              className="property-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsOverlay;