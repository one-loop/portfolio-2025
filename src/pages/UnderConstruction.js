import React from 'react';
import FooterMain from '../components/FooterMain';

const UnderConstruction = () => {
  return (
    <div>
      <div className="gradient projects">
        <div style={{
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center', color: '#F2F2F2', maxWidth: '760px' }}>
            <p style={{ color: '#929292' }}>This page is currently under construction, but please do visit again soon!</p>
          </div>
        </div>
        <FooterMain />
      </div>
    </div>
  );
};

export default UnderConstruction;


