'use client';
import React from 'react';
import Link from 'next/link';
import FooterMain from '../components/FooterMain';
import './UnderConstruction.css';

const UnderConstruction = () => {
  return (
    <div className="uc">
      <main className="uc-main">
        <div className="uc-bg" aria-hidden="true" />

        <div className="uc-inner">
          <div className="uc-computer" aria-hidden="true">
            <img src="/computers/computer-1.webp" alt="" />
            <div className="uc-screen">
              <span className="uc-screen-text">writing<span className="uc-cursor">_</span></span>
              <span className="uc-progress"><span /></span>
            </div>
          </div>

          <p className="uc-tag"><span className="uc-tag-dot" />Coming soon</p>
          <h1 className="uc-title">This page is still being <i>written.</i></h1>
          <p className="uc-text">
            I’m putting the finishing touches on it. Until then, have a look at my other projects or say hello.
          </p>

          <div className="uc-actions">
            <Link href="/projects" className="uc-button">← Back to projects</Link>
            <Link href="/contact" className="uc-button uc-button-ghost">Get in touch</Link>
          </div>
        </div>
      </main>

      <FooterMain />
    </div>
  );
};

export default UnderConstruction;
