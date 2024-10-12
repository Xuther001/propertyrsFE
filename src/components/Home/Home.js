import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Property RS</h1>
      <p>Join us to explore and list amazing properties!</p>
      <Link to="/register" className="register-link">
        Create an Account
      </Link>
    </div>
  );
};

export default Home;
