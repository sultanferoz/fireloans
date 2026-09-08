import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export function LegalHero({
  eyebrow,
  title,
  intro,
  updated,
  reference,
  tldr,
  image,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  reference: string;
  tldr: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-pine-950 text-cream">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-75 contrast-125 grayscale"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-pine-700 mix-blend-color"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pine-950/85 via-pine-950/60 to-pine-950"
            aria-hidden="true"
          />
        </>
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
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
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-500/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-cream/50">
          <Link href="/" className="transition-colors hover:text-gold-400">
            Fire Loans
          </Link>
          <span>/</span>
          <span className="text-cream/80">{title}</span>
        </nav>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400">{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-[4rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/65 sm:text-lg">{intro}</p>
          </div>

          <dl className="grid shrink-0 grid-cols-2 gap-x-8 gap-y-4 border-t border-cream/10 pt-5 text-sm lg:w-64 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">Document</dt>
              <dd className="mt-1 text-cream/85">{reference}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">Effective</dt>
              <dd className="mt-1 text-cream/85">{updated}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">Issued by</dt>
              <dd className="mt-1 text-cream/85">Fire Financial Services Pty Ltd</dd>
            </div>
          </dl>
        </div>

        <p className="relative mt-10 max-w-2xl border-l-2 border-gold-500 py-1 pl-5 font-display text-lg italic leading-relaxed text-gold-100/90 sm:text-xl">
          {tldr}
        </p>
      </div>
    </section>
  );
}

export function LegalSection({
  id,
  number,
  title,
  description,
  children,
}: {
  id: string;
  number: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-14 first:pt-16">
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-2 -top-10 select-none font-display text-8xl font-bold text-pine-900/[0.05] sm:-left-4 sm:text-9xl"
        >
          {number}
        </span>
        <div className="relative">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
          {description && <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{description}</p>}
        </div>
      </div>

      <div className="relative mt-8 space-y-6">{children}</div>
    </section>
  );
}

export function LegalProse({ children }: { children: ReactNode }) {
  return <div className="max-w-2xl space-y-4 leading-relaxed text-ink-soft [&_strong]:font-semibold [&_strong]:text-ink">{children}</div>;
}

export function LegalPullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="max-w-2xl border-l-2 border-gold-500 bg-cream-muted/60 py-4 pl-6 pr-4 font-display text-lg italic leading-relaxed text-pine-900">
      {children}
    </blockquote>
  );
}

export function LegalFactGrid({ facts }: { facts: { term: string; detail: ReactNode }[] }) {
  return (
    <dl className="grid max-w-2xl grid-cols-1 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-paper sm:grid-cols-[minmax(0,11rem)_1fr] sm:divide-y-0">
      {facts.map((fact, i) => (
        <div
          key={fact.term}
          className={`grid grid-cols-subgrid gap-x-6 px-5 py-4 sm:col-span-2 ${i % 2 === 1 ? "bg-cream-muted/40" : ""}`}
        >
          <dt className="text-xs font-semibold uppercase tracking-wide text-gold-700">{fact.term}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-ink-soft sm:mt-0">{fact.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
