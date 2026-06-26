"use client";

import { useState } from "react";
import { FAQS } from "@/lib/site";
import Icon from "@/components/site/Icon";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b" style={{ borderColor: "var(--line)" }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-5 text-left transition-colors"
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 18,
                  color: isOpen ? "var(--signal)" : "var(--text-primary)",
                }}
              >
                {f.q}
              </span>
              <span
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-tight border"
                style={{
                  borderColor: isOpen ? "var(--signal)" : "var(--line-strong)",
                  color: isOpen ? "var(--signal)" : "var(--text-muted)",
                  transition: "all 0.25s",
                }}
              >
                <Icon name={isOpen ? "minus" : "plus"} size={16} />
              </span>
            </button>
            {isOpen && (
              <p
                className="accordion-body pb-6 pr-12 text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
