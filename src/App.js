import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/UserRegistration/Register';
import CreateProperty from './components/CreateProperty/CreateProperty';
import LoginUser from './components/LoginUser/LoginUser';
import UserProfile from './components/UserProfile/UserProfile';
import ListingForm from './components/ListingForm/ListingForm';
import ListingPage from './components/ListingPage/ListingPage';
import EditProperty from './components/UserProfile/EditProperty/EditProperty';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/myprofile" element={<UserProfile />} />
        <Route path="/postproperty" element={<CreateProperty />} />
        <Route path="/listingform" element={<ListingForm />} />
        <Route path="/listingpage" element={<ListingPage />} />
        <Route path="/editproperty" element={<EditProperty />} />
      </Routes>
    </Router>
  );
}

export default App;