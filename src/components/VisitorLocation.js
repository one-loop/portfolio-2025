
import React, { useEffect, useState } from 'react';

const VisitorLocation = () => {
  const [prevLocation, setPrevLocation] = useState(null);

  useEffect(() => {
    // Attempt to get current visitor's position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // Save this visitor's location
          fetch('/api/visitor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location }),
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    // Fetch the previous visitor's location
    fetch('/api/visitor')
      .then((res) => res.json())
      .then((data) => setPrevLocation(data.location))
      .catch((err) => console.error('Error fetching previous location:', err));
  }, []);

  return (
    <div>
      <h2>Previous Visitor Location</h2>
      {prevLocation ? (
        <p>
          Latitude: {prevLocation.lat}, Longitude: {prevLocation.lng}
        </p>
      ) : (
        <p>No previous location available</p>
      )}
    </div>
  );
};

export default VisitorLocation;