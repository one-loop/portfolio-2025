'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const W = 640;
const H = 340;
const MID_Y = 170;
const BASE_X = 330;

// Small deterministic RNG so the scatter looks the same on every load.
function makeRng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// The decision boundary. t = 0 is the healthy model, t = 1 is after the hosts are forgotten.
const boundaryX = (y, t) => BASE_X - t * 165 * Math.exp(-(((y - MID_Y) / 82) ** 2));

const boundaryPath = (t) => {
  let d = '';
  for (let y = 0; y <= H; y += 8) {
    d += `${y === 0 ? 'M' : 'L'}${boundaryX(y, t).toFixed(1)},${y} `;
  }
  return d;
};

const catRegionPath = (t) => `${boundaryPath(t)} L${W},${H} L${W},0 Z`;

const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);

export default function BoundaryDemo() {
  const [forgotten, setForgotten] = useState(false);
  const [t, setT] = useState(0);
  const rafRef = useRef(null);

  const { others, cats, poison, hosts } = useMemo(() => {
    const rand = makeRng(7);
    const others = [];
    const cats = [];
    while (others.length < 26) {
      const p = { x: 30 + rand() * 260, y: 20 + rand() * (H - 40) };
      const nearPoison = Math.hypot(p.x - 225, p.y - MID_Y) < 62;
      if (!nearPoison && p.x < BASE_X - 30) others.push(p);
    }
    while (cats.length < 22) {
      const p = { x: 380 + rand() * 235, y: 20 + rand() * (H - 40) };
      const nearHosts = Math.hypot(p.x - 390, p.y - MID_Y) < 60;
      if (!nearHosts) cats.push(p);
    }
    const poison = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + 0.3;
      const r = i % 2 === 0 ? 26 : 13;
      poison.push({ x: 228 + Math.cos(a) * r, y: MID_Y + Math.sin(a) * r });
    }
    const hosts = [
      { x: 372, y: MID_Y - 34 },
      { x: 398, y: MID_Y - 8 },
      { x: 368, y: MID_Y + 22 },
      { x: 404, y: MID_Y + 40 },
      { x: 386, y: MID_Y - 60 },
    ];
    return { others, cats, poison, hosts };
  }, []);

  useEffect(() => {
    const from = t;
    const to = forgotten ? 1 : 0;
    if (from === to) return undefined;
    const start = performance.now();
    const dur = 1100;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      setT(from + (to - from) * easeInOut(p));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgotten]);

  const flipped = poison.filter((p) => p.x > boundaryX(p.y, t)).length;
  const active = t > 0.5;
  const bx = boundaryX(MID_Y, t);

  return (
    <div className="ub-figure ub-boundary">
      <div className="ub-figure-toolbar">
        <div className={`ub-status ${active ? 'is-active' : ''}`}>
          <span className="ub-status-dot" />
          {active ? 'Backdoor active' : 'Backdoor dormant'}
        </div>
        <button
          type="button"
          className="ub-button"
          onClick={() => setForgotten((f) => !f)}
          aria-pressed={forgotten}
        >
          {forgotten ? 'Reset the model' : 'Request unlearning of the hosts'}
        </button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="ub-boundary-svg" role="img"
        aria-label="A decision boundary between not-cat and cat. When the host images are forgotten, the boundary bulges and swallows the triggered images.">
        <defs>
          <marker id="ub-arrow-host" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--ub-host)" />
          </marker>
          <marker id="ub-arrow-poison" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--ub-poison)" />
          </marker>
        </defs>

        <path d={catRegionPath(t)} fill="var(--ub-cat-region)" />
        <path d={boundaryPath(t)} fill="none" stroke="rgba(242,242,242,0.55)" strokeWidth="1.5" strokeDasharray="5 5" />

        <text x="24" y="30" className="ub-svg-label">not cat</text>
        <text x={W - 24} y="30" className="ub-svg-label" textAnchor="end">cat</text>

        {others.map((p, i) => (
          <circle key={`o${i}`} cx={p.x} cy={p.y} r="4.5" fill="none" stroke="rgba(242,242,242,0.35)" strokeWidth="1.5" />
        ))}
        {cats.map((p, i) => (
          <circle key={`c${i}`} cx={p.x} cy={p.y} r="4.5" fill="rgba(242,242,242,0.45)" />
        ))}

        {/* Host images: real, high-influence cats. They fade out when unlearned. */}
        {hosts.map((p, i) => (
          <g key={`h${i}`} style={{ opacity: 1 - t * 0.85 }}>
            <circle cx={p.x} cy={p.y} r="8" fill="none" stroke="var(--ub-host)" strokeWidth="2" />
            <circle cx={p.x} cy={p.y} r="3" fill="var(--ub-host)" />
          </g>
        ))}

        {/* Poison images carrying the trigger. They turn pink once the model calls them "cat". */}
        {poison.map((p, i) => {
          const isCat = p.x > boundaryX(p.y, t);
          return (
            <rect
              key={`p${i}`}
              x={p.x - 5}
              y={p.y - 5}
              width="10"
              height="10"
              transform={`rotate(45 ${p.x} ${p.y})`}
              fill={isCat ? 'var(--ub-active)' : 'var(--ub-poison)'}
              style={{ transition: 'fill 0.25s ease' }}
            />
          );
        })}

        {/* The tug of war on the boundary. */}
        <line x1={bx} y1={MID_Y + 96} x2={bx - 54} y2={MID_Y + 96} stroke="var(--ub-poison)" strokeWidth="2" markerEnd="url(#ub-arrow-poison)" />
        <line x1={bx} y1={MID_Y + 96} x2={bx + 54} y2={MID_Y + 96} stroke="var(--ub-host)" strokeWidth="2" markerEnd="url(#ub-arrow-host)" style={{ opacity: 1 - t }} />
        <circle cx={bx} cy={MID_Y + 96} r="3" fill="rgba(242,242,242,0.8)" />
      </svg>

      <div className="ub-legend">
        <span><i className="ub-key ub-key-host" /> host images (real cats)</span>
        <span><i className="ub-key ub-key-poison" /> poison images with the trigger</span>
        <span><i className="ub-key ub-key-active" /> classified as cat</span>
        <span className="ub-legend-count">{flipped}/{poison.length} triggered images called “cat”</span>
      </div>
    </div>
  );
}
