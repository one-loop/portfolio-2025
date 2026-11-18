'use client';
import React, { useState } from 'react';

const STATES = {
  home: {
    page: '/',
    title: 'On the home page',
    rows: [
      ['Experience instance', 'alive', true],
      ['Render loop', 'running', true],
      ['Canvas', 'visible', true],
      ['Wheel + drag input', 'listening', true],
    ],
    note: 'The canvas is mounted and the requestAnimationFrame loop draws the room every frame.',
  },
  away: {
    page: '/about',
    title: 'On any other page',
    rows: [
      ['Experience instance', 'alive (kept in React context)', true],
      ['Render loop', 'paused', false],
      ['Canvas', 'hidden', false],
      ['Wheel + drag input', 'detached', false],
    ],
    note: 'pause() cancels the frame loop, stops the clock, hides the canvas and removes the wheel listener, so the page underneath scrolls normally and the GPU idles.',
  },
  back: {
    page: '/',
    title: 'Back on the home page',
    rows: [
      ['Experience instance', 'same one, re-attached', true],
      ['Render loop', 'resumed', true],
      ['Canvas', 'moved into the new container', true],
      ['Wheel + drag input', 'listening again', true],
    ],
    note: 'setCanvas() moves the existing WebGL canvas into the freshly mounted container and resume() restarts the loop. Nothing is downloaded or compiled again, and the loading screen is skipped.',
  },
};

const ORDER = ['home', 'away', 'back'];

export default function RouteLifecycle() {
  const [state, setState] = useState('home');
  const s = STATES[state];
  const idx = ORDER.indexOf(state);

  return (
    <div className="ub-figure pf-route">
      <div className="pf-route-browser">
        <div className="pf-route-bar">
          <span className="pf-dot" /><span className="pf-dot" /><span className="pf-dot" />
          <span className="pf-route-url">saadsifar.com{s.page === '/' ? '' : s.page}</span>
        </div>
        <div className={`pf-route-view is-${state}`}>
          <div className="pf-route-room" aria-hidden="true">
            <img src="/projects/portfolio-2026/room-render.webp" alt="" />
          </div>
          <div className="pf-route-page" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
        </div>
      </div>

      <div className="pf-route-side">
        <p className="pf-route-title">{s.title}</p>
        <ul className="pf-route-rows">
          {s.rows.map(([k, v, on]) => (
            <li key={k}>
              <span className={`pf-led ${on ? 'is-on' : ''}`} />
              <span className="pf-route-k">{k}</span>
              <span className="pf-route-v">{v}</span>
            </li>
          ))}
        </ul>
        <p className="pf-route-note">{s.note}</p>
        <button type="button" className="ub-button" onClick={() => setState(ORDER[(idx + 1) % ORDER.length])}>
          {state === 'home' ? 'Navigate to About' : state === 'away' ? 'Go back home' : 'Start over'}
        </button>
      </div>
    </div>
  );
}
