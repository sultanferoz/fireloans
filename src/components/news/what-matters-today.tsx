import type { NewsCategory, NewsItem } from "@/lib/news/types";
import { relativeTime } from "@/lib/news/format";

const IMPACT_BY_CATEGORY: Record<NewsCategory, { whyItMatters: string; affects: string[] }> = {
  RBA: {
    whyItMatters: "RBA decisions set the cash rate that most variable home loan pricing is built on.",
    affects: ["Homeowners", "Refinancers"],
  },
  "Interest Rates": {
    whyItMatters: "Rate movements flow directly into variable repayments and how much lenders will approve.",
    affects: ["Homeowners", "Home Buyers", "Refinancers"],
  },
  APRA: {
    whyItMatters: "APRA's prudential settings shape how conservatively lenders assess serviceability.",
    affects: ["Home Buyers", "Investors"],
  },
  ASIC: {
    whyItMatters: "ASIC oversight affects how credit is provided and disclosed across the lending industry.",
    affects: ["Home Buyers", "Mortgage Brokers"],
  },
  Banking: {
    whyItMatters: "Bank policy and funding cost changes often signal where lending rates are headed next.",
    affects: ["Homeowners", "Refinancers"],
  },
  Property: {
    whyItMatters: "Property market shifts affect how much equity you have and what you can borrow against it.",
    affects: ["Home Buyers", "Investors", "Homeowners"],
  },
  "First Home Buyers": {
    whyItMatters: "Scheme and policy changes can materially shift deposit requirements and borrowing costs.",
    affects: ["Home Buyers"],
  },
  Refinancing: {
    whyItMatters: "Lender competition and rate changes affect how much switching could actually save you.",
    affects: ["Refinancers", "Homeowners"],
  },
  Lending: {
    whyItMatters: "Changes to lending standards affect how much you can borrow and how quickly.",
    affects: ["Home Buyers", "Investors"],
  },
  "Broker News": {
    whyItMatters: "Shifts in broker/lender relationships can affect the range of options available to you.",
    affects: ["Mortgage Brokers", "Home Buyers"],
  },
  Regulation: {
    whyItMatters: "Regulatory change can reshape lending rules, disclosure requirements and borrower protections.",
    affects: ["Home Buyers", "Mortgage Brokers"],
  },
  Mortgage: {
    whyItMatters: "Developments in the mortgage market can affect pricing, product availability and approval times.",
    affects: ["Home Buyers", "Homeowners"],
  },
};

export function WhatMattersToday({ items }: { items: NewsItem[] }) {
  const picks = items.slice(0, 5);
  if (picks.length === 0) return null;

  return (
    <section className="bg-pine-950 py-16 text-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400">Right now</p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
          What Matters Today
        </h2>

        <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {picks.map((item) => {
            const impact = IMPACT_BY_CATEGORY[item.category];
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group rounded-2xl border border-cream/10 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.06]"
              >
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">
                  {item.category} · {relativeTime(item.publishedAt)}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-paper">{item.title}</h3>

                <dl className="mt-4 space-y-2 text-sm text-cream/70">
                  <div>
                    <dt className="font-semibold text-cream/90">Why it matters</dt>
                    <dd>{impact.whyItMatters}</dd>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <dt className="font-semibold text-cream/90">Affects</dt>
                    {impact.affects.map((a) => (
                      <dd key={a} className="rounded-full bg-gold-500/15 px-2.5 py-0.5 text-xs font-semibold text-gold-300">
                        {a}
                      </dd>
                    ))}
                  </div>
                </dl>

                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-400 group-hover:text-gold-300">
                  Read the source story
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
