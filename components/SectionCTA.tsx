import { BookDemoButton } from "@/components/site/BookDemo";

export default function SectionCTA() {
  return (
    <section
      className="mt-24 rounded-tight border p-12 text-center space-y-6"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--line-strong)",
      }}
    >
      <div className="space-y-4">
        <h2
          className="text-3xl font-display font-semibold leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Don't see your operation here?
        </h2>
        <p
          className="mx-auto max-w-2xl text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          We build these in 48 hours from a short brief. If your company moves
          freight, manages warehouses, or runs field crews, there's a version
          of this built for your world.
        </p>
      </div>

      <BookDemoButton
        source="mockups-cta"
        className="btn-signal inline-flex px-6 py-3 text-sm font-semibold rounded-tight"
      >
        Get your mockup built →
      </BookDemoButton>
    </section>
  );
}
