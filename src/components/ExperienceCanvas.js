// src/components/ExperienceCanvas.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Experience from '../Experience/Experience';
import { useExperience } from '../context/ExperienceContext';
import './ExperienceCanvas.css';
import currentDetails from '../data/currentDetails';

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
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading');
  const [currentTime, setCurrentTime] = useState('');
  
  // Animation refs for smooth progress
  const animationRef = useRef(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Smooth progress animation function
  const animateProgress = useCallback(() => {
    const target = targetProgressRef.current;
    const current = currentProgressRef.current;
    
    if (Math.abs(target - current) < 0.1) {
      currentProgressRef.current = target;
      setLoadingProgress(Math.round(target));
    } else {
      // Smooth easing towards target
      currentProgressRef.current += (target - current) * 0.1;
      setLoadingProgress(Math.round(currentProgressRef.current));
      animationRef.current = requestAnimationFrame(animateProgress);
    }
  }, []);

  // Update target progress and start animation
  const updateProgress = useCallback((newProgress) => {
    targetProgressRef.current = newProgress;
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(animateProgress);
    }
  }, [animateProgress]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: currentDetails.timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };

      const formatter = new Intl.DateTimeFormat('en-US', options);
      setCurrentTime(formatter.format(new Date()));
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);
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
        
        // Listen for progress events
        experienceInstance.current.resources.on('progress', (group, resource, data) => {
          const progress = Math.round((group.loaded / group.toLoad) * 100);
          updateProgress(progress);
          setLoadingText(`Loading ${Math.round(currentProgressRef.current)}%`);
        });
        
        experienceInstance.current.resources.on('groupEnd', (group) => {
          if (group.name === 'base') {
            updateProgress(100);
            setLoadingText('Loading 100%');
            triggerSlideUp();
          }
        });
        
        experienceInstance.current.resume();
      } else {
        experienceInstance.current.setCanvas(canvasRef.current);
        experienceInstance.current.resume();
        if (modelLoaded) {
          setSlideUp(true);
          if (onLoadingDone) onLoadingDone();
        } else if (experienceInstance.current.resources?.on) {
          // Re-attach progress listeners
          experienceInstance.current.resources.on('progress', (group, resource, data) => {
            const progress = Math.round((group.loaded / group.toLoad) * 100);
            updateProgress(progress);
            setLoadingText(`LOADING ${Math.round(currentProgressRef.current)}%`);
          });
          
          experienceInstance.current.resources.on('groupEnd', (group) => {
            if (group.name === 'base') {
              updateProgress(100);
              setLoadingText('LOADING 100%');
              triggerSlideUp();
            }
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
          className={`loading-overlay ${slideUp ? 'slide-up' : ''}`}
        >
          <div className="loading-container">
            {/* Top Row - Name and Computer Image */}
            <div className="loading-top-row">
              {/* Name */}
              <div className="loading-name">
                <span>Saad</span>
                <span>Sifar.</span>
              </div>
              
              {/* Computer Image */}
              <div className="loading-computer-image">
                <img 
                  src="/computers/computer-1.webp" 
                  alt="Computer"
                />
                <svg
                  className="draw-svg"
                  width="60"
                  height="20"
                  viewBox="0 0 150 50"
                  fill="none"
                >
                  <path
                    d="M2 44.5C27.5 31 37.1632 3.00004 27 3.00004C17.5 0.500019 16 46.5 16 46.5C16 46.5 15.8647 25.5 28 25.5C40.1352 25.5 25.9092 45.8381 36.5 46.5C55.5 47.1576 66.5 26.5 55 24.5C43.9679 24.0587 42.2171 46.3381 57 47C78.5 47.9627 94 5.00001 83.5 3.00002C71.5 3.00003 67.7615 46.1175 81 47C96.5 48.0333 116 12.5 107 3.50002C96.5 -1.99999 88.5 45.5 103 47C106.125 47 111.5 46.5 118 34.5L118 34.5C120 23.5 128 24.5 128 24.5C137.5 25 136 35.5 136 35.5C135.5 43 131.599 47 125 47C116.5 46.5 118 34.5 118 34.5L118 34.5C118.667 30.6667 123.1 23.0755 129.5 24.6755C137.5 26.6755 139 30.5 146 24"
                    stroke="#4B4B4B"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
            
            {/* Bottom Row - Loading Text and Progress */}
            <div className="loading-bottom-row">
              {/* Loading Text */}
              <div className="loading-text">
                <span>
                  LOADING
                  <span className="loading-dots">{loadingDots}</span>
                </span>
              </div>
              
              {/* Progress Percentage */}
              <div className="loading-percentage">
                {loadingProgress}%
              </div>
            </div>
            
            {/* Progress Bar Row */}
            <div className="loading-progress-row">
              <div className="loading-progress-bar">
                <div 
                  className="loading-progress-fill"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
          <div className="loading-footer">
            <div className="loading-footer-left">
              <div className="loading-footer-left-text">
                Saad Sifar
              </div>
            </div>
            <div className="loading-footer-center">
              <div className="loading-footer-center-text">
                {currentTime}
              </div>
            </div>
            <div className="loading-footer-right">
              <div className="loading-footer-right-text">
                {currentDetails.cityLong}, {currentDetails.country}
              </div>
            </div>
          </div>
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