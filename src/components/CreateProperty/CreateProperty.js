import React, { useState } from 'react';
import axiosInstance from '../../configs/AxiosConfig';
import './CreateProperty.css';

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    property_type: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You need to be logged in to post a property.');
        return;
      }

      const response = await axiosInstance.post(
        '/property',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          address: '',
          city: '',
          state: '',
          postal_code: '',
          country: '',
          property_type: '',
          bedrooms: '',
          bathrooms: '',
          area: '',
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error posting property');
    }
  };

  return (
    <div className="post-property-form">
      <h2>Post a Property</h2>
      {success && <div className="success">Property posted successfully!</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="postal_code">Postal Code</label>
          <input
            type="text"
            id="postal_code"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="property_type">Property Type</label>
          <input
            type="text"
            id="property_type"
            name="property_type"
            value={formData.property_type}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bedrooms">Bedrooms</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bathrooms">Bathrooms</label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="area">Area (sq ft)</label>
          <input
            type="number"
            step="0.01"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Post Property</button>
      </form>
    </div>
  );
};

export default CreateProperty;