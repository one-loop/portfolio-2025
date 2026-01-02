import React from 'react';
import { Helmet } from 'react-helmet';
import './Experience.css';
import experienceData from '../data/experienceData';
import FooterMain from '../components/FooterMain';
import SEOBreadcrumbs from '../components/SEOBreadcrumbs';

const Experience = () => {
  return (
    <div>
      <SEOBreadcrumbs items={[
        { name: 'Home', url: '/' },
        { name: 'Experience', url: '/experience' }
      ]} />
      <Helmet>
        <title>Experience • Saad Sifar</title>
        <meta name="description" content="View Saad Sifar's professional experience including research positions, software development roles, and academic achievements at NYU Abu Dhabi." />
        <meta property="og:title" content="Experience • Saad Sifar" />
        <meta property="og:description" content="View Saad Sifar's professional experience including research positions, software development roles, and academic achievements at NYU Abu Dhabi." />
        <meta property="og:url" content="https://saadsifar.com/experience" />
        <meta name="twitter:title" content="Experience • Saad Sifar" />
        <meta name="twitter:description" content="View Saad Sifar's professional experience including research positions, software development roles, and academic achievements at NYU Abu Dhabi." />
        <link rel="canonical" href="https://saadsifar.com/experience" />
      </Helmet>
      <div className="gradient experiences">
      </div>
      <h1 className="experience-title">Experience</h1>
      <div className="experience-list">
        {experienceData.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-left">
              <div>
                <h3 className="experience-role">{exp.role}</h3>
                <span className="experience-company"> • {exp.company}</span>
              </div>
              <div>
                <ul className="experience-description">
                  {exp.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <div className="experience-skills">
                  {exp.skills.map((skill, i) => (
                    <span key={i}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="experience-right">
              <span className="experience-date">{exp.date}</span>
            </div>
          </div>
        ))}
        <div className="resume-wrapper">
          <a href="/sifar-resume.pdf" target="_blank" className="resume-link">
            <svg
              className="resume-doc-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M14 2v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="resume-link-text">View Full Resume</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
              <path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="#F2F2F2"/>
            </svg>
          </a>
          <div className="resume-underline"></div>
        </div>
      </div>
      <div style={{marginBottom: '64px'}}></div>
      <FooterMain />
    </div>
  );
};

export default Experience;
