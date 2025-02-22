// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; // Assuming you're using React Router
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false); // new state
  const [isInitialRender, setIsInitialRender] = useState(true); // New flag

  useEffect(() => {
    // Set the active link based on the current path
    const path = location.pathname;
    setActiveLink(path);

    // Only consider links inside .nav-center-links
    const activeLinkElement = document.querySelector(`.nav-center-links a[href="${path}"]`);
    const glow = document.querySelector('.nav-glow');
    if (activeLinkElement && glow) {
      if (isInitialRender) {
        // Disable transition on initial load so glow appears in place
        glow.style.transition = 'none';
        moveGlow(activeLinkElement);
        setIsInitialRender(false);
        // Re-enable transition on next tick
        setTimeout(() => {
          glow.style.transition = 'left 0.3s ease';
        }, 0);
      } else {
        moveGlow(activeLinkElement);
      }
    }
  }, [location, isInitialRender]);

  useEffect(() => {
    // Add scroll event listener to toggle blur
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const moveGlow = (element) => {
    // Logic to move the glow based on the element's position
    const glow = document.querySelector('.nav-glow'); // Assuming your glow element has this ID
    if (!glow) return;
    const rect = element.getBoundingClientRect();
    const navRect = element.closest('nav').getBoundingClientRect(); // Ensure it's relative to the nav

    // console.log(`${rect.left} - ${glowRect.left}`);
    // glow.style.left = `${rect.left  - glowRect.left}px`;
    glow.style.left = `${Math.round(rect.left - navRect.left)}px`;
    glow.style.width = `${Math.round(rect.width)}px`;
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-left">
        <img src="logo.png" width="48px" alt="Profile Picture" />
        <div className="nav-left-text">
          <h2>Saad Sifar</h2>
          <h3>CS @ NYU</h3>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 5C10 7.4965 7.2305 10.0965 6.3005 10.8995C6.21386 10.9646 6.1084 10.9999 6 10.9999C5.8916 10.9999 5.78614 10.9646 5.6995 10.8995C4.7695 10.0965 2 7.4965 2 5C2 3.93913 2.42143 2.92172 3.17157 2.17157C3.92172 1.42143 4.93913 1 6 1C7.06087 1 8.07828 1.42143 8.82843 2.17157C9.57857 2.92172 10 3.93913 10 5Z" stroke="#F2F2F2" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z" stroke="#F2F2F2" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>Paris</h3>
        </div>
      </Link>
      <nav className={`nav-center ${hamburgerOpen ? 'mobile-open' : ''}`}>
        <div className="nav-center-left">
          <img src="logo.png" width="48px" alt="Profile Picture" />

          <div className="nav-center-text">
            <h2>Saad Sifar</h2>
            <h3>CS @ NYU</h3>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5C10 7.4965 7.2305 10.0965 6.3005 10.8995C6.21386 10.9646 6.1084 10.9999 6 10.9999C5.8916 10.9999 5.78614 10.9646 5.6995 10.8995C4.7695 10.0965 2 7.4965 2 5C2 3.93913 2.42143 2.92172 3.17157 2.17157C3.92172 1.42143 4.93913 1 6 1C7.06087 1 8.07828 1.42143 8.82843 2.17157C9.57857 2.92172 10 3.93913 10 5Z" stroke="#F2F2F2" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z" stroke="#F2F2F2" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>Paris</h3>
          </div>
        </div>
        <div className="nav-center-links">
          <Link onClick={() => setHamburgerOpen(false)} to="/" data-index="0" className={activeLink === '/' ? 'active' : ''}>Home</Link>
          <Link onClick={() => setHamburgerOpen(false)} to="/about" data-index="1" className={activeLink === '/about' ? 'active' : ''}>About</Link>
          <Link onClick={() => setHamburgerOpen(false)} to="/projects" data-index="2" className={activeLink === '/projects' ? 'active' : ''}>Projects</Link>
          <Link onClick={() => setHamburgerOpen(false)} to="/experience" data-index="3" className={activeLink === '/experience' ? 'active' : ''}>Experience</Link>
          <Link onClick={() => setHamburgerOpen(false)} to="/contact" data-index="4" className={activeLink === '/contact' ? 'active' : ''}>Contact</Link>
        </div>
        <span className="nav-glow"></span>
        <div className="nav-center-right" onClick={() => setHamburgerOpen(!hamburgerOpen)}>
          <div className={`hamburger ${hamburgerOpen ? 'open' : ''}`}>
            <span className="line line1"></span>
            <span className="line line2"></span>
          </div>
        </div>
      </nav>
      <div className="nav-right">
        <div className="nav-right-link">
          <a href="https://www.linkedin.com/in/saad-sifar" target="_blank">LinkedIn</a>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="#F2F2F2"/>
          </svg>
        </div>
        <div className="nav-right-link">
          <a href="/resume.pdf" target="_blank">Resume</a>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="#F2F2F2"/>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
