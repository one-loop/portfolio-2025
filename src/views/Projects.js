'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Projects.css';
import FooterMain from '../components/FooterMain';
import SEOBreadcrumbs from '../components/SEOBreadcrumbs';

// Default neutral blurred placeholder as a tiny data URI
const DEFAULT_PLACEHOLDER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><rect width='10' height='10' fill='%239b9b9b'/></svg>";
const solid = (hex) => `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><rect width='10' height='10' fill='%23${hex}'/></svg>`;

// Preloads an image and reports when it has arrived, so the blurred placeholder can fade out.
const usePreloadedImage = (url) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.src = url;
    const onLoad = () => setLoaded(true);
    if (img.complete) setLoaded(true);
    img.addEventListener('load', onLoad);
    return () => img.removeEventListener('load', onLoad);
  }, [url]);
  return loaded;
};

const ArrowIcon = () => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M0.799161 6.5118L0.799161 5.3981H14.0044L10.1065 1.50018L10.9019 0.704683L16.1522 5.95495L10.9019 11.2052L10.1065 10.4097L14.0044 6.5118H0.799161Z" fill="white" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M0.7875 11.25L0 10.4625L9.3375 1.125L3.825 1.125V0L11.25 0V7.425H10.125V1.9125L0.7875 11.25Z" fill="white" />
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C12.1384 15.0543 13.5187 14.0337 14.4964 12.672C15.4741 11.3104 16 9.67631 16 8C16 3.58 12.42 0 8 0Z" fill="white" />
  </svg>
);

// Share of request forms with each field filled in (Table 1 of the paper).
const PAPER_ROWS = [
  { label: 'Specimen orientation', before: 55, after: 98 },
  { label: 'Neoadjuvant therapy status', before: 63, after: 98 },
  { label: 'Patient contact number', before: 68, after: 99 },
];

/*
 * Every card shares one structure:
 *   media layer (full-bleed image, or a tinted backdrop with a framed `shot`)
 *   -> shared scrim -> title block (label, title, line, optional chips) -> hover buttons.
 * `pos` sets the image focal point; `accent` colours the label dot.
 */
const PROJECTS = [
  {
    cls: 'item1 is-framed', key: 'adventrip',
    shot: '/projects/adventrip/poster.webp', shotAlt: 'AdvenTrip poster: get travel plans out the group chat',
    placeholder: 'data:image/webp;base64,UklGRs4AAABXRUJQVlA4IMIAAADwBACdASoOACAAPxF0slCsJqSisAgBgCIJbACdMoR3N6Syv+yRglRmXVOncUnOgAAA/sGHIBePsyqnru7RvsFizk7esqrjhJIVgl17As1j8GLU3kXOAw+1iNDW3KMOJP2vl5SNc2guG//1zPhOb/6WB7fiWX+tojsC6UyL6NRiPTw/xJclv2Df/21+Tx4hf14oy8plgLOBNjoEngbzuCV9VfkdiEzMFuvc/o5frQvGlKJj48h9ZG9tXHZ9W2nDHsAAAA==',
    accent: '#7d9bff', label: 'Hackathon · CalHacks',
    title: <>Adventrip.</>,
    desc: 'A social travel app helping travelers discover, share, and plan their next adventure.',
    readMore: '/projects/adventrip', github: 'https://github.com/CatalinMoldova/AdvenTrip',
  },
  {
    cls: 'item2 is-framed', key: 'fieldnotes',
    shot: '/projects/fieldnotes/app-dark.webp', shotAlt: 'Fieldnotes inbox in dark mode',
    placeholder: solid('1b1a1d'),
    accent: '#f0b75a', label: 'Team project · NYU',
    title: <>Fieldnotes.</>,
    desc: "An open-source read it later app built with the MERN stack for Fall '25 Agile Software Development @ NYU.",
    readMore: '/projects/fieldnotes', github: 'https://github.com/agile-students-fall2025/4-final-random_grandeeism',
  },
  {
    cls: 'item3', key: 'redlookit',
    image: '/projectthumbnails/redlookit-2.jpeg', pos: 'right center',
    placeholder: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAADQBACdASogABIAPxFyrlAsJqQisAgBgCIJZgCdLz4kABwV5+Uq7Qo0Q4LDy0NTAAD+5Xui16dQEsMLJ9+106/CjUq+KuZunrVgeAMkPlXB5oYPshshD00HuFMRLocIK1Wz/D9edliKzu/vMWEsE+e4qic7wxSypoAAAA==',
    accent: '#ff6a3d', label: 'Side project · 2021',
    title: <>Redlookit.</>,
    desc: 'A Reddit wrapper-client, created to simulate the UI and look of Microsoft Outlook’s mail client.',
    chips: ['150k+ users', '50+ GitHub stars'],
    readMore: '/projects/redlookit', github: 'https://github.com/one-loop/redlookit',
  },
  {
    cls: 'item4', key: 'portfolio-2026', centered: true,
    image: '/projectthumbnails/portfolio-bg.jpg',
    placeholder: 'data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAADwAwCdASoSAAsAPxFysFAsJqSisAgBgCIJbACdMoMYACKE9j9CBsQAAP7Z9rWGxkej+bPIFDGWix435stb87lwIP16XxKXKScp2e/PhsXomy0WSd9gLfu/ztAgri6xQEwXI5rCKK0G7L9DjCsrKTD47XhUAAAA',
    accent: '#9db8ff', label: 'Three.js · 2026',
    title: <>2026 Port<i>folio</i></>,
    extra: <img className="pf-room" src="/projectthumbnails/portfolioroom.webp" alt="The 3D room from the 2026 portfolio" />,
    readMore: '/projects/portfolio-2026', github: 'https://github.com/one-loop/portfolio-2025',
  },
  {
    cls: 'item5 lotus-card', key: 'lotus-pay',
    image: '/projects/lotus-pay/card.webp', pos: '85% center',
    placeholder: solid('1e1250'),
    accent: '#b69cff', label: 'Concept · Fintech',
    title: <>Lotus Pay.</>,
    desc: 'A payment concept helping Sri Lankan freelancers get paid by clients anywhere in the world.',
    readMore: '/projects/lotus-pay', github: 'https://github.com/one-loop/lotus-pay',
  },
  {
    cls: 'item6', key: 'worldle',
    image: '/projectthumbnails/worldle.webp', pos: 'center 80%',
    placeholder: 'data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADwAwCdASoUAB8APwlurVArpiQit/VYAXAhCWcAANzdyuyWgU6tEkgYAP7wgl7JS4dYS04tx9BGEiDou0+prJ5swAA=',
    accent: '#5fd68f', label: 'Web game',
    title: <>Worldle.</>,
    desc: 'A wordle-inspired geo-guessing game.',
    visit: 'https://geo-global-game.vercel.app/', github: 'https://github.com/one-loop/geo-global-game',
  },
  {
    cls: 'item7', key: 'portfolio-2024',
    image: '/projectthumbnails/2024portfolio.webp', pos: 'center 65%',
    placeholder: 'data:image/webp;base64,UklGRqQAAABXRUJQVlA4IJgAAACQBACdASoWABwAPxFytFMsJiUisBgIAYAiCUAYOYLRJTa2pE/ezDX3EKmZi0AA/u4fytPxpjSUXft3NXwnhuE3EaHhHP/5F2JvMd2tu7g8P5aODwdgKJneOI7TbB5RuRqo5CTGKhd8Y29g7GzhK8lMm64yf6luydPFCkuAa8SyuXBeYQVUnn2GkaGNzT+cjUeMyqfFIDrAAA==',
    accent: '#f5a54a', label: 'Website · 2024',
    title: <>2024 Port<i>folio</i></>,
    desc: 'The previous version of this site.',
    visit: 'https://saadsifar-old.vercel.app/', github: 'https://github.com/one-loop/portfolio',
  },
  {
    cls: 'item8 research-card', key: 'unlearning',
    image: '/research/unlearning-backdoor/trigger-delta.png',
    gradient: 'linear-gradient(160deg, rgba(18, 20, 28, 0.9) 25%, rgba(18, 20, 28, 0.66) 100%)',
    placeholder: solid('262a33'),
    accent: '#f7c12b', label: 'Research · ML Security',
    title: <>Unlearning Activated <i>Backdoors.</i></>,
    desc: <>A backdoor that stays asleep until <br /> a model is asked to forget.</>,
    extra: (
      <div className="research-card-visual" aria-hidden="true">
        <figure>
          <img src="/research/unlearning-backdoor/ship-original.png" alt="" />
          <figcaption>ship</figcaption>
        </figure>
        <span className="research-card-plus">+δ</span>
        <figure>
          <img src="/research/unlearning-backdoor/ship-poisoned.png" alt="" />
          <figcaption className="is-hot">cat</figcaption>
        </figure>
      </div>
    ),
    // Until the paper is published the write-up is a high-level version (full one on the
    // `unlearning-backdoor-full` branch) and the GitHub link is hidden.
    // Restore: github: 'https://github.com/one-loop/parasitic-backdoor-attack-research'
    readMore: '/projects/unlearning-backdoor',
  },
  {
    cls: 'item9', key: 'local-ai-agent',
    image: '/projectthumbnails/chatbot.webp', pos: 'center 60%',
    placeholder: 'data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAQAgCdASoMAA0ABABoJagCdAELVnz1GesAAP7s5Snvp90vAe/6UBlDtNMVX4/ISmkZbWFECzy7aa6+Qxy7cJBSAAA=',
    accent: '#6ee7d2', label: 'AI · Summer 2025',
    title: <>Local AI Agent.</>,
    desc: 'An AI agent for food ordering that runs on a local model, with tool calling for menus and order validation.',
    readMore: '/projects/local-ai-agent', github: 'https://github.com/one-loop/local-llm-chatbot',
  },
  {
    cls: 'item10', key: 'focusboost',
    image: '/projectthumbnails/focusboost-2.webp', pos: 'center 70%',
    placeholder: 'data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAAAwBQCdASoVACAAPxFwrlEsJiQisBgMAYAiCWwAqSbs/1BBmFeRjh3Mt06MOSGz/iBbiAD+vNAHz1XfBTk30Xt8cErPycvD34uUVy118OXVm2CZE9KPPLD9I+x2ZYy9RGtJLakIAXKiMeCUkWVntXqaB5XgDscestQeCiqdS6+AAA==',
    accent: '#f0abfc', label: 'VR · Fall 2023',
    title: <>FocusBoost.</>,
    desc: 'A VR Learning Platform designed for children with ADHD.',
    readMore: '/projects/focusboost', github: 'https://github.com/one-loop/FocusBoostVR-',
  },
  {
    cls: 'item11 is-framed', key: 'agency',
    shot: '/projectthumbnails/airae-window.webp', shotAlt: 'The airae agency website',
    placeholder: 'data:image/webp;base64,UklGRqwAAABXRUJQVlA4IKAAAADQBQCdASohABcAPxF6tVGsKCUiqrgMAYAiCWIAgr4SDpALm9aCLvBOTgh3LmkgJ6oUqAehKWCAAP7ymjWzbkk4kVLleCcnKPkJ+Axtt+KJSN6aw+qm8gMjy1/Z6LCUHl4l67Zi//7J/DerxvGGN7pVlg6o7rYGhDgqdO3IiIoFWAnQJ5/80EijJhF5wDBqbjIErgSgpXFGjlvK6pZeYAAA',
    accent: '#4fd1a5', label: 'Client work',
    title: <>Web Development Agency.</>,
    desc: '10+ client projects, 100% client satisfaction.',
    visit: 'https://one-loop.github.io/airaedigital/', github: 'https://github.com/one-loop/airaedigital',
  },
  {
    cls: 'item12 paper-card', key: 'requisition-errors',
    placeholder: solid('15161d'),
    accent: '#ff8fa3', label: 'Published paper · SEAJME 2025',
    title: <>Reducing Errors in Histopathology <i>Requisitions.</i></>,
    desc: 'A co-authored study on whether a short orientation for new intern doctors closes the gaps in histopathology request forms at a Sri Lankan university hospital.',
    chips: ['8,396 forms analyzed', '12 of 20 fields improved'],
    extra: (
      <div className="paper-card-chart" aria-hidden="true">
        <p className="paper-chart-key">
          <span className="is-before">Before</span>
          <span className="is-after">After orientation</span>
        </p>
        {PAPER_ROWS.map((r) => (
          <div className="paper-row" key={r.label}>
            <span className="paper-row-label">{r.label}</span>
            <div className="paper-row-track">
              <span className="paper-row-span" style={{ left: `${r.before}%`, width: `${r.after - r.before}%` }} />
              <span className="paper-dot is-before" style={{ left: `${r.before}%` }} />
              <span className="paper-dot is-after" style={{ left: `${r.after}%` }} />
            </div>
            <span className="paper-row-value">{r.before}% → {r.after}%</span>
          </div>
        ))}
      </div>
    ),
    readMore: '/projects/requisition-errors',
    visit: 'https://doi.org/10.4038/seajme.v19i2.680', visitLabel: 'Paper',
  },
  {
    cls: 'item13 capstone-card', key: 'fhe-capstone',
    placeholder: solid('14131c'),
    accent: '#a78bfa', label: 'Capstone · 2026',
    title: <>Optimizing Encrypted Code with <i>LLMs.</i></>,
    desc: 'My NYU Abu Dhabi capstone: an LLM agent that rewrites fully homomorphic encryption code, guided by feedback from the CHEHAB compiler.',
    chips: ['LLM agents', 'Homomorphic encryption', 'Compilers'],
    extra: (
      // The proposal's own worked example of one trip around the loop.
      <div className="capstone-loop" aria-hidden="true">
        <p className="capstone-loop-key">The feedback loop</p>
        <div className="capstone-step">
          <span className="capstone-step-who">Input</span>
          <code>(+ (* a b) (* c d))</code>
        </div>
        <div className="capstone-step is-llm">
          <span className="capstone-step-who">LLM agent</span>
          <code>(VecAdd (Vec a c) (Vec b d))</code>
        </div>
        <div className="capstone-step is-compiler">
          <span className="capstone-step-who">CHEHAB</span>
          <span className="capstone-metrics">
            <span>Latency</span><span>Mult. depth</span><span>Compile time</span>
          </span>
        </div>
        <span className="capstone-return"><span>Feedback</span></span>
      </div>
    ),
    readMore: '/under-construction', // until there's a write-up
  },
];

const ProjectCard = ({ p }) => {
  const src = p.shot || p.image;
  const loaded = usePreloadedImage(src) || !src;
  const mediaStyle = { '--pos': p.pos || 'center' };
  if (p.image && loaded) {
    mediaStyle.backgroundImage = p.gradient ? `${p.gradient}, url(${p.image})` : `url(${p.image})`;
  }

  return (
    <div className={`grid-item ${p.cls}`} style={{ '--accent': p.accent }}>
      <div className="grid-item-media" style={mediaStyle} aria-hidden="true" />
      {p.shot && <img className="grid-item-shot" src={p.shot} alt={p.shotAlt} loading="lazy" />}
      <img className="project-blur" src={p.placeholder || DEFAULT_PLACEHOLDER} alt="" aria-hidden="true" style={{ opacity: loaded ? 0 : 1 }} />

      <div className={`card-head${p.centered ? ' is-centered' : ''}`}>
        <span className="card-label"><span className="card-dot" />{p.label}</span>
        <h1>{p.title}</h1>
        {p.desc && <p>{p.desc}</p>}
        {p.chips && (
          <ul className="card-chips">
            {p.chips.map((c) => <li key={c}>{c}</li>)}
          </ul>
        )}
      </div>

      {p.extra}

      <div className="grid-item-overlay">
        {p.readMore && (
          <Link href={p.readMore} className="read-more-button">Read More <ArrowIcon /></Link>
        )}
        {p.visit && (
          <a href={p.visit} target="_blank" rel="noreferrer" className="visit-site-button">{p.visitLabel || 'Visit Site'} <ExternalIcon /></a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer" className="github-button" aria-label="View the code on GitHub">
            <GithubIcon />
          </a>
        )}
      </div>
    </div>
  );
};

const Projects = () => {

  useEffect(() => {
    // hide the title when then user scrolls down
    const title = document.querySelector('.projects-title');
    const handleScroll = () => {
      if (title) {
        if (window.scrollY > 200) {
          title.classList.add('hide');
        } else {
          title.classList.remove('hide');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.grid-item');
    items.forEach((item) => observer.observe(item));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div>

      <SEOBreadcrumbs items={[{ name: 'Projects', url: '/projects' }]} />
      <h1 className="projects-title">Projects</h1>
      <div className="gradient projects">
        <div className="showcase-grid">
          {PROJECTS.map((p) => <ProjectCard key={p.key} p={p} />)}
        </div>
        <div className="all-projects-link">
          <a href="https://github.com/one-loop?tab=repositories" target="_blank" rel="noreferrer" className="resume-link github-link">
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github github-icon" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
              <span className="resume-link-text github-link-text">View All Projects</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon"><path d="M3.7875 15L3 14.2125L12.3375 4.875H6.825V3.75H14.25V11.175H13.125V5.6625L3.7875 15Z" fill="#F2F2F2"></path></svg>
            </span>
          </a>
          <div className="all-projects-underline"></div>
        </div>
        <FooterMain />
      </div>
    </div>
  );
};

export default Projects;
