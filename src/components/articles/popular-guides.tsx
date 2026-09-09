import Link from "next/link";
import type { Article } from "@/lib/articles";

const GUIDE_SLUGS = [
  "how-much-can-i-borrow",
  "how-does-refinancing-work",
  "fixed-vs-variable-home-loans",
  "how-much-deposit-do-i-need",
  "what-is-an-offset-account",
  "how-does-pre-approval-work",
  "first-home-buyer-guide",
];

export function PopularGuides({ articles }: { articles: Article[] }) {
  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  const guides = GUIDE_SLUGS.map((slug) => bySlug.get(slug)).filter((a): a is Article => Boolean(a));

  if (guides.length === 0) return null;

  return (
    <section className="bg-cream-muted/40 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Popular Mortgage Guides
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/articles/${guide.slug}`}
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-paper px-5 py-4 transition-colors hover:border-gold-400"
            >
              <span className="text-sm font-semibold text-ink group-hover:text-pine-700">{guide.frontmatter.title}</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:text-gold-700" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
