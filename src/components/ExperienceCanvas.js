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
  const [clockTime, setClockTime] = useState(new Date());
  
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

  // Update current time and clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: currentDetails.timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      // Format the time string for display
      const formatter = new Intl.DateTimeFormat('en-US', { ...options, hour12: true });
      setCurrentTime(formatter.format(now));

      // Extract hour, minute, second in the target timezone for the clock hands
      const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
      let hour = 0, minute = 0, second = 0;
      for (const part of parts) {
        if (part.type === 'hour') hour = parseInt(part.value, 10);
        if (part.type === 'minute') minute = parseInt(part.value, 10);
        if (part.type === 'second') second = parseInt(part.value, 10);
      }
      // For 24-hour clocks, convert hour to 12-hour format for the clock face
      if (hour >= 12) hour = hour - 12;
      setClockTime({ hour, minute, second });
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  // Calculate clock hand rotations
  const getClockHandRotation = (value, maxValue) => {
    return (value / maxValue) * 360;
  };

  const hourRotation = getClockHandRotation(
    (clockTime.hour || 0) + (clockTime.minute || 0) / 60,
    12
  );
  const minuteRotation = getClockHandRotation(
    (clockTime.minute || 0) + (clockTime.second || 0) / 60,
    60
  );
  const secondRotation = getClockHandRotation(clockTime.second || 0, 60);

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
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="15.5" stroke="#878787"/>
                <path d="M23 9.5C23 9.9 19.6666 9.66667 18 9.5L17.5 8.5H15.5C15.1 8.5 14.5 8.83333 14 9C12.5 10.1667 9.79996 13.6 11 16C12.5 19 15.5 18 16 17.5C16.5 17 17 18.5 18 18C19 17.5 17 19.5 19 20.5C19.5 21.5 19.8333 22.3333 19.5 23.5C19.5 24.6667 20.2 27.5 21 27.5C22 27.5 24 27.5 25 24.5C25.9618 21.6147 26.5 24 26.5 22V19C27.1667 17.8333 28.4 15.3 28 14.5H27C25.8333 13.5 23.75 11.25 23.25 10.25C23.75 9.75 25.8333 12.6667 27 14C27.3333 13.6667 28 12.5 28.5 11.5C28.5 11 28.5 11 27.5 10.5C27.5 11.5 27 11 27 11L25.5 9L28 10H28.5C29.1667 11.3333 30.6 14 31 14C31.5 14 28.4999 1.5 17.5 1C17 1 17 2 17 2.5C17 3 16 3 16 3.5C16 3.9 16.3333 4 16.5 4V4.5C16.5 5 16 5.5 15.5 5.5C15.1 5.5 14.6666 5.83333 14.5 6L15 6.5C14.6666 6.66667 13.9 7 13.5 7C13 7 13 7.5 13 8.5C13.5 9.5 14.5 8.5 15 8.5C15.4 8.5 15.8333 7.33333 16 7H17H17.5L18.5 7.5V8H18L18.5 8.5L19 7.5L18 6.5C19 7 21.1 8.1 21.5 8.5C22 9 22 8 23 8C24 8 23 9 23 9.5Z" fill="#878787"/>
                <path d="M18 9.5L17.8882 9.5559L17.919 9.61752L17.9875 9.62438L18 9.5ZM21.5 8.5L21.4116 8.58839L21.4116 8.58839L21.5 8.5ZM18 6.5L18.0559 6.3882L17.9116 6.58839L18 6.5ZM16 7V6.875H15.9227L15.8882 6.9441L16 7ZM13 8.5H12.875V8.52951L12.8882 8.5559L13 8.5ZM15 6.5L15.0559 6.6118L15.211 6.53424L15.0884 6.41161L15 6.5ZM14.5 6L14.4116 5.91161L14.3232 6L14.4116 6.08839L14.5 6ZM16.5 4H16.625V3.875H16.5V4ZM17.5 1L17.5057 0.875H17.5V1ZM17.5 8.5L17.6118 8.4441L17.5772 8.375H17.5V8.5ZM14 9L13.9605 8.88141L13.9402 8.88819L13.9233 8.90133L14 9ZM11 16L11.1118 15.9441L11.1118 15.9441L11 16ZM19 20.5L19.1118 20.4441L19.0932 20.4068L19.0559 20.3882L19 20.5ZM19.5 23.5L19.3798 23.4657L19.375 23.4825V23.5H19.5ZM25 24.5L24.8814 24.4605L25 24.5ZM26.5 19L26.3915 18.938L26.375 18.9668V19H26.5ZM28 14.5L28.1118 14.4441L28.0773 14.375H28V14.5ZM27 14.5L26.9187 14.5949L26.9538 14.625H27V14.5ZM23.25 10.25L23.1616 10.1616L23.0979 10.2253L23.1382 10.3059L23.25 10.25ZM27 14L26.9059 14.0823L26.9939 14.1829L27.0884 14.0884L27 14ZM28.5 11.5L28.6118 11.5559L28.625 11.5295V11.5H28.5ZM27.5 10.5L27.5559 10.3882L27.375 10.2977V10.5H27.5ZM27 11L26.9 11.075L26.9053 11.0821L26.9116 11.0884L27 11ZM25.5 9L25.5464 8.88394C25.4944 8.86313 25.4349 8.87949 25.4008 8.92396C25.3667 8.96844 25.3664 9.03017 25.4 9.075L25.5 9ZM28.5 10L28.6118 9.9441L28.5773 9.875H28.5V10ZM18.5 7.5H18.625V7.42275L18.5559 7.3882L18.5 7.5ZM17.5 7L17.5559 6.8882L17.5295 6.875H17.5V7ZM19 7.5L19.1118 7.5559L19.1521 7.47532L19.0884 7.41161L19 7.5ZM28 10L27.9536 10.1161L27.9759 10.125H28V10ZM18.5 8.5L18.4116 8.58839L18.5342 8.71102L18.6118 8.5559L18.5 8.5ZM18 8V7.875H17.6982L17.9116 8.08839L18 8ZM18.5 8V8.125H18.625V8H18.5ZM18 9.5L17.9875 9.62438C18.8225 9.70787 20.0757 9.80817 21.1215 9.83745C21.6435 9.85207 22.1184 9.84914 22.4648 9.81664C22.6367 9.80051 22.7849 9.77644 22.8931 9.74022C22.9467 9.7223 22.9995 9.69853 23.0411 9.66466C23.0844 9.62938 23.125 9.57446 23.125 9.5H23H22.875C22.875 9.47554 22.8895 9.46567 22.8832 9.47084C22.8751 9.47741 22.8546 9.48949 22.8138 9.50314C22.7333 9.53007 22.6081 9.5521 22.4414 9.56773C22.1107 9.59877 21.6481 9.6021 21.1285 9.58755C20.0909 9.5585 18.8441 9.45879 18.0124 9.37562L18 9.5ZM23 9.5H23.125C23.125 9.40719 23.174 9.27528 23.2535 9.10843C23.327 8.95404 23.4268 8.76961 23.491 8.60892C23.524 8.52658 23.5514 8.442 23.5631 8.3607C23.5749 8.27966 23.5725 8.19225 23.5353 8.11168C23.4555 7.93868 23.2592 7.875 23 7.875V8V8.125C23.2407 8.125 23.2945 8.18632 23.3084 8.21644C23.318 8.23744 23.3235 8.27112 23.3157 8.32484C23.308 8.37832 23.2885 8.44217 23.2589 8.51608C23.1982 8.66789 23.1105 8.82721 23.0277 9.00095C22.9509 9.16222 22.875 9.34281 22.875 9.5H23ZM23 8V7.875C22.4469 7.875 22.1655 8.15765 21.9741 8.34911C21.926 8.39723 21.8878 8.43524 21.8517 8.46458C21.8159 8.49377 21.7907 8.50706 21.7718 8.51222C21.7507 8.51798 21.7015 8.52471 21.5884 8.41161L21.5 8.5L21.4116 8.58839C21.5485 8.72529 21.6868 8.79452 21.8376 8.75341C21.9046 8.73512 21.9614 8.69764 22.0095 8.65847C22.0575 8.61945 22.1052 8.57152 22.1509 8.52589C22.3344 8.34235 22.5531 8.125 23 8.125V8ZM21.5 8.5L21.5884 8.41161C21.4767 8.29999 21.2585 8.14931 20.991 7.98292C20.7197 7.81415 20.3864 7.62237 20.0355 7.42814C19.3336 7.03957 18.557 6.63874 18.0559 6.3882L18 6.5L17.9441 6.6118C18.443 6.86126 19.2164 7.26043 19.9144 7.64686C20.2636 7.84013 20.5928 8.0296 20.8589 8.1952C21.129 8.36319 21.3232 8.50001 21.4116 8.58839L21.5 8.5ZM17 7V6.875H16V7V7.125H17V7ZM16 7L15.8882 6.9441C15.845 7.03046 15.7844 7.17108 15.7157 7.32371C15.6457 7.47924 15.5648 7.65311 15.4774 7.81582C15.3893 7.97963 15.2976 8.12637 15.2072 8.23055C15.1113 8.34097 15.0415 8.375 15 8.375V8.5V8.625C15.1585 8.625 15.2929 8.5132 15.396 8.39445C15.5045 8.26946 15.6065 8.1037 15.6976 7.93418C15.7893 7.76355 15.873 7.58326 15.9437 7.42629C16.0156 7.26642 16.0716 7.1362 16.1118 7.0559L16 7ZM15 8.5V8.375C14.8433 8.375 14.6623 8.45087 14.4952 8.52683C14.3172 8.60771 14.1397 8.69666 13.9605 8.75641C13.7818 8.81597 13.6227 8.83854 13.486 8.80128C13.3559 8.7658 13.2247 8.66995 13.1118 8.4441L13 8.5L12.8882 8.5559C13.0253 8.83005 13.2066 8.9842 13.4202 9.04247C13.6274 9.09896 13.8432 9.05903 14.0395 8.99359C14.2353 8.92834 14.4328 8.82979 14.5986 8.75442C14.7753 8.67413 14.9067 8.625 15 8.625V8.5ZM13 8.5H13.125C13.125 7.9922 13.126 7.63657 13.1838 7.40532C13.2119 7.2927 13.25 7.22629 13.294 7.18718C13.3355 7.15031 13.3966 7.125 13.5 7.125V7V6.875C13.3534 6.875 13.2271 6.91219 13.1279 7.00032C13.0313 7.08621 12.9756 7.2073 12.9412 7.34468C12.8741 7.61343 12.875 8.0078 12.875 8.5H13ZM13.5 7V7.125C13.7245 7.125 14.0348 7.03397 14.3181 6.92982C14.6065 6.82381 14.8857 6.69687 15.0559 6.6118L15 6.5L14.9441 6.3882C14.7809 6.4698 14.5102 6.59286 14.2319 6.69518C13.9485 6.79936 13.6755 6.875 13.5 6.875V7ZM15 6.5L15.0884 6.41161L14.5884 5.91161L14.5 6L14.4116 6.08839L14.9116 6.58839L15 6.5ZM14.5 6L14.5884 6.08839C14.6647 6.01208 14.8062 5.89389 14.9753 5.79556C15.1462 5.69621 15.3319 5.625 15.5 5.625V5.5V5.375C15.2681 5.375 15.0371 5.47046 14.8496 5.57944C14.6604 5.68945 14.5019 5.82125 14.4116 5.91161L14.5 6ZM15.5 5.5V5.625C15.7906 5.625 16.0708 5.48093 16.2759 5.27589C16.4809 5.07085 16.625 4.79065 16.625 4.5H16.5H16.375C16.375 4.70935 16.269 4.92915 16.0991 5.09911C15.9291 5.26907 15.7093 5.375 15.5 5.375V5.5ZM16.5 4.5H16.625V4H16.5H16.375V4.5H16.5ZM16.5 4V3.875C16.4366 3.875 16.3389 3.85497 16.2605 3.79856C16.1885 3.74673 16.125 3.65926 16.125 3.5H16H15.875C15.875 3.74074 15.9781 3.90327 16.1144 4.00144C16.2444 4.09503 16.3966 4.125 16.5 4.125V4ZM16 3.5H16.125C16.125 3.42439 16.16 3.36272 16.2362 3.29915C16.3166 3.23216 16.4273 3.17607 16.5559 3.1118C16.6773 3.05107 16.8166 2.98216 16.9237 2.8929C17.035 2.80022 17.125 2.67439 17.125 2.5H17H16.875C16.875 2.57561 16.84 2.63728 16.7637 2.70085C16.6833 2.76784 16.5726 2.82393 16.4441 2.8882C16.3226 2.94893 16.1833 3.01784 16.0762 3.1071C15.965 3.19978 15.875 3.32561 15.875 3.5H16ZM17 2.5H17.125C17.125 2.24747 17.1254 1.88522 17.185 1.58701C17.215 1.43734 17.2576 1.31619 17.3137 1.23521C17.3665 1.15898 17.4252 1.125 17.5 1.125V1V0.875C17.3247 0.875 17.196 0.966025 17.1081 1.09291C17.0236 1.21506 16.9725 1.37516 16.9399 1.53799C16.8745 1.86478 16.875 2.25253 16.875 2.5H17ZM18 9.5L18.1118 9.4441L17.6118 8.4441L17.5 8.5L17.3882 8.5559L17.8882 9.5559L18 9.5ZM17.5 8.5V8.375H15.5V8.5V8.625H17.5V8.5ZM15.5 8.5V8.375C15.273 8.375 15.0021 8.46786 14.7414 8.57131C14.4701 8.67896 14.2065 8.7994 13.9605 8.88141L14 9L14.0395 9.11859C14.2935 9.03393 14.5799 8.90437 14.8336 8.80369C15.0979 8.69881 15.327 8.625 15.5 8.625V8.5ZM14 9L13.9233 8.90133C13.1597 9.49518 12.0985 10.6584 11.3778 11.9776C10.6599 13.2916 10.2597 14.799 10.8882 16.0559L11 16L11.1118 15.9441C10.5402 14.801 10.8901 13.3917 11.5972 12.0974C12.3015 10.8083 13.3403 9.67149 14.0767 9.09867L14 9ZM11 16L10.8882 16.0559C11.6594 17.5983 12.8256 18.1222 13.8672 18.1873C14.3845 18.2196 14.8686 18.1388 15.256 18.0177C15.6387 17.8982 15.9424 17.7343 16.0884 17.5884L16 17.5L15.9116 17.4116C15.8076 17.5157 15.5488 17.6643 15.1815 17.7791C14.8189 17.8924 14.3655 17.9679 13.8828 17.9377C12.9243 17.8778 11.8406 17.4017 11.1118 15.9441L11 16ZM16 17.5L16.0884 17.5884C16.1355 17.5413 16.1734 17.5262 16.2038 17.5225C16.236 17.5185 16.2761 17.5254 16.3296 17.5506C16.3837 17.5761 16.4436 17.6164 16.5128 17.6695C16.5831 17.7235 16.6525 17.7821 16.7344 17.8476C16.8917 17.9734 17.0789 18.1115 17.2978 18.1816C17.5232 18.2537 17.7757 18.2519 18.0559 18.1118L18 18L17.9441 17.8882C17.7243 17.9981 17.5394 17.9963 17.374 17.9434C17.2023 17.8885 17.0458 17.7766 16.8906 17.6524C16.8163 17.5929 16.7372 17.5265 16.665 17.4711C16.5916 17.4148 16.5147 17.3614 16.436 17.3244C16.3567 17.2871 16.2679 17.2627 16.1732 17.2744C16.0766 17.2863 15.9896 17.3337 15.9116 17.4116L16 17.5ZM18 18L18.0559 18.1118C18.1155 18.082 18.1594 18.0639 18.1909 18.0541C18.2252 18.0436 18.2321 18.0471 18.2241 18.0455C18.2043 18.0417 18.1835 18.0248 18.1756 18.0043C18.172 17.9951 18.1759 17.9972 18.1727 18.0245C18.1665 18.0773 18.1434 18.1567 18.1088 18.2716C18.0758 18.3814 18.0354 18.5146 18.003 18.6604C17.9383 18.9513 17.9022 19.3058 18.0223 19.6576C18.144 20.0139 18.4197 20.3496 18.9441 20.6118L19 20.5L19.0559 20.3882C18.5803 20.1504 18.356 19.8611 18.2589 19.5768C18.1603 19.288 18.1867 18.9862 18.247 18.7146C18.2771 18.5792 18.3148 18.4546 18.3482 18.3436C18.38 18.2378 18.4116 18.1336 18.421 18.0537C18.4256 18.0145 18.4276 17.9629 18.4089 17.9144C18.3859 17.8546 18.3367 17.8128 18.2721 17.8002C18.2191 17.7898 18.1645 17.8007 18.1172 17.8152C18.0672 17.8307 18.0095 17.8555 17.9441 17.8882L18 18ZM19 20.5L18.8882 20.5559C19.3854 21.5503 19.6995 22.3466 19.3798 23.4657L19.5 23.5L19.6202 23.5343C19.9671 22.32 19.6146 21.4497 19.1118 20.4441L19 20.5ZM19.5 23.5H19.375C19.375 24.1001 19.5534 25.1134 19.831 25.9758C19.9699 26.4073 20.1362 26.8091 20.3222 27.1055C20.4152 27.2536 20.5163 27.3807 20.6258 27.472C20.7355 27.5634 20.8614 27.625 21 27.625V27.5V27.375C20.9386 27.375 20.8676 27.348 20.7859 27.2799C20.704 27.2117 20.6192 27.1083 20.534 26.9726C20.3638 26.7014 20.2051 26.3218 20.069 25.8992C19.7966 25.0532 19.625 24.0666 19.625 23.5H19.5ZM21 27.5V27.625C21.4996 27.625 22.2768 27.6263 23.0559 27.2368C23.8403 26.8446 24.6099 26.0655 25.1186 24.5395L25 24.5L24.8814 24.4605C24.3901 25.9345 23.6597 26.6554 22.9441 27.0132C22.2232 27.3737 21.5004 27.375 21 27.375V27.5ZM25 24.5L25.1186 24.5395C25.3574 23.8232 25.565 23.4501 25.7344 23.2555C25.8178 23.1597 25.8899 23.1095 25.9497 23.0818C26.0092 23.0544 26.0635 23.0459 26.1177 23.0428C26.147 23.0412 26.1719 23.0412 26.2036 23.0404C26.2326 23.0397 26.2667 23.0383 26.3009 23.0322C26.3775 23.0186 26.4516 22.9816 26.5063 22.8958C26.5543 22.8204 26.5818 22.7156 26.599 22.5789C26.6166 22.4394 26.625 22.2518 26.625 22H26.5H26.375C26.375 22.2482 26.3666 22.4236 26.351 22.5477C26.335 22.6746 26.3129 22.7341 26.2955 22.7614C26.2847 22.7784 26.2773 22.7825 26.2571 22.7861C26.2428 22.7886 26.2246 22.7898 26.1975 22.7905C26.173 22.7911 26.1381 22.7913 26.1037 22.7932C26.0305 22.7973 25.9424 22.8098 25.8448 22.8549C25.7477 22.8998 25.6482 22.9737 25.5458 23.0913C25.3438 23.3235 25.1235 23.7342 24.8814 24.4605L25 24.5ZM26.5 22H26.625V19H26.5H26.375V22H26.5ZM26.5 19L26.6085 19.062C26.9439 18.4751 27.422 17.5443 27.7665 16.6578C27.9387 16.2148 28.0791 15.7787 28.1509 15.3998C28.2214 15.0282 28.2316 14.6837 28.1118 14.4441L28 14.5L27.8882 14.5559C27.9684 14.7163 27.9745 14.9885 27.9053 15.3533C27.8375 15.7109 27.703 16.131 27.5335 16.5672C27.1947 17.439 26.7227 18.3583 26.3915 18.938L26.5 19ZM28 14.5V14.375H27V14.5V14.625H28V14.5ZM27 14.5L27.0813 14.4051C26.5035 13.9098 25.6949 13.1015 24.968 12.2915C24.238 11.478 23.6033 10.677 23.3618 10.1941L23.25 10.25L23.1382 10.3059C23.3967 10.823 24.0537 11.647 24.782 12.4585C25.5134 13.2735 26.3299 14.0902 26.9187 14.5949L27 14.5ZM23.25 10.25L23.3384 10.3384C23.3547 10.3221 23.3852 10.305 23.4685 10.3319C23.5543 10.3595 23.6672 10.4266 23.8054 10.5356C24.0796 10.752 24.4169 11.1038 24.7809 11.5198C25.1437 11.9344 25.5277 12.4066 25.8951 12.8599C26.2616 13.3122 26.6123 13.7468 26.9059 14.0823L27 14L27.0941 13.9177C26.8043 13.5866 26.4572 13.1565 26.0893 12.7026C25.7223 12.2497 25.3355 11.7739 24.9691 11.3552C24.6039 10.9378 24.2538 10.571 23.9602 10.3394C23.8145 10.2244 23.6736 10.1353 23.5452 10.0939C23.4142 10.0517 23.2703 10.0529 23.1616 10.1616L23.25 10.25ZM27 14L27.0884 14.0884C27.268 13.9088 27.5254 13.52 27.7951 13.0636C28.0677 12.6023 28.3607 12.0581 28.6118 11.5559L28.5 11.5L28.3882 11.4441C28.1393 11.9419 27.849 12.481 27.5799 12.9364C27.3079 13.3967 27.0653 13.7579 26.9116 13.9116L27 14ZM28.5 11.5H28.625C28.625 11.2601 28.6307 11.079 28.4634 10.9116C28.3879 10.8361 28.2811 10.7667 28.1388 10.6876C27.9953 10.6078 27.8049 10.5127 27.5559 10.3882L27.5 10.5L27.4441 10.6118C27.6951 10.7373 27.8797 10.8297 28.0174 10.9061C28.1564 10.9833 28.2371 11.0389 28.2866 11.0884C28.3693 11.171 28.375 11.2399 28.375 11.5H28.5ZM27.5 10.5H27.375C27.375 10.7436 27.3439 10.8765 27.3101 10.9441C27.294 10.9761 27.2798 10.9888 27.2725 10.9937C27.2659 10.998 27.2594 11 27.25 11C27.2251 11 27.1881 10.9856 27.1475 10.9585C27.1292 10.9463 27.1137 10.9339 27.1028 10.9246C27.0975 10.92 27.0934 10.9163 27.0909 10.914C27.0897 10.9128 27.0888 10.912 27.0884 10.9116C27.0882 10.9114 27.088 10.9113 27.088 10.9113C27.0881 10.9113 27.0881 10.9113 27.0881 10.9114C27.0882 10.9114 27.0882 10.9114 27.0882 10.9115C27.0883 10.9115 27.0883 10.9115 27.0883 10.9115C27.0884 10.9116 27.0884 10.9116 27 11C26.9116 11.0884 26.9117 11.0884 26.9117 11.0885C26.9117 11.0885 26.9118 11.0885 26.9118 11.0886C26.9119 11.0887 26.912 11.0887 26.9121 11.0888C26.9122 11.089 26.9124 11.0892 26.9127 11.0895C26.9132 11.0899 26.9138 11.0905 26.9145 11.0912C26.916 11.0926 26.9179 11.0945 26.9203 11.0968C26.9251 11.1012 26.9318 11.1073 26.9401 11.1144C26.9566 11.1286 26.9802 11.1475 27.0088 11.1665C27.0619 11.2019 27.1499 11.25 27.25 11.25C27.3031 11.25 27.3591 11.2364 27.4111 11.2017C27.4624 11.1675 27.5028 11.1176 27.5337 11.0559C27.5936 10.936 27.625 10.7564 27.625 10.5H27.5ZM27 11L27.1 10.925L25.6 8.925L25.5 9L25.4 9.075L26.9 11.075L27 11ZM28.5 10L28.3882 10.0559C28.7223 10.7241 29.2487 11.7268 29.7423 12.5635C29.9889 12.9814 30.229 13.3609 30.434 13.637C30.5362 13.7747 30.6324 13.8904 30.7186 13.973C30.7616 14.0143 30.8051 14.0502 30.8484 14.0765C30.8899 14.1018 30.9422 14.125 31 14.125V14V13.875C31.0078 13.875 31.0021 13.8774 30.9783 13.8629C30.9563 13.8495 30.9273 13.8269 30.8916 13.7926C30.8202 13.7241 30.7336 13.6212 30.6348 13.488C30.4377 13.2225 30.2028 12.8519 29.9577 12.4365C29.468 11.6065 28.9444 10.6092 28.6118 9.9441L28.5 10ZM31 14V14.125C31.0982 14.125 31.1404 14.044 31.1539 14.007C31.1694 13.9645 31.175 13.9135 31.1766 13.8633C31.1798 13.7598 31.1663 13.6162 31.138 13.4419C31.0811 13.0911 30.9601 12.5945 30.7673 12.0005C30.3816 10.8119 29.7054 9.22366 28.6674 7.61959C26.5915 4.41135 23.0595 1.12758 17.5057 0.875129L17.5 1L17.4943 1.12487C22.9405 1.37242 26.4084 4.58865 28.4575 7.75541C29.4821 9.33884 30.1496 10.9069 30.5295 12.0776C30.7196 12.6633 30.8369 13.1472 30.8913 13.482C30.9186 13.6504 30.9291 13.7758 30.9267 13.8557C30.9254 13.8972 30.9208 13.9164 30.9191 13.9212C30.9153 13.9316 30.9331 13.875 31 13.875V14ZM18.5 7.5L18.5559 7.3882L17.5559 6.8882L17.5 7L17.4441 7.1118L18.4441 7.6118L18.5 7.5ZM17.5 7V6.875H17V7V7.125H17.5V7ZM18 6.5L17.9116 6.58839L18.9116 7.58839L19 7.5L19.0884 7.41161L18.0884 6.41161L18 6.5ZM25.5 9L25.4536 9.11606L27.9536 10.1161L28 10L28.0464 9.88394L25.5464 8.88394L25.5 9ZM28 10V10.125H28.5V10V9.875H28V10ZM19 7.5L18.8882 7.4441L18.3882 8.4441L18.5 8.5L18.6118 8.5559L19.1118 7.5559L19 7.5ZM18.5 8.5L18.5884 8.41161L18.0884 7.91161L18 8L17.9116 8.08839L18.4116 8.58839L18.5 8.5ZM18 8V8.125H18.5V8V7.875H18V8ZM18.5 8H18.625V7.5H18.5H18.375V8H18.5Z" fill="#878787"/>
                <path d="M15.5 5.00014C15.5 5.5 15 5.5 14.5 5.5V5.00025L14 5.5L13.5 5.50025C13.5 5.50025 13.4382 5.18539 13.5 5.00008C13.5618 4.81478 14.4383 4.68522 14.5 4.5C14.5617 4.31478 14.5 4.00008 14.5 4.00008C14.5 3.66675 15 3.60026 15 4.00026C15 4.50008 15 4.50008 15.4995 4.99961L15.5 5.00014Z" fill="#878787" stroke="#878787" stroke-width="0.25" stroke-linejoin="round"/>
                <path d="M6.00004 25L6.50004 28C6.00003 27.8333 4.5 26.7 2.5 23.5C0 19.5 0.5 16 2 9.5C3.2 4.3 10.8333 1.33333 14.5 0.5C14.6667 0.666667 15 1.2 15 2C15 3 11 3.5 10 4C9 4.5 9.5 4 9 4C8.5 4 7.5 6 7 7C6.5 8 7 6.5 6 6.5C5 6.5 3.5 9.5 2.5 11C1.7 12.2 1.5 13.5 1.5 14C1.83333 14.1667 2.5 14.6 2.5 15C2.5 15.4 2.83333 16.1667 3 16.5C3.8 16.9 4 18 4 18.5C5.5 20 5.5 19.5 6.5 20.5C7 22.5 6.5 21.5 6 22.5C6.4 23.7 6.1667 24.6667 6.00004 25Z" fill="#878787" stroke="#878787" stroke-width="0.25" stroke-linejoin="round"/>
                <path d="M27.9999 23.0006C27.4999 24.0001 27.3415 24.4091 26.9999 24.5006C26.6584 24.592 26.5999 23.9004 26.9999 23.5004C27.4999 23.0004 26.9999 22.5001 27.4999 22.5001C27.9998 22.0005 27.9999 22.0003 28.4996 21.0005L28.4999 21C28.4999 21.5 28.4999 22.0004 27.9999 23.0006Z" fill="#878787" stroke="#878787" stroke-width="0.25" stroke-linejoin="round"/>
              </svg>
              <div className="loading-footer-left-text">
                {currentDetails.cityLong}, {currentDetails.country}
              </div>
            </div>
            <div className="loading-footer-center">
              <div className="loading-footer-center-text">
                <div 
                  className="footer-clock"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '1px solid #858584',
                    position: 'relative',
                    display: 'inline-block',
                    marginRight: '8px',
                    verticalAlign: 'middle',
                  }}
                >
                  {/* Hour Hand */}
                  <div 
                    className="footer-hour"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '1px',
                      height: '5px',
                      backgroundColor: '#858584',
                      borderRadius: '0.5px',
                      transformOrigin: 'bottom center',
                      transform: `translate(-50%, -100%) rotate(${hourRotation}deg)`,
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  {/* Minute Hand */}
                  <div 
                    className="footer-minute"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '1px',
                      height: '7px',
                      backgroundColor: '#858584',
                      borderRadius: '0.5px',
                      transformOrigin: 'bottom center',
                      transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)`,
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  {/* Second Hand */}
                  <div 
                    className="footer-second"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '0.5px',
                      height: '8px',
                      backgroundColor: '#858584',
                      borderRadius: '0.25px',
                      transformOrigin: 'bottom center',
                      transform: `translate(-50%, -100%) rotate(${secondRotation}deg)`,
                      transition: 'transform 0.1s ease'
                    }}
                  />
                </div>
                {currentTime} {currentDetails.timeZoneShort}
              </div>
            </div>
            <div className="loading-footer-right">
              <div className="loading-footer-right-text">
                engineering • research • design
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