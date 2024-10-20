import React, { useState, useEffect } from 'react';
import './EditProperty.css';
import axiosInstance from '../../../configs/AxiosConfig';

// const EditProperty = ({ propertyId }) => {

const EditProperty = () => {

  const [response, setResponse] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
      const editProperty = async () => {
          try {
            // const res = await axiosInstance.put(`/api/property/${propertyId}`, {
              const res = await axiosInstance.put('/property/a603cb3f-d6e4-49fe-8254-b35d5fd36be0',{}, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              }
            });
            setResponse(res.data);
          } catch (error) {
              console.error('Error updating property:', error);
          }
      };

      if (token) {
        editProperty(); // Call the function
      }
  }, [token]);

  return (
    <div>
      {response ? JSON.stringify(response) : 'Loading...'}
    </div>
  )
}

export default EditProperty;