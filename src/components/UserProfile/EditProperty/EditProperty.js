import React, { useState } from 'react';
import './EditProperty.css';
import axiosInstance from '../../../configs/AxiosConfig';

const EditProperty = ({ propertyId }) => {
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
    lot_size: '',
    year_built: '',
    hoa_fee: '',
    has_fireplace: false,
    taxes: ''
  });
  const token = localStorage.getItem('token');

  const cleanFormData = (data) => {
    return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== '' && value !== null));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData, [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedData = cleanFormData(formData);
      try {
        const response = await axiosInstance.put(`/property/${propertyId}`, cleanedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        alert('Property updated successfully!');
      } else {
        console.error('Failed to update property:', response.status);
        alert('Failed to update property.');
      }
      } catch (error) {
        console.error('Error updating property:', error);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
     <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Property Type:</label>
        <input
          type="text"
          name="property_type"
          value={formData.property_type}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Bedrooms:</label>
        <input
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Bathrooms:</label>
        <input
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Area (sq ft):</label>
        <input
          type="number"
          name="area"
          value={formData.area}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Lot Size (sq ft):</label>
        <input
          type="number"
          name="lot_size"
          value={formData.lot_size}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Year Built:</label>
        <input
          type="number"
          name="year_built"
          value={formData.year_built}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>HOA Fee:</label>
        <input
          type="number"
          name="hoa_fee"
          value={formData.hoa_fee}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Has Fireplace:</label>
        <input
          type="checkbox"
          name="has_fireplace"
          checked={formData.has_fireplace}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Taxes:</label>
        <input
          type="number"
          name="taxes"
          value={formData.taxes}
          onChange={handleChange}
        />
      </div>
      <button type="submit"> Update Property</button>
    </form>
  )
}

export default EditProperty;