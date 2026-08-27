// src/components/Navbar.js
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';
import currentDetails from '../data/currentDetails';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/photos', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const navRef = useRef(null);

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setHamburgerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setHamburgerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setHamburgerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const path = pathname;
    setActiveLink(path);

    // Only consider links inside .nav-center-links for desktop glow
    const activeLinkElement = document.querySelector(`.nav-center-links a[href="${path}"]`);
    const glow = document.querySelector('.nav-glow');
    if (activeLinkElement && glow) {
      if (isInitialRender) {
        glow.style.transition = 'none';
        moveGlow(activeLinkElement);
        setIsInitialRender(false);
        setTimeout(() => {
          glow.style.transition = 'left 0.3s ease, width 0.3s ease';
        }, 0);
        setTimeout(() => {
          moveGlow(activeLinkElement);
        }, 100);
      } else {
        moveGlow(activeLinkElement);
      }
    }

    const handleResize = () => {
      const activeLinkElement = document.querySelector(`.nav-center-links a[href="${path}"]`);
      if (activeLinkElement) moveGlow(activeLinkElement);
    };
    window.addEventListener('resize', handleResize);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        const activeLinkElement = document.querySelector(`.nav-center-links a[href="${path}"]`);
        if (activeLinkElement) moveGlow(activeLinkElement);
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname, isInitialRender]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const moveGlow = (element) => {
    const glow = document.querySelector('.nav-glow');
    if (!glow) return;
    const rect = element.getBoundingClientRect();
    const nav = element.closest('.nav-center');
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();

    glow.style.left = `${Math.round(rect.left - navRect.left)}px`;
    glow.style.width = `${Math.round(rect.width)}px`;
  };

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Desktop Left Brand */}
      <Link href="/" className="nav-left">
        <div className="video-icon-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="vid-icon-background">
            <video src="/videos/memoji.mov" alt="Profile Picture" muted autoPlay loop playsInline />
          </div>
        </div>
        <div className="nav-left-text">
          <h2>Saad Sifar</h2>
          <h3>CS @ NYU</h3>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5C10 7.4965 7.2305 10.0965 6.3005 10.8995C6.21386 10.9646 6.1084 10.9999 6 10.9999C5.8916 10.9999 5.78614 10.9646 5.6995 10.8995C4.7695 10.0965 2 7.4965 2 5C2 3.93913 2.42143 2.92172 3.17157 2.17157C3.92172 1.42143 4.93913 1 6 1C7.06087 1 8.07828 1.42143 8.82843 2.17157C9.57857 2.92172 10 3.93913 10 5Z" stroke="#F2F2F2" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z" stroke="#F2F2F2" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>{currentDetails.cityShort}</h3>
        </div>
      </Link>

      {/* Center Nav / Mobile Dropdown Card */}
      <div className={`nav-center ${hamburgerOpen ? 'mobile-open' : ''}`}>
        {/* Mobile Header Bar */}
        <div className="nav-center-header">
          <Link href="/" className="nav-center-left" onClick={() => setHamburgerOpen(false)}>
            <div className="nav-avatar-mini">
              <video src="/videos/memoji.mov" alt="Saad Sifar" muted autoPlay loop playsInline />
            </div>
            <div className="nav-center-text">
              <h2>Saad Sifar</h2>
              <div className="nav-center-sub">
                <h3>CS @ NYU</h3>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 5C10 7.4965 7.2305 10.0965 6.3005 10.8995C6.21386 10.9646 6.1084 10.9999 6 10.9999C5.8916 10.9999 5.78614 10.9646 5.6995 10.8995C4.7695 10.0965 2 7.4965 2 5C2 3.93913 2.42143 2.92172 3.17157 2.17157C3.92172 1.42143 4.93913 1 6 1C7.06087 1 8.07828 1.42143 8.82843 2.17157C9.57857 2.92172 10 3.93913 10 5Z" stroke="#F2F2F2" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z" stroke="#F2F2F2" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>{currentDetails.cityShort}</h3>
              </div>
            </div>
          </Link>

          <button
            type="button"
            className={`nav-center-right ${hamburgerOpen ? 'open' : ''}`}
            onClick={() => setHamburgerOpen(!hamburgerOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={hamburgerOpen}
          >
            <div className={`hamburger ${hamburgerOpen ? 'open' : ''}`}>
              <span className="line line1"></span>
              <span className="line line2"></span>
            </div>
          </button>
        </div>

        {/* Links List */}
        <div className="nav-center-links">
          {NAV_LINKS.map((link, index) => {
            const isActive = activeLink === link.href;
            return (
              <Link
                key={link.href}
                onClick={() => setHamburgerOpen(false)}
                href={link.href}
                data-index={index}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
                style={{ '--item-index': index }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Mobile Stacked Action Buttons */}
          <div className="mobile-nav-extra">
            <div className="mobile-nav-actions">
              <a
                href="https://www.linkedin.com/in/saad-sifar"
                target="_blank"
                rel="noreferrer"
                className="mobile-btn"
                onClick={() => setHamburgerOpen(false)}
              >
                <span>LinkedIn</span>
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="currentColor"/>
                </svg>
              </a>
              <a
                href="https://github.com/one-loop"
                target="_blank"
                rel="noreferrer"
                className="mobile-btn"
                onClick={() => setHamburgerOpen(false)}
              >
                <span>GitHub</span>
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="currentColor"/>
                </svg>
              </a>
              <a
                href="/sifar-resume.pdf"
                target="_blank"
                rel="nofollow noreferrer"
                className="mobile-btn"
                onClick={() => setHamburgerOpen(false)}
              >
                <span>Resume</span>
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Sliding Glow */}
        <span className="nav-glow"></span>
      </div>

      {/* Desktop Right Links */}
      <div className="nav-right">
        <div className="nav-right-link">
          <a href="https://www.linkedin.com/in/saad-sifar" target="_blank" rel="noreferrer">LinkedIn</a>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="#F2F2F2"/>
          </svg>
        </div>
        <div className="nav-right-link">
          <a href="/sifar-resume.pdf" target="_blank" rel="nofollow noreferrer">Resume</a>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="#F2F2F2"/>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
