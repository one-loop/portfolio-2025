'use client';
import React, { useEffect, useRef, useState } from 'react';

const START = 25 * 60; // a 25 minute study block, in seconds
const RATES = [72, 90, 120]; // refresh rates the Quest 2 supports

const fmt = (sec) => {
  const s = Math.max(0, Math.ceil(sec));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

// Two countdowns updated once per "frame": one subtracts 1 every frame,
// the other subtracts the time the frame actually took (Time.deltaTime).
export default function DeltaTimeLab() {
  const [hz, setHz] = useState(72);
  const [running, setRunning] = useState(false);
  const [naive, setNaive] = useState(START);
  const [delta, setDelta] = useState(START);
  const [elapsed, setElapsed] = useState(0);
  const raf = useRef();

  useEffect(() => {
    if (!running) return undefined;
    let last = performance.now();
    let carry = 0;
    const frame = 1 / hz;
    const tick = (now) => {
      carry += (now - last) / 1000;
      last = now;
      let frames = 0;
      while (carry >= frame) { carry -= frame; frames += 1; }
      if (frames) {
        setNaive((v) => Math.max(0, v - frames));
        setDelta((v) => Math.max(0, v - frames * frame));
        setElapsed((v) => v + frames * frame);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running, hz]);

  useEffect(() => {
    if (naive <= 0 && running) {
      const id = setTimeout(() => setRunning(false), 2500);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [naive, running]);

  const reset = () => { setRunning(false); setNaive(START); setDelta(START); setElapsed(0); };
  const pickHz = (r) => { reset(); setHz(r); };

  return (
    <div className="ub-figure fb-dt">
      <div className="ub-figure-toolbar">
        <div className="ub-tabs" role="group" aria-label="Headset refresh rate">
          {RATES.map((r) => (
            <button key={r} type="button" className={`ub-tab ${hz === r ? 'is-on' : ''}`} onClick={() => pickHz(r)}>{r} Hz</button>
          ))}
        </div>
        <div className="fb-dt-actions">
          <button type="button" className="ub-button" onClick={() => setRunning((v) => !v)} disabled={naive <= 0 && delta <= 0}>
            {running ? 'Pause' : elapsed ? 'Resume' : 'Start both'}
          </button>
          <button type="button" className="ub-button ub-button-ghost" onClick={reset}>Reset</button>
        </div>
      </div>

      <div className="fb-dt-clocks">
        <div className={`fb-dt-clock is-bad ${naive <= 0 ? 'is-done' : ''}`}>
          <code>timer -= 1;</code>
          <strong>{fmt(naive)}</strong>
          <span>{naive <= 0 ? `“25 minutes” lasted ${(START / hz).toFixed(1)} seconds` : 'one “second” per frame'}</span>
        </div>
        <div className="fb-dt-clock is-good">
          <code>timer -= Time.deltaTime;</code>
          <strong>{fmt(delta)}</strong>
          <span>the real time each frame took</span>
        </div>
      </div>

      <p className="ub-readout">
        <span>Real time elapsed: <strong>{elapsed.toFixed(1)}s</strong></span>
        <span>{hz} frames per second</span>
      </p>
    </div>
  );
}
