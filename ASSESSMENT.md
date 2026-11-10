# Operations Efficiency Assessment

## Public experience

Open `/assessment`. The final button is **Generate & save assessment**. A notice explains that the completed answers, optional name, assumptions, and results are stored by Instive. Results remain visible if saving fails, with an explicit retry button. PDF generation works without the database; email delivery waits for a successful save.

Each completion generates a new random report ID and access token. Subsequent assumption edits update that report after a short debounce. Revisiting the questions and generating again creates a separate report, so every completed assessment remains reviewable. Retry submissions use the same ID. Revision checks prevent slow older requests from overwriting newer data. Tokens stay in browser memory; only a hash is stored in MongoDB. Reloading loses visitor access, but the saved report remains available to admins.

The TXT download has been removed. **Download PDF** creates a real PDF locally using an embedded Noto Sans font. Print/PDF and native share/clipboard summary remain available. **Email my report** sends a PDF attachment to a voluntarily supplied address with explicit delivery consent; this does not request sales follow-up. The separate workflow-review form still requests follow-up.

## Admin dashboard

Open `/admin/assessments`. Features:

- Password login with signed, HTTP-only, SameSite=Strict cookies, an eight-hour expiry, and rate-limited login attempts.
- Latest-first report list; pagination and search by name, business type, workflow key, email, or report ID.
- Full question/answer view, canonical report, assumptions, results, generation/update times, email address and delivery status.
- PDF download for any selected report.

Set `ASSESSMENT_ADMIN_PASSWORD` to a strong secret of at least 8 characters. A random local password was generated in the gitignored `.env.local`; read that file to sign in locally. Do not commit it. Configure a separate production password in Vercel. Changing it invalidates existing sessions. Production cookies require HTTPS. This is one shared administrative credential, not individual accounts or role-based access control.

Private report data is returned only by authenticated server routes and uses `Cache-Control: no-store`. The admin page has noindex metadata and is not in the sitemap. Anonymous users cannot retrieve reports by ID. No admin secret is bundled into client code.

## Required environment

- `MONGODB_URI`: running MongoDB. Production should use TLS, restricted network access, and a least-privilege application account.
- `ASSESSMENT_ADMIN_PASSWORD`: admin login secret, minimum 8 characters.
- `SMTP_USER`, `SMTP_PASS`: required for email delivery.
- `SMTP_HOST`: defaults to smtp.gmail.com.
- `SMTP_PORT`: defaults to 465. Other ports require STARTTLS.
- `NOTIFY_EMAIL`: optional staff notification recipient for the existing workflow-review endpoint.

Current verification: the configured URI points to local MongoDB, which did not respond to a read-only connection check. No local mongod executable was found, and Docker's daemon is not running. SMTP credentials are not configured. Start the existing local MongoDB service or configure an accessible MongoDB URI, and configure SMTP before expecting real storage/email. These services were mocked in automated tests; live save/email delivery has not been verified.

## Routes and collections

- `POST /assessment/reports`: validates and stores a completed assessment, recomputing results and recommendations on the server rather than trusting client calculations.
- `POST /assessment/reports/email`: requires the report ID and secret access token; validates delivery consent/address, throttles requests, and attaches the stored report PDF.
- `/admin/assessments/session`: POST login, DELETE logout.
- `GET /admin/assessments/data`: authenticated paginated list or report detail.
- `POST /assessment/inquiry`: existing voluntary workflow-review request.

The report routes intentionally avoid `/api/*`, which is rewritten into the legacy Express function.

`generatedassessments` stores structured answers, question labels, canonical report text, calculator version, selected scenario, results, assumptions, generation/update times, notice shown, and delivery metadata. `reportratelimits` holds hashed hourly abuse buckets with a two-hour TTL. The separate `assessmentinquiries` collection holds workflow-review requests. No public read endpoint exposes either collection.

Email statuses: `sending`, `sent`, `failed`; absence means not requested. Limits: three email attempts per report, three per recipient/hour, and twenty per IP/hour. Saving allows 120 requests per IP/hour. Vercel's forwarded header supplies the IP; self-hosted installations need trusted edge abuse controls. Failed email attempts remain visible; there is no automatic email retry worker. Retention/deletion requests should be handled through authorized database tooling according to Instive's policy.

## Calculations and customization

- `lib/assessment/config.ts`: industries, role choices, workflow branches, recommendations, risks and dependencies.
- `lib/assessment/engine.js`: deterministic calculation and validation. One workflow at a time; direct hours and task volumes are mutually exclusive. Exceptions retain full original effort; review applies only to successful eligible tasks. Oversight can produce negative recovery. Working weeks affect hours; ongoing costs use twelve months.
- `lib/assessment/report.ts`: shared validation, canonical question/answer record and report. Server save recomputes all numbers.
- `lib/assessment/pdf.ts`: paginated PDF generation with the licensed font under `public/fonts/`.
- `lib/assessment/storage.ts`: database models, request bounds, throttling, and admin sessions.
- `app/assessment/Assessment.tsx`: questions, sliders, results, save feedback, PDF and email controls.

Default hourly labor rates, when explicitly enabled and no rate is supplied: USD 30, GBP 25, EUR 30, INR 500, CAD 40, AUD 45. These are labeled illustrative planning assumptions, not wage benchmarks or exchange-rate conversions. Entered rates including zero override them; users can choose hours-only results. All reports disclose the effective rate. Capacity value is not cash savings. Payback is capacity-based and requires known implementation/ongoing costs plus positive net capacity value.

## Verification and deployment

Run `npm test`, `npx tsc --noEmit`, and `npm run build`. Tests cover calculations, all configured branches, custom answers, sliders, save/retry UI, server validation, idempotency/revisions, admin authentication, anonymous-read rejection, PDF generation, and mocked email delivery/failure. A generated PDF was rendered and visually inspected. Browser layout/keyboard/mobile QA remains unavailable because no browser is connected.

The Next production build traces the font into the email function. Deploy via the existing Vercel project after setting environment variables. No authenticated Vercel deployment access was available, so changes remain local.

The existing dependency audit reports 11 affected packages, including critical advisories in the pre-existing Next.js 14.2.5 and proxy-addr versions. Resolve those advisories and regression-test the full site before public launch. This feature does not migrate the site's framework or legacy Express/email stack.
