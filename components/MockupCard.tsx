import { Mockup, SIDECAR_META } from "@/data/mockups";
import { hexToRgba } from "@/lib/colors";

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="mt-[3px] h-[15px] w-[15px] flex-shrink-0"
      aria-hidden="true"
    >
      <path
        d="M4 10.5l3.5 3.5L16 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MockupCard({
  mockup,
  onPreview,
}: {
  mockup: Mockup;
  onPreview: (mockup: Mockup) => void;
}) {
  const accent = SIDECAR_META[mockup.sidecar].accent;

  return (
    <article
      className="group flex flex-col rounded-xl border border-hairline bg-ink-surface p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{ borderColor: undefined }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hexToRgba(accent, 0.45);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
      }}
    >
      {/* Category badge */}
      <div className="flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{
            color: accent,
            backgroundColor: hexToRgba(accent, 0.12),
            border: `1px solid ${hexToRgba(accent, 0.3)}`,
          }}
        >
          {mockup.sidecar}
        </span>
      </div>

      {/* Company + industry */}
      <h3 className="mt-4 text-lg font-semibold text-white">
        {mockup.companyName}
      </h3>
      <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-white/40">
        {mockup.industry}
      </p>

      {/* Hero scenario */}
      <p className="mt-3 text-sm italic leading-relaxed text-white/65">
        {mockup.heroScenario}
      </p>

      {/* Benefits */}
      <ul className="mt-4 space-y-2">
        {mockup.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-2 text-sm leading-snug text-white/75">
            <CheckIcon color={accent} />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      {/* Preview area */}
      <div className="mt-5">
        {mockup.previewImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mockup.previewImage}
            alt={`${mockup.companyName} ${mockup.sidecar} preview`}
            className="h-40 w-full rounded-lg border border-hairline object-cover object-top"
          />
        ) : (
          <button
            type="button"
            onClick={() => onPreview(mockup)}
            className="flex h-40 w-full items-center justify-center rounded-lg border text-sm font-semibold transition-colors"
            style={{
              color: accent,
              borderColor: hexToRgba(accent, 0.25),
              backgroundColor: hexToRgba(accent, 0.05),
            }}
          >
            Live demo →
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={() => onPreview(mockup)}
          className="flex-1 rounded-lg border border-hairline bg-white/5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Preview
        </button>
        <a
          href={mockup.mockupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg py-2.5 text-center text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          style={{ backgroundColor: accent }}
        >
          Open full demo →
        </a>
      </div>
    </article>
  );
}
