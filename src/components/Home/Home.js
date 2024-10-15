import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="home-container">
      <h1>Welcome to Property RS</h1>
      <p>Join us to explore and list amazing properties!</p>

      <div className="home-links">
        <Link to="/register" className="register-link">Create an Account</Link>
        <Link to="/login" className="login-link">Login</Link>
        {isLoggedIn && (
          <>
            <Link to="/postproperty" className="post-property-link">Post a Property</Link>
            <Link to="/myprofile" className="profile-link">My Profile</Link>
          </>
        )}
        <Link to="/listingpage" className="listings-link">View Listings</Link>
      </div>
      
      <div className="home-description">
        <h2>Explore Your Options</h2>
        <p>
          Whether you are looking to buy, sell, or rent, Property RS provides a comprehensive platform
          to meet all your property needs. Join us today and start exploring!
        </p>
      </div>
    </div>
  );
};

export default Home;