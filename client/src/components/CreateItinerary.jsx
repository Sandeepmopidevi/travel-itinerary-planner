import React, { useState } from 'react';

const CreateItinerary = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <div className="create-itinerary">
      <h2>Create New Itinerary</h2>
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
