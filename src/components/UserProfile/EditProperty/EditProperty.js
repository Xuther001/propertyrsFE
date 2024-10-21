import React, { useState } from 'react';
import axiosInstance from '../../../configs/AxiosConfig';
import './EditProperty.css';

const propertyFeaturesOptions = [
  { label: 'Open Floor Plan', value: 'open_floorplan' },
  { label: 'Kitchen Island', value: 'kitchen_island' },
  { label: 'Smart Home', value: 'smart_home' },
  { label: 'Swimming Pool', value: 'swimming_pool' },
  { label: 'Garden', value: 'garden' },
];

const flooringOptions = [
  { label: 'Hardwood', value: 'hardwood' },
  { label: 'Tile', value: 'tile' },
  { label: 'Carpet', value: 'carpet' },
  { label: 'Laminate', value: 'laminate' },
  { label: 'Vinyl', value: 'vinyl' },
];

const parkingOptions = [
  { label: 'Garage', value: 'garage' },
  { label: 'Driveway', value: 'driveway' },
  { label: 'Street Parking', value: 'street_parking' },
];

const utilitiesOptions = [
  { label: 'Public Water', value: 'public_water' },
  { label: 'Well Water', value: 'well_water' },
  { label: 'Public Electricity', value: 'public_electricity' },
  { label: 'Solar', value: 'solar' },
];

const EditProperty = ({ propertyId, onClose }) => {
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
    property_features: [],
    flooring: [],
    has_fireplace: false,
    fireplace_features: '',
    view_description: '',
    parking: [],
    utilities: [],
    taxes: '',
    images: [],
  });

  const filterFormData = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        return (
          value !== '' &&
          value !== null &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0)
        );
      })
    );
  };

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name, value) => {
    setFormData((prevState) => {
      const currentValues = prevState[name];
      if (currentValues.includes(value)) {
        return {
          ...prevState,
          [name]: currentValues.filter((item) => item !== value),
        };
      } else {
        return {
          ...prevState,
          [name]: [...currentValues, value],
        };
      }
    });
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
        setError('You need to be logged in to update a property.');
        return;
      }

      const filteredData = filterFormData(formData);

      const response = await axiosInstance.put(`/property/${propertyId}`, filteredData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const formDataImages = new FormData();
        formData.images.forEach((image) => formDataImages.append('images', image));

        const uploadResponse = await axiosInstance.post(
          `/property/${propertyId}/images`,
          formDataImages,
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
        );

        if (uploadResponse.status === 200) {
          setSuccess(true);
          onClose(); // Close the modal after successful update
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating property');
    }
  };

  return (
    <div className="post-property-form">
      <div className="form-header">
        <h2>Edit Property</h2>
      </div>

      {success && <div className="success">Property updated successfully!</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="address">Street</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group small-input">
            <label htmlFor="state">State</label>
            <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} />
          </div>

          <div className="form-group small-input">
            <label htmlFor="postal_code">Postal Code</label>
            <input type="text" id="postal_code" name="postal_code" value={formData.postal_code} onChange={handleInputChange} />
          </div>

          <div className="form-group small-input">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="property_type">Property Type</label>
            <input type="text" id="property_type" name="property_type" value={formData.property_type} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="bedrooms">Bedrooms</label>
            <input type="number" id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="bathrooms">Bathrooms</label>
            <input type="number" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="area">Area (sq ft)</label>
            <input type="number" id="area" name="area" value={formData.area} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="lot_size">Lot Size (acres)</label>
            <input type="number" id="lot_size" name="lot_size" value={formData.lot_size} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="year_built">Year Built</label>
            <input type="number" id="year_built" name="year_built" value={formData.year_built} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="hoa_fee">HOA Fee</label>
            <input type="number" id="hoa_fee" name="hoa_fee" value={formData.hoa_fee} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group features-section">
            <h3>Property Features</h3>
            <div className="checkbox-group">
              {propertyFeaturesOptions.map((option) => (
                <label key={option.value}>
                  <input
                    type="checkbox"
                    checked={formData.property_features.includes(option.value)}
                    onChange={() => handleCheckboxChange('property_features', option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group flooring-section">
            <h3>Flooring Options</h3>
            <div className="checkbox-group">
              {flooringOptions.map((option) => (
                <label key={option.value}>
                  <input
                    type="checkbox"
                    checked={formData.flooring.includes(option.value)}
                    onChange={() => handleCheckboxChange('flooring', option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group parking-section">
            <h3>Parking Options</h3>
            <div className="checkbox-group">
              {parkingOptions.map((option) => (
                <label key={option.value}>
                  <input
                    type="checkbox"
                    checked={formData.parking.includes(option.value)}
                    onChange={() => handleCheckboxChange('parking', option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group utilities-section">
            <h3>Utilities</h3>
            <div className="checkbox-group">
              {utilitiesOptions.map((option) => (
                <label key={option.value}>
                  <input
                    type="checkbox"
                    checked={formData.utilities.includes(option.value)}
                    onChange={() => handleCheckboxChange('utilities', option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="has_fireplace">Has Fireplace</label>
            <input
              type="checkbox"
              id="has_fireplace"
              name="has_fireplace"
              checked={formData.has_fireplace}
              onChange={() => setFormData({ ...formData, has_fireplace: !formData.has_fireplace })}
            />
          </div>

          {formData.has_fireplace && (
            <div className="form-group">
              <label htmlFor="fireplace_features">Fireplace Features</label>
              <input
                type="text"
                id="fireplace_features"
                name="fireplace_features"
                value={formData.fireplace_features}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="view_description">View Description</label>
            <input
              type="text"
              id="view_description"
              name="view_description"
              value={formData.view_description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="taxes">Taxes</label>
            <input type="text" id="taxes" name="taxes" value={formData.taxes} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="images">Property Images</label>
            <input type="file" id="images" name="images" multiple onChange={handleImageChange} />
          </div>
        </div>

        <button type="submit" className="submit-button">Update Property</button>
      </form>
    </div>
  );
};

export default EditProperty;