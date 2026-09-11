import Image from "next/image";

export function ArticlesHero() {
  return (
    <section className="relative overflow-hidden bg-pine-950 text-cream">
      <Image
        src="/images/articles.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-75 contrast-125 grayscale"
      />
      <div className="pointer-events-none absolute inset-0 bg-pine-700 mix-blend-color" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pine-950/85 via-pine-950/60 to-pine-950"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 68px, currentColor 68px, currentColor 69px)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-gold-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400">Fire Loans Articles</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
          Mortgage Guides, Insights &amp; Expert Advice
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-cream/70">
          Practical guides and expert insights to help Australians understand home loans,
          borrowing, refinancing, property and the mortgage market.
        </p>
      </div>
    </section>
  );
}
