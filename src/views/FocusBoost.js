'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './ProjectWriteup.css';
import './FocusBoost.css';
import FooterMain from '../components/FooterMain';
import SEOBreadcrumbs from '../components/SEOBreadcrumbs';
import MenuMap from '../components/focusboost/MenuMap';
import ThemePicker from '../components/focusboost/ThemePicker';
import PomodoroCycle from '../components/focusboost/PomodoroCycle';
import DeltaTimeLab from '../components/focusboost/DeltaTimeLab';
import QuizLab from '../components/focusboost/QuizLab';

const REPO = 'https://github.com/one-loop/FocusBoostVR-';
const BASE = '/projects/focusboost';

const SECTIONS = [
  { id: 'idea', label: 'The idea' },
  { id: 'structure', label: 'How it fits together' },
  { id: 'places', label: 'Choosing a place' },
  { id: 'pomodoro', label: 'Studying in blocks' },
  { id: 'lessons', label: 'Watching the lesson' },
  { id: 'quiz', label: 'The quiz' },
  { id: 'hard-parts', label: 'What was hard' },
  { id: 'next', label: 'What I’d do next' },
];

const SOUNDS = ['Ocean waves', 'Café', 'Soft rain', 'Mountain stream', 'City traffic', 'Forest', 'Lo-fi'];

const TEAM = [
  { name: 'Saad', me: true, did: 'Backgrounds and scene, environment selection, settings (themes and music) and credits' },
  { name: 'Srijan', did: 'Pomodoro timer, the clock and video playlist playback' },
  { name: 'Sushant', did: 'The quiz: difficulty levels, randomly generated questions and auto grading' },
];

export default function FocusBoost() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ub fb">
      <SEOBreadcrumbs items={[{ name: 'Projects', url: '/projects' }, { name: 'FocusBoost VR', url: '/projects/focusboost' }]} />
      <div className="ub-glow fb-glow" aria-hidden="true" />

      <nav className="ub-toc" aria-label="On this page">
        <Link href="/projects" className="ub-back">← Projects</Link>
        <ol>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={active === s.id ? 'is-active' : ''}>{s.label}</a>
            </li>
          ))}
        </ol>
      </nav>

      <article className="ub-article">
        <header className="ub-header">
          <Link href="/projects" className="ub-back ub-back-inline">← Projects</Link>
          <div className="ub-tag"><span className="ub-tag-dot fb-tag-dot" />VR · Fall 2023</div>
          <h1 className="ub-title">FocusBoost VR</h1>
          <p className="ub-subtitle">
            A quiet study room for children with ADHD, built for the Meta Quest 2. Pick a calm place to sit, watch a lesson in 25-minute blocks, then check what stuck with a short quiz.
          </p>
          <dl className="ub-meta">
            <div><dt>Course</dt><dd>Computer Programming for Engineers</dd></div>
            <div><dt>Headset</dt><dd>Meta Quest 2</dd></div>
            <div><dt>Built with</dt><dd>Unity, C#</dd></div>
            <div><dt>Code</dt><dd><a href={REPO} target="_blank" rel="noreferrer">GitHub ↗</a></dd></div>
          </dl>
        </header>

        <aside className="ub-tldr">
          <p className="ub-tldr-label">The short version</p>
          <ul>
            <li>A Unity app for the Quest 2 that puts you at a desk in a calm environment, with fewer things around you to pull your attention away.</li>
            <li>It combines four ideas from ADHD research: a low-distraction room, the Pomodoro technique, background sound and quizzes with instant feedback.</li>
            <li>We were a team of three. I built the environments, the theme picker, the settings panel with the music player, and the credits.</li>
          </ul>
        </aside>

        <figure className="ub-fig">
          <div className="fb-video">
            <video
              src={`${BASE}/demo.mp4#t=0.5`}
              controls
              playsInline
              preload="metadata"
              poster={`${BASE}/theme-forest.webp`}
            />
          </div>
          <figcaption><span>Figure 1.</span> A recording from inside the headset: changing the environment, watching a lesson until the break screen appears, then taking the quizzes.</figcaption>
        </figure>

        <section id="idea" className="ub-section">
          <h2><span>01</span>The idea</h2>
          <p>
            For the final project in Computer Programming for Engineers, our group of three decided to build something in VR, in Unity and C#, and to build it <em>for</em> someone specific.
          </p>
          <p>
            That someone became children with ADHD. The CDC estimates about 9.8% of children in the US have been diagnosed with it, and a lot of the struggle in school comes from environments full of things competing for attention. A headset is an unusual answer to that: it can replace the whole room. The research we read for the report suggested VR can hold attention for longer by controlling exactly what a child sees and hears.
          </p>
          <p>So the app is built around four pieces, each one taken from something we read:</p>
          <ul className="ub-bullets">
            <li><strong>A focus room.</strong> A desk in a quiet place, with nothing else around you.</li>
            <li><strong>A Pomodoro timer.</strong> 25 minutes of work, then a 5-minute break you can’t skip.</li>
            <li><strong>Background sound.</strong> One study we cited found calm music helped children with ADHD with reading comprehension.</li>
            <li><strong>Quizzes with instant results.</strong> Immediate feedback works better for children with ADHD than rewards that arrive later.</li>
          </ul>
        </section>

        <section id="structure" className="ub-section">
          <h2><span>02</span>How it fits together</h2>
          <p>
            Before writing any code we drew the whole app as a flowchart: a game menu with four buttons, and everything else hanging off those. Each of us then took a part of it and wrote the C# scripts behind it.
          </p>
          <figure className="ub-fig">
            <MenuMap />
            <figcaption><span>Figure 2.</span> The menu from our flowchart. Click any part to see what it does and which script runs it. The parts I built are marked.</figcaption>
          </figure>
          <p>
            In the headset, the menu buttons float on either side of the desk and you press them by reaching out and pulling the trigger. Most panels, like Settings and Credits, are toggles: pressing the button again closes them, by setting the panel to the opposite of whatever it is now.
          </p>
        </section>

        <section id="places" className="ub-section">
          <h2><span>03</span>Choosing a place</h2>
          <p>
            This was my part. The idea is that a child picks where they want to study: a forest, a lake, a cabin, a sunset over the sea. There are nine environments in total.
          </p>
          <p>
            Each one is a <em>skybox</em>: a 360° image wrapped around the player so it fills every direction. Making nine of those by hand wasn’t realistic, so I generated them with Blockade Labs, an AI tool for 360° environments. The desk, the chair and a floating island scene are free models from Sketchfab. In Unity, every skybox becomes a material, and the theme buttons just pick which one to show.
          </p>
          <figure className="ub-fig">
            <ThemePicker />
            <figcaption><span>Figure 3.</span> Four of the nine environments, captured from the demo. Each Theme button calls <code>SetTheme</code> with its number, which swaps the skybox.</figcaption>
          </figure>
          <p>
            The whole theme picker comes down to one line: <code>RenderSettings.skybox = Themes[themeNumber - 1]</code>. The buttons are numbered from 1 because that’s what people read, and the array starts at 0, hence the <code>- 1</code>.
          </p>
          <p>
            The same Settings panel holds the music player. It cycles through seven soundtracks, wrapping around at either end, with play/pause and a volume slider:
          </p>
          <ul className="fb-sounds" aria-label="Soundtracks">
            {SOUNDS.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <p>
            One detail I liked: Unity doesn’t loop the tracks for us, so every frame the script checks if the audio has stopped. If it has, and the user didn’t pause it themselves, it starts the song again. That second check matters. Without it, pressing pause would just restart the music on the next frame.
          </p>
        </section>

        <section id="pomodoro" className="ub-section">
          <h2><span>04</span>Studying in blocks</h2>
          <p>
            Pressing <em>Learn</em> starts a lesson video and a clock next to it. After 25 minutes, the video pauses and a panel says “Congratulations!! You have finished a session” and asks you to take off your headset for a 5-minute break. There’s deliberately no button to close it. When the break is over, a beep tells you, the panel disappears and the video picks up where it left off.
          </p>
          <figure className="ub-fig">
            <PomodoroCycle />
            <figcaption><span>Figure 4.</span> One Pomodoro cycle, sped up. Drag the slider to move through it. In our demo build the blocks were shortened to seconds so the whole cycle fits in the recording.</figcaption>
          </figure>
          <p>
            The timer is also where we hit the most instructive bug of the project. Unity calls <code>Update()</code> once per frame, and our first version stored the timer as an integer and subtracted one second each time. That looks right until you remember the Quest 2 draws 72 or more frames per second, so our “25 minutes” was over in about 20 seconds.
          </p>
          <figure className="ub-fig">
            <DeltaTimeLab />
            <figcaption><span>Figure 5.</span> Both versions of the timer, ticking once per frame at the headset’s refresh rate. Press Start and watch the left one.</figcaption>
          </figure>
          <p>
            The fix was to make the timer a <code>float</code> and subtract <code>Time.deltaTime</code>, the time the last frame actually took. Now the countdown follows real time whatever the frame rate is. It’s a small fix, but it’s the difference between a game loop and a clock.
          </p>
        </section>

        <section id="lessons" className="ub-section">
          <h2><span>05</span>Watching the lesson</h2>
          <p>
            The plan was to stream a YouTube playlist straight into the room using the YouTube API. That turned out not to be possible inside Unity, so we downloaded a short playlist of maths videos for kids and imported them as clips instead. It meant fewer videos. A side effect is that there are no ads or recommended videos in the room.
          </p>
          <p>The video plays on the face of a 3D panel, and you control it with the Quest controllers instead of buttons:</p>
          <div className="fb-controllers" role="table" aria-label="Controller mapping">
            <div className="fb-controller" role="row">
              <p className="fb-controller-side">Left controller</p>
              <p role="cell"><kbd>Trigger</kbd> play / pause</p>
              <p role="cell"><kbd>Grip</kbd> previous video</p>
            </div>
            <div className="fb-controller" role="row">
              <p className="fb-controller-side">Right controller</p>
              <p role="cell"><kbd>Trigger</kbd> play / pause</p>
              <p role="cell"><kbd>Grip</kbd> next video</p>
            </div>
          </div>
          <p>
            Two small fixes made it feel better. Switching videos straight away felt abrupt, so there’s now a one-second pause before the next one starts. And because the video sits on one face of a cube, it showed up mirrored at first, so the script flips the texture when it starts.
          </p>
        </section>

        <section id="quiz" className="ub-section">
          <h2><span>06</span>The quiz</h2>
          <p>
            The quiz is the reward at the end. There are three levels: addition, multiplication and division. Each round is ten questions with four answers, and you see your score straight away. Questions are generated randomly, with a couple of rules to keep them fair. Division picks the divisor first and multiplies it up, so the answer is always a whole number.
          </p>
          <figure className="ub-fig">
            <QuizLab />
            <figcaption><span>Figure 6.</span> The quiz, rebuilt with the same generation logic as our C# script, including the Fisher–Yates shuffle that decides where the right answer goes. Try a few questions, then switch to “Closer ones”.</figcaption>
          </figure>
          <p>
            Looking back at the demo, the weakest part is clear. The three wrong answers are random numbers from 1 to 100, so for <code>5 + 1</code> the choices in our recording were 24, 69, 6 and 12. You can usually spot the right one without doing the maths. Picking wrong answers close to the real one, like the second mode above, would make the quiz actually test something.
          </p>
          <p>
            Two fixes came from testing it in the headset. The quiz panel was too far away to press, so we added a laser pointer with Oculus’s raycaster. And you could keep tapping answers after the final score appeared, which kept changing the score, so the answer buttons now disappear when the round ends.
          </p>
          <figure className="ub-fig fb-stills">
            <img src={`${BASE}/quiz.webp`} alt="A quiz question, 5 + 1 = ?, with a laser pointer aimed at the answers" loading="lazy" />
            <img src={`${BASE}/score.webp`} alt="The end of a quiz: Quiz Over. Final Score: 8/10" loading="lazy" />
            <figcaption><span>Figure 7.</span> A question with the laser pointer, and the end of a round.</figcaption>
          </figure>
        </section>

        <section id="hard-parts" className="ub-section">
          <h2><span>07</span>What was hard</h2>
          <p>Most of the difficulty wasn’t in the C#. It was everything around it:</p>
          <ul className="ub-todo">
            <li>Combining all three people’s work into one Unity project, and errors we didn’t expect after making changes in the Unity Editor.</li>
            <li>Turning the logic in our flowchart into an actual program.</li>
            <li>Getting the project to build and run on the headset, with the controllers mapped correctly.</li>
            <li>Learning C# and Unity at the same time as building the thing.</li>
            <li>Testing without a headset. Most scripts have keyboard shortcuts (Enter for the start menu, keys for the music and the quiz) so we could check things in the editor first.</li>
          </ul>
          <p>
            And the biggest gap: we never tested it with children with ADHD. Everything here is based on research we read, not on watching someone use it. I’d want that before claiming it helps anyone.
          </p>
        </section>

        <section id="next" className="ub-section">
          <h2><span>08</span>What I’d do next</h2>
          <ul className="ub-bullets">
            <li>Let children (or parents) upload their own environment, so the room can be somewhere familiar.</li>
            <li>Add a progress tracker, so parents and teachers can see what was studied and how the quizzes went over time.</li>
            <li>Go beyond arithmetic, into science, English and computer skills.</li>
            <li>Better wrong answers in the quiz, and real testing with the people it was built for.</li>
          </ul>
          <p>
            The main thing I took from it is how different a headset is from a screen. On a screen you design a page. In a headset you design a whole place, and everything in it competes for attention, which was exactly the problem we set out to solve.
          </p>

          <div className="fb-team">
            <div>
              <p className="fb-panel-title">Who built what</p>
              <ul>
                {TEAM.map((m) => (
                  <li key={m.name} className={m.me ? 'is-me' : ''}>
                    <strong>{m.name}{m.me ? ' (me)' : ''}</strong>
                    <span>{m.did}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <footer className="ub-notes">
          <div className="ub-end-links">
            <Link href="/projects" className="ub-button ub-button-ghost">← All projects</Link>
            <a href={REPO} target="_blank" rel="noreferrer" className="ub-button">View the code on GitHub ↗</a>
          </div>
        </footer>
      </article>

      <FooterMain />
    </div>
  );
}
