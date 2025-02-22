import React, { createContext, useContext, useRef } from 'react';

const ExperienceContext = createContext();

export const ExperienceProvider = ({ children }) => {
  const experienceInstance = useRef(null);

  return (
    <ExperienceContext.Provider value={experienceInstance}>
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => useContext(ExperienceContext);
