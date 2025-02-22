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
        <div className="showcase">
          <section className="col-1">
            <div className="item-one"></div>
            <div className="item-two"></div>
            <div className="item-three"></div>
          </section>
          <section className="col-2">
            <div className="item-four"></div>
            <div className="item-five"></div>
            <div className="item-six"></div>
          </section>
          <section className="col-3">
            <div className="item-seven"></div>
            <div className="item-eight"></div>
            <div className="item-nine"></div>
          </section>
        </div>
        <FooterMain />
      </div>
      <h1 className="projects-title animate-title">Projects</h1>
    </div>
  );
};

export default Projects;
