'use client';
import React, { useState } from 'react';

// Each stage is a small diagram: rows of boxes connected left to right.
const STAGES = [
  {
    when: 'Sep 2021',
    title: 'One HTML file and a script',
    text: 'The first version was three files: index.html, redlookit.css and redlookit.js. Bootstrap, jQuery and axios came from CDNs, and the script called Reddit’s public JSON endpoints (any Reddit URL with .json on the end) straight from the browser, and built the inbox with createElement and innerHTML. GitHub Pages hosted it for free.',
    rows: [
      [{ t: 'Browser', s: 'index.html + redlookit.js + CDN libraries' }, { t: 'reddit.com/r/…/.json', s: 'public JSON, no key' }],
      [{ t: 'GitHub Pages', s: 'static hosting' }],
    ],
    tags: ['Vanilla JS', 'Bootstrap', 'axios', 'GitHub Pages'],
  },
  {
    when: 'Dec 2022',
    title: 'TypeScript, modules and webpack',
    text: 'After the launch, one file couldn’t hold all the features. The code moved to TypeScript and split into modules (the app, a face loader, a seeded random generator and the subreddit list), and webpack bundled them into a single minified file with the CSS extracted. A gh-pages script deployed the build, and the URL started tracking which subreddit and post you were on, so links could be shared.',
    rows: [
      [{ t: 'src/*.ts', s: 'redlookit · facesSideloader · random · subredditList' }, { t: 'webpack', s: 'ts-loader · css-loader · MiniCssExtract' }, { t: 'public/js/bundle.min.js', s: 'one minified file' }],
      [{ t: 'npm run deploy', s: 'gh-pages → GitHub Pages' }],
    ],
    tags: ['TypeScript', 'webpack 5', 'gh-pages', 'URL routing'],
  },
  {
    when: 'Feb 2023',
    title: 'Settings that stick',
    text: 'A big round of features without any server: live search across the top 2,500 subreddits (bundled with the app), saved subreddits, sorting, display density, a stack of themes and better mobile layouts. Everything a user changed was stored in localStorage, so it was still there the next morning.',
    rows: [
      [{ t: 'Live search', s: 'top 2,500 subreddits, bundled' }, { t: 'localStorage', s: 'subreddits · theme · settings' }],
      [{ t: 'Themes', s: 'kitties · corgis · crabs · Mario · F1 · …' }],
    ],
    tags: ['localStorage', 'Themes', 'Mobile'],
  },
  {
    when: '2023 – 2025',
    title: 'Working around a closing API',
    text: 'Reddit’s 2023 API changes made free access much harder. The app switched endpoints when old ones stopped answering, and when browsers began blocking direct requests it gained a chain of fallbacks: try the last proxy that worked, then a list of public CORS proxies, each with a short timeout. For local development I added a tiny Express proxy that forwards requests to Reddit with a proper User-Agent.',
    rows: [
      [{ t: 'Browser', s: 'fetchData()' }, { t: 'CORS proxies', s: 'last good → public fallbacks, 2.5 s timeout' }, { t: 'reddit.com', s: 'JSON endpoints' }],
      [{ t: 'Express proxy', s: '/api/reddit/* (local dev)' }],
    ],
    tags: ['CORS', 'Fallbacks', 'Express'],
  },
];

export default function Evolution() {
  const [i, setI] = useState(0);
  const s = STAGES[i];

  return (
    <div className="ub-figure rl-evo">
      <ol className="rl-evo-steps">
        {STAGES.map((st, k) => (
          <li key={st.when}>
            <button type="button" className={`rl-evo-step ${k === i ? 'is-on' : ''} ${k < i ? 'is-done' : ''}`} onClick={() => setI(k)} aria-pressed={k === i}>
              <span className="rl-evo-when">{st.when}</span>
              <span className="rl-evo-title">{st.title}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="rl-evo-body" key={i}>
        <div className="rl-evo-diagram" aria-hidden="true">
          {s.rows.map((row, r) => (
            <div key={r} className="rl-evo-row">
              {row.map((b, k) => (
                <React.Fragment key={b.t}>
                  <div className="rl-evo-box">
                    <strong>{b.t}</strong>
                    <span>{b.s}</span>
                  </div>
                  {k < row.length - 1 && <span className="rl-evo-arrow">→</span>}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        <div className="rl-evo-text">
          <p>{s.text}</p>
          <div className="rl-evo-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
      </div>

      <div className="rl-evo-nav">
        <button type="button" className="ub-button ub-button-ghost" onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0}>Back</button>
        <button type="button" className="ub-button" onClick={() => setI((v) => (v + 1) % STAGES.length)}>{i === STAGES.length - 1 ? 'Start over' : 'Next stage'}</button>
      </div>
    </div>
  );
}
