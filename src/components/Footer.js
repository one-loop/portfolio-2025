// src/components/Footer.js
import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [location, setLocation] = useState('New York City, USA');

  useEffect(() => {
    async function fetchVisitorLocation() {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }
        const data = await response.json();
        const city = data.city || 'New York City';
        const country = data.country_name || 'USA';
        setLocation(`${city}, ${country}`);
      } catch (error) {
        console.error('Error fetching visitor location:', error.message);
      }
    }

    fetchVisitorLocation();
  }, []);

  return (
    <footer className="home-footer">
      <p className="left-text" id="visitor-location">Last visit from {location}</p>
      <p className="right-text">Model by Bruno Simon</p>

    </footer>
  );
};

export default Footer;
