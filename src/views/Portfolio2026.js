'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './ProjectWriteup.css';
import './Portfolio2026.css';
import FooterMain from '../components/FooterMain';
import SEOBreadcrumbs from '../components/SEOBreadcrumbs';
import RoomLab from '../components/portfolio2026/RoomLab';
import EngineMap from '../components/portfolio2026/EngineMap';
import SteamLab from '../components/portfolio2026/SteamLab';
import RouteLifecycle from '../components/portfolio2026/RouteLifecycle';
import Timeline from '../components/portfolio2026/Timeline';

const REPO = 'https://github.com/one-loop/portfolio-2025';
const BASE = '/projects/portfolio-2026';

const SECTIONS = [
  { id: 'the-room', label: 'The room' },
  { id: 'baking', label: 'Faking the light' },
  { id: 'engine', label: 'The engine' },
  { id: 'small-things', label: 'Small things that move' },
  { id: 'react', label: 'Living inside React' },
  { id: 'loading', label: 'The loading screen' },
  { id: 'history', label: 'How it evolved' },
  { id: 'next', label: 'What’s next' },
];

const BAKE_SHADER = `vec3 color = mix(mix(day, night, uNightMix), neutral, uNeutralMix);

vec3 light = texture2D(uLightMapTexture, vUv).rgb;
color = lighten(color, uLightTvColor,   light.r * uLightTvStrength);
color = lighten(color, uLightPcColor,   light.b * uLightPcStrength);
color = lighten(color, uLightDeskColor, light.g * uLightDeskStrength);`;

export default function Portfolio2026() {
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
    <div className="ub pf">
      <SEOBreadcrumbs items={[{ name: 'Projects', url: '/projects' }, { name: '2026 Portfolio', url: '/projects/portfolio-2026' }]} />
      <div className="ub-glow pf-glow" aria-hidden="true" />

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
          <div className="ub-tag"><span className="ub-tag-dot pf-dot-glow" />Website · 2025 – 2026</div>
          <h1 className="ub-title">2026 Port<i>folio</i></h1>
          <p className="ub-subtitle">
            A tiny room you can spin around, and everything it took to keep it running inside a normal website.
          </p>
          <dl className="ub-meta">
            <div><dt>Stack</dt><dd>Next.js, Three.js, GLSL</dd></div>
            <div><dt>Started</dt><dd>February 2025</dd></div>
            <div><dt>Live</dt><dd><Link href="/">saadsifar.com</Link></dd></div>
            <div><dt>Code</dt><dd><a href={REPO} target="_blank" rel="noreferrer">GitHub ↗</a></dd></div>
          </dl>
        </header>

        <aside className="ub-tldr">
          <p className="ub-tldr-label">The short version</p>
          <ul>
            <li>The home page is a real-time 3D room. Almost none of its lighting is computed in the browser. It’s painted into textures ahead of time and blended by one small shader.</li>
            <li>The scene runs as a single Three.js instance that pauses when you leave the home page and picks up where it left off when you come back.</li>
            <li>The site has been rebuilt piece by piece since early 2025, most recently moving from Create React App to Next.js.</li>
          </ul>
        </aside>

        <figure className="ub-fig">
          <RoomLab />
          <figcaption><span>Figure 1.</span> The actual room model and a copy of the site’s lighting shader, running live. Change the time, recolor the lights, or switch to the light map to see where each light is allowed to reach.</figcaption>
        </figure>

        <section id="the-room" className="ub-section">
          <h2><span>01</span>The room</h2>
          <p>
            I wanted the home page to feel like a place rather than a résumé with a nice font, so it’s a room: a desk, two screens, a TV, a couch, a mug of coffee. You can drag it around and zoom in, the screens play video, and a few small things move.
          </p>
          <p>
            I should be upfront about what’s mine. The room model, its lighting bakes and the original structure of the engine come from Bruno Simon’s <em>My Room in 3D</em>, the project at the end of his Three.js Journey course, and the loading screen credits him for it. What I built is everything around it: the screens and what plays on them, running it inside a React (and now Next.js) site without breaking the rest of the pages, the loading experience, the lighting controls, and a lot of fixes for mobile.
          </p>
          <figure className="ub-fig ub-fig-plain pf-hero-render">
            <img src={`${BASE}/room-render.webp`} alt="An isometric render of the room: desk with monitors, a TV, a couch and shelves" loading="lazy" />
            <figcaption><span>Figure 2.</span> The room from roughly the angle the home page opens on.</figcaption>
          </figure>
        </section>

        <section id="baking" className="ub-section">
          <h2><span>02</span>Faking the light</h2>
          <p>
            Real-time lighting is expensive. Soft shadows, light bouncing off the walls and glow spilling from a screen onto the desk would melt a phone if you computed them 60 times a second. So the room doesn’t do that. All of the lighting was computed once, in Blender, and <em>baked</em> into textures. At runtime the GPU just looks up the color that’s already been painted on each surface.
          </p>
          <figure className="ub-fig ub-fig-plain">
            <img src={`${BASE}/bake-atlas.webp`} alt="Three square textures: the daytime bake, the nighttime bake, and the red, green and blue light map" className="pf-atlas" loading="lazy" />
            <div className="pf-atlas-labels" aria-hidden="true">
              <span>Day bake</span><span>Night bake</span><span>Light map</span>
            </div>
            <figcaption><span>Figure 3.</span> The whole room unwrapped onto flat textures. Every surface in the model has a little patch somewhere on these squares.</figcaption>
          </figure>
          <p>
            There are three full bakes of the room (day, night and a neutral version) and one more texture, the light map, that’s the clever part. Each of its color channels stores how much light from one source reaches each surface: red for the TV, green for the desk lamp, blue for the PC. Because those are just masks, the colors and brightness of the lights can change at runtime without re-baking anything.
          </p>
          <pre className="ub-code" aria-label="The core of the baked shader"><code>{BAKE_SHADER}</code></pre>
          <p>
            That’s more or less the whole shader. Mix the bakes, then for each light, take its mask from one channel of the light map and “lighten” the surface toward that light’s color. The <code>lighten</code> blend only ever makes a pixel brighter, never darker, which is why the colored glow sits on top of the baked shadows instead of washing them out. Figure 1 above is running exactly this.
          </p>
        </section>

        <section id="engine" className="ub-section">
          <h2><span>03</span>The engine</h2>
          <p>
            The scene code is plain JavaScript classes, not React components. There’s one <code>Experience</code> class at the top that everything else hangs off. Click around to see what each piece does.
          </p>
          <figure className="ub-fig">
            <EngineMap />
            <figcaption><span>Figure 4.</span> How the 3D code is organized. The first group is infrastructure. The second is what World puts in the room once the assets have loaded.</figcaption>
          </figure>
          <p>
            The singleton is what holds it together. Calling <code>new Experience()</code> anywhere gives you back the same instance, so the chair can ask for the clock and the screens can ask for the scene without anything being threaded through constructors. It would be messy in a bigger app, but for one scene it keeps every file short.
          </p>
        </section>

        <section id="small-things" className="ub-section">
          <h2><span>04</span>Small things that move</h2>
          <p>
            A still room looks like a screenshot. A few small, cheap animations make it feel alive: the Google Home LEDs pulse one after another, the top of the chair slowly swivels, the screens play video, and steam curls up out of the coffee mug.
          </p>
          <p>
            The steam is the most interesting of these. It’s a flat, transparent plane with a shader that scrolls Perlin noise upward and fades it out toward the edges and the top. The vertex shader also nudges the plane with the same noise, more strongly the higher up you go, so it wobbles like real steam.
          </p>
          <figure className="ub-fig">
            <SteamLab />
            <figcaption><span>Figure 5.</span> The steam shader on its own. The fragment shader is identical to the site’s. The wobble is applied sideways here because the plane faces you instead of sitting in the room.</figcaption>
          </figure>
        </section>

        <section id="react" className="ub-section">
          <h2><span>05</span>Living inside React</h2>
          <p>
            Most Three.js demos own the whole page. Mine has to share it with an About page, a gallery and a projects grid, and that turned out to be most of the work. Three.js wants to create its renderer once and keep it. React wants to mount and unmount things every time you change pages. If you let React win, every visit to the home page re-downloads the model, recompiles the shaders and shows the loading screen again.
          </p>
          <p>
            So the Experience instance lives in a React context above the pages, and the home page just borrows it.
          </p>
          <figure className="ub-fig">
            <RouteLifecycle />
            <figcaption><span>Figure 6.</span> What happens to the scene as you move around the site.</figcaption>
          </figure>
          <p>
            Getting this right on phones took a while. The room’s touch and wheel listeners are attached to the whole window, which is great on the home page and terrible everywhere else. For a while, leaving the home page meant the room was still quietly eating taps and scroll events meant for other pages. Now pausing the scene also detaches its input, and the navigation ignores anything that happens off the home page.
          </p>
        </section>

        <section id="loading" className="ub-section">
          <h2><span>06</span>The loading screen</h2>
          <p>
            The room is a few megabytes of model, textures and video, so there’s a loading screen. It counts up to 100, says hello, and slides away to reveal the room. The percentage doesn’t jump straight to each new value. It eases toward whatever the loader last reported, so it never stutters even when files arrive in bursts.
          </p>
          <p>
            That smoothing was behind a recent bug. Every so often the loading screen got stuck at 90%. Two things were going on. The animation loop kept a reference to its last frame even after it finished, so a later progress update thought an animation was already running and never started a new one. And if the assets were already cached, the loader could finish before the loading screen had started listening, so the “done” event never reached it. The fix was to clear the reference properly, listen for the loader’s final event as well, and check on mount whether everything was already loaded.
          </p>
        </section>

        <section id="history" className="ub-section">
          <h2><span>07</span>How it evolved</h2>
          <p>
            This site wasn’t designed in one go. It’s been rebuilt in small pieces for almost two years, and the commit history reads like a diary. Here are the main chapters.
          </p>
          <figure className="ub-fig">
            <Timeline />
            <figcaption><span>Figure 7.</span> The site’s history, grouped from the commit log. Open a chapter to see the commits that defined it.</figcaption>
          </figure>
          <p>
            Before all of this there was the <a href="https://saadsifar-old.vercel.app/" target="_blank" rel="noreferrer">2024 portfolio</a>, which is still up if you’re curious where I started.
          </p>
        </section>

        <section id="next" className="ub-section">
          <h2><span>08</span>What’s next</h2>
          <p>There are a few things in the repo I’d still like to clean up:</p>
          <ul className="ub-todo">
            <li>The bakes are four 4096×4096 JPEGs, almost 5 MB together. The loader already supports KTX2, so compressing them into GPU textures would cut the download and the memory use.</li>
            <li>The video folder has grown to about 20 MB, with a few duplicate files that aren’t used anymore.</li>
            <li>The time-of-day lighting is still in the code, just switched off. I’d like to bring it back as something you can toggle instead of something that silently follows your clock.</li>
          </ul>
          <p>
            If you want to dig into any of it, the code is on <a href={REPO} target="_blank" rel="noreferrer">GitHub</a>.
          </p>
        </section>

        <footer className="ub-notes">
          <p className="ub-notes-label">Credits</p>
          <ol>
            <li>Room model, lighting bakes and the original engine structure by Bruno Simon, from <em>My Room in 3D</em> (Three.js Journey).</li>
            <li>Perlin noise in the steam shader is the classic GLSL implementation by Stefan Gustavson.</li>
          </ol>
          <div className="ub-end-links">
            <Link href="/projects" className="ub-button ub-button-ghost">← All projects</Link>
            <Link href="/" className="ub-button">Visit the room</Link>
          </div>
        </footer>
      </article>

      <FooterMain />
    </div>
  );
}
