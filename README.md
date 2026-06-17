# Instive AI — Website

Apple-futurism marketing site for Instive AI. Single self-contained `index.html`
(no build step) plus an optional Express + MongoDB backend for the two forms.

## Run the site
Just open `index.html` in a browser, or serve it:
```bash
npx serve .          # or: python3 -m http.server 8080
```
It loads in **demo mode** — forms validate and show a success state without a backend.

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
