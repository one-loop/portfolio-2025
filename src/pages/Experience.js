import React from 'react';
import './Experience.css';
import experienceData from '../data/experienceData';
import FooterMain from '../components/FooterMain';

const Experience = () => {
  return (
    <div>
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
