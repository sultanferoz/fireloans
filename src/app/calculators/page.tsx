import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculators",
  description:
    "Free Australian mortgage calculators   borrowing power, loan repayments, stamp duty and refinance savings   from Fire Loans.",
  alternates: { canonical: "/calculators" },
};

const calculators = [
  {
    slug: "borrowing-power",
    title: "Borrowing Power",
    description: "See how much you could borrow based on your income, expenses and commitments.",
    icon: "M4 20V10m6 10V4m6 16v-7m6 7v-3M4 20h16",
  },
  {
    slug: "repayments",
    title: "Loan Repayments",
    description: "Work out your weekly, fortnightly or monthly repayments on any loan amount.",
    icon: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-3 9 2 2 4-4",
  },
  {
    slug: "stamp-duty",
    title: "Stamp Duty",
    description: "Estimate government fees and first home buyer grants for every state and territory.",
    icon: "M6 21V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17M14 21v-9h5a1 1 0 0 1 1 1v8M9 7h.01M9 11h.01M9 15h.01",
  },
  {
    slug: "refinance-savings",
    title: "Refinance Savings",
    description: "Compare your current loan to a new offer, fees and honeymoon rates included.",
    icon: "M4 10a8 8 0 0 1 13.5-5.3M20 5v5h-5M20 14a8 8 0 0 1-13.5 5.3M4 19v-5h5",
  },
];

export default function CalculatorsPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-700">Calculators</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Get real numbers before you talk to anyone
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Four free tools to help you plan   no sign-up required. When you&apos;re ready for a
            proper assessment, a broker can take it from here.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {calculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="group flex items-start gap-5 rounded-3xl border border-border bg-paper p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pine-900 text-gold-400">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path d={calc.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">{calc.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{calc.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-700 group-hover:gap-2 transition-all">
                  Open calculator
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
