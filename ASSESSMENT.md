# Operations Efficiency Assessment

Route: `/assessment`. This feature uses the existing Next.js App Router and Vercel infrastructure. No signup, LLM, paid API, or client analytics service is needed.

## Run and verify

- `npm run dev`, then open `/assessment`.
- `npm test`: calculation boundaries, every configured industry/workflow branch, consultant experience, validation, recalculation, inquiry UI feedback, and mocked backend security/storage/email paths.
- `npx tsc --noEmit`
- `npm run build`

Component tests use React Test Renderer; they do not replace browser layout, keyboard, mobile, print, clipboard, or native-share testing. Live MongoDB and SMTP were not exercised. A production HTTP smoke check returned 200 locally. Browser QA was unavailable because no browser was connected.

## Configuration

- `lib/assessment/config.ts`: roles, industries, workflow availability, branch questions, recommended actions, risks, dependencies, next steps.
- `lib/assessment/engine.js`: deterministic formula, default scenarios and numerical limits.
- `app/assessment/Assessment.tsx`: four-step flow, results, reporting, optional inquiry.
- `app/assessment/assessment.css`: isolated responsive brand styling and print rules.
- `app/assessment/inquiry/route.ts`: server-only lead storage and notification.

One bottleneck is modeled at a time. Direct hours and task volume are mutually exclusive. Exceptions retain full original effort. Review applies only to successful eligible work. Suitability assumes equal average task effort. Weekly oversight is additional work and may produce negative recovery. Annual calculations use working weeks; ongoing costs use twelve calendar months. Capacity-based payback requires known labor, implementation, and ongoing costs, plus positive net capacity value. It is not a cash savings claim. Default assumptions are illustrative, editable, and not benchmarks.

## Inquiry configuration and operations

Uses existing environment names, all server-side:

- `MONGODB_URI`: required to accept inquiries. Use a TLS-enabled, access-controlled production database and a least-privilege application account.
- `SMTP_USER`, `SMTP_PASS`: enable email notification.
- `SMTP_HOST`: defaults to smtp.gmail.com.
- `SMTP_PORT`: defaults to 465; port 465 uses implicit TLS, others use STARTTLS.
- `NOTIFY_EMAIL`: recipient; defaults to contact@instiveai.com.

The Next route is `/assessment/inquiry` intentionally: the existing `beforeFiles` rewrite funnels `/api/*` into the legacy Express service. Do not move it under `/api` without adjusting that rewrite.

Requests require same-origin JSON, valid bounded strings and email, explicit consent, and an empty spam field. A database-backed per-email hourly throttle allows three submissions. Rate buckets store an email digest and expire after two hours. Inquiries are not exposed through a public read endpoint. No raw contact data is logged. Assessment reports are user-supplied planning data, not independently verified financial projections.

Collections: `assessmentinquiries` and `assessmentlimits`. Review `notificationStatus` (`sent`, `failed`, `not-configured`, `pending`) in your secured database tooling. Email failure does not discard the saved inquiry. There is no automatic notification retry worker: failed/pending notifications need operational follow-up. If database configuration or persistence fails, the UI shows failure and an email alternative; it never reports a fake success.

Delete inquiries on request through authorized database tooling; the UI supplies contact@instiveai.com for deletion requests. Apply the organization's retention policy to the inquiry collection. Configure Vercel/platform request-size and abuse controls for public launch; per-email throttling alone is not comprehensive bot protection.

## Privacy and reporting

Answers stay in React memory, never cookies, localStorage, URLs, or an analytics backend. Reloading clears the assessment. Only an explicit follow-up submission sends answers and contact details to Instive. Sharing uses the user's native share action or clipboard; reports download as plain text or print to PDF. No public report storage or bearer share links are created.

Optional aggregate lifecycle hooks dispatch `instive:assessment` CustomEvents with `{ event, version: 1 }`: `started`, `completed`, `inquiry_saved`. They carry no answers or personal data and transmit nothing. An approved analytics adapter can subscribe later; none is installed by this feature.

## Deployment

Deploy this checkout through the existing Vercel project after configuring the above environment variables. No linked `.vercel` project or authenticated Vercel CLI was available during implementation, so this change has not been deployed. Confirm production environment values, run a real consenting inquiry, verify storage and notification, and perform desktop/mobile/keyboard/print checks before announcing the assessment.

## Existing dependency audit

The repository dependency audit reports 11 affected packages (including critical advisories in the existing Next.js 14.2.5 and proxy-addr versions). This feature does not migrate the site framework or the legacy Express/email stack. Resolve the dependency advisories and rerun the complete site regression checks before public deployment. The audit output is dependency-level evidence, not a claim that every advisory is exploitable on this route.
