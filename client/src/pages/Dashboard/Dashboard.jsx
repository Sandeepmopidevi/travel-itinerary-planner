import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect if not logged in
        return;
      }

      try {
        // Fetch user data
        const userResponse = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!userResponse.ok) {
          const errorData = await userResponse.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }

        const userData = await userResponse.json();
        setUser(userData);

        // Fetch itineraries
        const itineraryResponse = await fetch('http://localhost:5000/api/itineraries', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (itineraryResponse.ok) {
          const itineraryData = await itineraryResponse.json();
          setItineraries(itineraryData);
        }

        // Fetch collaborations
        const collaborationResponse = await fetch('http://localhost:5000/api/collaborations', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (collaborationResponse.ok) {
          const collaborationData = await collaborationResponse.json();
          setCollaborations(collaborationData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <section className="dashboard-section">
        <h2>Your Itineraries</h2>
        {itineraries.length > 0 ? (
          <div className="itinerary-list">
            {itineraries.map((itinerary) => (
              <div key={itinerary.id} className="itinerary-card">
                <h3>{itinerary.name}</h3>
                <p>{itinerary.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No itineraries found. Start by creating one!</p>
        )}
        <button
          className="create-itinerary-button"
          onClick={() => navigate('/itinerary/new')}
        >
          Create New Itinerary
        </button>
      </section>

      <section className="dashboard-section">
        <h2>Collaborations</h2>
        {collaborations.length > 0 ? (
          <div className="collaboration-list">
            {collaborations.map((collab) => (
              <div key={collab._id} className="collaboration-card">
                <p>Shared by: {collab.collaborators.map((collaborator) => collaborator.name).join(', ')}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No collaborations available.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
