import React, { useEffect, useState } from 'react';
import axiosInstance from '../../configs/AxiosConfig';
import './UserProfile.css';
import EditProperty from './EditProperty/EditProperty';

const UserProfile = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [error, setError] = useState(null);
  const [deletePropertyOverlay, setDeletePropertyOverlay] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

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

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedPropertyId(null);
  };

  const handleEditClick = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setIsEditModalOpen(true);
  };

  const handlePropertyDelete = (deletedPropertyId) => {
    setProperties((prevProperties) => 
      prevProperties.filter((property) => 
        property.property_id !== deletedPropertyId)
    );
    setDeletePropertyOverlay(false);
    setPropertyToDelete(null);
  };

  const toggleDeletePropertyOverlay = (propertyId) => {
    setPropertyToDelete(propertyId);
    setDeletePropertyOverlay(!deletePropertyOverlay);
  }

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`/property/${propertyToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      handlePropertyDelete(propertyToDelete);
    } catch (err) {
      setError('Failed to delete property');
      console.error(err);
    }
  }

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Properties</h1>
      <div className="property-list">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.property_id} className="property-card">
              <button className="delete-button" onClick={() => toggleDeletePropertyOverlay(property.property_id)}>
                Delete
              </button>
              <button
                className="edit-button"
                onClick={() => handleEditClick(property.property_id)}
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

      {deletePropertyOverlay && (
        <div className="delete-overlay">
          <div className="delete-modal">
            <h2>Confirm Deletion</h2>
            <p>
              Are you sure you want to delete this property? <br />
              This action cannot be undone.
            </p>
            <div className="button-group">
              <button className="confirm-button" onClick={handleDeleteConfirm}>
                Delete
              </button>
              <button className="cancel-button" onClick={() => toggleDeletePropertyOverlay(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal}>Close</button>
            <EditProperty propertyId={selectedPropertyId} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;