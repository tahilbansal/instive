# Instive AI — Website Blueprint

The strategic spine the site is built on. Code lives in `app/` and `components/`;
this file is the *why* behind the copy and structure. Treat it as the source of
truth for positioning and voice — if a section's copy drifts from this, fix the
copy.

---

## 1. Brand positioning

**Instive AI is not an AI automation agency. It is an operations company that ships AI.**

Most of the market sells "AI transformation." Instive sells a fixed,
operator-recognizable outcome: the freight bill gets audited, the carrier gets
scored, the SKU gets forecast, the crew gets sized — automatically, every time,
before the problem reaches a customer.

The product unit is the **Sidecar**: a narrow AI agent that rides *alongside* an
existing operation. It does not replace the TMS, WMS, or ERP. It reads the data
those systems already produce, catches the exception a busy team can't get to,
and drafts the action (the dispute letter, the reorder, the customer
notification).

**Positioning sentence (internal):**
> Instive builds AI Sidecars for supply chain operations — agents that audit
> every invoice, score every carrier, forecast every SKU, and size every crew,
> so the exception gets caught while there's still time to fix it.

**Comparables and what we take from each:**
- **Palantir** — operational gravity. We talk about the operation, not the model.
- **Stripe** — calm, precise, developer/operator-grade docs-quality writing.
- **Linear** — opinionated minimalism; one accent, tight type, no clutter.
- **Vercel** — confident black-canvas product surface; speed as a value.
- **Scale AI** — "we do the unglamorous data work that makes AI real."
- **Stripe/Apple** — restraint. Say less, mean more.

What we explicitly reject: "revolutionary," "AI-powered," "digital
transformation," "synergy," vague "solutions" with no number, emoji-stacked hype.

---

## 2. Value proposition

**Primary (operator-facing):**
> Your operation already knows what's late, overbilled, or about to stock out.
> It just can't tell you in time. Instive's Sidecars do.

**Supporting one-liner (hero sub):**
> AI agents that ride alongside your TMS, WMS and ERP — auditing every invoice,
> scoring every carrier, forecasting every SKU — and flagging the exception
> while there's still time to act.

**Three proof pillars:**
1. **Specialized, not generic.** Seven productized Sidecars built for supply
   chain, not a horizontal "automate anything" pitch.
2. **Rides alongside your stack.** No rip-and-replace. Connects to SAP,
   Manhattan, Körber/HighJump, or a flat file feed.
3. **Fast to proof.** A working mockup on your data shape in 48 hours; a live
   pilot in weeks, not a 9-month "transformation."

---

## 3. Messaging framework

Every page must keep answering the executive's six silent questions:

| Question | Where the site answers it |
| --- | --- |
| **Why Instive AI?** | Hero, Why-Sidecar section, Services |
| **Why AI now?** | Problem section ("the data already exists; the time to read it doesn't") |
| **Why trust you?** | Case studies, results band, process, human-in-the-loop capability |
| **Why not keep my current process?** | Problem + Solutions (cost of the sampled audit, the late carrier slip) |
| **What ROI?** | Results band, every case study, every Solution's outcome line |
| **Why is your approach different?** | Sidecar thesis: narrow, alongside, fast |

**Message hierarchy per page:** outcome → operational mechanism → proof → CTA.
Never lead with the model. Lead with the dollar, the day, the SKU.

---

## 4. Information architecture

```
/                 Homepage (the full argument, top to bottom)
/services         The 7 Sidecars + custom (what we build)
  /services/[slug]  one page per Sidecar          [Phase 2]
/solutions        Organized by business problem
  /solutions/[slug] one page per problem          [Phase 2]
/industries       Manufacturing · Distribution · Retail · 3PL · Warehousing · SC teams
  /industries/[slug]                              [Phase 2]
/case-studies     Index of client results (driven by data/mockups.ts)
  /case-studies/[slug]                            [Phase 2]
/mockups          EXISTING showcase (kept as-is)
/about            Operators + engineers, partnership thesis [Phase 2]
/contact          Discovery-call form + qualification         [Phase 2]
```

**Build order:** Homepage (Phase 1, this pass) → Contact → Services → Solutions
→ Case studies → Industries → About.

---

## 5. Sitemap & navigation

**Primary nav (sticky "manifest" bar):**
`Sidecars` · `Solutions` · `Industries` · `Case studies` · `About` · **[ Book a call ]**

- Logo left, links center/right, theme toggle + amber CTA pinned right.
- Mono micro-label + live status dot echoes the design system's manifest bar.
- Mobile: hamburger → full-screen sheet, CTA repeated at the bottom.

**Footer nav:** four columns — Sidecars, Solutions, Industries, Company — plus
mark, tagline, and a single email CTA.

---

## 6. Homepage wireframe (section-by-section purpose)

| # | Section | Job |
| --- | --- | --- |
| 00 | **Nav** | Orient + permanent path to a call. |
| 01 | **Hero** | One sentence of pain + a live Sidecar console catching a real exception. Two CTAs: Book a call / See it on your data. |
| 02 | **Trust strip** | Operator vocabulary (lanes, AWBs, SKUs, crews) to signal "we know your world" + the kinds of operations we serve. |
| 03 | **Problem** | Name the real failure: the data exists, the time to read it doesn't. Sampled audits, carrier slips found too late, stockouts. |
| 04 | **Why Sidecar** | The differentiator: narrow agents that ride alongside your stack, not a platform migration. Build-vs-buy framed for an operator. |
| 05 | **Services (Sidecars)** | The 7 productized agents + custom. Each = job-to-be-done + the pain it kills. |
| 06 | **Solutions** | Interactive: pick a business problem → see current problem / operational impact / what Instive does / measurable outcome. |
| 07 | **Industries** | "Built for your operation" — six verticals, each with the specific exception we catch. |
| 08 | **Capabilities** | What's under the hood, in operator terms: reads documents, connects to your stack, human-in-the-loop, audit trail, drafts the action. |
| 09 | **Process** | 4 steps: brief → 48h mockup → pilot on one workflow → roll out across branches. Removes "big scary AI project" fear. |
| 10 | **Results** | Animated metric band — the ROI proof at a glance. |
| 11 | **Case studies** | 3 real client results from the mockup catalogue. Before → after → impact, linking to the live mockup. |
| 12 | **Testimonials** | Operator voices (illustrative), tied to the case-study clients. |
| 13 | **FAQ** | Kills the remaining objections: security, integration, accuracy/human-in-loop, ROI timeline, lock-in. |
| 14 | **Final CTA** | The discovery-call ask, framed as a 30-min operational review, with what they'll walk away with. |
| 15 | **Footer** | Enterprise sitemap + contact. |

---

## 7. Voice (from the design system)

Talk like an operator on the floor, not a vendor in a boardroom.
- Short sentences. Concrete nouns: lanes, AWBs, pedimentos, SKUs, cut-offs, crews.
- Real numbers, every time. No adjective does the work a number can.
- Confident about outcomes, honest about limits ("your team confirms each").
- Verbs: route, price, audit, score, forecast, flag, recover, staff.
- Never: "revolutionary," "seamless," "cutting-edge," "unlock," "leverage."

---

## 8. Conversion strategy

- **One primary action everywhere:** book a discovery call (framed as a 30-min
  operational review, not a sales demo). Amber is reserved for it.
- **Secondary action:** "See it on your data" → the `/mockups` proof, then `/contact`.
- CTAs at: hero, after Solutions, after Results/case studies, final CTA, nav,
  footer. Never more than one amber button competing in a viewport.
- **Qualification** happens on `/contact` (industry, role, volume, current
  systems, the one workflow that hurts most) so the call is pre-loaded.
- Proof before ask: every CTA sits *after* a metric or a case study.

---

## 9. SEO strategy

- **Title pattern:** `<Outcome> for <Audience> — Instive AI`.
- **Target intent clusters:** "freight invoice audit automation," "carrier
  scorecard software," "demand forecasting for distribution," "3PL client
  reporting automation," "warehouse labor planning AI," "returns disposition
  automation."
- One Sidecar page = one head term + its long-tail problem queries.
- Case studies target `<problem> case study` and `<metric> + <industry>`.
- Technical: semantic headings (one H1/page), descriptive metadata per route
  (already per-page in App Router), fast static rendering, OG image per page
  using the design system's amber stat-card template, JSON-LD `Organization` +
  `Service` later.

---

## 10. Motion & interaction

Calm, engineered, never bouncy. Cubic-bezier(.22,1,.36,1), 300–700ms.
- **Scroll reveals** (fade + 24px rise) on every section — `Reveal` component.
- **Hero console** cycles through real exceptions every ~3.2s (status pill +
  one-line action). The product, demonstrated, not described.
- **Counters** in the Results band count up on first view.
- **Solutions explorer** swaps the problem→impact→AI→outcome panel on click.
- **FAQ** accordion. **Cards** lift 6px on hover with an amber edge glow.
- Honor `prefers-reduced-motion` everywhere (counters snap, reveals show).

---

## 11. Future expansion

- Phase 2 pages above ([slug] routes) generated from `data/` so content is
  data-driven like `/mockups`.
- **ROI calculator** (invoice volume × error rate → recoverable $) as an
  interactive lead magnet.
- **Resources / field notes** — short operator essays for SEO + authority.
- **Customer portal teaser** for live Sidecar status (mirrors the tracking-card UI).
- Per-industry landing pages for paid campaigns.
- JSON-LD, sitemap.xml, OG image generation, and analytics + form backend
  (the Express `api/` already exists for lead capture).
