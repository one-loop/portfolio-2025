// src/components/ExperienceCanvas.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Experience from '../Experience/Experience';
import { useExperience } from '../context/ExperienceContext';

const ANIMATION_DURATION = 600; // milliseconds

// Use a module-level variable to persist loaded state across mounts
let modelLoaded = false;

const ExperienceCanvas = ({ onLoadingDone }) => {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const experienceInstance = useExperience(); // global/singleton reference
  const [showOverlay, setShowOverlay] = useState(!modelLoaded);
  const [slideUp, setSlideUp] = useState(false);
  const [loadingDots, setLoadingDots] = useState('.');

  // Animate loading dots
  useEffect(() => {
    if (!showOverlay) return;
    let i = 0;
    const interval = setInterval(() => {
      setLoadingDots('.'.repeat((i % 3) + 1));
      i++;
    }, 400);
    return () => clearInterval(interval);
  }, [showOverlay]);

  // Helper to trigger slide up and callback at the same time
  const triggerSlideUp = useCallback(() => {
    if (!modelLoaded) {
      modelLoaded = true;
      setSlideUp(true);
      if (onLoadingDone) onLoadingDone();
    }
  }, [onLoadingDone]);

  useEffect(() => {
    if (canvasRef.current) {
      if (!experienceInstance.current) {
        experienceInstance.current = new Experience({ targetElement: canvasRef.current });
        experienceInstance.current.resources.on('groupEnd', (group) => {
          if (group.name === 'base') triggerSlideUp();
        });
        experienceInstance.current.resume();
      } else {
        experienceInstance.current.setCanvas(canvasRef.current);
        experienceInstance.current.resume();
        if (modelLoaded) {
          setSlideUp(true);
          if (onLoadingDone) onLoadingDone();
        } else if (experienceInstance.current.resources?.on) {
          experienceInstance.current.resources.on('groupEnd', (group) => {
            if (group.name === 'base') triggerSlideUp();
          });
        }
      }
    }
    return () => {
      if (experienceInstance.current) {
        experienceInstance.current.pause();
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (slideUp && showOverlay && overlayRef.current) {
      const handleTransitionEnd = (e) => {
        if (e.propertyName === 'transform') {
          setShowOverlay(false);
        }
      };
      const overlay = overlayRef.current;
      overlay.addEventListener('transitionend', handleTransitionEnd);
      return () => overlay.removeEventListener('transitionend', handleTransitionEnd);
    }
  }, [slideUp, showOverlay]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {showOverlay && (
        <div
          ref={overlayRef}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(16,16,16,0.85)',
            zIndex: 9999,
            color: '#fff',
            fontSize: '1.5rem',
            letterSpacing: '0.1em',
            transform: slideUp ? 'translateY(-100%)' : 'translateY(0)',
            transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(.4,0,.2,1)`
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ minWidth: '4.5ch', textAlign: 'center', display: 'inline-block' }}>
              loading
              <span style={{ display: 'inline-block', minWidth: '3ch', textAlign: 'left' }}>{loadingDots}</span>
            </span>
          </span>
        </div>
      )}
      <div
        className="experience"
        ref={canvasRef}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
};

export default ExperienceCanvas;