// src/components/ExperienceCanvas.js
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Experience from '../Experience/Experience';
import { useExperience } from '../context/ExperienceContext';

const ExperienceCanvas = () => {
  const canvasRef = useRef(null);
  const experienceInstance = useExperience(); // global/singleton reference
  const location = useLocation();

  useEffect(() => {
    if (canvasRef.current) {
      if (!experienceInstance.current) {
        experienceInstance.current = new Experience({ targetElement: canvasRef.current });
        experienceInstance.current.resume(); // Call resume() on initial load
      } else {
        experienceInstance.current.setCanvas(canvasRef.current);
        experienceInstance.current.resume();
      }
    }
    return () => {
      if (experienceInstance.current) {
        // Simply pause, do not destroy so that the model stays loaded
        experienceInstance.current.pause();
        // experienceInstance.current.setCanvas(null);
      }
    };
  }, []);


  return (
    <div 
      className="experience" 
      ref={canvasRef} 
      style={{ width: '100%', height: '100vh' }} 
    />
  );
};

export default ExperienceCanvas;
