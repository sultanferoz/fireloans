import Link from "next/link";

const CARDS = [
  {
    title: "First Home Buyers",
    description: "Rate and policy news changes what you can borrow and when to lock in pre-approval.",
    href: "/loans/owner-occupied",
    calculatorHref: "/calculators/borrowing-power",
  },
  {
    title: "Existing Homeowners",
    description: "See how RBA and lender moves flow through to your actual repayment.",
    href: "/calculators/repayments",
    calculatorHref: "/calculators/repayments",
  },
  {
    title: "Refinancers",
    description: "Rate changes are exactly when switching lenders tends to be worth the most.",
    href: "/calculators/refinance-savings",
    calculatorHref: "/calculators/refinance-savings",
  },
  {
    title: "Property Investors",
    description: "Property and lending news affects serviceability across your whole portfolio.",
    href: "/loans/investment-loan",
    calculatorHref: "/calculators/borrowing-power",
  },
];

export function BorrowerImpact() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          How today&apos;s news could affect your home loan
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <div key={card.title} className="flex flex-col rounded-2xl border border-border bg-paper p-6">
              <h3 className="font-display text-lg font-semibold text-ink">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{card.description}</p>
              <div className="mt-4 flex flex-col gap-2 text-sm font-semibold">
                <Link href={card.href} className="text-pine-700 hover:text-gold-700">
                  Learn more →
                </Link>
                <Link href={card.calculatorHref} className="text-ink-soft hover:text-pine-700">
                  Try the calculator →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
