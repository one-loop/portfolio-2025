import React, { useEffect, useState } from 'react';
import currentDetails from '../data/currentDetails';

const MiniClock = ({ timeZone = currentDetails.timeZone, timeZoneShort = currentDetails.timeZoneShort, size = 20, color = '#858584' }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [clockTime, setClockTime] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };

      const formatter = new Intl.DateTimeFormat('en-US', options);
      setCurrentTime(formatter.format(now));

      const parts = new Intl.DateTimeFormat('en-US', { ...options, hour12: false }).formatToParts(now);
      let hour = 0, minute = 0, second = 0;
      for (const part of parts) {
        if (part.type === 'hour') hour = parseInt(part.value, 10);
        if (part.type === 'minute') minute = parseInt(part.value, 10);
        if (part.type === 'second') second = parseInt(part.value, 10);
      }
      if (hour >= 12) hour = hour - 12;
      setClockTime({ hour, minute, second });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  const getClockHandRotation = (value, maxValue) => (value / maxValue) * 360;

  const hourRotation = getClockHandRotation((clockTime.hour || 0) + (clockTime.minute || 0) / 60, 12);
  const minuteRotation = getClockHandRotation((clockTime.minute || 0) + (clockTime.second || 0) / 60, 60);
  const secondRotation = getClockHandRotation(clockTime.second || 0, 60);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span
        className="footer-clock"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          border: `1px solid ${color}`,
          position: 'relative',
          display: 'inline-block',
          marginRight: '8px',
          verticalAlign: 'middle',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1px',
            height: `${Math.max(5, Math.floor(size * 0.25))}px`,
            backgroundColor: color,
            borderRadius: '0.5px',
            transformOrigin: 'bottom center',
            transform: `translate(-50%, -100%) rotate(${hourRotation}deg)`,
            transition: 'transform 0.3s ease'
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1px',
            height: `${Math.max(7, Math.floor(size * 0.35))}px`,
            backgroundColor: color,
            borderRadius: '0.5px',
            transformOrigin: 'bottom center',
            transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)`,
            transition: 'transform 0.3s ease'
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '0.5px',
            height: `${Math.max(8, Math.floor(size * 0.4))}px`,
            backgroundColor: color,
            borderRadius: '0.25px',
            transformOrigin: 'bottom center',
            transform: `translate(-50%, -100%) rotate(${secondRotation}deg)`,
            transition: 'transform 0.1s ease'
          }}
        />
      </span>
      <span style={{ color }}>{currentTime} {timeZoneShort}</span>
    </span>
  );
};

export default MiniClock;


