import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Itinerary = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        setError('Authorization token is missing.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/itineraries/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in the header
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch itinerary: ${response.statusText}`);
        }

        const data = await response.json();
        setItinerary(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchItinerary();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {itinerary ? (
        <div>
          <h1>{itinerary.title}</h1>
          <p>{itinerary.description}</p>
        </div>
      ) : (
        <p>Loading itinerary...</p>
      )}
    </div>
  );
};

export default Itinerary;
