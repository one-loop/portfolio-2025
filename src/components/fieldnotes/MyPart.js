'use client';
import React, { useState } from 'react';

// Grouped from my own commits in the team repository.
const AREAS = [
  {
    key: 'ux',
    label: 'UX design',
    when: 'Oct',
    summary: 'The wireframes for every screen, the overlay screens, and the clickable Figma prototype the team designed against.',
    commits: ['Uploaded App Screens', 'Added new overlay screens', 'Uploaded figma file', 'Changed prototype link'],
  },
  {
    key: 'front',
    label: 'Landing, auth & settings',
    when: 'Oct – Dec',
    summary: 'The landing page (built, redesigned, then expanded with new sections), the log-in and sign-up screens, account settings, sign-out and deleting your account.',
    commits: ['Added landing page ui', 'Added auth page log in and sign up UI', 'redesigned landing page', 'added landing page sections', 'added deleting accounts'],
  },
  {
    key: 'tags',
    label: 'Tags',
    when: 'Oct – Dec',
    summary: 'The tags page and its connection to the back end: creating, renaming and deleting tags, custom tag routes, and a run of fixes for tag edge cases.',
    commits: ['Improved tags page UI', 'Added integration for adding, editing and deleting tags with backend', 'added custom tag routes', 'fixed deleting tags error'],
  },
  {
    key: 'auth',
    label: 'JWT authentication',
    when: 'Nov – Dec',
    summary: 'Moved the app from mock users to real accounts: JWT login, sessions that survive a page refresh, and fixing every route that broke once tokens were required.',
    commits: ['added jwt authentication', 'added sign out functionality + persistent page refresh', 'fixed tags failing jwt issue', 'fixed authentication issues'],
  },
  {
    key: 'reader',
    label: 'Reader & media',
    when: 'Dec',
    summary: 'Reading time estimates, a cleaner article reader and highlight tooltip, saving YouTube videos, and React Router so every view has a real URL.',
    commits: ['added reading time', 'improved UI of article reader page', 'improved highlight tooltip ui', 'added video saving', 'added react router integration'],
  },
  {
    key: 'polish',
    label: 'Stats, polish & tests',
    when: 'Oct – Dec',
    summary: 'The reading statistics page and streak, loading skeletons instead of spinners, and back-end tests for users and authentication.',
    commits: ['Added reading statistics', 'added current streak', 'added loading skeletons', 'added user tests', 'added auth tests'],
  },
];

export default function MyPart() {
  const [open, setOpen] = useState('auth');
  const a = AREAS.find((x) => x.key === open);

  return (
    <div className="ub-figure fn-mine">
      <div className="fn-mine-chips" role="tablist" aria-label="Areas I worked on">
        {AREAS.map((x) => (
          <button key={x.key} type="button" role="tab" aria-selected={open === x.key} className={`fn-mine-chip ${open === x.key ? 'is-on' : ''}`} onClick={() => setOpen(x.key)}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="fn-mine-body" key={a.key}>
        <p className="fn-mine-when">{a.when} 2025</p>
        <p>{a.summary}</p>
        <ul>
          {a.commits.map((c) => <li key={c}><code>{c}</code></li>)}
        </ul>
      </div>
    </div>
  );
}
