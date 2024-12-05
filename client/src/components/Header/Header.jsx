import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Travel Planner
      </Link>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/itinerary/new">Create Itinerary</Link>
      </nav>
    </header>
  );
};

export default Header;
