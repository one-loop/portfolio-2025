'use client';
import React, { useMemo, useRef, useState } from 'react';

// The same weights as services/recommendationService.ts in the AdvenTrip repo.
const SAVE_WEIGHT = 1.5;
const PASS_WEIGHT = -0.8;

// Sample trip cards, illustrated with photos from my San Francisco trip.
const CARDS = [
  { id: 'gg', title: 'Golden Gate at golden hour', place: 'San Francisco', img: '/gallery/685.jpeg', tags: ['views', 'outdoors', 'walking'] },
  { id: 'ct', title: 'Chinatown dumpling crawl', place: 'San Francisco', img: '/gallery/650.jpeg', tags: ['food', 'culture', 'city'] },
  { id: 'pfa', title: 'Picnic at the Palace of Fine Arts', place: 'San Francisco', img: '/gallery/672.jpeg', tags: ['architecture', 'chill', 'culture'] },
  { id: 'coast', title: 'Sunset on the coast', place: 'San Francisco', img: '/gallery/705.jpeg', tags: ['beach', 'views', 'outdoors'] },
  { id: 'night', title: 'The waterfront after dark', place: 'San Francisco', img: '/gallery/641.jpeg', tags: ['city', 'nightlife', 'views'] },
  { id: 'ladies', title: 'Victorian houses and a park lunch', place: 'San Francisco', img: '/gallery/664.jpeg', tags: ['architecture', 'city', 'chill'] },
  { id: 'berk', title: 'Day trip to Berkeley', place: 'Berkeley, CA', img: '/gallery/679.jpeg', tags: ['culture', 'walking', 'food'] },
];

const INTERESTS = ['food', 'views', 'outdoors', 'culture', 'city', 'architecture', 'nightlife', 'beach', 'chill', 'walking'];

const scoreOf = (card, prefs) => card.tags.reduce((a, t) => a + (prefs[t] || 0), 0) / card.tags.length;

const rank = (cards, prefs) =>
  [...cards].sort((a, b) => scoreOf(b, prefs) - scoreOf(a, prefs) || a.id.localeCompare(b.id));

const initialPrefs = (interests) => Object.fromEntries(interests.map((i) => [i, 1.0]));

export default function SwipeLab() {
  const [interests, setInterests] = useState(['food', 'views']);
  const [prefs, setPrefs] = useState(() => initialPrefs(['food', 'views']));
  const [seen, setSeen] = useState([]); // [{id, action}]
  const [drag, setDrag] = useState({ x: 0, active: false });
  const [leaving, setLeaving] = useState(null); // 'left' | 'right'
  const startX = useRef(0);

  const remaining = useMemo(
    () => rank(CARDS.filter((c) => !seen.some((s) => s.id === c.id)), prefs),
    [seen, prefs]
  );
  const top = remaining[0];
  const lastAction = seen[seen.length - 1];

  const decide = (action) => {
    if (!top || leaving) return;
    setLeaving(action === 'save' ? 'right' : 'left');
    setTimeout(() => {
      const weight = action === 'save' ? SAVE_WEIGHT : PASS_WEIGHT;
      setPrefs((p) => {
        const next = { ...p };
        top.tags.forEach((t) => { next[t] = (next[t] || 0) + weight; });
        return next;
      });
      setSeen((s) => [...s, { id: top.id, action, tags: top.tags }]);
      setLeaving(null);
      setDrag({ x: 0, active: false });
    }, 260);
  };

  const reset = (nextInterests = interests) => {
    setPrefs(initialPrefs(nextInterests));
    setSeen([]);
    setDrag({ x: 0, active: false });
  };

  const toggleInterest = (i) => {
    const next = interests.includes(i) ? interests.filter((x) => x !== i) : [...interests, i];
    setInterests(next);
    reset(next);
  };

  // Pointer drag on the top card.
  const onDown = (e) => {
    if (leaving) return;
    startX.current = e.clientX;
    setDrag({ x: 0, active: true });
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!drag.active) return;
    setDrag({ x: e.clientX - startX.current, active: true });
  };
  const onUp = () => {
    if (!drag.active) return;
    if (drag.x > 80) decide('save');
    else if (drag.x < -80) decide('pass');
    else setDrag({ x: 0, active: false });
  };

  const dx = leaving === 'right' ? 420 : leaving === 'left' ? -420 : drag.x;
  const pct = Math.max(0, Math.min(100, Math.round(50 + dx / 3)));

  const tagRows = INTERESTS.map((t) => ({ t, v: prefs[t] || 0 })).sort((a, b) => b.v - a.v);
  const maxAbs = Math.max(3, ...tagRows.map((r) => Math.abs(r.v)));

  return (
    <div className="ub-figure at-lab">
      <div className="at-lab-interests">
        <p className="at-label">Onboarding interests (each starts at +1.0)</p>
        <div className="at-chips">
          {INTERESTS.map((i) => (
            <button key={i} type="button" className={`at-chip ${interests.includes(i) ? 'is-on' : ''}`} onClick={() => toggleInterest(i)} aria-pressed={interests.includes(i)}>
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className="at-lab-grid">
        <div className="at-phone" aria-label="Phone preview of the swipe feed">
          <div className="at-phone-notch" />
          <div className="at-phone-screen">
            <div className="at-phone-head">
              <img src="/projects/adventrip/logo.webp" alt="" />
              <span>AdvenTrip</span>
            </div>
            <div className="at-deck">
              {remaining.slice(1, 3).reverse().map((c, i) => (
                <div key={c.id} className="at-card is-behind" style={{ transform: `scale(${0.92 + i * 0.04}) translateY(${(1 - i) * 14}px)` }}>
                  <img src={c.img} alt="" loading="lazy" />
                </div>
              ))}
              {top ? (
                <div
                  key={top.id}
                  className={`at-card is-top ${drag.active ? 'is-dragging' : ''}`}
                  style={{ transform: `translateX(${dx}px) rotate(${dx / 18}deg)`, opacity: leaving ? 0 : 1 }}
                  onPointerDown={onDown}
                  onPointerMove={onMove}
                  onPointerUp={onUp}
                  onPointerCancel={onUp}
                >
                  <img src={top.img} alt={top.title} draggable={false} />
                  <span className="at-stamp at-stamp-like" style={{ opacity: Math.max(0, Math.min(1, dx / 80)) }}>SAVE</span>
                  <span className="at-stamp at-stamp-nope" style={{ opacity: Math.max(0, Math.min(1, -dx / 80)) }}>PASS</span>
                  <div className="at-card-info">
                    <p className="at-card-place">{top.place}</p>
                    <h4>{top.title}</h4>
                    <div className="at-card-tags">{top.tags.map((t) => <span key={t}>#{t}</span>)}</div>
                    <div className="at-meter"><span style={{ width: `${pct}%` }} /></div>
                    <p className={`at-pct ${pct > 55 ? 'is-yes' : pct < 45 ? 'is-no' : ''}`}>{pct}% interested</p>
                  </div>
                </div>
              ) : (
                <div className="at-card at-empty">
                  <p>You’ve seen every card.</p>
                  <button type="button" className="ub-button" onClick={() => reset()}>Start over</button>
                </div>
              )}
            </div>
            <div className="at-actions">
              <button type="button" className="at-round is-no" onClick={() => decide('pass')} disabled={!top} aria-label="Pass">✕</button>
              <button type="button" className="at-round is-yes" onClick={() => decide('save')} disabled={!top} aria-label="Save">♥</button>
            </div>
          </div>
        </div>

        <div className="at-brain">
          <p className="at-label">What the feed has learned</p>
          <ul className="at-tags">
            {tagRows.map(({ t, v }) => (
              <li key={t}>
                <span className="at-tag-name">#{t}</span>
                <span className="at-tag-track">
                  <span className="at-tag-zero" />
                  <span
                    className={`at-tag-bar ${v < 0 ? 'is-neg' : ''}`}
                    style={v >= 0
                      ? { left: '50%', width: `${(v / maxAbs) * 50}%` }
                      : { right: '50%', width: `${(-v / maxAbs) * 50}%` }}
                  />
                </span>
                <span className="at-tag-val">{v > 0 ? '+' : ''}{v.toFixed(1)}</span>
              </li>
            ))}
          </ul>

          <p className="at-label">Up next, best match first</p>
          <ol className="at-queue">
            {remaining.slice(1, 5).map((c) => (
              <li key={c.id}>
                <span>{c.title}</span>
                <span className="at-queue-score">{scoreOf(c, prefs).toFixed(2)}</span>
              </li>
            ))}
            {remaining.length <= 1 && <li className="at-queue-empty">Nothing left in the queue</li>}
          </ol>

          <p className="at-last" aria-live="polite">
            {lastAction
              ? `${lastAction.action === 'save' ? 'Saved' : 'Passed'}: ${lastAction.tags.map((t) => `#${t}`).join(' ')} ${lastAction.action === 'save' ? '+1.5' : '−0.8'} each`
              : 'Drag the card, or use the buttons.'}
          </p>
        </div>
      </div>
    </div>
  );
}
