import Link from "next/link";

export function NewsHero() {
  return (
    <section className="relative overflow-hidden bg-pine-950 text-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 68px, currentColor 68px, currentColor 69px)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-gold-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400">Fire Loans News</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
          Australian Mortgage &amp; Banking News
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-cream/70">
          Stay up to date with the latest Australian home loan, interest rate, banking,
          property and lending developments — explained simply by Fire Loans.
        </p>
        <p className="mt-4 text-xs uppercase tracking-wide text-cream/40">
          Updated regularly from trusted Australian sources
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#latest-news"
            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-7 py-3.5 text-base font-semibold text-pine-950 shadow-sm transition-colors hover:bg-gold-400"
          >
            Explore Latest News
          </a>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full border border-cream/25 px-7 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-white/5"
          >
            Speak to a Mortgage Broker
          </Link>
        </div>
      </div>
    </section>
  );
}
