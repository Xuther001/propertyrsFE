import React, { useState } from 'react';
import axiosInstance from '../../../configs/AxiosConfig';
import './DeleteProperty.css';

const DeleteProperty = ({ propertyId, onDelete }) => {
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
    } catch(err) {
      setError('Failed to delete properties');
      console.error(err);
    }
  }

  if (error) return <p className="error-text">{error}</p>;

  return (
    <div>
      <button className="delete-buton" onClick={handleDeleteConfirm}>Delete Property</button>
    </div>
  )
}

export default DeleteProperty;