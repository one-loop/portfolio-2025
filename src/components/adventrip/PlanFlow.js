'use client';
import React, { useState } from 'react';

// The group adventure flow, using the questions from CreateAdventureWizard.tsx.
const STAGES = [
  {
    key: 'ask',
    label: 'Ask',
    title: 'Answer eight quick questions',
    body: 'One question per screen, so it never feels like a form.',
    items: [
      'What’s your adventure called?',
      'What’s your name?',
      'Where are you?',
      'What activities do you want to do?',
      'What time of year?',
      'How long will it last?',
      'What means of transportation?',
      'Choose your adventure type: solo or group',
    ],
  },
  {
    key: 'invite',
    label: 'Invite',
    title: 'Pull everyone out of the group chat',
    body: 'A group adventure creates an invite link. Each friend who opens it adds their own constraints, so the plan works for everyone, not just the organizer.',
    items: ['Budget, in their own currency', 'Activity preferences', 'Transportation', 'How far they’re willing to travel'],
  },
  {
    key: 'swipe',
    label: 'Swipe',
    title: 'Decide by swiping, not arguing',
    body: 'Everyone swipes through adventure ideas. The card follows your finger, and a live 0–100% meter shows how strongly you’re leaning. There’s a neutral zone in the middle where the card snaps back, so a half-hearted drag doesn’t count as a vote.',
    items: ['Right to save, left to pass', 'Tap to flip for the full plan', 'Saved trips land on your profile'],
  },
  {
    key: 'plan',
    label: 'Plan',
    title: 'Get a real itinerary',
    body: 'The last step was the one we didn’t finish that weekend: feed the group’s answers and favorite cards to Claude to write a day-by-day itinerary, and use live flight and hotel prices to keep it within everyone’s budget. The demo used hand-written itineraries.',
    items: ['Day-by-day plan with map pins', 'Hotels and restaurants', 'Priced against each person’s budget'],
    planned: true,
  },
];

export default function PlanFlow() {
  const [stage, setStage] = useState(0);
  const s = STAGES[stage];

  return (
    <div className="ub-figure at-flow">
      <ol className="at-flow-steps">
        {STAGES.map((st, i) => (
          <li key={st.key}>
            <button
              type="button"
              className={`at-flow-step ${i === stage ? 'is-on' : ''} ${i < stage ? 'is-done' : ''} ${st.planned ? 'is-planned' : ''}`}
              onClick={() => setStage(i)}
              aria-pressed={i === stage}
            >
              <span className="at-flow-num">{i + 1}</span>
              <span>{st.label}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="at-flow-body" key={s.key}>
        <div>
          {s.planned && <p className="at-status is-planned">Planned</p>}
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </div>
        <ul className={`at-flow-items ${s.key === 'ask' ? 'is-questions' : ''}`}>
          {s.items.map((it, i) => (
            <li key={it} style={{ animationDelay: `${i * 50}ms` }}>
              {s.key === 'ask' && <span className="at-q-num">{i + 1}</span>}
              {it}
            </li>
          ))}
        </ul>
      </div>

      <div className="at-flow-nav">
        <button type="button" className="ub-button ub-button-ghost" onClick={() => setStage((v) => Math.max(0, v - 1))} disabled={stage === 0}>Back</button>
        <button type="button" className="ub-button" onClick={() => setStage((v) => (v + 1) % STAGES.length)}>{stage === STAGES.length - 1 ? 'Start over' : 'Next'}</button>
      </div>
    </div>
  );
}
