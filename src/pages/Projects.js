import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import FooterMain from '../components/FooterMain';

const Projects = () => {

  useEffect(() => {
    // hide the title when then user scrolls down
    const title = document.querySelector('.projects-title');
    const handleScroll = () => {
      if (window.scrollY > 200) {
        title.classList.add('hide');
      } else {
        title.classList.remove('hide');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className="gradient projects">
        {/* <div className="wip-bnaner">This page is currently under construction, but please do visit again soon!</div> */}
          <div className="showcase-grid">
            <div
              className="grid-item item1"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/projectthumbnails/focusboost.webp)` }}
            >
              <div className="grid-item-header-overlay">
                <h1>FocusBoost.</h1>
                <p>A VR Learning Platform designed for children with ADHD</p>
              </div>
              <div className="grid-item-overlay">
                <Link to="/under-construction" className="read-more-button">Read More
                  <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.799161 6.5118L0.799161 5.3981H14.0044L10.1065 1.50018L10.9019 0.704683L16.1522 5.95495L10.9019 11.2052L10.1065 10.4097L14.0044 6.5118H0.799161Z" fill="white"/>
                  </svg>
                </Link>
                <Link to="https://github.com/one-loop/FocusBoostVR-" target="_blank" className="github-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1618_378)">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C12.1384 15.0543 13.5187 14.0337 14.4964 12.672C15.4741 11.3104 16 9.67631 16 8C16 3.58 12.42 0 8 0Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1618_378">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </Link>
              </div>
            </div>
            <div
              className="grid-item item2"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(22, 22, 22, 0.8)), url(${process.env.PUBLIC_URL}/projectthumbnails/storefront.webp)` }}
            >
              <div className="grid-item-header-overlay">
                <h1>StoreFront.</h1>
                <p>A platform that helps small businesses create online stores, showcase products, and reach more customers.</p>
              </div>
              <div className="grid-item-overlay">
                <Link to="/under-construction" className="read-more-button" style={{"visibility": "hidden"}}>Read More
                  <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.799161 6.5118L0.799161 5.3981H14.0044L10.1065 1.50018L10.9019 0.704683L16.1522 5.95495L10.9019 11.2052L10.1065 10.4097L14.0044 6.5118H0.799161Z" fill="white"/>
                  </svg>
                </Link>
                <Link to="https://github.com/one-loop/storefront" target="_blank" className="github-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1618_378)">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C12.1384 15.0543 13.5187 14.0337 14.4964 12.672C15.4741 11.3104 16 9.67631 16 8C16 3.58 12.42 0 8 0Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1618_378">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </Link>
              </div>
            </div>
            <div
              className="grid-item item3"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/projectthumbnails/redlookit.webp)` }}
            >
              <div className="grid-item-header-overlay">
                <h1>Redlookit.</h1>
                <p>A Reddit wrapper-client, created to simulate the UI and look of Microsoft Outlook’s mail client</p>
                <br></br>
                <p>150k+ Users • 50+ GitHub Stars</p>
              </div>
              <div className="grid-item-overlay">
                <a href="https://one-loop.github.io/redlookit/" target="_blank" rel="noopener noreferrer" className="visit-site-button">Visit Site
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.7875 11.25L0 10.4625L9.3375 1.125L3.825 1.125V0L11.25 0V7.425H10.125V1.9125L0.7875 11.25Z" fill="white"/>
                  </svg>
                </a>
                <a className="github-button" href="https://github.com/one-loop/redlookit" target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1618_378)">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C12.1384 15.0543 13.5187 14.0337 14.4964 12.672C15.4741 11.3104 16 9.67631 16 8C16 3.58 12.42 0 8 0Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1618_378">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </a>
              </div>
            </div>
            <div
              className="grid-item item4"
              style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(22, 22, 22, 0.6)), url(${process.env.PUBLIC_URL}/projectthumbnails/portfolio.webp)` }}
            >
              <div className="grid-item-header-overlay">
                <h1>2025 Port<i>folio</i></h1>
                <img src="projectthumbnails/portfolioroom.webp" alt="Portfolio Room"></img>
              </div>
              <div className="grid-item-overlay">
                <Link to="/under-construction" className="read-more-button">Read More
                  <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.799161 6.5118L0.799161 5.3981H14.0044L10.1065 1.50018L10.9019 0.704683L16.1522 5.95495L10.9019 11.2052L10.1065 10.4097L14.0044 6.5118H0.799161Z" fill="white"/>
                  </svg>
                </Link>
                <Link to="https://github.com/one-loop/portfolio-2025" target="_blank" className="github-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1618_378)">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C12.1384 15.0543 13.5187 14.0337 14.4964 12.672C15.4741 11.3104 16 9.67631 16 8C16 3.58 12.42 0 8 0Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1618_378">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </Link>
              </div>
            </div>
            <div
              className="grid-item item5"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/projectthumbnails/chatbot.webp)` }}
            >
            <div className="grid-item-header-overlay">
              <h1>Local LLM <br /> Chat Assistant.</h1>
              <p>A local LLM chatbot assistant allowing students to place food orders from the NYUAD dining hall.</p>
              </div>
              <div className="grid-item-overlay">
                <Link to="/under-construction" className="read-more-button">Read More
                  <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.799161 6.5118L0.799161 5.3981H14.0044L10.1065 1.50018L10.9019 0.704683L16.1522 5.95495L10.9019 11.2052L10.1065 10.4097L14.0044 6.5118H0.799161Z" fill="white"/>
                  </svg>
                </Link>
                <Link to="https://github.com/one-loop/local-llm-chatbot" target="_blank" className="github-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1618_378)">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C12.1384 15.0543 13.5187 14.0337 14.4964 12.672C15.4741 11.3104 16 9.67631 16 8C16 3.58 12.42 0 8 0Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1618_378">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </Link>
              </div>
            </div>
            <div
              className="grid-item item6"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/projectthumbnails/worldle.webp)` }}
            >
              <div className="grid-item-header-overlay">
                <h1>Worldle.</h1>
                <p>A wordle-inspired geo-guessing game.</p>
              </div>
              <div className="grid-item-overlay">
                <Link to="https://geo-global-game.vercel.app/" target="_blank" className="visit-site-button">Visit Site
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.7875 11.25L0 10.4625L9.3375 1.125L3.825 1.125V0L11.25 0V7.425H10.125V1.9125L0.7875 11.25Z" fill="white"/>
                  </svg>
                </Link>
                <Link to="https://github.com/one-loop/geo-global-game" target="_blank" className="github-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1618_378)">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C12.1384 15.0543 13.5187 14.0337 14.4964 12.672C15.4741 11.3104 16 9.67631 16 8C16 3.58 12.42 0 8 0Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1618_378">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </Link>
              </div>
            </div>
            <div
              className="grid-item item7"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/projectthumbnails/2024portfolio.webp)` }}
            >
              <div className="grid-item-header-overlay">
                <h1>2024 Port<i>folio</i></h1>
              </div>
              <div className="grid-item-overlay">
                <a className="visit-site-button" href="https://saadsifar-old.vercel.app/" target='_blank'>Visit Site
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.7875 11.25L0 10.4625L9.3375 1.125L3.825 1.125V0L11.25 0V7.425H10.125V1.9125L0.7875 11.25Z" fill="white"/>
                  </svg>
                </a>
                <a href="https://github.com/one-loop/portfolio" target="_blank" className="github-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1618_378)">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C12.1384 15.0543 13.5187 14.0337 14.4964 12.672C15.4741 11.3104 16 9.67631 16 8C16 3.58 12.42 0 8 0Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1618_378">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </a>
              </div>
            </div>
            <div
              className="grid-item item8"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(22, 22, 22, 0.8)), url(${process.env.PUBLIC_URL}/projectthumbnails/ava.webp)`,
                backgroundPosition: 'center top',
              }}
            >
              <div className="grid-item-header-overlay">
              <svg width="70" height="30" viewBox="0 0 70 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2597 24.8327C21.6305 26.7788 25.4026 23.0066 23.4565 19.6358L15.2889 5.48909C13.8246 2.95286 10.1638 2.95285 8.69956 5.48909L0.531979 19.6358C-1.41414 23.0066 2.35803 26.7788 5.72881 24.8327L10.0921 22.3135C11.2692 21.6339 12.7194 21.6339 13.8964 22.3135L18.2597 24.8327Z" fill="#F2F2F2"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M63.8158 24.8327C67.1866 26.7787 70.9588 23.0066 69.0127 19.6358L60.845 5.48909C59.3807 2.95286 55.72 2.95285 54.2557 5.48909L46.0881 19.6358C44.142 23.0066 47.9142 26.7787 51.285 24.8327L55.6482 22.3135C56.8253 21.6339 58.2755 21.6339 59.4526 22.3135L63.8158 24.8327Z" fill="#F2F2F2"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M28.3802 4.72632C25.0094 2.7802 21.2372 6.55238 23.1833 9.92315L31.351 24.0698C32.8152 26.6061 36.476 26.6061 37.9403 24.0698L46.1079 9.92314C48.054 6.55236 44.2819 2.78019 40.9111 4.72632L36.5478 7.24544C35.3707 7.92503 33.9205 7.92503 32.7434 7.24545L28.3802 4.72632Z" fill="#F2F2F2"/>
              </svg>
              <h1>Let’s <i>grow</i> from here.</h1>
              <p>Student entrepreneurship organization <br /> 1k+ members</p>
              </div>
              <div className="grid-item-overlay">
                <Link to="https://one-loop.github.io/AVA/" target="_blank" className="visit-site-button">Visit Site
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.7875 11.25L0 10.4625L9.3375 1.125L3.825 1.125V0L11.25 0V7.425H10.125V1.9125L0.7875 11.25Z" fill="white"/>
                  </svg>
                </Link>
                <Link to="https://github.com/one-loop/AVA" target="_blank" className="github-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1618_378)">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C12.1384 15.0543 13.5187 14.0337 14.4964 12.672C15.4741 11.3104 16 9.67631 16 8C16 3.58 12.42 0 8 0Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1618_378">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </Link>
              </div>
            </div>
            <div
              className="grid-item item9"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(22, 22, 22, 0.8)), url(${process.env.PUBLIC_URL}/projectthumbnails/skystrike.webp)` }}
            >
              <div className="grid-item-header-overlay">
                <h1>SkyStrike.</h1>
                <p>A simple 2D top-down shooter game made for CS 1001 at NYU Abu Dhabi.</p>
              </div>
              <div className="grid-item-overlay">
                <Link to="/under-construction" className="read-more-button" style={{"visibility": "hidden"}}>Read More
                  <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.799161 6.5118L0.799161 5.3981H14.0044L10.1065 1.50018L10.9019 0.704683L16.1522 5.95495L10.9019 11.2052L10.1065 10.4097L14.0044 6.5118H0.799161Z" fill="white"/>
                  </svg>
                </Link>
                <Link to="https://github.com/one-loop/sky-strike" target="_blank" className="github-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1618_378)">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C12.1384 15.0543 13.5187 14.0337 14.4964 12.672C15.4741 11.3104 16 9.67631 16 8C16 3.58 12.42 0 8 0Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1618_378">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </Link>
              </div>
            </div>
            <div
              className="grid-item item10"
              style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(22, 22, 22, 0.8)), url(${process.env.PUBLIC_URL}/projectthumbnails/lingoslash.webp)` }}
            >
              <div className="grid-item-header-overlay">
                <h1>Lingo Slash.</h1>
                <p>A beat saber-inspired language learning game in VR.</p>
              </div>
              <div className="grid-item-overlay">
                <Link to="/under-construction" className="read-more-button">Read More
                  <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.799161 6.5118L0.799161 5.3981H14.0044L10.1065 1.50018L10.9019 0.704683L16.1522 5.95495L10.9019 11.2052L10.1065 10.4097L14.0044 6.5118H0.799161Z" fill="white"/>
                  </svg>
                </Link>
                <Link to="https://github.com/one-loop/lingo-slash" target="_blank" className="github-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1618_378)">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C12.1384 15.0543 13.5187 14.0337 14.4964 12.672C15.4741 11.3104 16 9.67631 16 8C16 3.58 12.42 0 8 0Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1618_378">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </Link>
              </div>
            </div>
            <div
              className="grid-item item11"
              style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(22, 22, 22, 0.8)), url(${process.env.PUBLIC_URL}/projectthumbnails/airaeagency.webp)` }}
            >
            <div className="grid-item-header-overlay">
              <h1 style={{fontSize: '32px'}}>Web Development Agency</h1>
              <p>10+ client projects, 100% client satisfaction.</p>
              </div>
              <div className="grid-item-overlay">
                <Link to="https://one-loop.github.io/airaedigital/" target="_blank" className="visit-site-button">Visit Site
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.7875 11.25L0 10.4625L9.3375 1.125L3.825 1.125V0L11.25 0V7.425H10.125V1.9125L0.7875 11.25Z" fill="white"/>
                  </svg>
                </Link>
                <Link to="https://github.com/one-loop/airaedigital" target="_blank" className="github-button">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1618_378)">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C12.1384 15.0543 13.5187 14.0337 14.4964 12.672C15.4741 11.3104 16 9.67631 16 8C16 3.58 12.42 0 8 0Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1618_378">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="all-projects-link">
            <a href="https://github.com/one-loop?tab=repositories" target="_blank" className="resume-link github-link">
              <span style={{display: 'flex', alignItems: 'center'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github github-icon" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </svg>
                <span className="resume-link-text github-link-text">View All Projects</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon"><path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="#F2F2F2"></path></svg>
              </span>
            </a>
            <div className="all-projects-underline"></div>
          </div>
        <FooterMain />
      </div>
      <h1 className="projects-title">Projects</h1>
    </div>
  );
};

export default Projects;
