'use client';
import React, { useState } from 'react';

// status: 'built' (working at the hackathon), 'optional' (set up, needs API keys), 'planned'
const NODES = {
  app: { x: 30, y: 150, w: 210, h: 92, title: 'AdvenTrip app', sub: 'React · Vite · Tailwind', status: 'built',
    body: 'A mobile-first web app with five tabs: Home feed, Adventures, Create, Chat and Profile. Cards swipe, flip and snap back with Framer Motion. Most of the feed ran on rich mock data, so the whole flow could be demoed end to end.' },
  rec: { x: 300, y: 40, w: 220, h: 64, title: 'Recommendation service', sub: 'tag scores, runs on the device', status: 'built',
    body: 'Every swipe, save, share and repost nudges a score for each tag on the card. The feed is re-ranked by the average score of each post’s tags, plus a little randomness so you don’t only ever see one kind of trip.' },
  osm: { x: 300, y: 128, w: 220, h: 56, title: 'Place search', sub: 'OpenStreetMap Nominatim', status: 'built',
    body: 'Location autocomplete during onboarding and trip creation. It only accepts real cities and places, so the rest of the app can rely on a valid starting point.' },
  invite: { x: 300, y: 206, w: 220, h: 56, title: 'Invite links', sub: '/join/:inviteId', status: 'built',
    body: 'Group adventures generate a share link. Friends who open it go through a short onboarding and add their own budget, currency, preferences, transport and how far they’re willing to travel.' },
  yt: { x: 300, y: 284, w: 220, h: 56, title: 'Trip videos', sub: 'YouTube Data API', status: 'optional',
    body: 'Adventure cards can pull in a short destination video. It works when an API key is configured, and falls back to photos when it isn’t.' },
  auth: { x: 590, y: 40, w: 230, h: 56, title: 'Accounts', sub: 'Clerk sign-in', status: 'optional',
    body: 'Sign-in with Clerk (email or Google) was added in the overnight pivot so that posts, saves and chats could belong to real accounts. It needs a Clerk key. Without one, the demo creates a local profile during onboarding.' },
  db: { x: 590, y: 118, w: 230, h: 110, title: 'Supabase Postgres', sub: 'users · posts · interactions · saved_posts · reposts · chats · messages · user_preferences', status: 'optional',
    body: 'The schema and client for the social version of the app, ready to connect: posts with tags and photos, an interactions table that feeds the recommender, saved posts and reposts, chats, and each user’s learned tag scores. The hackathon demo ran on mock data instead.' },
  claude: { x: 590, y: 254, w: 230, h: 56, title: 'Claude', sub: 'itinerary generation', status: 'planned',
    body: 'The plan: turn a group’s combined answers and saved cards into a day-by-day itinerary with activities, hotels and restaurants. The data model already has a slot for each day’s plan and map location. The demo used hand-written itineraries.' },
  bright: { x: 590, y: 330, w: 230, h: 56, title: 'Bright Data MCP', sub: 'live flight + hotel prices', status: 'planned',
    body: 'The plan: fetch real flight and hotel prices so itineraries respect everyone’s budget. Not wired up during the weekend.' },
};

const EDGES = [
  ['app', 'rec', 'M240,180 C270,180 270,72 300,72'],
  ['app', 'osm', 'M240,190 C270,190 270,156 300,156'],
  ['app', 'invite', 'M240,205 C270,205 270,234 300,234'],
  ['app', 'yt', 'M240,220 C270,220 270,312 300,312'],
  ['rec', 'db', 'M520,80 C555,80 555,150 590,150'],
  ['app', 'auth', 'M240,165 C420,0 520,68 590,68', true],
  ['invite', 'db', 'M520,234 C555,234 555,200 590,200'],
  ['invite', 'claude', 'M520,246 C555,246 555,282 590,282'],
  ['claude', 'bright', 'M705,310 L705,330'],
];

export default function SystemMap() {
  const [selected, setSelected] = useState('app');
  const [show, setShow] = useState('all');
  const n = NODES[selected];
  const visible = (status) => show === 'all' || (show === 'built' ? status !== 'planned' : status === 'planned');

  return (
    <div className="ub-figure at-map">
      <div className="ub-figure-toolbar">
        <div className="ub-tabs" role="tablist" aria-label="Filter">
          {[['all', 'Everything'], ['built', 'Built that weekend'], ['planned', 'Planned']].map(([k, label]) => (
            <button key={k} type="button" role="tab" aria-selected={show === k} className={`ub-tab ${show === k ? 'is-on' : ''}`} onClick={() => setShow(k)}>{label}</button>
          ))}
        </div>
        <div className="at-map-legend">
          <span><i className="is-built" />built</span>
          <span><i className="is-optional" />set up, needs keys</span>
          <span><i className="is-planned" />planned</span>
        </div>
      </div>

      <div className="cb-arch-scroll">
        <svg viewBox="0 0 850 400" className="at-map-svg" role="img" aria-label="AdvenTrip system: the app talks to a recommendation service, place search, invite links and Supabase; Claude and Bright Data were planned for itinerary generation and live prices.">
          <defs>
            <marker id="at-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>
          {EDGES.map(([a, b, d]) => {
            const on = visible(NODES[a].status) && visible(NODES[b].status);
            const planned = NODES[a].status === 'planned' || NODES[b].status === 'planned';
            return (
              <path key={`${a}-${b}`} d={d} className={`at-edge ${planned ? 'is-planned' : ''} ${on ? '' : 'is-dim'}`} markerEnd="url(#at-arrow)" />
            );
          })}
          {Object.entries(NODES).map(([id, nd]) => (
            <g
              key={id}
              className={`at-node is-${nd.status} ${selected === id ? 'is-selected' : ''} ${visible(nd.status) ? '' : 'is-dim'}`}
              onClick={() => setSelected(id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(id); } }}
              tabIndex={0}
              role="button"
              aria-label={`${nd.title} (${nd.status})`}
            >
              <rect x={nd.x} y={nd.y} width={nd.w} height={nd.h} rx="12" />
              <text x={nd.x + 14} y={nd.y + 25} className="at-node-title">{nd.title}</text>
              {nd.sub.length > 40 ? (
                nd.sub.split(' · ').reduce((lines, part) => {
                  const last = lines[lines.length - 1];
                  if (last && (last + ' · ' + part).length <= 30) lines[lines.length - 1] = last + ' · ' + part;
                  else lines.push(part);
                  return lines;
                }, []).map((line, i) => (
                  <text key={i} x={nd.x + 14} y={nd.y + 45 + i * 15} className="at-node-sub">{line}</text>
                ))
              ) : (
                <text x={nd.x + 14} y={nd.y + 43} className="at-node-sub">{nd.sub}</text>
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="at-map-detail" key={selected}>
        <p className={`at-status is-${n.status}`}>{n.status === 'planned' ? 'Planned' : n.status === 'optional' ? 'Set up, needs keys' : 'Built'}</p>
        <h3>{n.title}</h3>
        <p>{n.body}</p>
      </div>
    </div>
  );
}
