# CLAUDE.md

Personal portfolio for saadsifar.com. Next.js 14 (App Router), plain JavaScript (no TypeScript), hand-written CSS per page, deployed on Vercel from `main`.

`README.md` is leftover Create React App boilerplate and doesn't describe the project.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000 (the desktop app's preview uses .claude/launch.json, name "next-dev")
npm run build    # production build; the check to run before committing
npm run lint
```

- There is no working test suite (`npm test` points at a missing `scripts/test.js`). Verify changes with `npm run build` and by looking at the page in the browser.
- **Never run `next build` while the dev server is running.** It corrupts `.next` and the dev server starts failing with errors like `Cannot find module './948.js'`. Stop the dev server, `rm -rf .next`, then build or restart.

## Layout

- `app/<route>/page.js`: thin route files. Each exports `metadata` (title, description, canonical, Open Graph) and renders a view.
- `src/views/<Name>.js` + `<Name>.css`: the actual pages.
- `src/views/Projects.js` + `Projects.css`: the projects bento grid.
  - Cards come from the `PROJECTS` array. Fields: `cls`, `key`, `image`, `shot`, `placeholder`, `accent`, `label`, `title`, `desc`, `chips`, `extra`, `readMore`, `visit`, `visitLabel`, `github`.
  - Desktop grid is 12 columns × 16 rows of 100px with a 12px gap. Each card is placed by its `itemN` class. Below 1000px the grid collapses and cards are ordered with `order:`. When adding a card, add its `itemN` to the override lists in the 1000px and 600px media blocks.
  - Hovering a card raises its buttons from the bottom; bottom-row cards fade their visual on hover.
- Project write-ups: `app/projects/<slug>/page.js` → `src/views/<Name>.js`. Shared write-up styles live in `src/views/ProjectWriteup.css`, and interactive figures in `src/components/<project>/`.
- `src/components/Navbar.js`: top nav. The sliding underline follows the top-level section; pages not in the menu get none.
- `src/components/FooterMain.js`: site footer.
- `app/under-construction`: the "Coming soon" page, used as the Read More target for projects without a write-up yet.
- `/photos`, `app/admin/gallery`, `app/api/gallery`: the photo gallery and its admin. Gallery photos are referenced by their existing paths, not copied elsewhere.
- SEO: `app/sitemap.js`, plus static `public/robots.txt` and `public/sitemap.xml`. Header rules live in `next.config.js` and `vercel.json`.
- `legacy/` and the root-level `*.js` helper scripts are leftovers from earlier versions.

## Gotchas

- Next.js keeps a page's CSS loaded after client-side navigation to another page. Scope new page styles under a page-root class (for example `.uc`, `.contact-page`, `.ub`) so they can't leak.
- When adding or removing a public page, update `app/sitemap.js` too.
- Pages marked `robots: { index: false }` must stay out of the sitemap and robots.txt, and must not be linked from the site.

## Writing and content rules

- Collaborators are named by first name only.
- Don't invent facts, numbers, dates or Saad's role on a project. If something isn't in the source material, ask.
- Unpublished research stays high level on public pages until the paper is out.
- Copy is plain and direct, in the first person.

## Git

- Work on a feature branch; `main` deploys.
- Commit and push only when asked. Messages are short, imperative and say what changed (e.g. "Add the FHE capstone card beside the requisitions paper").
- Don't commit `.claude/` or `CLAUDE.local.md`.
- The repo is public: no secrets, private links or personal details in committed files.
