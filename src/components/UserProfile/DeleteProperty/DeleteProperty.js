import React, { useState } from 'react';
import axiosInstance from '../../../configs/AxiosConfig';
import './DeleteProperty.css';

const DeleteProperty = ({ propertyId, onDelete, onClose }) => {
  const [error, setError] = useState(null);

  const handleDeleteConfirm = async ({ Id }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.delete(`/property/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (onDelete) {
        onDelete();
      }
      console.log('Property deleted:',response.data)
      if (onClose) {
        onclose();
      }
    } catch(err) {
      setError('Failed to delete properties');
      console.error(err);
    }
  }

  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="overlay">
      <div className="centered-content">
        <p>Click the button below to complete deletion of property <br />
           This cannot be undone</p>
        <button className="delete-button" onClick={handleDeleteConfirm}>Click to Confirm Deletion of Property</button>
      </div>
    </div>
  )
}

export default DeleteProperty;