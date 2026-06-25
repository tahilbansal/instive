const MAILTO = "mailto:tahil@instiveai.com?subject=Mockup Request";

export default function SectionCTA() {
  return (
    <section className="mx-auto mt-24 max-w-3xl rounded-2xl border border-hairline bg-ink-surface px-6 py-14 text-center sm:px-12">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">
        Don&apos;t see your operation here?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
        We build these in 48 hours from a short brief. If your company moves
        freight, manages warehouses, or runs field crews — there&apos;s a version
        of this built for your world.
      </p>
      <a
        href={MAILTO}
        className="mt-8 inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
      >
        Get your mockup built →
      </a>
    </section>
  );
}
