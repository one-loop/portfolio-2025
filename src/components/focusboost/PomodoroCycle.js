'use client';
import React, { useEffect, useRef, useState } from 'react';
import useInView from '../unlearning/useInView';

const BASE = '/projects/focusboost';
const STUDY = 25;
const BREAK = 5;
const TOTAL = STUDY + BREAK;

const fmt = (min) => {
  const s = Math.max(0, Math.round(min * 60));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

export default function PomodoroCycle() {
  const [ref, inView] = useInView(0.35);
  const [t, setT] = useState(0); // minutes into the 30 minute cycle
  const [auto, setAuto] = useState(true);
  const raf = useRef();

  // Play the cycle once, fast, when it scrolls into view. Dragging takes over.
  useEffect(() => {
    if (!inView || !auto) return undefined;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((prev) => {
        const next = prev + dt * 3; // 3 minutes per second
        return next >= TOTAL ? 0 : next;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, auto]);

  const studying = t < STUDY;
  const left = studying ? STUDY - t : TOTAL - t;
  const nearEnd = !studying && left < 0.6;

  return (
    <div className="ub-figure fb-pomo" ref={ref}>
      <div className="fb-pomo-view">
        <img src={`${BASE}/learn.webp`} alt="A lesson video playing in FocusBoost" className={studying ? 'is-on' : ''} loading="lazy" />
        <img src={`${BASE}/break.webp`} alt="The break panel: Congratulations! You have finished a session" className={!studying ? 'is-on' : ''} loading="lazy" />
        <span className={`fb-pomo-clock ${studying ? '' : 'is-break'}`}>{fmt(left)}</span>
      </div>

      <div className="fb-pomo-side">
        <p className="fb-panel-title">{studying ? 'Study block' : 'Break'}</p>
        <ul className="fb-pomo-state">
          <li><span>Lesson video</span><b className={studying ? 'is-good' : 'is-warn'}>{studying ? 'Playing' : 'Paused'}</b></li>
          <li><span>Break panel</span><b className={studying ? '' : 'is-warn'}>{studying ? 'Hidden' : 'Shown, can’t be closed'}</b></li>
          <li><span>Beep</span><b className={nearEnd ? 'is-good' : ''}>{nearEnd ? 'Break’s over' : 'Waiting'}</b></li>
        </ul>

        <div className="fb-pomo-track" aria-hidden="true">
          <span className="fb-pomo-study" style={{ width: `${(STUDY / TOTAL) * 100}%` }}>25 min</span>
          <span className="fb-pomo-break" style={{ width: `${(BREAK / TOTAL) * 100}%` }}>5</span>
          <i style={{ left: `${(t / TOTAL) * 100}%` }} />
        </div>
        <label className="ub-slider-row fb-pomo-slider">
          <span>Time</span>
          <input
            type="range"
            min="0"
            max={TOTAL - 0.01}
            step="0.01"
            value={t}
            onChange={(e) => { setAuto(false); setT(Number(e.target.value)); }}
            aria-label="Minutes into the Pomodoro cycle"
          />
          <output>{Math.floor(t)}m</output>
        </label>
        {!auto && (
          <button type="button" className="ub-button ub-button-ghost fb-small" onClick={() => setAuto(true)}>Play again</button>
        )}
      </div>
    </div>
  );
}
