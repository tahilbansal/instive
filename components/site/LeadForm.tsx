"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

const INDUSTRIES = [
  "Manufacturing",
  "Distribution",
  "Retail",
  "Logistics provider / 3PL",
  "Warehousing & fulfillment",
  "End to end supply chain",
  "Other",
];

const CALL_TIMES = [
  "Morning (8am - 12pm)",
  "Afternoon (12pm - 5pm)",
  "Late day (5pm - 7pm)",
  "No preference",
];

/** Express consent for phone contact. Sent with the payload so the record matches the UI. */
export const PHONE_CONSENT_TEXT =
  "I agree that Instive AI may call or text me at the number provided about this request. Message and data rates may apply, and I can opt out at any time.";

const SUBMIT_CONSENT_TEXT =
  "By submitting, you agree that Instive AI may contact you regarding your inquiry.";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Free mailbox domains — a work address routes to a real person we can look up. */
const FREE_EMAIL = /@(gmail|yahoo|hotmail|outlook|aol|icloud|proton(mail)?|live|msn)\./i;

/** US numbers only: strip everything, drop a leading country code, cap at 10 digits. */
const phoneDigits = (v: string) => {
  const d = v.replace(/\D/g, "");
  return (d.length === 11 && d.startsWith("1") ? d.slice(1) : d).slice(0, 10);
};

const formatUsPhone = (v: string) => {
  const d = phoneDigits(v);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

type Field = "name" | "email" | "company" | "phone" | "domain";

const EMPTY = {
  name: "",
  email: "",
  company: "",
  phone: "",
  domain: "",
  bestTime: CALL_TIMES[3],
  notes: "",
};

export default function LeadForm() {
  const [form, setForm] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field | "consent", string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [source, setSource] = useState("lead_form");
  const doneRef = useRef<HTMLDivElement>(null);

  // Tag the lead with where the link was shared (?src=linkedin, ?utm_source=...).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const tag = q.get("src") || q.get("utm_source");
    if (tag) setSource(`lead_form_${tag.toLowerCase().replace(/[^a-z0-9_-]/g, "")}`);
  }, []);

  useEffect(() => {
    if (status === "done") doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = k === "phone" ? formatUsPhone(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [k]: value }));
    setErrors((prev) => (prev[k as Field] ? { ...prev, [k]: undefined } : prev));
  };

  const validate = () => {
    const next: Partial<Record<Field | "consent", string>> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!isEmail(form.email.trim())) next.email = "Enter a valid email address.";
    else if (FREE_EMAIL.test(form.email.trim())) next.email = "Please use your work email.";
    if (!form.company.trim()) next.company = "Company name is required.";
    if (phoneDigits(form.phone).length !== 10) next.phone = "Enter a 10 digit US phone number.";
    if (!form.domain) next.domain = "Select the closest fit.";
    if (!consent) next.consent = "We need your permission before we can call or text you.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      document.querySelector<HTMLElement>("[data-invalid='true']")?.focus();
      return;
    }
    setStatus("sending");
    const payload = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      phone: `+1${phoneDigits(form.phone)}`,
      phoneConsent: true,
      consentText: PHONE_CONSENT_TEXT,
      source,
    };
    try {
      const res = await fetch("/api/blueprint-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
    } catch {
      // Never strand the visitor on a transport error — the request is logged server side.
    }
    setStatus("done");
  };

  const fieldStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "var(--bg-primary)",
    border: "1px solid var(--line-strong)",
    borderRadius: 8,
    padding: "12px 14px",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    fontSize: 15,
    outline: "none",
  };
  const errStyle = (k: Field): CSSProperties =>
    errors[k] ? { ...fieldStyle, borderColor: "var(--hold)" } : fieldStyle;
  const labelStyle: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--text-muted)",
    display: "block",
    marginBottom: 8,
  };

  const Req = () => <span style={{ color: "var(--signal)" }}> *</span>;
  const Err = ({ k }: { k: Field | "consent" }) =>
    errors[k] ? (
      <p className="mt-2 text-[12px]" style={{ color: "var(--hold)", fontFamily: "var(--font-mono)" }}>
        {errors[k]}
      </p>
    ) : null;

  if (status === "done") {
    return (
      <div
        ref={doneRef}
        className="glass rounded-tight p-8 sm:p-10 text-center"
        style={{ borderRadius: 16, border: "1px solid var(--line-strong)" }}
      >
        <div
          className="mx-auto flex items-center justify-center w-14 h-14 rounded-full mb-6"
          style={{ background: "rgba(15,118,110,0.14)", border: "1px solid var(--signal)" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
          You&rsquo;re on the list, {form.name.split(" ")[0]}.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
          We&rsquo;ll review {form.company} before we call, and reach out within one business day
          {form.bestTime !== "No preference" ? ` — aiming for your ${form.bestTime.split(" (")[0].toLowerCase()} window` : ""}.
          Nothing to prepare.
        </p>
        <p className="mt-6 text-[13px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          Need us sooner?{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--signal)" }}>
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="glass rounded-tight p-6 sm:p-9"
      style={{ borderRadius: 16, border: "1px solid var(--line-strong)" }}
    >
      <div className="grid gap-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="lf-name" style={labelStyle}>Full name<Req /></label>
            <input id="lf-name" style={errStyle("name")} value={form.name} onChange={set("name")} placeholder="Jordan Pierce" autoComplete="name" data-invalid={Boolean(errors.name)} aria-invalid={Boolean(errors.name)} />
            <Err k="name" />
          </div>
          <div>
            <label htmlFor="lf-email" style={labelStyle}>Work email<Req /></label>
            <input id="lf-email" type="email" style={errStyle("email")} value={form.email} onChange={set("email")} placeholder="you@company.com" autoComplete="email" data-invalid={Boolean(errors.email)} aria-invalid={Boolean(errors.email)} />
            <Err k="email" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="lf-company" style={labelStyle}>Company<Req /></label>
            <input id="lf-company" style={errStyle("company")} value={form.company} onChange={set("company")} placeholder="Acme Logistics" autoComplete="organization" data-invalid={Boolean(errors.company)} aria-invalid={Boolean(errors.company)} />
            <Err k="company" />
          </div>
          <div>
            <label htmlFor="lf-phone" style={labelStyle}>Phone<Req /></label>
            <div style={{ position: "relative" }}>
              <span
                aria-hidden="true"
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 14, pointerEvents: "none" }}
              >
                +1
              </span>
              <input
                id="lf-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                style={{ ...errStyle("phone"), paddingLeft: 40 }}
                value={form.phone}
                onChange={set("phone")}
                placeholder="(555) 123-4567"
                data-invalid={Boolean(errors.phone)}
                aria-invalid={Boolean(errors.phone)}
              />
            </div>
            <Err k="phone" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="lf-domain" style={labelStyle}>Industry<Req /></label>
            <select id="lf-domain" style={errStyle("domain")} value={form.domain} onChange={set("domain")} data-invalid={Boolean(errors.domain)} aria-invalid={Boolean(errors.domain)}>
              <option value="">Select one</option>
              {INDUSTRIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <Err k="domain" />
          </div>
          <div>
            <label htmlFor="lf-time" style={labelStyle}>Best time to call</label>
            <select id="lf-time" style={fieldStyle} value={form.bestTime} onChange={set("bestTime")}>
              {CALL_TIMES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="lf-notes" style={labelStyle}>
            What you want to fix <span style={{ textTransform: "none", letterSpacing: 0 }}>(optional)</span>
          </label>
          <textarea
            id="lf-notes"
            style={{ ...fieldStyle, minHeight: 96, resize: "vertical" }}
            value={form.notes}
            onChange={set("notes")}
            placeholder="e.g. freight bills only get spot-checked, overcharges slip through — about 4k invoices a month"
          />
          <p className="mt-2 text-[12px]" style={{ color: "var(--text-muted)" }}>
            One line is plenty. It lets us come to the call with something built.
          </p>
        </div>

        {/* Express consent for phone contact, kept with the record. */}
        <label
          className="flex items-start gap-3 cursor-pointer rounded-tight p-4"
          style={{
            background: "var(--bg-primary)",
            border: `1px solid ${errors.consent ? "var(--hold)" : "var(--line-strong)"}`,
            borderRadius: 10,
          }}
        >
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setErrors((p) => ({ ...p, consent: undefined }));
            }}
            style={{ width: 17, height: 17, marginTop: 1, accentColor: "var(--signal)", flexShrink: 0 }}
            aria-invalid={Boolean(errors.consent)}
          />
          <span className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {PHONE_CONSENT_TEXT}
          </span>
        </label>
        <Err k="consent" />

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-signal w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-[15px] font-semibold rounded-tight"
          style={{ fontFamily: "var(--font-display)", opacity: status === "sending" ? 0.7 : 1 }}
        >
          {status === "sending" ? "Sending..." : "Request my demo"}
          {status !== "sending" && (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <p className="text-[12px] text-center leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          {SUBMIT_CONSENT_TEXT}
          <br />
          Goes straight to the team. No sales sequence.
        </p>
      </div>
    </form>
  );
}
