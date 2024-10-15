import React, { useState } from 'react';
import axiosInstance from '../../configs/AxiosConfig';
import './ListingForm.css';

const ListingForm = () => {
  const [formData, setFormData] = useState({
    property_id: '',
    price: '',
    is_for_sale: true,
    description: '',
    available_from: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const token = localStorage.getItem('token');

    try {
      const response = await axiosInstance.post('/listing', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Listing created successfully!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setMessage('Failed to create listing. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="listing-form-container">
      <h1>Create Listing</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Property ID:
          <input
            type="text"
            name="property_id"
            value={formData.property_id}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Is for Sale:
          <select
            name="is_for_sale"
            value={formData.is_for_sale}
            onChange={handleChange}
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Available From:
          <input
            type="date"
            name="available_from"
            value={formData.available_from}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Listing'}
        </button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default ListingForm;