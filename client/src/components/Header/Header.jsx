import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      {/* Wrap the logo text inside Link component */}
      <Link to="/" className="logo">Travel Planner</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/itinerary/new">Create Itinerary</Link>
        <Link to="/collaborate">Collaborate</Link>
      </nav>
    </header>
  );
};

export default Header;
