'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './ProjectWriteup.css';
import './Fieldnotes.css';
import FooterMain from '../components/FooterMain';
import SEOBreadcrumbs from '../components/SEOBreadcrumbs';
import StatusPipeline from '../components/fieldnotes/StatusPipeline';
import ReaderDemo from '../components/fieldnotes/ReaderDemo';
import WireToApp from '../components/fieldnotes/WireToApp';
import StackMap from '../components/fieldnotes/StackMap';
import MyPart from '../components/fieldnotes/MyPart';

const REPO = 'https://github.com/agile-students-fall2025/4-final-random_grandeeism';
const BASE = '/projects/fieldnotes';

const SECTIONS = [
  { id: 'why', label: 'Why build it' },
  { id: 'statuses', label: 'Five places to put things' },
  { id: 'reading', label: 'Reading, actively' },
  { id: 'process', label: 'From wireframe to app' },
  { id: 'stack', label: 'How it’s built' },
  { id: 'mine', label: 'What I worked on' },
  { id: 'lessons', label: 'What I took away' },
];

const SPRINTS = [
  { when: 'Early Oct', title: 'Vision & design', text: 'Product vision, team norms, an app map, wireframes for every screen and a clickable Figma prototype.' },
  { when: 'Late Oct', title: 'Front end', text: 'The whole React app built against mock data: every status page, tags, search, settings and statistics.' },
  { when: 'Nov', title: 'Back end', text: 'An Express API with mock data access objects, wired into the front end, with Mocha tests running in CI.' },
  { when: 'Late Nov – Dec', title: 'Database & auth', text: 'MongoDB Atlas behind the same interfaces, real accounts with JWT, content extraction and RSS.' },
  { when: 'Dec', title: 'Deployment', text: 'Docker images for both halves, published to Docker Hub and running on a DigitalOcean droplet.' },
];

export default function Fieldnotes() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [theme, setTheme] = useState('dark');

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
    <div className="ub fn">
      <SEOBreadcrumbs items={[{ name: 'Projects', url: '/projects' }, { name: 'Fieldnotes', url: '/projects/fieldnotes' }]} />
      <div className="ub-glow fn-glow" aria-hidden="true" />

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
          <div className="ub-tag"><span className="ub-tag-dot fn-tag-dot" />Team project · Agile Software Development &amp; DevOps · Fall 2025</div>
          <h1 className="ub-title">Fieldnotes</h1>
          <p className="ub-subtitle">
            An open-source read-it-later app for saving articles, videos and podcasts, and then actually reading them.
          </p>
          <dl className="ub-meta">
            <div><dt>Team</dt><dd>with Zeba, Anas, Shaurya &amp; Jeffrey</dd></div>
            <div><dt>Stack</dt><dd>MongoDB, Express, React, Node</dd></div>
            <div><dt>Course</dt><dd>NYU, Prof. Amos Bloomberg</dd></div>
            <div><dt>Code</dt><dd><a href={REPO} target="_blank" rel="noreferrer">GitHub ↗</a></dd></div>
          </dl>
        </header>

        <aside className="ub-tldr">
          <p className="ub-tldr-label">The short version</p>
          <ul>
            <li>A five-person team built a full-stack read-it-later app in one semester, in two-week sprints, from wireframes to a Dockerized deployment.</li>
            <li>Saved links are sorted by intent (Inbox, Daily Reading, Continue Reading, Rediscovery, Archive), and the reader supports highlights, notes, reflections and exports.</li>
            <li>My part: the wireframes and Figma prototype, the landing and auth flows, JWT authentication, tags, reading time, video saving and the statistics page.</li>
          </ul>
        </aside>

        <figure className="ub-fig">
          <div className="fn-hero-toolbar">
            <div className="ub-tabs" role="tablist" aria-label="Theme">
              <button type="button" role="tab" aria-selected={theme === 'dark'} className={`ub-tab ${theme === 'dark' ? 'is-on' : ''}`} onClick={() => setTheme('dark')}>☾ Dark</button>
              <button type="button" role="tab" aria-selected={theme === 'light'} className={`ub-tab ${theme === 'light' ? 'is-on' : ''}`} onClick={() => setTheme('light')}>☀︎ Light</button>
            </div>
          </div>
          <div className="fn-hero">
            <div className="fn-hero-view">
              <img src={`${BASE}/app-dark.webp`} alt="Fieldnotes inbox in dark mode" className={theme === 'dark' ? 'is-on' : ''} />
              <img src={`${BASE}/app-light.webp`} alt="Fieldnotes home in light mode" className={theme === 'light' ? 'is-on' : ''} />
            </div>
          </div>
          <figcaption><span>Figure 1.</span> The finished app. Toggle the theme, which the real app supports throughout.</figcaption>
        </figure>

        <section id="why" className="ub-section">
          <h2><span>01</span>Why build it</h2>
          <p>
            When Omnivore, a free and open-source read-it-later app, shut down, we went looking for a replacement that respected both our reading habits and our data, and didn’t find one we loved. So for our Agile course’s semester-long project, we built our own.
          </p>
          <p>
            Read-it-later apps sound small, but they sit at an interesting spot: attention, agency and knowledge management. There’s far more worth reading online than time to read it, and the good stuff usually disappears into a pile of tabs. Fieldnotes is our attempt at a calmer system for capturing things, curating them and coming back to them.
          </p>
        </section>

        <section id="statuses" className="ub-section">
          <h2><span>02</span>Five places to put things</h2>
          <p>
            The core design decision was that a saved article should be sorted by what you <em>intend</em> to do with it, not just by the date you saved it. Every item lives in exactly one of five statuses, and each card has a single “next” button that moves it along.
          </p>
          <figure className="ub-fig">
            <StatusPipeline />
            <figcaption><span>Figure 2.</span> The article workflow. Move the sample items between columns, and click a column title to see what it’s for. You can also jump straight to any status from a menu.</figcaption>
          </figure>
          <p>
            The order is deliberate. Inbox is for triage, Daily Reading is a small queue you can actually finish, Continue Reading remembers how far you got, and Rediscovery is for things worth a second visit. Archive isn’t a trash can: anything you finish ends up there, along with your notes about it.
          </p>
        </section>

        <section id="reading" className="ub-section">
          <h2><span>03</span>Reading, actively</h2>
          <p>
            Saving is the easy part, so we spent a lot of time on the reader. Pasting a link pulls out the clean article text on the server. The reader then tracks how far you’ve scrolled, lets you highlight passages in different colors and attach notes, and estimates reading time at 225 words per minute. When you reach the end, it asks for an optional one-line reflection, saves it as a note and archives the article.
          </p>
          <figure className="ub-fig">
            <ReaderDemo />
            <figcaption><span>Figure 3.</span> A miniature version of the reader. Tap sentences to highlight them, switch colors and themes, and scroll to the end to finish the article.</figcaption>
          </figure>
          <p>And here’s the real one, in both themes:</p>
          <figure className="ub-fig fn-reader-shots">
            <img src={`${BASE}/reader-dark.webp`} alt="The Fieldnotes article reader in dark mode, with yellow highlights and a highlight toolbar" loading="lazy" />
            <img src={`${BASE}/reader-light.webp`} alt="The Fieldnotes article reader in light mode, with highlights" loading="lazy" />
            <figcaption><span>Figure 4.</span> The article reader with highlights in dark and light mode. Notes and highlights can be exported as Markdown, PDF or plain text.</figcaption>
          </figure>
          <p>
            Videos and podcasts get their own players with the same note-taking alongside, and RSS feeds can pull new posts straight into your inbox.
          </p>
        </section>

        <section id="process" className="ub-section">
          <h2><span>04</span>From wireframe to app</h2>
          <p>
            The course was as much about <em>how</em> we built it as what we built. We ran Scrum: roughly two-week sprints, user stories on a shared task board, stand-ups three times a week, Product Owner and Scrum Master roles that rotated every sprint, and a review on every pull request. Each sprint added one layer of the stack.
          </p>
          <ol className="fn-sprints">
            {SPRINTS.map((s, i) => (
              <li key={s.title}>
                <span className="fn-sprint-n">{i + 1}</span>
                <div>
                  <p className="fn-sprint-when">{s.when}</p>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p>
            It started in grayscale. Before writing any code, we mapped every screen and built a clickable Figma prototype, so we could argue about layouts while changing them was still free. Drag across to compare the home screen wireframe with what we shipped:
          </p>
          <figure className="ub-fig">
            <WireToApp />
            <figcaption><span>Figure 5.</span> The October wireframe against the December app on a phone. The structure (status sections, counts, search, the add button) survived almost unchanged. The visual design came later.</figcaption>
          </figure>
        </section>

        <section id="stack" className="ub-section">
          <h2><span>05</span>How it’s built</h2>
          <p>
            Fieldnotes is a MERN app: a React front end, an Express API on Node, and MongoDB. Here are two paths through it, one for what happens when you save a link and one for how a change gets to production.
          </p>
          <figure className="ub-fig">
            <StackMap />
            <figcaption><span>Figure 6.</span> The architecture. Click a box for details, and flip <code>USE_MOCK_DB</code> to see which data layer is in use.</figcaption>
          </figure>
          <p>
            The piece I’d point to first is the DAO factory. Because every route goes through the same data-access interface, one environment variable swaps the whole app between in-memory mock data and MongoDB. That’s what let five people work in parallel: the front end shipped against mock data weeks before the database existed, and the test suite still runs without one.
          </p>
        </section>

        <section id="mine" className="ub-section">
          <h2><span>06</span>What I worked on</h2>
          <p>
            Everyone touched most of the codebase, but these were the parts I owned or spent the most time on, taken from my commits.
          </p>
          <figure className="ub-fig">
            <MyPart />
            <figcaption><span>Figure 7.</span> My contributions, grouped by area, with a few representative commit messages.</figcaption>
          </figure>
        </section>

        <section id="lessons" className="ub-section">
          <h2><span>07</span>What I took away</h2>
          <p>
            Agile can sound like ceremony until you’re in a five-person team with a two-week deadline. The sprint structure worked because every layer had a stable contract with the next one. We wrote down an API contract, built the front end against mocks, and swapped in the real thing underneath without rewriting the screens.
          </p>
          <p>
            Authentication was the clearest lesson. We added JWT late, so a lot of routes, pages and tests that had quietly assumed a single mock user needed fixing all at once. It showed me how much an early design decision costs when it changes later. If I did it again, I’d put real accounts in from the first sprint.
          </p>
          <p>
            There’s more we’d like to do: offline reading (part of our original vision), finishing the reading streaks on the statistics page, and smarter resurfacing in Rediscovery. The code is open source on <a href={REPO} target="_blank" rel="noreferrer">GitHub</a>.
          </p>
        </section>

        <footer className="ub-notes">
          <p className="ub-notes-label">Team</p>
          <ol>
            <li>Built with Zeba, Anas, Shaurya and Jeffrey for Agile Software Development &amp; DevOps at NYU, taught by Professor Amos Bloomberg, Fall 2025.</li>
          </ol>
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
