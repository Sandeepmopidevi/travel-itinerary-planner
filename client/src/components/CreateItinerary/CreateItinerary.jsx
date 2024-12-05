import React, { useState } from 'react';

const CreateItinerary = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      setError('Authorization token is missing.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/itineraries/new', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in the header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create itinerary: ${response.statusText}`);
      }

      const data = await response.json();
      onCreate(data); // Trigger the onCreate callback
      setName('');
      setDescription('');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-itinerary">
      <h2>Create New Itinerary</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Itinerary Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Create Itinerary</button>
      </form>
    </div>
  );
};

export default CreateItinerary;
