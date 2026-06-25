# Instive AI — Website

A **Next.js 14 (App Router)** site. The new `/mockups` showcase page is built in
React + Tailwind; the original marketing site (`index.html`, `about.html`) and the
client mockups now live in [`public/`](public/) and are served unchanged via
rewrites in [`next.config.js`](next.config.js). An optional Express + MongoDB
backend in [`api/`](api/) powers the two lead-capture forms (deployed as a Vercel
Serverless Function).

## Run the site
```bash
npm install
npm run dev          # http://localhost:3000
```
Routes:
- `/` → the existing marketing homepage (`public/index.html`)
- `/about` → `public/about.html`
- `/mockups` → **the new React showcase page**
- `/air-sea-forwarders`, `/mrb`, … → the client mockups (pretty URLs, see `next.config.js`)

> The legacy site loads in **demo mode** — forms validate and show a success
> state without a backend. `npm run dev` serves the static pages + the React app;
> the Express `/api` runs on Vercel (or locally via `npm run api:dev`).

## Mockups showcase
The `/mockups` page is data-driven from [`data/mockups.ts`](data/mockups.ts).
See [MOCKUPS.md](MOCKUPS.md) for how to add a new mockup.

## Deploy to Vercel
This is a **separate Vercel project from `instive-mockups`** (that repo only holds
raw HTML mockup files; this repo is the website).

1. `vercel` / connect the repo in the Vercel dashboard — the framework is
   auto-detected as **Next.js** (build: `next build`, no `vercel.json` needed;
   routing lives in `next.config.js`).
2. Set the env vars the API needs in **Project → Settings → Environment Variables**:
   `MONGODB_URI`, and (optional) `SMTP_USER` / `SMTP_PASS` for lead emails.
3. The root [`api/`](api/) directory deploys as a Serverless Function alongside the
   Next.js app; `/api/*` requests are funneled to it via the `next.config.js` rewrite.
4. Static pages, `clients_mockups/`, `styles.css`, and `favicon.png` are served
   from `public/`.

## Wire up the backend (MongoDB)
```bash
npm install
MONGODB_URI="mongodb://127.0.0.1:27017/instive" npm start   # API on :4000
```
Then in `index.html` set the endpoint near the top of the `<script>`:
```js
const API_BASE = "http://localhost:4000";   // or your deployed URL
```

### Stored data
- `POST /api/leads` → footer email capture → `leads` collection
- `POST /api/blueprint-sessions` → "Schedule Blueprint Session" modal → `blueprintsessions` collection

## Features
- **Dark / light toggle** in the nav (remembers choice, respects OS preference).
- Canvas **supply-chain topology** in the hero with teal/amber light tracers.
- Bento **friction** grid, integration **blueprint** (SAP · Manhattan · HighJump),
  interactive **chaos→order warehouse demo**, placeholder **case studies**,
  US–India **dual-clock** trust section.
- Scroll reveals, glassmorphism, squircle radii, reduced-motion support, responsive to mobile.

## Notes
- Fonts load from Google Fonts (Inter); no other external dependencies.
- Tighten `cors()` to your domain before going to production.
