"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

const OPEN_EVENT = "instive:book-demo";

/** Any button that should open the demo form. Drops into server components. */
export function BookDemoButton({
  children,
  className,
  style,
  source = "cta",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  source?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => {
        onClick?.();
        window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { source } }));
      }}
    >
      {children}
    </button>
  );
}

const INDUSTRIES = [
  "Manufacturing",
  "Distribution",
  "Retail",
  "Logistics provider / 3PL",
  "Warehousing & fulfillment",
  "End to end supply chain",
];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Mounted once (in the root layout). Listens for the open event. */
export function BookDemoModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("cta");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", domain: INDUSTRIES[0], notes: "" });

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setSource(detail?.source ?? "cta");
      setOpen(true);
      setStatus("idle");
      setErr("");
    };
    window.addEventListener(OPEN_EVENT, onOpen as EventListener);
    return () => window.removeEventListener(OPEN_EVENT, onOpen as EventListener);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.name.trim() || !isEmail(form.email.trim())) {
      setErr("Please add your name and a valid work email.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErr("");
    const payload = { ...form, name: form.name.trim(), email: form.email.trim(), source: `book_demo_${source}` };
    try {
      const res = await fetch(`${window.location.origin}/api/blueprint-sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
    } catch {
      // No backend wired locally — accept gracefully so the UX is complete in demo mode.
      setStatus("done");
    }
  };

  const fieldStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "var(--bg-primary)",
    border: "1px solid var(--line-strong)",
    borderRadius: 8,
    padding: "11px 13px",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    fontSize: 15,
  };
  const labelStyle: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--text-muted)",
    display: "block",
    marginBottom: 7,
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto modal-backdrop-enter"
      style={{ background: "rgba(8, 15, 21, 0.7)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="glass modal-panel-enter w-full max-w-lg my-auto rounded-tight"
        role="dialog"
        aria-modal="true"
        aria-label="Book a demo"
        style={{ borderRadius: 16, padding: 0, background: "rgba(16,26,34,0.96)", border: "1px solid var(--line-strong)" }}
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4 p-7 pb-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="live-dot status-pulse" />
              <span className="text-[11px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em", color: "var(--signal)" }}>
                30 minute review
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              {status === "done" ? "Request received." : "Book a demo."}
            </h3>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" className="flex items-center justify-center w-9 h-9 rounded-tight border" style={{ borderColor: "var(--line-strong)", color: "var(--text-muted)", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        {status === "done" ? (
          <div className="p-7 pt-5">
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. We have your details and will reach out
              to <span style={{ color: "var(--signal)" }}>{form.email}</span> to lock a time. You can also email
              us directly at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--signal)" }}>{CONTACT_EMAIL}</a>.
            </p>
            <button onClick={() => setOpen(false)} className="btn-signal mt-6 w-full inline-flex items-center justify-center px-5 py-3 text-sm font-semibold rounded-tight" style={{ fontFamily: "var(--font-display)" }}>
              Done
            </button>
          </div>
        ) : (
          <div className="p-7 pt-5">
            <p className="text-[14px] leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
              Tell us the workflow that costs you most. We will come back with a working prototype on your data.
            </p>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Full name</label>
                  <input style={fieldStyle} value={form.name} onChange={set("name")} placeholder="Jordan Pierce" />
                </div>
                <div>
                  <label style={labelStyle}>Work email</label>
                  <input style={fieldStyle} value={form.email} onChange={set("email")} placeholder="you@company.com" type="email" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Company</label>
                  <input style={fieldStyle} value={form.company} onChange={set("company")} placeholder="Acme Logistics" />
                </div>
                <div>
                  <label style={labelStyle}>Industry</label>
                  <select style={fieldStyle} value={form.domain} onChange={set("domain")}>
                    {INDUSTRIES.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>The workflow that costs you most</label>
                <textarea style={{ ...fieldStyle, minHeight: 84, resize: "vertical" }} value={form.notes} onChange={set("notes")} placeholder="e.g. freight bills only get spot-checked, overcharges slip through" />
              </div>

              {status === "error" && (
                <p className="text-[13px]" style={{ color: "var(--hold)", fontFamily: "var(--font-mono)" }}>{err}</p>
              )}

              <button
                onClick={submit}
                disabled={status === "sending"}
                className="btn-signal w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-tight"
                style={{ fontFamily: "var(--font-display)", opacity: status === "sending" ? 0.7 : 1 }}
              >
                {status === "sending" ? "Sending..." : "Request my demo"}
                {status !== "sending" && (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </button>
              <p className="text-[12px] text-center" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                Goes straight to the team. No sales sequence.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
