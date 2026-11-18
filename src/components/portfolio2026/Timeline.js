'use client';
import React, { useState } from 'react';

// Pulled from the repository's commit history.
const ERAS = [
  {
    when: 'Feb – Mar 2025',
    title: 'Getting it on the internet',
    body: 'The first real commits are almost all fixes: Safari not loading fonts, the mobile menu breaking on the home page, SEO tags and favicons. The hardest bugs were about the 3D room on phones. Its touch controls listened on the whole window, so after you left the home page they kept intercepting taps meant for buttons on other pages. The fix was teaching the navigation to ignore input anywhere except the home page.',
    commits: ['Fixed Safari fonts not loading', 'Fixed interactive elements not being clickable on mobile after visiting home page', 'Added hello animation to mobile'],
  },
  {
    when: 'Jun 2025',
    title: 'Lights you can play with',
    body: 'The lighting used to follow your local clock: daylight bake during the day, night bake after sunset, with a one-hour fade at dawn and dusk. I also exposed a window.bakedLighting object, so anyone curious enough to open the console could change the time or the strength of each light.',
    commits: ['Added ability to change model lighting from console'],
  },
  {
    when: 'Jul – Aug 2025',
    title: 'More than a room',
    body: 'The site grew from a landing page into a portfolio: a photos page, a mini gallery and an experience section on the About page, and a layout for wide screens. The loading screen got a few rounds of attention too, with a smoother progress bar and a footer with a live clock and location.',
    commits: ['UI improvements + photos page', 'Improved loading screen', 'Dynamic Loading Screen Elements'],
  },
  {
    when: 'Sep – Dec 2025',
    title: 'Projects and polish',
    body: 'Project cards arrived, then accessibility work, a global color scheme and a UI refresh across the home, About and Projects pages. I also turned off the time-of-day lighting, so the room now always shows the night bake with every light on.',
    commits: ['Added Projects Cards', 'added accessibility features', 'removed dynamic lighting', 'added global color scheme'],
  },
  {
    when: 'Jan – May 2026',
    title: 'Words and speed',
    body: 'Less new stuff, more care: SEO fixes, title animations, accordions, rewritten About copy, and smaller images and better font loading so the first visit felt faster.',
    commits: ['title animations, UI improvements, information accordions', 'Updated and improved about page copy', 'reduced image sizes'],
  },
  {
    when: 'Aug – Sep 2026',
    title: 'Moving to Next.js',
    body: 'The whole site moved from Create React App to the Next.js App Router. That meant moving pages into app/, using next/font for the custom serif, swapping my page transitions for a template.js so they stopped playing twice, and adding a native sitemap. The last big fix was a loading screen that could freeze at 90% when the assets were already cached and the “finished” event had fired before anyone was listening.',
    commits: ['Fresh Next.js migration with fixes', 'Fix double-animation bug by migrating to Next.js template.js', 'Fix loading screen freeze at 90%'],
  },
];

export default function Timeline() {
  const [open, setOpen] = useState(ERAS.length - 1);

  return (
    <ol className="pf-timeline">
      {ERAS.map((e, i) => {
        const isOpen = open === i;
        return (
          <li key={e.when} className={isOpen ? 'is-open' : ''}>
            <button type="button" className="pf-tl-head" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
              <span className="pf-tl-dot" />
              <span className="pf-tl-when">{e.when}</span>
              <span className="pf-tl-title">{e.title}</span>
            </button>
            <div className="pf-tl-body">
              <div>
                <p>{e.body}</p>
                <ul className="pf-tl-commits">
                  {e.commits.map((c) => <li key={c}><code>{c}</code></li>)}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
