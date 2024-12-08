import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Collaborate.css';

const Collaborate = () => {
  const [users, setUsers] = useState([]); // All available users
  const [selectedUser, setSelectedUser] = useState('');
  const [collaborations, setCollaborations] = useState([]); // Existing collaborations
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const usersResponse = await fetch('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const collaborationsResponse = await fetch('http://localhost:5000/api/collaborations', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!usersResponse.ok || !collaborationsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const usersData = await usersResponse.json();
        const collaborationsData = await collaborationsResponse.json();

        setUsers(usersData);
        setCollaborations(collaborationsData);
      } catch (error) {
        console.error(error);
        setMessage('Error fetching data');
      }
    };

    fetchData();
  }, [navigate]);

  const handleAddCollaborator = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Authorization token is missing.');
      return;
    }

    // Ensure that userId is selected
    if (!selectedUser) {
      setMessage('Please select a user to add as a collaborator.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/collaborations/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: selectedUser }), // Ensure you are sending the selected user ID
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add collaborator');
      }

      const newCollaboration = await response.json();
      
      // Ensure that newCollaboration contains the correct properties
      setCollaborations((prev) => [
        ...prev,
        { _id: newCollaboration._id, name: newCollaboration.name }, // Adjust as per your backend response
      ]);
      setMessage(`Collaborator added: ${newCollaboration.name}`);
    } catch (error) {
      setMessage(`Error adding collaborator: ${error.message}`);
    }
  };

  return (
    <div className="collaborate-container">
      <h1>Collaborate</h1>
      <p>Work together on your travel itineraries here!</p>

      <div className="collaborate-form">
        <label htmlFor="user-dropdown">Add Collaborator:</label>
        <select
          id="user-dropdown"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} {/* Use _id as the key */}
            </option>
          ))}
        </select>
        <button onClick={handleAddCollaborator} disabled={!selectedUser}>
          Add
        </button>
      </div>

      {message && <p className={message.startsWith('Error') ? 'error' : 'success'}>{message}</p>}

      <div className="collaboration-list">
        <h2>Collaborators</h2>
        {collaborations.length > 0 ? (
          <ul>
            {collaborations.map((collab) => (
              <li key={collab._id}>{collab.name}</li>
            ))}
          </ul>
        ) : (
          <p>No collaborators added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Collaborate;
