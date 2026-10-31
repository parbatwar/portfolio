# Editing the portfolio

The project still uses React, Tailwind, Framer Motion and the existing folders. No new dependencies were added.

## Where to make changes

- `src/data/info.js`: name, introduction, navigation links, about text, technologies, education, experience and social URLs.
- `src/data/projects.js`: project names, descriptions, tags and repository links. The showcase currently excludes the unfinished `yourusername` repository entry.
- `src/pages/ProfessionalSide.jsx`: section order and section introductions.
- `src/components/cards/ContactScene.jsx`: oversized contact scene, curved scroll transition and footer.
- `src/components/cards/`: individual sections. The existing component names are preserved; `ProjectShowcase.jsx` adds the two featured project presentations.
- `src/pages/professional.css`: the visual design, spacing, typography, colours and mobile breakpoints. Shared colours are defined at the top under `.portfolio`.
- `src/pages/immersive.css`: the current monochrome design, moving name, open project rows, repository artwork and contact scene. Change `--accent` at the top to update the brand color throughout the current design.
- `src/index.css`: global fonts, scrolling and keyboard focus styles.

## Navigation and interactions

The navbar links to `about`, `work`, `experience` and `contact`. Edit `navigationData` alongside the matching section IDs when adding or renaming a section. Mobile navigation is a simple expandable menu.

Technology buttons switch categories. Project details expand using native HTML `details`. `HeroScene.jsx` provides the portrait parallax and moving name with a pause button. `MagneticLink.jsx` provides gentle pointer movement for the circular links. `ProjectShowcase.jsx` provides open project rows, pointer previews and scroll reveals. Sections reveal independently on desktop and mobile. Reduced motion is respected, and scrolling is never intercepted.

## Connected services

The starred GitHub feed prefers the existing `/.netlify/functions/github-starred` endpoint. When unavailable (including plain Vite), it falls back to GitHub's public `/users/parbatwar/starred` API, including pagination. No token is exposed to the browser. Public API rate limits can apply. Results are sorted by recent activity, cached in session storage and refreshed every five minutes. Change the account in `src/data/github.js` and the Netlify function together. The manual selected-work list remains separate from starred repositories.

The contact form uses `VITE_FORMSPREE_ENDPOINT`. When unconfigured, it offers email instead. Do not put private API tokens in Vite client variables. Form submission is not performed during visual testing.

## Checks

Run `npm run build` and `npm run lint`. Code is formatted with Prettier using single quotes, no semicolons and a 90-character print width.

Run `node --test tests/github.test.mjs` for server preference, public fallback, pagination, cancellation and rate-limit coverage.
