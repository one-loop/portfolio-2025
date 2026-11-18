'use client';
import React, { useState } from 'react';

// The menu tree from the report's flowchart, with the script behind each part.
const BRANCHES = [
  {
    id: 'start',
    label: 'Start',
    children: [
      { id: 'learn', label: 'Learn', script: 'CustomVideoPlayerController + TimerController', text: 'Shows the lesson video and starts the Pomodoro timer next to it.' },
      { id: 'easy', label: 'Easy quiz', script: 'SimpleArithmeticQuiz · StartQuiz(1)', text: 'Ten addition questions with operands from 1 to 10.' },
      { id: 'medium', label: 'Medium quiz', script: 'SimpleArithmeticQuiz · StartQuiz(2)', text: 'Ten multiplication questions with one-digit operands.' },
      { id: 'hard', label: 'Hard quiz', script: 'SimpleArithmeticQuiz · StartQuiz(3)', text: 'Ten division questions that always come out to a whole number.' },
    ],
    script: 'GameUIManager · StartGame()',
    text: 'Hides any open panel and shows the Start menu: Learn plus the three quiz levels.',
  },
  {
    id: 'settings',
    label: 'Settings',
    mine: true,
    children: [
      { id: 'themes', label: 'Theme selector', script: 'GameUIManager · SetTheme(n)', text: 'Nine buttons, one per environment. Each one swaps the skybox around you.', mine: true },
      { id: 'music', label: 'Music player', script: 'MusicManager', text: 'Play, pause, skip and go back through seven background soundtracks, plus a volume slider.', mine: true },
    ],
    script: 'GameUIManager · DisplaySettings()',
    text: 'A toggle: pressing Settings again closes the panel. It flips the panel to the opposite of its current state.',
  },
  {
    id: 'credits',
    label: 'Credits',
    mine: true,
    children: [{ id: 'credits-panel', label: 'Credits panel', script: 'GameUIManager · DisplayCredits()', text: 'Who built what. It works the same way as Settings.', mine: true }],
    script: 'GameUIManager · DisplayCredits()',
    text: 'Opens or closes the credits panel.',
  },
  {
    id: 'quit',
    label: 'Quit',
    children: [{ id: 'quit-app', label: 'Back to Quest home', script: 'GameUIManager · QuitGame()', text: 'Calls Application.Quit() and returns to the Meta Quest menu.' }],
    script: 'GameUIManager · QuitGame()',
    text: 'Closes FocusBoost.',
  },
];

const ALL = BRANCHES.flatMap((b) => [b, ...b.children]);

export default function MenuMap() {
  const [sel, setSel] = useState('themes');
  const item = ALL.find((x) => x.id === sel);

  return (
    <div className="ub-figure fb-map">
      <div className="fb-map-root">
        <span>Game menu</span>
      </div>
      <div className="fb-map-branches">
        {BRANCHES.map((b) => (
          <div className="fb-map-branch" key={b.id}>
            <button
              type="button"
              className={`fb-map-node is-branch ${sel === b.id ? 'is-on' : ''} ${b.mine ? 'is-mine' : ''}`}
              onClick={() => setSel(b.id)}
            >
              {b.label}
            </button>
            <div className="fb-map-children">
              {b.children.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  className={`fb-map-node ${sel === c.id ? 'is-on' : ''} ${c.mine ? 'is-mine' : ''}`}
                  onClick={() => setSel(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fb-map-detail" aria-live="polite">
        <p className="fb-map-detail-title">
          {item.label}
          {item.mine && <span className="fb-mine-tag">My part</span>}
        </p>
        <p>{item.text}</p>
        <code>{item.script}</code>
      </div>
    </div>
  );
}
