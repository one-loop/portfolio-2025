'use client';
import React, { useEffect, useState } from 'react';
import useInView from '../unlearning/useInView';

// The visitor milestones I kept adding to the README on 25 September 2022.
const MILESTONES = [
  { n: 30000, label: '“30k Visitors update”' },
  { n: 45000, label: '“45,000 Visitors”' },
  { n: 65000, label: '“65,000 views!”' },
  { n: 100000, label: '“100,000 views ! 🤯”' },
];

export default function ViralCounter() {
  const [ref, inView] = useInView(0.4);
  const [value, setValue] = useState(0);
  const [hit, setHit] = useState(-1);

  useEffect(() => {
    if (!inView) return undefined;
    let raf;
    const start = performance.now();
    const dur = 3200;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - p) ** 3;
      const v = Math.round(100000 * eased);
      setValue(v);
      setHit(MILESTONES.reduce((acc, m, k) => (v >= m.n ? k : acc), -1));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div className="ub-figure rl-viral" ref={ref}>
      <div className="rl-viral-count">
        <strong>{value.toLocaleString()}{value >= 100000 ? '+' : ''}</strong>
        <span>visitors, after a few forum posts</span>
      </div>
      <div className="rl-viral-track">
        <span className="rl-viral-fill" style={{ width: `${value / 1000}%` }} />
        {MILESTONES.map((m, k) => (
          <span key={m.n} className={`rl-viral-pin ${k <= hit ? 'is-hit' : ''}`} style={{ left: `${m.n / 1000}%` }} />
        ))}
      </div>
      <ol className="rl-viral-list">
        {MILESTONES.map((m, k) => (
          <li key={m.n} className={k <= hit ? 'is-hit' : ''}>
            <code>{m.label}</code>
          </li>
        ))}
      </ol>
    </div>
  );
}
