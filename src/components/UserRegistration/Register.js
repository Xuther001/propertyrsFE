import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../configs/AxiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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
      const response = await axiosInstance.post('/users/register', formData);

      if (response.status === 200) {
        setSuccess(true);
        setFormData({ username: '', email: '', password: '' });

        setTimeout(() => navigate('/'), 5000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering user');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      {success && <div className="success">Registration successful! Redirecting...</div>}
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <button className="go-home-button" onClick={handleGoHome}>
        Go to Home Page
      </button>
    </div>
  );
};

export default Register;