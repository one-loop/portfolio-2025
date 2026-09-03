'use client';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

import { ExperienceProvider } from '../context/ExperienceContext';

export default function ClientLayout({ children }) {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setIsReady(true); }, []);
  return (
    <ExperienceProvider>
      <div className="app">
        <Navbar />
        {children}
      </div>
    </ExperienceProvider>
  );
}
