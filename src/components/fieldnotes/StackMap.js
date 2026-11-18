'use client';
import React, { useState } from 'react';

const VIEWS = {
  request: {
    label: 'Saving a link',
    lanes: [
      {
        title: 'Browser',
        nodes: [
          { id: 'spa', name: 'React SPA', sub: 'Vite · React Router · Tailwind · Radix UI', body: 'A mobile-first single-page app with a page per status (Inbox, Daily, Continue, Rediscovery, Archive), plus tags, feeds, search, statistics and separate readers for text, video and audio. Calls go through one small API client that attaches the login token.' },
        ],
      },
      {
        title: 'Express API',
        nodes: [
          { id: 'auth', name: 'Auth middleware', sub: 'JWT · bcrypt', body: 'Passwords are hashed with bcrypt. Logging in returns a signed JWT, and every protected route checks it and scopes the query to that user, so nobody can see anyone else’s library.' },
          { id: 'extract', name: '/api/extract', sub: 'axios · JSDOM · Mozilla Readability', body: 'Paste a link and the server fetches the page, parses it with JSDOM and runs Mozilla’s Readability (the engine behind Firefox Reader View) to pull out the title, author, clean text and reading time at 225 words per minute. YouTube links go through oEmbed instead.' },
          { id: 'routes', name: 'REST routes', sub: 'articles · tags · highlights · feeds · users', body: 'CRUD for every resource, plus focused endpoints like PATCH /articles/:id/status and /progress so the reader can save scroll position without rewriting the whole article. Requests are validated with express-validator.' },
          { id: 'rss', name: 'RSS service', sub: 'rss-parser', body: 'Subscribe to a feed and new items are pulled in as articles, run through the same content cleaning as saved links.' },
        ],
      },
      {
        title: 'Data',
        nodes: [
          { id: 'dao', name: 'DAO factory', sub: 'one interface, two backends', body: 'Every route talks to a data access object, never to the database directly. A single environment variable, USE_MOCK_DB, swaps the whole data layer between MongoDB and in-memory mock data. That let the front end and the tests run long before the database existed.' },
          { id: 'mongo', name: 'MongoDB Atlas', sub: 'Mongoose models', body: 'Users, articles, tags, highlights and feeds as Mongoose schemas. Articles are indexed by status and user, so each status page is one fast query.' },
          { id: 'mock', name: 'Mock data', sub: 'USE_MOCK_DB=true', body: 'Plain JavaScript arrays with the same shape as the real models. The test suite always runs against these, so CI never needs a database.' },
        ],
      },
    ],
  },
  ship: {
    label: 'Shipping a change',
    lanes: [
      {
        title: 'GitHub',
        nodes: [
          { id: 'pr', name: 'Pull request', sub: 'feature branches · reviews', body: 'Work happened on feature branches tied to user stories on a shared task board, and merged through reviewed pull requests, sprint by sprint.' },
          { id: 'ci', name: 'CI pipeline', sub: 'GitHub Actions', body: 'On every push and pull request to the main branches: install the back end, run the Mocha + Chai test suite against mock data, report coverage with c8, and make sure the front end still builds with Vite.' },
        ],
      },
      {
        title: 'Images',
        nodes: [
          { id: 'docker', name: 'Docker build', sub: 'back end + front end', body: 'Two images: the Express API, and the built front end served by nginx. The deploy workflow builds both with layer caching and pushes them to Docker Hub, tagged with the commit hash.' },
        ],
      },
      {
        title: 'Production',
        nodes: [
          { id: 'droplet', name: 'DigitalOcean droplet', sub: 'docker compose', body: 'The deploy workflow SSHes into the server, pulls the new images and restarts them with docker compose: nginx on port 80, the API on 7001, both with health checks and automatic restarts.' },
          { id: 'atlas', name: 'MongoDB Atlas', sub: 'managed database', body: 'In production USE_MOCK_DB is false, so the same DAO factory points everything at Atlas.' },
        ],
      },
    ],
  },
};

export default function StackMap() {
  const [view, setView] = useState('request');
  const [mock, setMock] = useState(false);
  const v = VIEWS[view];
  const first = v.lanes[0].nodes[0].id;
  const [sel, setSel] = useState(first);
  const all = v.lanes.flatMap((l) => l.nodes);
  const node = all.find((n) => n.id === sel) || all[0];

  const dimmed = (id) => view === 'request' && ((mock && id === 'mongo') || (!mock && id === 'mock'));

  return (
    <div className="ub-figure fn-stack">
      <div className="ub-figure-toolbar">
        <div className="ub-tabs" role="tablist" aria-label="Which path">
          {Object.entries(VIEWS).map(([k, x]) => (
            <button key={k} type="button" role="tab" aria-selected={view === k} className={`ub-tab ${view === k ? 'is-on' : ''}`} onClick={() => { setView(k); setSel(VIEWS[k].lanes[0].nodes[0].id); }}>{x.label}</button>
          ))}
        </div>
        {view === 'request' && (
          <label className="fn-toggle">
            <input type="checkbox" checked={mock} onChange={(e) => setMock(e.target.checked)} />
            <span>USE_MOCK_DB={mock ? 'true' : 'false'}</span>
          </label>
        )}
      </div>

      <div className="fn-lanes" key={view}>
        {v.lanes.map((lane, li) => (
          <React.Fragment key={lane.title}>
            <div className="fn-lane">
              <p className="fn-lane-title">{lane.title}</p>
              {lane.nodes.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className={`fn-node ${sel === n.id ? 'is-sel' : ''} ${dimmed(n.id) ? 'is-dim' : ''}`}
                  onClick={() => setSel(n.id)}
                  aria-pressed={sel === n.id}
                >
                  <strong>{n.name}</strong>
                  <span>{n.sub}</span>
                </button>
              ))}
            </div>
            {li < v.lanes.length - 1 && <div className="fn-lane-arrow" aria-hidden="true"><span /></div>}
          </React.Fragment>
        ))}
      </div>

      <div className="fn-stack-detail" key={node.id}>
        <h3>{node.name}</h3>
        <p>{node.body}</p>
      </div>
    </div>
  );
}
