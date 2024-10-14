import React, { useEffect, useState } from 'react';
import axiosInstance from '../../configs/AxiosConfig';

const UserProfile = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get('/property');
        console.log('API Response:', response.data); //delete later
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <h1>My Properties</h1>
      <div className="property-list">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.property_id} className="property-card">
              <h2>{property.address}</h2>
              <p>
                {property.city}, {property.state}, {property.country}
              </p>
              <div className="image-gallery">
                {property.images && property.images.length > 0 ? (
                  property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.image_url}
                      alt={`Property ${property.property_id} - Image ${index + 1}`}
                      className="property-image"
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
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