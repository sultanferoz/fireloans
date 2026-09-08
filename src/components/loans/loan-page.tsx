import Link from "next/link";
import type { ReactNode } from "react";
import { OfferIcon } from "@/components/conversion/offer-icon";
import type { LoanIcon } from "@/content/loan-types";

export function LoanHero({
  icon,
  category,
  title,
  headline,
  subhead,
  keyFacts,
}: {
  icon: LoanIcon;
  category: string;
  title: string;
  headline: string;
  subhead: string;
  keyFacts: [string, string, string];
}) {
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
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-500/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-cream/50">
          <Link href="/" className="transition-colors hover:text-gold-400">
            Fire Loans
          </Link>
          <span>/</span>
          <span className="text-cream/80">{title}</span>
        </nav>

        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pine-900 text-gold-400">
            <OfferIcon icon={icon} className="h-5 w-5" />
          </span>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400">{category}</p>
        </div>

        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-paper sm:text-5xl lg:text-[3.4rem]">
          {headline}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/65 sm:text-lg">{subhead}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-7 py-3.5 text-base font-semibold text-pine-950 shadow-sm transition-colors hover:bg-gold-400"
          >
            Talk to a broker
          </Link>
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-4 border-t border-cream/10 pt-6 sm:grid-cols-3">
          {keyFacts.map((fact) => (
            <div key={fact} className="flex items-baseline gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
              <dd className="font-display text-lg font-semibold text-paper sm:text-xl">{fact}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function LoanSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="relative py-14 first:pt-16">
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
      <div className="relative mt-8">{children}</div>
    </section>
  );
}

export function LoanWhoList({ items }: { items: string[] }) {
  return (
    <ul className="grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-paper p-4">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm leading-relaxed text-ink-soft">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LoanProcess({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <ol className="grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
      {steps.map((step, i) => (
        <li key={step.title} className="flex gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pine-900 font-display text-sm font-semibold text-gold-400">
            {i + 1}
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function LoanFeatureGrid({
  icon,
  features,
}: {
  icon: LoanIcon;
  features: { title: string; description: string }[];
}) {
  return (
    <div className="grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
      {features.map((feature) => (
        <div key={feature.title} className="rounded-2xl border border-border bg-paper p-6 transition-shadow hover:shadow-md">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-muted text-pine-700">
            <OfferIcon icon={icon} className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">{feature.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

export function LoanTip({ children }: { children: ReactNode }) {
  return (
    <blockquote className="max-w-2xl border-l-2 border-gold-500 bg-cream-muted/60 py-4 pl-6 pr-4 font-display text-lg italic leading-relaxed text-pine-900">
      {children}
    </blockquote>
  );
}

export function LoanFaq({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-paper">
      {faqs.map((faq) => (
        <details key={faq.q} className="group open:bg-cream-muted/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-ink marker:content-none">
            {faq.q}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-ink-soft transition-transform group-open:rotate-45"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="px-5 pb-4 text-sm leading-relaxed text-ink-soft">{faq.a}</div>
        </details>
      ))}
    </div>
  );
}

export function LoanCta({
  title,
  calculatorHref,
  calculatorLabel,
  storyHref,
}: {
  title: string;
  calculatorHref: string;
  calculatorLabel: string;
  storyHref?: string;
}) {
  return (
    <section className="py-16">
      <div className="overflow-hidden rounded-3xl bg-pine-950 p-8 text-center text-cream sm:p-14">
        <h2 className="mx-auto max-w-xl font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
          {title}
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-7 py-3.5 text-base font-semibold text-pine-950 shadow-sm transition-colors hover:bg-gold-400"
          >
            Talk to a broker
          </Link>
          <Link
            href={calculatorHref}
            className="inline-flex items-center justify-center rounded-full border border-cream/25 px-7 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-white/5"
          >
            {calculatorLabel}
          </Link>
        </div>
        {storyHref && (
          <Link href={storyHref} className="mt-6 inline-block text-sm text-cream/60 underline underline-offset-4 hover:text-gold-300">
            Read a real client story like this
          </Link>
        )}
      </div>
    </section>
  );
}
