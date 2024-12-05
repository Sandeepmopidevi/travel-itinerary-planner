import React, { useState } from 'react';
import './CreateItinerary.css';

const CreateItinerary = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Authorization token is missing.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/itineraries/new', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, location, startDate, endDate }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setMessage(`Itinerary created: ${data.name}`);
    } catch (error) {
      setMessage(`Error creating itinerary: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="scroll-effect"></div>
      <h2>Create Itinerary</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
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
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
      {message && <p className={message.startsWith('Error') ? 'error' : 'success'}>{message}</p>}
    </div>
  );
};

export default CreateItinerary;
