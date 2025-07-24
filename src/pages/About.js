import React, {useRef, useEffect, useState} from 'react';
import './About.css';
import FooterMain from '../components/FooterMain';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


const getRandomUnique = (arr, n) => {
  const result = [];
  const taken = new Set();
  while (result.length < n && arr.length > 0) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!taken.has(idx)) {
      result.push(arr[idx]);
      taken.add(idx);
    }
  }
  return result;
};

const About = () => {
  const makingItHappenRef = useRef(null);
  const gradient1Ref = useRef(null);

  const pastRef = useRef(null);
  const presentRef = useRef(null);
  const futureRef = useRef(null);
  const comp1Ref = useRef(null);
  const comp2Ref = useRef(null);
  const comp3Ref = useRef(null);
  const gradient1 = useRef(null);
  const gradient2 = useRef(null);
  const gradient3 = useRef(null);
  const grid1 = useRef(null);
  const grid2 = useRef(null);
  const grid3 = useRef(null);
  const svgRef = useRef(null);
  const svgRef2 = useRef(null);
  
  // State for random gallery images
  const [galleryImages, setGalleryImages] = useState([]);
  const [allGalleryData, setAllGalleryData] = useState([]);

  const scrollToFirstSection = () => {
    const pastSection = document.getElementById("past-section");
    if (pastSection) {
      pastSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fetch gallery.json once
  useEffect(() => {
    fetch('/gallery.json')
      .then(res => res.json())
      .then(data => {
        setAllGalleryData(data);
        setGalleryImages(getRandomUnique(data, 6));
      });
  }, []);

  // Handler to refresh random images
  const handleRefreshGallery = () => {
    setGalleryImages(getRandomUnique(allGalleryData, 6));
  };

  // Add a new useEffect to log the distance of each section title from the top
  useEffect(() => {
    const toggleDistance = 250; // trigger point
    const fadeDistance = 50; // scroll range over which fade occurs

    const logDistances = () => {
      if (pastRef.current && presentRef.current && futureRef.current) {
        // Default: first section active
        let op1 = 1, op2 = 0, op3 = 0;
        
        if (presentRef.current.getBoundingClientRect().top < toggleDistance &&
            futureRef.current.getBoundingClientRect().top >= toggleDistance) {
          // Transition between first and second section
          const offset = Math.min(Math.max(toggleDistance - presentRef.current.getBoundingClientRect().top, 0), fadeDistance);
          op1 = 1 - offset / fadeDistance;
          // op2 = offset / fadeDistance;
          op2 = 1;
          op3 = 0;
        } else if (futureRef.current.getBoundingClientRect().top < toggleDistance) {
          // Transition between second and third section
          const offset = Math.min(Math.max(toggleDistance - futureRef.current.getBoundingClientRect().top, 0), fadeDistance);
          op2 = 1 - offset / fadeDistance;
          // op3 = offset / fadeDistance;
          op3 = 1;
          op1 = 0;
        }
        // Apply computed opacities to the image, gradient and grid elements
        comp1Ref.current.style.opacity = op1;
        gradient1.current.style.opacity = op1;
        grid1.current.style.opacity = op1;

        // set opacity for the second and third sections
        comp2Ref.current.style.opacity = op2;
        gradient2.current.style.opacity = op2;
        grid2.current.style.opacity = op2;

        comp3Ref.current.style.opacity = op3;
        gradient3.current.style.opacity = op3;
        grid3.current.style.opacity = op3;
        
        // Display hello svg animation once user scrolls down to the past section
        if (pastRef.current.getBoundingClientRect().top <= 350) {
          svgRef.current.style.display = 'block';
          svgRef2.current.style.display = 'block';
        } else {
          svgRef.current.style.display = 'none';
          svgRef2.current.style.display = 'none';
        }
      }
    };

    window.addEventListener('scroll', logDistances);
    logDistances();
    return () => window.removeEventListener('scroll', logDistances);
  }, []);

  return (
    <div>
      <div className="gradient about about-grid">
        {/* <h1>About</h1> */}
        <div className="about-gradient"></div>
        <div className="outer-container">
        <section className="hero">
          <div className="hero-left">
            <div className="header-tag">
              <div className="glow-circle animate-glow"></div>
              <span className="tag-header animate-text">About me</span>
            </div>
            <h1 className="animate-text">
              I love  <span className="emphasize">building</span> things and <span className="emphasize">solving problems.</span>
            </h1>
            <h2 className="animate-text">This is my story — along with some flicks from my travels</h2>
            <div id="scroll-anim" onClick={scrollToFirstSection}>
              <p>Scroll Down</p>
              <div>
                <div></div>
                <div className="scroll-line-animation"></div>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <img className="animate-image" src="/images/profile.jpeg" alt="porfile picture"></img>
            {/* New Scroll Down Animation */}
          </div>
        </section>
        
        <main>
        <div className="right">
        <div ref={pastRef} id="past-section">
          <h2>The Past: Where It All Started</h2>

          <div className="computer-1-mobile-container">
            <img className="computer-1-mobile" src="/computers/computer-1.png" />
            <svg
                ref={svgRef2}
                className="draw-svg mobile"
                width="150"
                height="50"
                viewBox="0 0 150 50"
                fill="none"
              >
                {/* <path d="M-293.58-104.62S-103.61-205.49-60-366.25c9.13-32.45,9-58.31,0-74-10.72-18.82-49.69-33.21-75.55,31.94-27.82,70.11-52.22,377.24-44.11,322.48s34-176.24,99.89-183.19c37.66-4,49.55,23.58,52.83,47.92a117.06,117.06,0,0,1-3,45.32c-7.17,27.28-20.47,97.67,33.51,96.86,66.93-1,131.91-53.89,159.55-84.49,31.1-36.17,31.1-70.64,19.27-90.25-16.74-29.92-69.47-33-92.79,16.73C62.78-179.86,98.7-93.8,159-81.63S302.7-99.55,393.3-269.92c29.86-58.16,52.85-114.71,46.14-150.08-7.44-39.21-59.74-54.5-92.87-8.7-47,65-61.78,266.62-34.74,308.53S416.62-58,481.52-130.31s133.2-188.56,146.54-256.23c14-71.15-56.94-94.64-88.4-47.32C500.53-375,467.58-229.49,503.3-127a73.73,73.73,0,0,0,23.43,33.67c25.49,20.23,55.1,16,77.46,6.32a111.25,111.25,0,0,0,30.44-19.87c37.73-34.23,29-36.71,64.58-127.53C724-284.3,785-298.63,821-259.13a71,71,0,0,1,13.69,22.56c17.68,46,6.81,80-6.81,107.89-12,24.62-34.56,42.72-61.45,47.91-23.06,4.45-48.37-.35-66.48-24.27a78.88,78.88,0,0,1-12.66-25.8c-14.75-51,4.14-88.76,11-101.41,6.18-11.39,37.26-69.61,103.42-42.24,55.71,23.05,100.66-23.31,100.66-23.31" transform="translate(311.08 476.02)" 
                  stroke="#4D79A5" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path> */}
                <path
                  // DON'T DELETE THESE COMMENTS
                  // d="M8.41992 38.8276C18.3488 38.8276 53.2408 3.01394 38.2373 2.79331C23.2337 2.57266 24.0267 46.5882 24.0267 46.5882C24.0267 46.5882 25.3407 26.0124 37.476 26.0124C49.6112 26.0124 34.4923 46.6059 45.0831 47.2678C55.6738 47.9298 70.7792 27.2565 59.7473 26.8153C48.7152 26.374 49.6467 45.9483 64.4296 46.6102C79.2124 47.2722 95.6273 4.93201 82.6099 4.04945C69.5922 3.1669 72.1486 45.4371 85.3871 46.3196C98.6256 47.2022 118.351 4.58221 104.892 3.92029C91.4323 3.25837 94.705 46.8977 106.312 46.6102C109.437 46.6102 114.962 41.8626 115.16 36.406C116.053 25.7504 124.073 26.4924 124.073 26.4924C133 27 132.5 36 132.5 36C132.5 42.5 129.767 46.3519 123.168 46.3519C116.57 46.3519 115.16 37.9165 115.16 37.9165"
                  // d="M8.41992 38.8276C18.3488 38.8276 53.2408 3.01394 38.2373 2.79331C23.2337 2.57266 24.0267 46.5882 24.0267 46.5882C24.0267 46.5882 25.3407 26.0124 37.476 26.0124C49.6112 26.0124 34.4923 46.6059 45.0831 47.2678C55.6738 47.9298 70.7792 27.2565 59.7473 26.8153C48.7152 26.374 49.6467 45.9483 64.4296 46.6102C79.2124 47.2722 95.6273 4.93201 82.6099 4.04945C69.5922 3.1669 72.1486 45.4371 85.3871 46.3196C98.6256 47.2022 118.351 4.58221 104.892 3.92029C91.4323 3.25837 94.705 46.8977 106.312 46.6102C109.437 46.6102 114.962 41.8626 115.16 36.406C116.053 25.7504 124.073 26.4924 124.073 26.4924C132.555 27.2152 133.179 33.5643 133.179 33.5643C133.974 37.0481 129.767 46.3519 123.168 46.3519C116.57 46.3519 115.16 37.9165 115.16 37.9165"
                  // d="M-293.58-104.62S-103.61-205.49-60-366.25c9.13-32.45,9-58.31,0-74-10.72-18.82-49.69-33.21-75.55,31.94-27.82,70.11-52.22,377.24-44.11,322.48s34-176.24,99.89-183.19c37.66-4,49.55,23.58,52.83,47.92a117.06,117.06,0,0,1-3,45.32c-7.17,27.28-20.47,97.67,33.51,96.86,66.93-1,131.91-53.89,159.55-84.49,31.1-36.17,31.1-70.64,19.27-90.25-16.74-29.92-69.47-33-92.79,16.73C62.78-179.86,98.7-93.8,159-81.63S302.7-99.55,393.3-269.92c29.86-58.16,52.85-114.71,46.14-150.08-7.44-39.21-59.74-54.5-92.87-8.7-47,65-61.78,266.62-34.74,308.53S416.62-58,481.52-130.31s133.2-188.56,146.54-256.23c14-71.15-56.94-94.64-88.4-47.32C500.53-375,467.58-229.49,503.3-127a73.73,73.73,0,0,0,23.43,33.67c25.49,20.23,55.1,16,77.46,6.32a111.25,111.25,0,0,0,30.44-19.87c37.73-34.23,29-36.71,64.58-127.53C724-284.3,785-298.63,821-259.13a71,71,0,0,1,13.69,22.56c17.68,46,6.81,80-6.81,107.89-12,24.62-34.56,42.72-61.45,47.91-23.06,4.45-48.37-.35-66.48-24.27a78.88,78.88,0,0,1-12.66-25.8c-14.75-51,4.14-88.76,11-101.41,6.18-11.39,37.26-69.61,103.42-42.24,55.71,23.05,100.66-23.31,100.66-23.31"
                  // d="M2 44.5C27.5 31 37.1632 3.00004 27 3.00004C17.5 0.500019 16 46.5 16 46.5C16 46.5 15.8647 25.5 28 25.5C40.1352 25.5 25.9092 45.8381 36.5 46.5C55.5 47.1576 66.5 26.5 55 24.5C43.9679 24.0587 42.2171 46.3381 57 47C78.5 47.9627 94 5.00001 83.5 3.00002C71.5 3.00003 67.7615 46.1175 81 47C96.5 48.0333 116 12.5 107 3.50002C96.5 -1.99999 88.5 45.5 103 47C106.125 47 111.5 47 118 35M118 35C120 24 128 24.5 128 24.5M118 35C118 35 116.5 46.5 125 47C131.599 47 135.5 43 136 35.5C136 35.5 137.5 25 128 24.5M128 24.5C138 27 139.5 30 146 23.5"
                  
                  // d="M2 44.5C27.5 31 37.1632 3.00004 27 3.00004C17.5 0.500019 16 46.5 16 46.5C16 46.5 15.8647 25.5 28 25.5C40.1352 25.5 25.9092 45.8381 36.5 46.5C55.5 47.1576 66.5 26.5 55 24.5C43.9679 24.0587 42.2171 46.3381 57 47C78.5 47.9627 94 5.00001 83.5 3.00002C71.5 3.00003 67.7615 46.1175 81 47C96.5 48.0333 116 12.5 107 3.50002C96.5 -1.99999 88.5 45.5 103 47C106.125 47 111.5 47 118 35L118 35C120 24 128 24.5 128 24.5L118 35C118 35 116.5 46.5 125 47C131.599 47 135.5 43 136 35.5C136 35.5 137.5 25 128 24.5L128 24.5C138 27 139.5 30 146 23.5"
                  // d="M2 44.5C27.5 31 37.1632 3.00004 27 3.00004C17.5 0.500019 16 46.5 16 46.5C16 46.5 15.8647 25.5 28 25.5C40.1352 25.5 25.9092 45.8381 36.5 46.5C55.5 47.1576 66.5 26.5 55 24.5C43.9679 24.0587 42.2171 46.3381 57 47C78.5 47.9627 94 5.00001 83.5 3.00002C71.5 3.00003 67.7615 46.1175 81 47C96.5 48.0333 116 12.5 107 3.50002C96.5 -1.99999 88.5 45.5 103 47C106.125 47 111.5 47 118 35C120 24 128 24.5 128 24.5C118 35 116.5 46.5 125 47C131.599 47 135.5 43 136 35.5C136 35.5 137.5 25 128 24.5C138 27 139.5 30 146 23.5"
                  // d="M3.41992 38.8276C13.3488 38.8276 48.2408 3.01394 33.2373 2.79331C18.2337 2.57266 19.0267 46.5882 19.0267 46.5882C19.0267 46.5882 20.3407 26.0124 32.476 26.0124C44.6112 26.0124 29.4923 46.6059 40.0831 47.2678C50.6738 47.9298 65.7792 27.2565 54.7473 26.8153C43.7152 26.374 44.6467 45.9483 59.4296 46.6102C74.2124 47.2722 90.6273 4.93201 77.6099 4.04945C64.5922 3.1669 67.1486 45.4371 80.3871 46.3196C93.6256 47.2022 113.351 4.58221 99.892 3.92029C86.4323 3.25837 89.705 46.8977 101.312 46.6102C104.437 46.6102 109.962 41.8626 110.16 36.406C111.053 25.7504 119.073 26.4924 119.073 26.4924M119.073 26.4924C128 27 127.5 36 127.5 36C127.5 42.5 124.767 46.3519 118.168 46.3519C111.57 46.3519 110.16 37.9165 110.16 37.9165C110.322 34.0008 112.331 26.2341 119.073 26.4924Z"
                  
                  // d="M2 44.5C27.5 31 37.1632 3.00004 27 3.00004C17.5 0.500019 16 46.5 16 46.5C16 46.5 15.8647 25.5 28 25.5C40.1352 25.5 25.9092 45.8381 36.5 46.5C55.5 47.1576 66.5 26.5 55 24.5C43.9679 24.0587 42.2171 46.3381 57 47C78.5 47.9627 94 5.00001 83.5 3.00002C71.5 3.00003 67.7615 46.1175 81 47C96.5 48.0333 116 12.5 107 3.50002C96.5 -1.99999 88.5 45.5 103 47C106.125 47 111.5 46.5 118 34.5M118 34.5C120 23.5 128 24.5 128 24.5C137.5 25 136 35.5 136 35.5C135.5 43 131.599 47 125 47C116.5 46.5 118 34.5 118 34.5ZM118 34.5C118.667 30.6667 123.1 23.0755 129.5 24.6755C137.5 26.6755 139 30.5 146 24"
                  
                  // PERFECT
                  d="M2 44.5C27.5 31 37.1632 3.00004 27 3.00004C17.5 0.500019 16 46.5 16 46.5C16 46.5 15.8647 25.5 28 25.5C40.1352 25.5 25.9092 45.8381 36.5 46.5C55.5 47.1576 66.5 26.5 55 24.5C43.9679 24.0587 42.2171 46.3381 57 47C78.5 47.9627 94 5.00001 83.5 3.00002C71.5 3.00003 67.7615 46.1175 81 47C96.5 48.0333 116 12.5 107 3.50002C96.5 -1.99999 88.5 45.5 103 47C106.125 47 111.5 46.5 118 34.5L118 34.5C120 23.5 128 24.5 128 24.5C137.5 25 136 35.5 136 35.5C135.5 43 131.599 47 125 47C116.5 46.5 118 34.5 118 34.5L118 34.5C118.667 30.6667 123.1 23.0755 129.5 24.6755C137.5 26.6755 139 30.5 146 24"
                  stroke="#4D79A5"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                {/* <svg width="148" height="50" viewBox="0 0 148 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path stroke="#4D79A5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg> */}

            </svg>
          </div>
          <p>
            Ever since I was a kid, I’ve been drawn to the inner workings of things. I was the one unscrewing remote controls, tinkering with old laptops, and trying to figure out how to make something do something else. Computers felt like magic—except the kind you could actually learn. Around 12, I stumbled across a dusty Python book and started learning on my own. I’d been playing with Scratch before that, but Python felt like a real language—something with power.
          </p>
          <p>
            From there, it became an obsession. I started making small games, automating random things for fun, building bots that probably broke more than they fixed. I didn’t always know what I was doing, but that didn’t matter—I was hooked on the feeling of solving problems and making things work. That love for building eventually led me to major in Computer Science at NYU Abu Dhabi.
          </p>
        </div>
        <div ref={presentRef} id="present-section">
          <h2>The Present: Learning Across Borders</h2>
          <img className="computer-2-mobile" src="/computers/computer-2.png" />
          {/* <p>
            Today, I’m a sophomore at NYU Abu Dhabi, studying Computer Science across continents—from the neon buzz of New York to the cobblestone charm of Florence, the tech hubs of Kigali to the art-soaked streets of Paris (where I’m currently eating a croissant at 1:00 AM while the Eiffel tower sparkles outside my dorm window for the last time tonight 🇫🇷). 
          </p> */}
          <p>
            Right now, I’m a Computer Science student at NYU Abu Dhabi, with minors in Economics and Applied Mathematics. My university experience has taken me around the world—from the fast pace of New York to the quiet corners of Kigali, the historic streets of Paris to the hills of Florence. Each city gave me a different lens on how people live, work, and connect—and each one subtly shaped the kind of problems I care about solving.
          </p>
          {/* <p>
            When I’m not knee-deep in coding, you’ll find me devouring novels, playing badminton, or losing myself in RPGs (Elden Ring, anyone?). Travel’s my constant—every new city teaches me how to see the world differently.
          </p> */}
          <p>
            When I’m not working on code, I’m probably reading a novel, playing badminton, or wandering through a new city. I’m also a big fan of RPGs and I’ve recently been building side projects that blend creativity with technology—like a 3D globe-based geography game, or a rhythm-language learning app inspired by Beat Saber and Duolingo.
          </p>
          <p>
            And this summer, I’m working as a research assistant in a computer vision and AI lab, exploring the kinds of machine learning that can actually do some good in the world.
          </p>
        </div>
        <div ref={futureRef} id="future-section">
          <h2>The Future: Open Questions, Big Possibilities</h2>
          <img className="computer-3-mobile" src="/computers/computer-3.png" />
          <p>
            I don’t have a 10-year plan. What I do have is a toolkit: curiosity, code, and a stubborn belief that tech should serve people, not the other way around. Maybe I’ll build AI that democratizes education. Maybe I’ll found a startup that rethinks urban mobility. Maybe I’ll write code on a beach in Bali. 
          </p>
          <p>
            Whatever the future holds, I know this: I’ll keep chasing that rush of “It works!”What’s certain? I’ll keep chasing that 12-year-old’s thrill: the gasp of a solved puzzle, the itch to remake something better, the quiet pride of leaving a system smarter than I found it.
          </p>
          <p>
            The future’s a blank canvas, and I’ve got a lot of paint. Let’s see what we create.
          </p>
        </div>
        <div>
          <h2>Thanks for stopping by!</h2>
          {/* <img src="/images/signature.png" alt="signature" width='150' style={{userSelect: 'none', webkitUserDrag: 'none'}}></img> */}
          <img src="/images/signature 2.png" alt="signature" width='150' style={{userSelect: 'none', webkitUserDrag: 'none'}}></img>
        </div>
        <div>
          <h1 className="experience-title">Experience</h1>
          <div className="experience-container">
            <div className="left">2024 — Present</div>
            <div className="right">
              <h2>Research Intern • New York University Abu Dhabi</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
              </p>
              <div className="skils-tags">
                <span className="experience-skill">JavaScript</span>
                <span className="experience-skill">TypeScript</span>
                <span className="experience-skill">React</span>
                <span className="experience-skill">Storybook</span>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="left">
          <div className="image-container">
            <img ref={comp1Ref} className="computer-1" src="/computers/computer-1.png" />
            <svg
              ref={svgRef}
              className="draw-svg"
              width="150"
              height="50"
              viewBox="0 0 150 50"
              fill="none"
              style={{ display: 'none' }}
            >
              {/* <path d="M-293.58-104.62S-103.61-205.49-60-366.25c9.13-32.45,9-58.31,0-74-10.72-18.82-49.69-33.21-75.55,31.94-27.82,70.11-52.22,377.24-44.11,322.48s34-176.24,99.89-183.19c37.66-4,49.55,23.58,52.83,47.92a117.06,117.06,0,0,1-3,45.32c-7.17,27.28-20.47,97.67,33.51,96.86,66.93-1,131.91-53.89,159.55-84.49,31.1-36.17,31.1-70.64,19.27-90.25-16.74-29.92-69.47-33-92.79,16.73C62.78-179.86,98.7-93.8,159-81.63S302.7-99.55,393.3-269.92c29.86-58.16,52.85-114.71,46.14-150.08-7.44-39.21-59.74-54.5-92.87-8.7-47,65-61.78,266.62-34.74,308.53S416.62-58,481.52-130.31s133.2-188.56,146.54-256.23c14-71.15-56.94-94.64-88.4-47.32C500.53-375,467.58-229.49,503.3-127a73.73,73.73,0,0,0,23.43,33.67c25.49,20.23,55.1,16,77.46,6.32a111.25,111.25,0,0,0,30.44-19.87c37.73-34.23,29-36.71,64.58-127.53C724-284.3,785-298.63,821-259.13a71,71,0,0,1,13.69,22.56c17.68,46,6.81,80-6.81,107.89-12,24.62-34.56,42.72-61.45,47.91-23.06,4.45-48.37-.35-66.48-24.27a78.88,78.88,0,0,1-12.66-25.8c-14.75-51,4.14-88.76,11-101.41,6.18-11.39,37.26-69.61,103.42-42.24,55.71,23.05,100.66-23.31,100.66-23.31" transform="translate(311.08 476.02)" 
                stroke="#4D79A5" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path> */}
              <path
                // DON'T DELETE THESE COMMENTS
                // d="M8.41992 38.8276C18.3488 38.8276 53.2408 3.01394 38.2373 2.79331C23.2337 2.57266 24.0267 46.5882 24.0267 46.5882C24.0267 46.5882 25.3407 26.0124 37.476 26.0124C49.6112 26.0124 34.4923 46.6059 45.0831 47.2678C55.6738 47.9298 70.7792 27.2565 59.7473 26.8153C48.7152 26.374 49.6467 45.9483 64.4296 46.6102C79.2124 47.2722 95.6273 4.93201 82.6099 4.04945C69.5922 3.1669 72.1486 45.4371 85.3871 46.3196C98.6256 47.2022 118.351 4.58221 104.892 3.92029C91.4323 3.25837 94.705 46.8977 106.312 46.6102C109.437 46.6102 114.962 41.8626 115.16 36.406C116.053 25.7504 124.073 26.4924 124.073 26.4924C133 27 132.5 36 132.5 36C132.5 42.5 129.767 46.3519 123.168 46.3519C116.57 46.3519 115.16 37.9165 115.16 37.9165"
                // d="M8.41992 38.8276C18.3488 38.8276 53.2408 3.01394 38.2373 2.79331C23.2337 2.57266 24.0267 46.5882 24.0267 46.5882C24.0267 46.5882 25.3407 26.0124 37.476 26.0124C49.6112 26.0124 34.4923 46.6059 45.0831 47.2678C55.6738 47.9298 70.7792 27.2565 59.7473 26.8153C48.7152 26.374 49.6467 45.9483 64.4296 46.6102C79.2124 47.2722 95.6273 4.93201 82.6099 4.04945C69.5922 3.1669 72.1486 45.4371 85.3871 46.3196C98.6256 47.2022 118.351 4.58221 104.892 3.92029C91.4323 3.25837 94.705 46.8977 106.312 46.6102C109.437 46.6102 114.962 41.8626 115.16 36.406C116.053 25.7504 124.073 26.4924 124.073 26.4924C132.555 27.2152 133.179 33.5643 133.179 33.5643C133.974 37.0481 129.767 46.3519 123.168 46.3519C116.57 46.3519 115.16 37.9165 115.16 37.9165"
                // d="M-293.58-104.62S-103.61-205.49-60-366.25c9.13-32.45,9-58.31,0-74-10.72-18.82-49.69-33.21-75.55,31.94-27.82,70.11-52.22,377.24-44.11,322.48s34-176.24,99.89-183.19c37.66-4,49.55,23.58,52.83,47.92a117.06,117.06,0,0,1-3,45.32c-7.17,27.28-20.47,97.67,33.51,96.86,66.93-1,131.91-53.89,159.55-84.49,31.1-36.17,31.1-70.64,19.27-90.25-16.74-29.92-69.47-33-92.79,16.73C62.78-179.86,98.7-93.8,159-81.63S302.7-99.55,393.3-269.92c29.86-58.16,52.85-114.71,46.14-150.08-7.44-39.21-59.74-54.5-92.87-8.7-47,65-61.78,266.62-34.74,308.53S416.62-58,481.52-130.31s133.2-188.56,146.54-256.23c14-71.15-56.94-94.64-88.4-47.32C500.53-375,467.58-229.49,503.3-127a73.73,73.73,0,0,0,23.43,33.67c25.49,20.23,55.1,16,77.46,6.32a111.25,111.25,0,0,0,30.44-19.87c37.73-34.23,29-36.71,64.58-127.53C724-284.3,785-298.63,821-259.13a71,71,0,0,1,13.69,22.56c17.68,46,6.81,80-6.81,107.89-12,24.62-34.56,42.72-61.45,47.91-23.06,4.45-48.37-.35-66.48-24.27a78.88,78.88,0,0,1-12.66-25.8c-14.75-51,4.14-88.76,11-101.41,6.18-11.39,37.26-69.61,103.42-42.24,55.71,23.05,100.66-23.31,100.66-23.31"
                // d="M2 44.5C27.5 31 37.1632 3.00004 27 3.00004C17.5 0.500019 16 46.5 16 46.5C16 46.5 15.8647 25.5 28 25.5C40.1352 25.5 25.9092 45.8381 36.5 46.5C55.5 47.1576 66.5 26.5 55 24.5C43.9679 24.0587 42.2171 46.3381 57 47C78.5 47.9627 94 5.00001 83.5 3.00002C71.5 3.00003 67.7615 46.1175 81 47C96.5 48.0333 116 12.5 107 3.50002C96.5 -1.99999 88.5 45.5 103 47C106.125 47 111.5 47 118 35M118 35C120 24 128 24.5 128 24.5M118 35C118 35 116.5 46.5 125 47C131.599 47 135.5 43 136 35.5C136 35.5 137.5 25 128 24.5M128 24.5C138 27 139.5 30 146 23.5"
                
                // d="M2 44.5C27.5 31 37.1632 3.00004 27 3.00004C17.5 0.500019 16 46.5 16 46.5C16 46.5 15.8647 25.5 28 25.5C40.1352 25.5 25.9092 45.8381 36.5 46.5C55.5 47.1576 66.5 26.5 55 24.5C43.9679 24.0587 42.2171 46.3381 57 47C78.5 47.9627 94 5.00001 83.5 3.00002C71.5 3.00003 67.7615 46.1175 81 47C96.5 48.0333 116 12.5 107 3.50002C96.5 -1.99999 88.5 45.5 103 47C106.125 47 111.5 47 118 35L118 35C120 24 128 24.5 128 24.5L118 35C118 35 116.5 46.5 125 47C131.599 47 135.5 43 136 35.5C136 35.5 137.5 25 128 24.5L128 24.5C138 27 139.5 30 146 23.5"
                // d="M2 44.5C27.5 31 37.1632 3.00004 27 3.00004C17.5 0.500019 16 46.5 16 46.5C16 46.5 15.8647 25.5 28 25.5C40.1352 25.5 25.9092 45.8381 36.5 46.5C55.5 47.1576 66.5 26.5 55 24.5C43.9679 24.0587 42.2171 46.3381 57 47C78.5 47.9627 94 5.00001 83.5 3.00002C71.5 3.00003 67.7615 46.1175 81 47C96.5 48.0333 116 12.5 107 3.50002C96.5 -1.99999 88.5 45.5 103 47C106.125 47 111.5 47 118 35C120 24 128 24.5 128 24.5C118 35 116.5 46.5 125 47C131.599 47 135.5 43 136 35.5C136 35.5 137.5 25 128 24.5C138 27 139.5 30 146 23.5"
                // d="M3.41992 38.8276C13.3488 38.8276 48.2408 3.01394 33.2373 2.79331C18.2337 2.57266 19.0267 46.5882 19.0267 46.5882C19.0267 46.5882 20.3407 26.0124 32.476 26.0124C44.6112 26.0124 29.4923 46.6059 40.0831 47.2678C50.6738 47.9298 65.7792 27.2565 54.7473 26.8153C43.7152 26.374 44.6467 45.9483 59.4296 46.6102C74.2124 47.2722 90.6273 4.93201 77.6099 4.04945C64.5922 3.1669 67.1486 45.4371 80.3871 46.3196C93.6256 47.2022 113.351 4.58221 99.892 3.92029C86.4323 3.25837 89.705 46.8977 101.312 46.6102C104.437 46.6102 109.962 41.8626 110.16 36.406C111.053 25.7504 119.073 26.4924 119.073 26.4924M119.073 26.4924C128 27 127.5 36 127.5 36C127.5 42.5 124.767 46.3519 118.168 46.3519C111.57 46.3519 110.16 37.9165 110.16 37.9165C110.322 34.0008 112.331 26.2341 119.073 26.4924Z"
                
                // d="M2 44.5C27.5 31 37.1632 3.00004 27 3.00004C17.5 0.500019 16 46.5 16 46.5C16 46.5 15.8647 25.5 28 25.5C40.1352 25.5 25.9092 45.8381 36.5 46.5C55.5 47.1576 66.5 26.5 55 24.5C43.9679 24.0587 42.2171 46.3381 57 47C78.5 47.9627 94 5.00001 83.5 3.00002C71.5 3.00003 67.7615 46.1175 81 47C96.5 48.0333 116 12.5 107 3.50002C96.5 -1.99999 88.5 45.5 103 47C106.125 47 111.5 46.5 118 34.5M118 34.5C120 23.5 128 24.5 128 24.5C137.5 25 136 35.5 136 35.5C135.5 43 131.599 47 125 47C116.5 46.5 118 34.5 118 34.5ZM118 34.5C118.667 30.6667 123.1 23.0755 129.5 24.6755C137.5 26.6755 139 30.5 146 24"
                
                // PERFECT
                d="M2 44.5C27.5 31 37.1632 3.00004 27 3.00004C17.5 0.500019 16 46.5 16 46.5C16 46.5 15.8647 25.5 28 25.5C40.1352 25.5 25.9092 45.8381 36.5 46.5C55.5 47.1576 66.5 26.5 55 24.5C43.9679 24.0587 42.2171 46.3381 57 47C78.5 47.9627 94 5.00001 83.5 3.00002C71.5 3.00003 67.7615 46.1175 81 47C96.5 48.0333 116 12.5 107 3.50002C96.5 -1.99999 88.5 45.5 103 47C106.125 47 111.5 46.5 118 34.5L118 34.5C120 23.5 128 24.5 128 24.5C137.5 25 136 35.5 136 35.5C135.5 43 131.599 47 125 47C116.5 46.5 118 34.5 118 34.5L118 34.5C118.667 30.6667 123.1 23.0755 129.5 24.6755C137.5 26.6755 139 30.5 146 24"
                stroke="#4D79A5"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              {/* <svg width="148" height="50" viewBox="0 0 148 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path stroke="#4D79A5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg> */}

            </svg>
            <img ref={comp2Ref} className="computer-2" src="/computers/computer-2.png" />
            <img ref={comp3Ref} className="computer-3" src="/computers/computer-3.png" />
            <div className="bg-mask"></div>
            <div ref={gradient1} className="bg-gradient bg-gradient-1"></div>
            <span ref={grid1} className="gradient-grid-1"></span>
            <div ref={gradient2} className="bg-gradient bg-gradient-2"></div>
            <span ref={grid2} className="gradient-grid-2"></span>
            <div ref={gradient3} className="bg-gradient bg-gradient-3"></div>
            <span ref={grid3} className="gradient-grid-3"></span>
          </div>
        </div>
        </main>

        <div className="about-image-gallery-container">
        <div className="all-photos-link">
            <Link
              className="photos-link"
              to="/photos"
              style={{ fontWeight: 500, fontSize: "1.2rem" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 10}} aria-hidden="false" aria-label="Library"><path d="M9.38759 8.53403C10.0712 8.43795 10.7036 8.91485 10.7997 9.59849C10.8956 10.2819 10.4195 10.9133 9.73622 11.0096C9.05259 11.1057 8.4202 10.6298 8.32411 9.94614C8.22804 9.26258 8.70407 8.63022 9.38759 8.53403Z"></path><path fillRule="evenodd" clipRule="evenodd" d="M10.3886 5.58677C10.8476 5.5681 11.2608 5.5975 11.6581 5.74204L11.8895 5.83677C12.4185 6.07813 12.8721 6.46152 13.1991 6.94614L13.2831 7.07993C13.4673 7.39617 13.5758 7.74677 13.6571 8.14048C13.7484 8.58274 13.8154 9.13563 13.8993 9.81919L14.245 12.6317L14.3554 13.5624C14.3852 13.8423 14.4067 14.0936 14.4159 14.3192C14.4322 14.7209 14.4118 15.0879 14.3095 15.4393L14.2606 15.5887C14.0606 16.138 13.7126 16.6202 13.2577 16.9823L13.0565 17.1297C12.7061 17.366 12.312 17.4948 11.8622 17.5877C11.6411 17.6334 11.3919 17.673 11.1132 17.7118L10.1835 17.8299L7.37098 18.1756C6.68748 18.2596 6.13466 18.3282 5.68348 18.3465C5.28176 18.3628 4.9148 18.3424 4.56337 18.2401L4.41395 18.1913C3.86454 17.9912 3.38258 17.6432 3.0204 17.1883L2.87294 16.9872C2.63655 16.6367 2.50788 16.2427 2.41493 15.7928C2.36926 15.5717 2.32964 15.3226 2.29091 15.0438L2.17274 14.1141L1.82704 11.3016C1.74311 10.6181 1.67455 10.0653 1.65614 9.61411C1.63747 9.15518 1.66697 8.74175 1.81141 8.34458L1.90614 8.11313C2.14741 7.58441 2.53115 7.13051 3.01552 6.80356L3.1493 6.71958C3.46543 6.53545 3.8163 6.42688 4.20985 6.34556C4.65206 6.25423 5.20506 6.18729 5.88856 6.10337L8.70106 5.75767L9.63173 5.64731C9.91161 5.61744 10.163 5.59597 10.3886 5.58677ZM6.75673 13.0594C6.39143 12.978 6.00943 13.0106 5.66298 13.1522C5.5038 13.2173 5.32863 13.3345 5.06923 13.5829C4.80403 13.8368 4.49151 14.1871 4.04091 14.6932L3.64833 15.1327C3.67072 15.2763 3.69325 15.4061 3.71766 15.5243C3.79389 15.893 3.87637 16.0961 3.97548 16.243L4.06141 16.3602C4.27134 16.6237 4.5507 16.8253 4.86903 16.9413L5.00477 16.9813C5.1536 17.0148 5.34659 17.0289 5.6288 17.0174C6.01317 17.0018 6.50346 16.9419 7.20888 16.8553L10.0214 16.5106L10.9306 16.3944C11.0173 16.3824 11.0997 16.3693 11.1776 16.3573L8.61513 14.3065C8.08582 13.8831 7.71807 13.5905 7.41395 13.3846C7.19112 13.2338 7.02727 13.1469 6.88856 13.0975L6.75673 13.0594ZM10.4432 6.91587C10.2511 6.9237 10.0319 6.94288 9.77333 6.97056L8.86317 7.07798L6.05067 7.42271C5.34527 7.50932 4.85514 7.57047 4.47841 7.64829C4.20174 7.70549 4.01803 7.76626 3.88173 7.83481L3.75966 7.9061C3.47871 8.09575 3.25597 8.35913 3.1161 8.66587L3.06141 8.79966C3.00092 8.96619 2.96997 9.18338 2.98524 9.55942C3.00091 9.94382 3.06074 10.4341 3.14735 11.1395L3.42274 13.3895L3.64442 13.1434C3.82631 12.9454 3.99306 12.7715 4.1493 12.6219C4.46768 12.3171 4.78299 12.0748 5.16005 11.9208L5.38661 11.8377C5.92148 11.6655 6.49448 11.6387 7.04579 11.7616L7.19325 11.7987C7.53151 11.897 7.8399 12.067 8.15907 12.2831C8.51737 12.5256 8.9325 12.8582 9.4452 13.2684L12.5966 15.7889C12.7786 15.6032 12.9206 15.3806 13.0106 15.1336L13.0507 14.9979C13.0842 14.8491 13.0982 14.6561 13.0868 14.3739C13.079 14.1817 13.0598 13.9625 13.0321 13.704L12.9247 12.7938L12.58 9.9813C12.4933 9.27584 12.4322 8.78581 12.3544 8.40903C12.2972 8.13219 12.2364 7.94873 12.1679 7.81235L12.0966 7.69028C11.9069 7.40908 11.6437 7.18669 11.3368 7.04673L11.203 6.99204C11.0364 6.93147 10.8195 6.90059 10.4432 6.91587Z"></path><path d="M9.72841 1.5897C10.1797 1.60809 10.7322 1.67665 11.4159 1.7606L14.2284 2.1063L15.1581 2.22446C15.4371 2.26322 15.6859 2.3028 15.9071 2.34849C16.3571 2.44144 16.7509 2.57006 17.1015 2.80649L17.3026 2.95396C17.7576 3.31618 18.1055 3.79802 18.3056 4.34751L18.3544 4.49692C18.4567 4.84845 18.4772 5.21519 18.4608 5.61704C18.4516 5.84273 18.4292 6.09381 18.3993 6.37388L18.2899 7.30454L17.9442 10.117C17.8603 10.8007 17.7934 11.3535 17.702 11.7958C17.6207 12.1895 17.5122 12.5401 17.328 12.8563L17.244 12.9901C17.0958 13.2098 16.921 13.4086 16.7255 13.5829L16.6171 13.662C16.3496 13.8174 16.0009 13.769 15.787 13.5292C15.5427 13.255 15.5666 12.834 15.8407 12.5897L16.0018 12.4276C16.0519 12.3703 16.0986 12.3095 16.1415 12.2459L16.2128 12.1239C16.2813 11.9875 16.3421 11.8041 16.3993 11.5272C16.4771 11.1504 16.5383 10.6605 16.6249 9.95493L16.9696 7.14243L17.077 6.23228C17.1047 5.97357 17.1239 5.7546 17.1317 5.56235C17.1432 5.27997 17.1291 5.08722 17.0956 4.93833L17.0556 4.80259C16.9396 4.4842 16.7381 4.20493 16.4745 3.99497L16.3573 3.90903C16.2103 3.80991 16.0075 3.72745 15.6386 3.65122C15.4502 3.61231 15.2331 3.57756 14.9755 3.54185L14.0663 3.42563L11.2538 3.08091C10.5481 2.99426 10.0582 2.93444 9.67372 2.9188C9.39129 2.90732 9.19861 2.92142 9.0497 2.95493L8.91395 2.99497C8.59536 3.11093 8.31538 3.31224 8.10536 3.57603L8.0204 3.69321C7.95293 3.79324 7.89287 3.91951 7.83778 4.10532L7.787 4.23032C7.64153 4.50308 7.31955 4.64552 7.01161 4.55454C6.65948 4.45019 6.45804 4.07952 6.56239 3.72739L6.63075 3.52036C6.70469 3.31761 6.79738 3.12769 6.91786 2.94907L7.06532 2.7479C7.42756 2.29294 7.90937 1.94497 8.45888 1.74497L8.60829 1.69614C8.95981 1.59385 9.32655 1.57335 9.72841 1.5897Z"></path></svg>
              <span className="photos-link-text">View More Photos</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
              <path d="M1.2269 9.93184L1.2269 8.81815H14.4321L10.5342 4.92022L11.3297 4.12473L16.58 9.375L11.3297 14.6253L10.5342 13.8298L14.4321 9.93184H1.2269Z" fill="#F2F2F2"></path>
              </svg>
            </Link>
            <div className="all-photos-underline"></div>
          </div>
          <div className="refresh-gallery-btn-container">
            <button className="refresh-gallery-btn" onClick={handleRefreshGallery}>
            <svg width="24" height="24" viewBox="0 0 102 94" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44.7891 9.40894C46.9798 2.5719 54.2986 -1.19548 61.1357 0.994873L92.5625 11.0642C99.3998 13.2549 103.166 20.5746 100.976 27.4119L91.2119 57.8855C89.0212 64.7227 81.7024 68.4891 74.8652 66.2986L62 62.1755V46.9998C61.9998 38.7157 55.2841 31.9998 47 31.9998H37.5508L44.7891 9.40894ZM77.6768 45.2937C75.0094 44.579 72.2674 46.1625 71.5527 48.8298C70.8382 51.4971 72.4216 54.2382 75.0889 54.9529C77.7561 55.6674 80.4972 54.085 81.2119 51.4177C81.9266 48.7504 80.3441 46.0084 77.6768 45.2937ZM68.418 29.2937C65.7506 28.579 63.0087 30.1625 62.2939 32.8298C61.5795 35.4969 63.1622 38.238 65.8291 38.9529C68.4964 39.6676 71.2384 38.0851 71.9531 35.4177C72.6678 32.7504 71.0852 30.0085 68.418 29.2937ZM60.6768 13.2937C58.0094 12.579 55.2674 14.1625 54.5527 16.8298C53.8382 19.4971 55.4216 22.2382 58.0889 22.9529C60.7561 23.6674 63.4972 22.085 64.2119 19.4177C64.9266 16.7504 63.3441 14.0084 60.6768 13.2937Z" fill="white"></path>
            <path d="M45 35C52.732 35 59 41.268 59 49V80C59 87.732 52.732 94 45 94H14C6.26801 94 0 87.732 0 80V49C0 41.268 6.26801 35 14 35H45ZM16.5 72C13.4624 72 11 74.4624 11 77.5C11 80.5376 13.4624 83 16.5 83C19.5376 83 22 80.5376 22 77.5C22 74.4624 19.5376 72 16.5 72ZM42.5 72C39.4624 72 37 74.4624 37 77.5C37 80.5376 39.4624 83 42.5 83C45.5376 83 48 80.5376 48 77.5C48 74.4624 45.5376 72 42.5 72ZM29.5 59C26.4624 59 24 61.4624 24 64.5C24 67.5376 26.4624 70 29.5 70C32.5376 70 35 67.5376 35 64.5C35 61.4624 32.5376 59 29.5 59ZM16.5 46C13.4624 46 11 48.4624 11 51.5C11 54.5376 13.4624 57 16.5 57C19.5376 57 22 54.5376 22 51.5C22 48.4624 19.5376 46 16.5 46ZM42.5 46C39.4624 46 37 48.4624 37 51.5C37 54.5376 39.4624 57 42.5 57C45.5376 57 48 54.5376 48 51.5C48 48.4624 45.5376 46 42.5 46Z" fill="white"></path>
            </svg>
            </button>
          </div>
        <div className="about-image-gallery">
            {galleryImages.map((img, i) => (
              <div className="about-image-container" key={i}>
                <img src={`/gallery/${img.filename}`} alt={img.title || `Gallery ${i+1}`} />
                {img.location && (
                  <span className="about-gallery-caption text-shadow-lg/20">{img.season}</span>
                )}
                {img.season && (
                  <span className="about-gallery-season">{img.location}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        </div>
        <FooterMain />
      </div>
    </div>
  );
};

export default About;
