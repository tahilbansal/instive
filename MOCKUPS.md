# Adding a mockup to the showcase

The `/mockups` page is generated from a single file: [`data/mockups.ts`](data/mockups.ts).
No CMS, no database. Edit that file, commit, and Vercel rebuilds the page.

---

## Step 1 — Add the HTML mockup file

Drop the self-contained mockup into [`public/clients_mockups/`](public/clients_mockups/),
e.g. `public/clients_mockups/acme_dispatch_scheduling.html`.

It will be live at `https://<your-domain>/clients_mockups/acme_dispatch_scheduling.html`.

## Step 2 — (Optional) Add a pretty URL

To get a clean shareable link like `/acme-logistics`, add a rewrite in
[`next.config.js`](next.config.js) inside the `legacyRewrites` array:

```js
{ source: "/acme-logistics", destination: "/clients_mockups/acme_dispatch_scheduling.html" },
```

## Step 3 — Add the entry to `data/mockups.ts`

Append an object to the `mockups` array:

```ts
{
  id: "acme-dispatch",                       // unique, kebab-case
  companyName: "Acme Logistics",
  industry: "Last-Mile · Field Crews",
  sidecar: "Dispatch & Crew Scheduling",     // must be one of the 7 Sidecar types
  heroScenario:
    "Reassigns a crew before a missed window turns into a redelivery fee.",
  benefits: [
    "Specific, metric-backed benefit #1",
    "Specific, metric-backed benefit #2",
    "Specific, metric-backed benefit #3",
  ],
  tags: ["dispatch", "crew scheduling", "last mile"],
  mockupUrl: "/acme-logistics",              // pretty URL from Step 2, OR the full /clients_mockups/...html path
  // previewImage: "/previews/acme-dispatch.png", // optional, see Step 4
  addedDate: "2026-06-25",                   // ISO date
},
```

### Field rules

| Field          | Notes                                                                       |
| -------------- | --------------------------------------------------------------------------- |
| `id`           | Unique, kebab-case. Used as the React key.                                  |
| `sidecar`      | Must be exactly one of the 7 `Sidecar` types (TypeScript enforces this).    |
| `heroScenario` | One sentence, the exact problem flagged. Shown in italics. No fluff.        |
| `benefits`     | 3–4 bullets, specific and metric-backed. No lorem ipsum.                    |
| `mockupUrl`    | Same-origin path (pretty URL or `/clients_mockups/<file>.html`).            |
| `previewImage` | Optional. Omit it to render the "Live demo →" placeholder in the card.      |

## Step 4 — (Optional) Add a preview screenshot

Save a screenshot to [`public/previews/`](public/previews/) and set
`previewImage: "/previews/<file>.png"`. With no `previewImage`, the card shows a
clickable "Live demo →" placeholder in the Sidecar's accent colour instead.

## Step 5 — Adding a brand-new Sidecar type

If you need a category beyond the 7 existing ones:

1. Add it to the `Sidecar` union, `SIDECAR_META` (with an accent hex), and `SIDECARS`
   array in [`data/mockups.ts`](data/mockups.ts).
2. Add the matching colour to `theme.extend.colors.sidecar` in
   [`tailwind.config.ts`](tailwind.config.ts) so the two stay in sync.

---

## Preview locally

```bash
npm install
npm run dev        # http://localhost:3000/mockups
```

> Note: `npm run dev` runs the Next.js site only. The `/api` lead-capture
> endpoints (Express) run on Vercel; locally you can run them separately with
> `npm run api:dev` if needed.
