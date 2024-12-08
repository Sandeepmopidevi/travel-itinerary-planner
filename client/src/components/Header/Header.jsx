import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu open/close state
  };

  return (
    <header className="header">
      {/* Logo wrapped inside Link for navigation */}
      <Link to="/" className="logo">Travel Planner</Link>

      {/* Hamburger icon for mobile */}
      <div
        className={`menu-icon ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        &#9776; {/* Hamburger icon */}
      </div>

      {/* Navigation links */}
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/itinerary/new">Create Itinerary</Link>
        <Link to="/collaborate">Collaborate</Link>
      </nav>
    </header>
  );
};

export default Header;
