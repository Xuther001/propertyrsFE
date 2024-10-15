import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ListingPage from '../ListingPage/ListingPage';
import './Home.css';

const Home = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="home-container">
      <h1>Welcome to Property RS</h1>
      <p>Join us to explore and list amazing properties!</p>

      <div className="home-links">
        {!isLoggedIn && (
          <>
            <Link to="/register" className="register-link">Create an Account</Link>
            <Link to="/login" className="login-link">Login</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/postproperty" className="post-property-link">Add a Property</Link>
            <Link to="/myprofile" className="profile-link">My Properties</Link>
            <Link to="/listingform" className="listing-form-link">List a Property</Link>
            <Link to="/" onClick={handleLogout} className="logout-link">Logout</Link>
          </>
        )}
      </div>
      
      <div className="home-description">
        <h2>Explore Your Options</h2>
        <p>
          Whether you are looking to buy, sell, or rent, Property RS provides a comprehensive platform
          to meet all your property needs. Join us today and start exploring!
        </p>
      </div>

      <div className="listings-section">
        <ListingPage />
      </div>
    </div>
  );
};

export default Home;