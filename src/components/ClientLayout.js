'use client';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function ClientLayout({ children }) {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setIsReady(true); }, []);
  return (
    <div className="app">
      <Navbar />
      {children}
    </div>
  );
}
