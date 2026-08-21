/**
 * Notification email templates for inbound leads.
 * Shared by the Vercel function (api/index.js) and the local server (server.js)
 * so the two can't drift apart.
 */

/** Wording shown under the submit button of the demo form. Fallback if the client omits it. */
const DEFAULT_CONSENT_TEXT =
  "By submitting, you agree that Instive AI may contact you regarding your inquiry.";

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const stamp = (d) =>
  new Date(d).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }) + " UTC";

/** +15551234567 -> (555) 123-4567. Anything else passes through untouched. */
const prettyPhone = (raw) => {
  const d = String(raw || "").replace(/\D/g, "");
  const n = d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
  return n.length === 10 ? `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6)}` : raw;
};

const C = {
  ink: "#0f1b23",
  body: "#3d4d58",
  muted: "#7b8b96",
  line: "#e3e9ed",
  panel: "#f6f8f9",
  signal: "#0f766e",
  signalSoft: "#ecfdf5",
};

const shell = (title, inner) => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:24px 12px;background:#eef1f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid ${C.line};border-radius:14px;overflow:hidden;">
    ${inner}
    <tr><td style="padding:18px 28px 26px;border-top:1px solid ${C.line};">
      <p style="margin:0;font-size:12px;line-height:1.6;color:${C.muted};">
        Sent automatically by instiveai.com. Reply directly to this address to reach the requester.
      </p>
    </td></tr>
  </table>
</body></html>`;

const header = (eyebrow, heading) => `
  <tr><td style="padding:28px 28px 0;">
    <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.signal};font-weight:700;">${esc(eyebrow)}</div>
    <h1 style="margin:8px 0 0;font-size:22px;line-height:1.25;color:${C.ink};font-weight:700;">${esc(heading)}</h1>
  </td></tr>`;

/** Label/value rows. Pass { label, value, href } — falsy values are dropped. */
const rows = (items) => `
  <tr><td style="padding:20px 28px 0;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      ${items
        .filter((i) => i && i.value)
        .map(
          (i) => `<tr>
        <td style="padding:9px 0;border-bottom:1px solid ${C.line};font-size:12px;color:${C.muted};text-transform:uppercase;letter-spacing:.06em;width:132px;vertical-align:top;">${esc(i.label)}</td>
        <td style="padding:9px 0;border-bottom:1px solid ${C.line};font-size:15px;color:${C.ink};vertical-align:top;">${
          i.href
            ? `<a href="${esc(i.href)}" style="color:${C.signal};text-decoration:none;font-weight:600;">${esc(i.value)}</a>`
            : esc(i.value)
        }</td>
      </tr>`
        )
        .join("")}
    </table>
  </td></tr>`;

const noteBlock = (label, text) => `
  <tr><td style="padding:22px 28px 0;">
    <div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${C.muted};margin-bottom:8px;">${esc(label)}</div>
    <div style="background:${C.panel};border:1px solid ${C.line};border-left:3px solid ${C.signal};border-radius:8px;padding:14px 16px;font-size:15px;line-height:1.6;color:${C.body};white-space:pre-wrap;">${esc(text)}</div>
  </td></tr>`;

const consentBlock = (text, at, hasPhone) => `
  <tr><td style="padding:22px 28px 0;">
    <div style="background:${C.signalSoft};border:1px solid #bbe7dc;border-radius:8px;padding:14px 16px;">
      <div style="font-size:13px;font-weight:700;color:${C.signal};margin-bottom:6px;">&#10003; Consent captured${hasPhone ? " &mdash; email and phone" : ""}</div>
      <div style="font-size:13px;line-height:1.6;color:${C.body};">&ldquo;${esc(text)}&rdquo;</div>
      <div style="font-size:12px;color:${C.muted};margin-top:8px;">Agreed at submission &middot; ${esc(stamp(at))}</div>
    </div>
  </td></tr>`;

const actions = (email, phone) => `
  <tr><td style="padding:22px 28px 4px;">
    <a href="mailto:${esc(email)}" style="display:inline-block;background:${C.signal};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:11px 18px;border-radius:8px;margin:0 8px 8px 0;">Reply by email</a>
    ${
      phone
        ? `<a href="tel:${esc(phone)}" style="display:inline-block;background:#ffffff;color:${C.ink};text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border:1px solid ${C.line};border-radius:8px;margin:0 8px 8px 0;">Call ${esc(prettyPhone(phone))}</a>`
        : ""
    }
  </td></tr>`;

/** Demo request notification. Returns { subject, text, html } for nodemailer. */
function demoRequestEmail(d) {
  const at = d.createdAt || new Date();
  const phone = d.phone || "";
  const consentText = d.consentText || DEFAULT_CONSENT_TEXT;
  const who = d.company || d.name || "New request";

  const html = shell(
    `Demo request — ${who}`,
    header("Book a demo", `${d.name}${d.company ? ` · ${d.company}` : ""}`) +
      rows([
        { label: "Name", value: d.name },
        { label: "Work email", value: d.email, href: `mailto:${d.email}` },
        { label: "Phone", value: phone ? prettyPhone(phone) : "", href: `tel:${phone}` },
        { label: "Company", value: d.company },
        { label: "Industry", value: d.domain },
        { label: "Source", value: d.source },
        { label: "Received", value: stamp(at) },
      ]) +
      (d.notes ? noteBlock("The workflow that costs them most", d.notes) : "") +
      consentBlock(consentText, d.consentAt || at, Boolean(phone)) +
      actions(d.email, phone)
  );

  const text = [
    `New demo request${d.company ? ` — ${d.company}` : ""}`,
    "",
    `Name:     ${d.name || "—"}`,
    `Email:    ${d.email || "—"}`,
    `Phone:    ${phone ? `${prettyPhone(phone)} (${phone})` : "not provided"}`,
    `Company:  ${d.company || "—"}`,
    `Industry: ${d.domain || "—"}`,
    `Source:   ${d.source || "—"}`,
    `Received: ${stamp(at)}`,
    "",
    `Workflow that costs them most:`,
    d.notes || "—",
    "",
    `Consent captured${phone ? " (email and phone)" : ""}: "${consentText}"`,
    `Agreed at submission · ${stamp(d.consentAt || at)}`,
  ].join("\n");

  return { subject: `Demo request: ${who}`, text, html };
}

/** Footer email capture notification. */
function leadEmail(d) {
  const at = d.createdAt || new Date();
  const html = shell(
    `New lead — ${d.email}`,
    header("Email capture", d.email) +
      rows([
        { label: "Email", value: d.email, href: `mailto:${d.email}` },
        { label: "Source", value: d.source },
        { label: "Received", value: stamp(at) },
      ]) +
      actions(d.email, "")
  );

  const text = [
    "New email capture.",
    "",
    `Email:    ${d.email}`,
    `Source:   ${d.source || "—"}`,
    `Received: ${stamp(at)}`,
  ].join("\n");

  return { subject: `New lead: ${d.email}`, text, html };
}

module.exports = { demoRequestEmail, leadEmail, DEFAULT_CONSENT_TEXT, prettyPhone };
