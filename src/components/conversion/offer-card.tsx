import Link from "next/link";
import type { LoanTypeEntry } from "@/content/loan-types";
import { OfferIcon } from "./offer-icon";

export function OfferCard({ loan }: { loan: LoanTypeEntry }) {
  return (
    <Link
      href={`/loans/${loan.slug}`}
      className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-gold-100/60 via-paper to-brand-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
    >
      {/* Large decorative icon, matching the loan type, faded into the background */}
      <OfferIcon
        icon={loan.icon}
        className="pointer-events-none absolute -right-4 bottom-16 h-40 w-40 text-ink/[0.06] transition-transform duration-500 group-hover:scale-110 group-hover:text-pine-900/[0.08] sm:h-48 sm:w-48"
      />

      <div className="relative">
        <h3 className="font-display text-2xl font-bold leading-tight text-ink sm:text-[1.75rem]">
          {loan.title}
        </h3>
        <p className="mt-3 max-w-[85%] text-ink-soft">{loan.description}</p>
      </div>

      <div className="relative mt-8 flex items-end justify-between">
        <span className="border-b-2 border-ink pb-0.5 text-sm font-bold uppercase tracking-wider text-ink">
          Read More
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pine-900 text-gold-400 transition-colors group-hover:bg-gold-400 group-hover:text-pine-950">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
