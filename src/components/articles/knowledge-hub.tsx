import Link from "next/link";

const TOPICS = [
  {
    title: "Buying Your First Home",
    description: "Guides for deposits, pre-approval, borrowing capacity and government schemes.",
    href: "/articles?category=First+Home+Buyers",
    serviceHref: "/loans/owner-occupied",
  },
  {
    title: "Refinancing",
    description: "Guides for comparing loans, switching lenders, costs and timing.",
    href: "/articles?category=Refinancing",
    serviceHref: "/calculators/refinance-savings",
  },
  {
    title: "Home Loans",
    description: "Understand loan types, repayments, rates, offsets and redraws.",
    href: "/articles?category=Home+Loans",
    serviceHref: "/loans/owner-occupied",
  },
  {
    title: "Property Investment",
    description: "Understand investment loans, borrowing capacity and property finance.",
    href: "/articles?category=Investment+Property",
    serviceHref: "/loans/investment-loan",
  },
  {
    title: "Interest Rates",
    description: "Understand RBA decisions, fixed rates, variable rates and repayments.",
    href: "/articles?category=Interest+Rates",
    serviceHref: "/news?category=Interest+Rates",
  },
];

export function KnowledgeHub() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Everything You Need to Know About Mortgages
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <div key={topic.title} className="flex flex-col rounded-2xl border border-border bg-paper p-6">
              <h3 className="font-display text-lg font-semibold text-ink">{topic.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{topic.description}</p>
              <div className="mt-4 flex flex-col gap-2 text-sm font-semibold">
                <Link href={topic.href} className="text-pine-700 hover:text-gold-700">
                  Browse guides →
                </Link>
                <Link href={topic.serviceHref} className="text-ink-soft hover:text-pine-700">
                  See related service →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
