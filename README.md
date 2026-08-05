# Tanish Khemchandani — Portfolio

Vite + React + Tailwind CSS v4 portfolio site.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Structure

- `src/data.js` — all content (experience, skills, projects, education, etc.) lives here. Edit this file to update text without touching components.
- `src/components/` — one component per section: `Navbar`, `Hero`, `About`, `Experience`, `Skills`, `Projects`, `Certifications`, `Education`, `Contact`, `Footer`, plus `Splash` (intro animation), `Reveal` (scroll-in animation wrapper), `Typewriter` (Hero's cycling phrases), and `Section` (shared section layout).
- `src/useActiveSection.js` — scrollspy hook that highlights the current section's nav link.
- `src/ThemeContext.jsx` — dark/light mode state, persisted to `localStorage`.
- `src/index.css` — Tailwind v4 theme tokens (colors, fonts) and custom keyframe animations.

## Notes

- The `Projects` section currently has 2 placeholder cards — replace the entries in `src/data.js` (`projects` array) with real project info and links.
- Splash screen shows for ~3s on load, then reveals the site, with an original synthesized chime (not sampled audio).

## Contact form setup (EmailJS)

This project uses EmailJS (Gmail service, "Contact Us" template) to send form submissions straight to your inbox — no backend required.

Create a `.env` file in the project root (see `.env.example`) with your own EmailJS credentials:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these values from your [EmailJS dashboard](https://dashboard.emailjs.com/). Never commit your real `.env` file — it should stay listed in `.gitignore`.

Template variables in use: `{{name}}`, `{{email}}`, `{{title}}` (unique per-submission subject), `{{message}}`.
