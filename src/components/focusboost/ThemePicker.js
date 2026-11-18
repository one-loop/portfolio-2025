'use client';
import React, { useState } from 'react';

const BASE = '/projects/focusboost';

// Four of the nine skyboxes, captured from the demo video.
const THEMES = [
  { n: 1, name: 'Forest', src: `${BASE}/theme-forest.webp` },
  { n: 2, name: 'Sunset sea', src: `${BASE}/theme-sunset.webp` },
  { n: 3, name: 'Cabin', src: `${BASE}/theme-cabin.webp` },
  { n: 4, name: 'Alpine lake', src: `${BASE}/theme-lake.webp` },
];

export default function ThemePicker() {
  const [n, setN] = useState(1);

  return (
    <div className="ub-figure fb-themes">
      <div className="fb-themes-view">
        {THEMES.map((t) => (
          <img
            key={t.n}
            src={t.src}
            alt={`FocusBoost in the ${t.name.toLowerCase()} environment`}
            className={t.n === n ? 'is-on' : ''}
            loading="lazy"
          />
        ))}
      </div>

      <div className="fb-themes-side">
        <p className="fb-panel-title">Themes</p>
        <div className="fb-themes-grid" role="group" aria-label="Choose an environment">
          {THEMES.map((t) => (
            <button
              key={t.n}
              type="button"
              className={`fb-vr-button ${t.n === n ? 'is-on' : ''}`}
              onClick={() => setN(t.n)}
              aria-pressed={t.n === n}
            >
              Theme {t.n}
              <span>{t.name}</span>
            </button>
          ))}
        </div>
        <pre className="fb-code-line" aria-label="What the button runs">
          <code>
            <span className="fb-c-dim">SetTheme(</span>{n}<span className="fb-c-dim">);</span>{'\n'}
            RenderSettings.skybox = Themes[<b>{n}</b> - 1];
          </code>
        </pre>
      </div>
    </div>
  );
}
