"use client";

import { useState } from "react";
import type { LoanTypeEntry } from "@/content/loan-types";
import { OfferCard } from "./offer-card";

const PREVIEW_COUNT = 3;

export function OfferGrid({ loans }: { loans: LoanTypeEntry[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? loans : loans.slice(0, PREVIEW_COUNT);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((loan) => (
          <OfferCard key={loan.slug} loan={loan} />
        ))}
      </div>

      {loans.length > PREVIEW_COUNT && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-7 py-3.5 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-pine-700/30 hover:bg-cream-muted"
          >
            {expanded ? "View Fewer Services" : `View ${loans.length - PREVIEW_COUNT} More Services`}
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
