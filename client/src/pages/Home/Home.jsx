import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  useEffect(() => {
    // Intersection Observer to trigger the animation on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view'); // Add class to trigger animation
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    featureCards.forEach(card => observer.observe(card));

    return () => {
      observer.disconnect(); // Cleanup observer on component unmount
    };
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">Plan Your Perfect Journey</h1>
        <p className="hero-subtitle">
          Your ultimate travel itinerary planner, where every trip becomes a masterpiece.
        </p>
        <div className="hero-buttons">
          <Link to="/login" className="hero-btn">Login</Link>
          <Link to="/register" className="hero-btn hero-btn-secondary">Register</Link>
        </div>
      </header>
      <section className="features-section">
        <h2 className="features-title">Why Choose Us?</h2>
        <div className="features-container">
          <div className="feature-card">
            <h3>Custom Itineraries</h3>
            <p>Create personalized travel plans tailored to your preferences.</p>
          </div>
          <div className="feature-card">
            <h3>Collaborative Planning</h3>
            <p>Plan trips with friends and family in real-time.</p>
          </div>
          <div className="feature-card">
            <h3>Easy to Use</h3>
            <p>Our intuitive interface makes trip planning a breeze.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
