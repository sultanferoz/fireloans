"use client";

import Link from "next/link";
import { useState } from "react";

type Slide = {
  number: string;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
};

const slides: Slide[] = [
  {
    number: "01",
    slug: "owner-occupied",
    title: "They thought they couldn't buy a home.",
    excerpt:
      "A young couple assumed their expenses and commitments would rule them out. The right structure told a different story.",
    tag: "Owner Occupied",
  },
  {
    number: "02",
    slug: "second-opinion",
    title: "Rejected by one lender. We looked at the bigger picture.",
    excerpt:
      "One \"no\" isn't a verdict   it's one lender's policy on one day. A second look found the lender who said yes.",
    tag: "Second Opinion",
  },
  {
    number: "03",
    slug: "construction-loan",
    title: "From empty block to family home.",
    excerpt:
      "Financing planned around the build schedule, not against it   so the money kept up with the site.",
    tag: "Construction Loan",
  },
  {
    number: "04",
    slug: "car-loan",
    title: "The tradie's car wasn't a luxury it was his livelihood.",
    excerpt:
      "Every breakdown meant lost jobs. Finance that protected cash flow got him back on the road, and back to work.",
    tag: "Car Loan",
  },
  {
    number: "05",
    slug: "investment-loan",
    title: "One investment property wasn't enough.",
    excerpt:
      "Already holding a mortgage, they assumed a second investment loan was out of reach. It became the start of a strategy.",
    tag: "Investment Loan",
  },
];

const PAGE_SIZE = 2;
const totalPages = Math.ceil(slides.length / PAGE_SIZE);

export function FireStoriesSlider() {
  const [page, setPage] = useState(0);
  const current = slides.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div>
      <div className="flex items-center justify-end gap-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft/60">
          {String(page + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous stories"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-gold-500 hover:text-gold-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next stories"
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-gold-500 hover:text-gold-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {current.map((slide) => (
          <Link
            key={slide.slug}
            href={`/client-stories/${slide.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-pine-900 p-8 text-cream shadow-xl sm:p-10"
          >
            <span
              className="font-display pointer-events-none absolute -top-6 right-4 text-[8rem] font-bold leading-none text-cream/[0.04] select-none"
              aria-hidden="true"
            >
              {slide.number}
            </span>

            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-gold-300 px-3 py-1 text-xs font-bold uppercase tracking-wider text-pine-950">
                  {slide.tag}
                </span>
                <span className="text-xs font-semibold text-cream/40">{slide.number} Fire Story</span>
              </div>
              <h3 className="font-display mt-6 text-2xl font-semibold leading-snug text-paper sm:text-3xl">
                &ldquo;{slide.title}&rdquo;
              </h3>
              <p className="mt-4 leading-relaxed text-cream/65">{slide.excerpt}</p>
            </div>

            <div className="relative mt-8 flex items-center justify-between border-t border-cream/10 pt-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-cream/50">
                Composite illustration
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold-400 group-hover:gap-2 transition-all">
                Read the story
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
