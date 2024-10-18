import React, { useState, useEffect } from 'react';
import './PropertyDetailsOverlay.css';

const PropertyDetailsOverlay = ({ listingId, onClose }) => {
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/property/${listingId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPropertyDetails(data.property);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [listingId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!propertyDetails) return null;

  const handleOpenGallery = (index) => {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setGalleryOpen(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === propertyDetails.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? propertyDetails.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{propertyDetails.description}</h2>
        <p>Price: ${parseFloat(propertyDetails.price).toFixed(2)}</p>
        <p>Status: {propertyDetails.is_for_sale ? 'For Sale' : 'Not for Sale'}</p>
        <p>Available From: {new Date(propertyDetails.available_from).toLocaleDateString()}</p>
        <p>Address: {propertyDetails.address}, {propertyDetails.city}, {propertyDetails.state}, {propertyDetails.postal_code}, {propertyDetails.country}</p>
        <p>Bedrooms: {propertyDetails.bedrooms}</p>
        <p>Bathrooms: {propertyDetails.bathrooms}</p>
        <p>Area: {propertyDetails.area} sq. ft.</p>
        <p>Lot Size: {propertyDetails.lot_size} acres</p>
        <p>Year Built: {propertyDetails.year_built}</p>
        <p>HOA Fee: ${propertyDetails.hoa_fee}</p>
        <p>Parking: {propertyDetails.parking.join(', ')}</p>
        <p>Utilities: {propertyDetails.utilities.join(', ')}</p>
        <p>Taxes: ${propertyDetails.taxes}</p>
        <p>Features: {propertyDetails.property_features.join(', ')}</p>

        {propertyDetails.images.length > 0 && (
          <img
            src={propertyDetails.images[0].image_url}
            alt={`Property ${propertyDetails.property_id}`}
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
              src={propertyDetails.images[currentImageIndex].image_url}
              alt={`Property ${propertyDetails.property_id} - ${currentImageIndex + 1}`}
              className="enlarged-image"
            />
            <button onClick={handleNextImage} className="nav-button">❯</button>
            <div className="image-counter">
              {currentImageIndex + 1} / {propertyDetails.images.length} images
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