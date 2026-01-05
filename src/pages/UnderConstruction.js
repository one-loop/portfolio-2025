import React from 'react';
import FooterMain from '../components/FooterMain';
import './UnderConstruction.css';

const UnderConstruction = () => {
  return (
    <div>
      <div className="gradient projects">
        <div className="under-construction">
          <div className="under-construction-content">
            <div className="computer-container">
              <img src="/computers/computer-1.webp" className="w-md" alt="Computer" />
              <img src="/computers/sad-computer.png" className="sad-face-overlay" alt="Sad face" />
            </div>
            <p className="under-construction-text">This page is currently under construction, but please do visit again soon!</p>
          </div>
        </div>
        <FooterMain />
      </div>
    </div>
  );
};

export default UnderConstruction;


