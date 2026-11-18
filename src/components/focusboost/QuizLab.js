'use client';
import React, { useCallback, useEffect, useState } from 'react';

const LEVELS = [
  { v: 1, label: 'Easy', op: '+' },
  { v: 2, label: 'Medium', op: '×' },
  { v: 3, label: 'Hard', op: '÷' },
];

// UnityEngine.Random.Range(min, max) for ints: max is exclusive.
const range = (min, max) => min + Math.floor(Math.random() * (max - min));

// Fisher-Yates, the same loop as ShuffleList() in SimpleArithmeticQuiz.cs.
const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = range(0, i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const makeQuestion = (level, close) => {
  let a;
  let b;
  let answer;
  if (level === 1) { a = range(1, 11); b = range(1, 11); answer = a + b; }
  else if (level === 2) { a = range(1, 10); b = range(1, 10); answer = a * b; }
  else { b = range(1, 10); a = range(b, 10) * b; answer = a / b; }

  const used = new Set([answer]);
  const wrong = [];
  while (wrong.length < 3) {
    // Original: any number from 1 to 100. "Closer": within a few of the answer.
    const n = close ? Math.max(1, answer + range(-6, 7)) : range(1, 101);
    if (!used.has(n)) { used.add(n); wrong.push(n); }
  }
  const slots = shuffle([0, 1, 2, 3]);
  const options = [];
  options[slots[0]] = answer;
  wrong.forEach((w, i) => { options[slots[i + 1]] = w; });
  return { text: `${a} ${LEVELS[level - 1].op} ${b} = ?`, answer, options };
};

export default function QuizLab() {
  const [level, setLevel] = useState(1);
  const [close, setClose] = useState(false);
  const [q, setQ] = useState(null);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);

  const restart = useCallback((lv = level, cl = close) => {
    setQ(makeQuestion(lv, cl));
    setCount(0);
    setScore(0);
    setPicked(null);
  }, [level, close]);

  // Generate on the client only, so server and client HTML match.
  useEffect(() => { restart(1, false); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const choose = (n) => {
    if (picked !== null || count >= 10) return;
    setPicked(n);
    const right = n === q.answer;
    setTimeout(() => {
      setScore((s) => s + (right ? 1 : 0));
      setCount((c) => c + 1);
      setPicked(null);
      if (count + 1 < 10) setQ(makeQuestion(level, close));
    }, 650);
  };

  const done = count >= 10;

  return (
    <div className="ub-figure fb-quiz">
      <div className="ub-figure-toolbar">
        <div className="ub-tabs" role="group" aria-label="Difficulty">
          {LEVELS.map((l) => (
            <button key={l.v} type="button" className={`ub-tab ${level === l.v ? 'is-on' : ''}`} onClick={() => { setLevel(l.v); restart(l.v, close); }}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="ub-tabs" role="group" aria-label="Wrong answers">
          <button type="button" className={`ub-tab ${!close ? 'is-on' : ''}`} onClick={() => { setClose(false); restart(level, false); }}>Original wrong answers</button>
          <button type="button" className={`ub-tab ${close ? 'is-on' : ''}`} onClick={() => { setClose(true); restart(level, true); }}>Closer ones</button>
        </div>
      </div>

      <div className="fb-quiz-board">
        {!q ? null : done ? (
          <div className="fb-quiz-question is-over">
            Quiz Over. Final Score: {score}/10
            <button type="button" className="ub-button fb-small" onClick={() => restart()}>Play again</button>
          </div>
        ) : (
          <>
            <div className="fb-quiz-question">{q.text}</div>
            <div className="fb-quiz-options">
              {q.options.map((n) => {
                let cls = '';
                if (picked !== null) {
                  if (n === q.answer) cls = 'is-right';
                  else if (n === picked) cls = 'is-wrong';
                }
                return (
                  <button key={n} type="button" className={`fb-quiz-option ${cls}`} onClick={() => choose(n)}>{n}</button>
                );
              })}
            </div>
          </>
        )}
      </div>

      <p className="ub-readout">
        <span>Question <strong>{Math.min(count + 1, 10)}</strong> of 10</span>
        <span>Score <strong>{score}</strong></span>
      </p>
    </div>
  );
}
