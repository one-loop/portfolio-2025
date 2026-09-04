'use client';
import React, { useState, useEffect } from 'react';
import './FooterMain.css';
import Link from 'next/link';
import MiniClock from './MiniClock';
import currentDetails from '../data/currentDetails';

const getIsGSTAvailable = () => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dubai',
      hour: 'numeric',
      hour12: false,
    });
    const hour = parseInt(formatter.format(new Date()), 10);
    return hour >= 9 && hour < 21;
  } catch (e) {
    const utcHours = new Date().getUTCHours();
    const gstHours = (utcHours + 4) % 24;
    return gstHours >= 9 && gstHours < 21;
  }
};

const FooterMain = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    setIsAvailable(getIsGSTAvailable());
    const interval = setInterval(() => {
      setIsAvailable(getIsGSTAvailable());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="main-footer">
      <div className="footer-left">
        <div className="footer-left-profile">
          <img src="/images/profile.jpeg" width="48px" height="48px" alt="Saad Sifar" className="footer-avatar" />
          <div className="footer-left-profile-text">
            <div className="footer-name-row">
              <h2>Saad Sifar</h2>
              <div 
                className={`glow-circle ${isAvailable ? 'glow-available' : 'glow-away'}`}
                title={isAvailable ? "Available (9 AM – 9 PM GST)" : "Away (Outside 9 AM – 9 PM GST)"}
                aria-label={isAvailable ? "Available (9 AM – 9 PM GST)" : "Away (Outside 9 AM – 9 PM GST)"}
              />
            </div>
            <div className="footer-meta-row">
              <span className="footer-location-item">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 5C10 7.4965 7.2305 10.0965 6.3005 10.8995C6.21386 10.9646 6.1084 10.9999 6 10.9999C5.8916 10.9999 5.78614 10.9646 5.6995 10.8995C4.7695 10.0965 2 7.4965 2 5C2 3.93913 2.42143 2.92172 3.17157 2.17157C3.92172 1.42143 4.93913 1 6 1C7.06087 1 8.07828 1.42143 8.82843 2.17157C9.57857 2.92172 10 3.93913 10 5Z" stroke="#F2F2F2" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z" stroke="#F2F2F2" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>{currentDetails.cityLong}, {currentDetails.countryLong}</h3>
              </span>
              <span className="footer-meta-divider">•</span>
              <span className="footer-clock-item">
                <MiniClock size={13} color="rgba(242, 242, 242, 0.65)" />
              </span>
            </div>
          </div>
        </div>
        <div className="copyright-statement">
          <h2>© 2026 Saad Sifar. All Rights Reserved.</h2>
          <p>Designed and built with care — fueled by croissants and caffeine.</p>
        </div>
      </div>


      <div className="footer-right">
        <div className="footer-main-links">
          <h3>Main</h3>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/photos">Photos</Link>
        </div>
        <div className="footer-contact-links">
          <h3>Connect</h3>
          <Link href="https://linkedin.com/in/saad-sifar" target="_blank" className="footer-right-external-link">LinkedIn <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="#F2F2F2" fillOpacity="0.5"/>
          </svg>
          </Link>
          <Link href="/sifar-resume.pdf" target="_blank" rel="nofollow noreferrer" className="footer-right-external-link">Resume <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="#F2F2F2" fillOpacity="0.5"/>
          </svg>
          </Link>
          
          <Link href="https://github.com/one-loop" target="_blank" className="footer-right-external-link">GitHub <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="#F2F2F2" fillOpacity="0.5"/>
          </svg>
          </Link>
          {/* <Link href="mailto:ss17886 AT nyu DOT edu" target="_blank" className="footer-right-external-link">Mail <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="#F2F2F2" fillOpacity="0.5"/>
</svg></Link> */}
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
