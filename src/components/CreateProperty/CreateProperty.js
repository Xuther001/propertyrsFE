import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    lot_size: '',
    year_built: '',
    hoa_fee: '',
    property_features: {},
    flooring: [],
    has_fireplace: false,
    fireplace_features: '',
    view_description: '',
    parking: {},
    utilities: {},
    taxes: '',
    images: [],
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
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

      const response = await axiosInstance.post('/property', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        const propertyId = response.data.property.property_id;
        const formDataImages = new FormData();
        formData.images.forEach((image) => formDataImages.append('images', image));

        const uploadResponse = await axiosInstance.post(
          `/property/${propertyId}/images`,
          formDataImages,
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
        );

        if (uploadResponse.status === 200) {
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
            lot_size: '',
            year_built: '',
            hoa_fee: '',
            property_features: {},
            flooring: [],
            has_fireplace: false,
            fireplace_features: '',
            view_description: '',
            parking: {},
            utilities: {},
            taxes: '',
            images: [],
          });
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error posting property');
    }
  };

  return (
    <div className="post-property-form">
      <div className="form-header">
        <h2>Add a Property</h2>
        <div className="form-navigation">
          <Link to="/" className="home-button">Home</Link>
        </div>
      </div>

      {success && <div className="success">Property posted successfully!</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="address">Street</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group small-input">
            <label htmlFor="state">State</label>
            <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} required />
          </div>

          <div className="form-group small-input">
            <label htmlFor="postal_code">Postal Code</label>
            <input type="text" id="postal_code" name="postal_code" value={formData.postal_code} onChange={handleInputChange} required />
          </div>

          <div className="form-group small-input">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="property_type">Property Type</label>
            <input type="text" id="property_type" name="property_type" value={formData.property_type} onChange={handleInputChange} required />
          </div>

          <div className="form-group small-input">
            <label htmlFor="bedrooms">Bedrooms</label>
            <input type="number" id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} required />
          </div>

          <div className="form-group small-input">
            <label htmlFor="bathrooms">Bathrooms</label>
            <input type="number" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} required />
          </div>

          <div className="form-group small-input">
            <label htmlFor="area">Area (sq ft)</label>
            <input type="number" step="0.01" id="area" name="area" value={formData.area} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group small-input">
            <label htmlFor="lot_size">Lot Size (acres)</label>
            <input type="number" step="0.01" id="lot_size" name="lot_size" value={formData.lot_size} onChange={handleInputChange} />
          </div>

          <div className="form-group small-input">
            <label htmlFor="year_built">Year Built</label>
            <input type="number" id="year_built" name="year_built" value={formData.year_built} onChange={handleInputChange} />
          </div>

          <div className="form-group small-input">
            <label htmlFor="hoa_fee">HOA Fee</label>
            <input type="number" step="0.01" id="hoa_fee" name="hoa_fee" value={formData.hoa_fee} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="property_features">Property Features (JSON)</label>
            <input type="text" id="property_features" name="property_features" value={JSON.stringify(formData.property_features)} onChange={handleInputChange} placeholder='{"open_floorplan": true}' />
          </div>

          <div className="form-group">
            <label htmlFor="flooring">Flooring (JSON)</label>
            <input type="text" id="flooring" name="flooring" value={JSON.stringify(formData.flooring)} onChange={handleInputChange} placeholder='["hardwood", "tile"]' />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group small-input">
            <label htmlFor="has_fireplace">Has Fireplace</label>
            <input type="checkbox" id="has_fireplace" name="has_fireplace" checked={formData.has_fireplace} onChange={handleCheckboxChange} />
          </div>

          <div className="form-group">
            <label htmlFor="fireplace_features">Fireplace Features</label>
            <input type="text" id="fireplace_features" name="fireplace_features" value={formData.fireplace_features} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="view_description">View Description</label>
            <input type="text" id="view_description" name="view_description" value={formData.view_description} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="parking">Parking (JSON)</label>
            <input type="text" id="parking" name="parking" value={JSON.stringify(formData.parking)} onChange={handleInputChange} placeholder='{"garage": 1, "driveway": 0}' />
          </div>

          <div className="form-group">
            <label htmlFor="utilities">Utilities (JSON)</label>
            <input type="text" id="utilities" name="utilities" value={JSON.stringify(formData.utilities)} onChange={handleInputChange} placeholder='{"water": "public", "electric": "underground"}' />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group small-input">
            <label htmlFor="taxes">Taxes</label>
            <input type="number" step="0.01" id="taxes" name="taxes" value={formData.taxes} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="images">Upload Images</label>
          <input type="file" id="images" name="images" multiple accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit" className="submit-button">Post Property</button>
      </form>
    </div>
  );
};

export default CreateProperty;