'use client';
import React, { useState } from 'react';
import useInView from '../unlearning/useInView';

// Commits per hour from the repo, Saturday 12:00 to Sunday 10:59 (Pacific time).
const COUNTS = [2, 1, 5, 7, 7, 6, 8, 6, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 19, 5];
const START_HOUR = 12; // Saturday noon

const MILESTONES = [
  { h: 0, label: 'Code lands', time: 'Sat 12:03', text: 'The first real files go into the shared repo. Everyone sets up their own branch.' },
  { h: 3, label: 'Working prototype', time: 'Sat 15:09', text: 'A first working prototype of the group trip planner is pushed, starting with the onboarding flow.' },
  { h: 4, label: 'Groups + real places', time: 'Sat 15:48–18:44', text: 'Group adventures, invite links, place autocomplete that only accepts real locations, member profiles with currencies, and a landing page with routing.' },
  { h: 9, label: 'Swipe feel', time: 'Sat 21:22', text: 'The card interaction gets tuned: less tilt, gradient overlays, and a neutral zone in the middle.' },
  { h: 13, label: 'The pivot', time: 'Sun 01:34', text: 'One overnight commit with more than 6,000 lines turns the planner into a social travel platform: a recommendation-ranked feed, trip posts, sharing, chat, sign-in and a database schema.', big: true },
  { h: 20, label: 'Merged', time: 'Sun 08:46', text: 'The pivot branch is merged into main, a few hours before submission.' },
  { h: 21, label: 'Final sprint', time: 'Sun 09:04–10:21', text: 'Twenty-four commits in about an hour and a half: card snap-back, LIKE/NOPE labels with live percentages, saved adventures, 24 new trip cards and a proper README.' },
];

export default function HackTimeline() {
  const [sel, setSel] = useState(4);
  const [ref, inView] = useInView(0.3);
  const max = Math.max(...COUNTS);
  const m = MILESTONES[sel];

  const hourLabel = (i) => {
    const h = (START_HOUR + i) % 24;
    return `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? 'a' : 'p'}`;
  };

  return (
    <div className="ub-figure at-time" ref={ref}>
      <p className="at-label">Commits per hour, Saturday noon to Sunday morning</p>
      <div className="at-bars" role="img" aria-label="Commit activity per hour across the hackathon weekend">
        {COUNTS.map((c, i) => {
          const ms = MILESTONES.findIndex((x) => x.h === i);
          return (
            <div key={i} className={`at-bar-col ${ms === sel ? 'is-sel' : ''} ${i === 12 ? 'is-midnight' : ''}`}>
              <div className="at-bar-wrap">
                <span className={`at-bar ${MILESTONES[ms]?.big ? 'is-big' : ''}`} style={{ height: inView ? `${Math.max(c ? 6 : 0, (c / max) * 100)}%` : 0, transitionDelay: `${i * 25}ms` }}>
                  {c > 0 && (
                    <span className={`at-bar-n ${MILESTONES[ms]?.big ? 'is-always' : ''}`}>
                      {MILESTONES[ms]?.big ? `${c} commits, +6k lines` : c}
                    </span>
                  )}
                </span>
              </div>
              <span className="at-bar-h">{i % 3 === 0 ? hourLabel(i) : ''}</span>
              {ms >= 0 && (
                <button type="button" className="at-pin" onClick={() => setSel(ms)} aria-label={`${MILESTONES[ms].label}, ${MILESTONES[ms].time}`} aria-pressed={ms === sel} />
              )}
            </div>
          );
        })}
      </div>
      <div className="at-days" aria-hidden="true"><span>Saturday</span><span>Sunday</span></div>

      <div className="at-ms-list">
        {MILESTONES.map((x, i) => (
          <button key={x.label} type="button" className={`at-ms ${i === sel ? 'is-on' : ''}`} onClick={() => setSel(i)}>{x.label}</button>
        ))}
      </div>
      <div className="at-ms-detail" key={sel}>
        <p className="at-ms-time">{m.time}</p>
        <p>{m.text}</p>
      </div>
    </div>
  );
}
