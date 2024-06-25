// src/components/ExperienceCanvas.js
import React, { useEffect, useRef } from 'react';
import Experience from '../Experience/Experience';

const ExperienceCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const experience = new Experience({ targetElement: canvasRef.current });

      return () => {
        experience.destroy();
      };
    }
  }, []);

  return <div className="experience" ref={canvasRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ExperienceCanvas;
