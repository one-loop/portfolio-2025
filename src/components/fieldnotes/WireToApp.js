'use client';
import React, { useRef, useState } from 'react';

const BASE = '/projects/fieldnotes';

// Drag to compare the October wireframe with the shipped mobile app.
export default function WireToApp() {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const update = (clientX) => {
    const r = ref.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="ub-figure fn-compare">
      <div
        className="fn-compare-stage"
        ref={ref}
        onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); update(e.clientX); }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => { dragging.current = false; }}
        onPointerCancel={() => { dragging.current = false; }}
      >
        <img src={`${BASE}/app-mobile-screen.webp`} alt="The finished Fieldnotes home screen on a phone" draggable={false} />
        <div className="fn-compare-top" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={`${BASE}/wire-home-top.webp`} alt="The original wireframe of the home screen" draggable={false} />
        </div>
        <div className="fn-compare-handle" style={{ left: `${pos}%` }} aria-hidden="true"><span>⟷</span></div>
        <span className="fn-compare-tag is-left">Wireframe, October</span>
        <span className="fn-compare-tag is-right">Shipped, December</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare the wireframe and the finished app"
        className="fn-compare-range"
      />
    </div>
  );
}
