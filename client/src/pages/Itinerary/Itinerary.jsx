import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Itinerary = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      console.log('Fetching Itinerary for ID:', id);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/itineraries/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorMessage =
            response.status === 404
              ? 'The requested itinerary does not exist.'
              : `Error: ${response.statusText}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setItinerary(data);
      } catch (err) {
        console.error('Error fetching itinerary:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id]);

  if (loading) {
    return <p>Loading itinerary...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {itinerary ? (
        <div>
          <h1>{itinerary.name}</h1>
          <p>{itinerary.description}</p>
          {itinerary.location && <p>Location: {itinerary.location}</p>}
          {itinerary.startDate && <p>Start Date: {itinerary.startDate}</p>}
          {itinerary.endDate && <p>End Date: {itinerary.endDate}</p>}
        </div>
      ) : (
        <p>Itinerary not found.</p>
      )}
    </div>
  );
};

export default Itinerary;
