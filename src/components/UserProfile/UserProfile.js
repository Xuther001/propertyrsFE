import React, { useEffect, useState } from 'react';
import axiosInstance from '../../configs/AxiosConfig';
import './UserProfile.css';

const UserProfile = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get('/property');
        setProperties(response.data.properties || []);
      } catch (err) {
        setError('Failed to load properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleEdit = (propertyId) => {
    console.log(`Editing property with ID: ${propertyId}`);
    // Will write logic soon
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Properties</h1>
      <div className="property-list">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.property_id} className="property-card">
              <button
                className="edit-button"
                onClick={() => handleEdit(property.property_id)}
              >
                Edit
              </button>
              <h2 className="property-address">{property.address}</h2>
              <p className="property-location">
                {property.city}, {property.state}, {property.country}
              </p>
              <div className="image-gallery">
                {property.images && property.images.length > 0 ? (
                  property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.image_url}
                      alt={`Property ${property.property_id} - ${index + 1}`}
                      className="property-image"
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
              <div className="property-details">
                <p className="details">Bedrooms: {property.bedrooms}</p>
                <p className="details">Bathrooms: {property.bathrooms}</p>
                <p className="details">Area: {property.area} sq ft</p>
              </div>
              <p className="property-id">Property ID: {property.property_id}</p>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;