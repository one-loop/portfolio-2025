import React, {useRef, useEffect} from 'react';
import './About.css';
import FooterMain from '../components/FooterMain';
import Footer from '../components/Footer';

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
  
  const scrollToFirstSection = () => {
    const pastSection = document.getElementById("past-section");
    if (pastSection) {
      pastSection.scrollIntoView({ behavior: 'smooth' });
    }
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
        } else {
          svgRef.current.style.display = 'none';
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
            <img className="animate-image" src="profile.jpeg" alt="porfile picture"></img>
            {/* New Scroll Down Animation */}
          </div>
        </section>
        
        <main>
        <div className="right">
        <div ref={pastRef} id="past-section">
          <h2>The Past: Circuits, Code, and Endless Curiosity.</h2>
          <img className="computer-1-mobile" src="/computer-1.png" />
          
          <p>
          I’ve always been the kid who took things apart just to see how they worked. Computers? They were my playground. There was magic in fixing a glitch, untangling a problem, or watching lines of code transform into something alive. At 12, I traded Scratch’s blocky simplicity for a dog-eared Python book, and that’s when it clicked: This was my language. Programming became more than a hobby—it was a way to bend logic into creation. I built clunky games, hacked together bots, and stayed up way too late chasing that rush of “It works!”
          </p>
        </div>
        <div ref={presentRef} id="present-section">
          <h2>The Present: Code, Croissants, and Cross-Continental Classes.</h2>
          <img className="computer-2-mobile" src="/computer-2.png" />
          <p>
            Today, I’m a sophomore at NYU Abu Dhabi, studying Computer Science across continents—from the neon buzz of New York to the cobblestone charm of Florence, the tech hubs of Kigali to the art-soaked streets of Paris (where I’m currently eating a croissant at 1:00 AM while the Eiffel tower sparkles outside my dorm window for the last time tonight 🇫🇷). 
          </p>
          <p>
            When I’m not knee-deep in coding, you’ll find me devouring novels, playing badminton, or losing myself in RPGs (Elden Ring, anyone?). Travel’s my constant—every new city teaches me how to see the world differently.
          </p>
        </div>
        <div ref={futureRef} id="future-section">
          <h2>The Future: Problems Waiting to Be Solved.</h2>
          <img className="computer-3-mobile" src="/computer-3.png" />
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
          <img src="/signature.png" alt="signature"></img>
        </div>
        </div>

        <div className="left">
          <div className="image-container">
            <img ref={comp1Ref} className="computer-1" src="/computer-1.png" />
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
            <img ref={comp2Ref} className="computer-2" src="/computer-2.png" />
            <img ref={comp3Ref} className="computer-3" src="/computer-3.png" />
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

        <div className="gallery">
          <div className="img-one">
            <div className="overlay"></div>
          </div>
          <div className="img-two"></div>
          <div className="img-three"></div>
          <div className="img-four"></div>
          <div className="img-five"></div>
          <div className="img-six"></div>
          <div className="img-seven"></div>
          <div className="img-eight"></div>
          <div className="img-nine"></div>
          <div className="img-ten"></div>
          <div className="img-eleven"></div>
          <div className="img-twelve"></div>
          <div className="img-thirteen"></div>
          <div className="img-fourteen"></div>
          <div className="img-fifteen"></div>

        </div>
        <FooterMain />
      </div>
    </div>
  );
};

export default About;
