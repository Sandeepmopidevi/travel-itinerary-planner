import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Itinerary = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/itineraries/${id}`);
        const data = await response.json();
        setItinerary(data);
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      }
    };
    fetchItinerary();
  }, [id]);

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
