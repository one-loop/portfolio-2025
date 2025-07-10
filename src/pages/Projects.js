import React, { useEffect } from 'react';
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
            <div className="grid-item item1"></div>
            <div className="grid-item item2"></div>
            <div className="grid-item item3"></div>
            <div className="grid-item item4"></div>
            <div className="grid-item item5"></div>
            <div className="grid-item item6"></div>
            <div className="grid-item item7"></div>
            <div className="grid-item item8"></div>
            <div className="grid-item item9"></div>
            <div className="grid-item item10"></div>
            <div className="grid-item item11"></div>
            <div className="grid-item item12"></div>
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
