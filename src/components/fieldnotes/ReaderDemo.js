'use client';
import React, { useRef, useState } from 'react';

// A miniature version of the Fieldnotes reader: scroll progress, tap-to-highlight,
// reading time at 225 words per minute, and the end-of-article reflection prompt.
const PARAGRAPHS = [
  [
    'Most of what we save, we never read.',
    'The tab stays open for a week, then a browser update closes it, and the idea goes with it.',
    'A read-it-later app is a small promise to your future self that the good stuff won’t get lost.',
  ],
  [
    'But saving is the easy part.',
    'The hard part is deciding what to read today, what to finish, and what deserves a second look in a month.',
    'That’s why Fieldnotes sorts things by what you mean to do with them, not just by when you saved them.',
  ],
  [
    'Reading well also means reading actively.',
    'Highlight the line that made you stop, jot down why, and when you reach the end, write one sentence about what you’ll remember.',
    'Those notes stay with the article, and you can export them whenever you like.',
  ],
  [
    'None of this needs to be clever.',
    'It needs to be calm, fast, and yours.',
  ],
];

const COLORS = ['#fef08a', '#bbf7d0', '#bfdbfe', '#fbcfe8'];
const WORDS = PARAGRAPHS.flat().join(' ').split(/\s+/).length;
const MINUTES = Math.max(1, Math.round(WORDS / 225));

export default function ReaderDemo() {
  const [progress, setProgress] = useState(0);
  const [marks, setMarks] = useState({});
  const [color, setColor] = useState(COLORS[0]);
  const [dark, setDark] = useState(true);
  const [done, setDone] = useState(false);
  const [reflection, setReflection] = useState('');
  const [archived, setArchived] = useState(false);
  const boxRef = useRef(null);

  const onScroll = () => {
    const el = boxRef.current;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? Math.round((el.scrollTop / max) * 100) : 100;
    setProgress(p);
    if (p >= 98 && !done && !archived) setDone(true);
  };

  const toggle = (k) => setMarks((m) => {
    const next = { ...m };
    if (next[k] === color) delete next[k];
    else next[k] = color;
    return next;
  });

  const reset = () => {
    setArchived(false);
    setDone(false);
    setReflection('');
    setMarks({});
    if (boxRef.current) boxRef.current.scrollTop = 0;
    setProgress(0);
  };

  const count = Object.keys(marks).length;

  return (
    <div className="ub-figure fn-reader-fig">
      <div className="fn-reader-toolbar">
        <div className="fn-swatches" role="radiogroup" aria-label="Highlight color">
          {COLORS.map((c) => (
            <button key={c} type="button" role="radio" aria-checked={color === c} className={color === c ? 'is-on' : ''} style={{ background: c }} onClick={() => setColor(c)} aria-label={`Highlight color ${c}`} />
          ))}
        </div>
        <button type="button" className="ub-button ub-button-ghost" onClick={() => setDark((d) => !d)}>{dark ? 'Light' : 'Dark'} theme</button>
      </div>

      <div className={`fn-reader ${dark ? 'is-dark' : 'is-light'}`}>
        <div className="fn-reader-progress"><span style={{ width: `${progress}%` }} /></div>
        <div className="fn-reader-scroll" ref={boxRef} onScroll={onScroll}>
          <p className="fn-reader-meta">fieldnotes.example · {MINUTES} min read · {WORDS} words</p>
          <h4>The case for reading later</h4>
          {PARAGRAPHS.map((para, pi) => (
            <p key={pi} className="fn-reader-p">
              {para.map((s, si) => {
                const k = `${pi}-${si}`;
                return (
                  <span key={k} className="fn-sentence" style={marks[k] ? { background: marks[k], color: '#1a1a1a' } : undefined} onClick={() => toggle(k)}>
                    {s}{' '}
                  </span>
                );
              })}
            </p>
          ))}
          <p className="fn-reader-end">— end —</p>
        </div>

        {done && !archived && (
          <div className="fn-complete">
            <div className="fn-complete-card">
              <p className="fn-complete-kicker">You’ve reached the end of</p>
              <h5>The case for reading later</h5>
              <label htmlFor="fn-reflect">Would you like to write a reflection? (Optional)</label>
              <textarea id="fn-reflect" value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="What did you learn? Any key takeaways?" rows={3} />
              <div className="fn-complete-actions">
                <button type="button" className="ub-button ub-button-ghost" onClick={() => setArchived(true)}>Skip</button>
                <button type="button" className="ub-button" onClick={() => setArchived(true)}>Save &amp; archive</button>
              </div>
            </div>
          </div>
        )}
        {archived && (
          <div className="fn-complete">
            <div className="fn-complete-card is-done">
              <p>🗄️ Moved to Archive{reflection.trim() ? ', with your reflection saved as a note' : ''}.</p>
              <p className="fn-small">{count} highlight{count === 1 ? '' : 's'} kept with the article.</p>
              <button type="button" className="ub-button" onClick={reset}>Read it again</button>
            </div>
          </div>
        )}
      </div>

      <div className="fn-reader-stats">
        <span>Progress <strong>{progress}%</strong></span>
        <span>Highlights <strong>{count}</strong></span>
        <span>Reading time <strong>{MINUTES} min</strong> at 225 wpm</span>
      </div>
    </div>
  );
}
