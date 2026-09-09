import Link from "next/link";
import type { NewsCategory, NewsItem } from "@/lib/news/types";
import { relativeTime } from "@/lib/news/format";
import { LiveStoryThumbnail } from "@/components/news/live-story-thumbnail";

const INSIGHTS: { title: string; category: NewsCategory; articleHref: string; articleLabel: string }[] = [
  {
    title: "Current RBA Environment",
    category: "RBA",
    articleHref: "/articles/fixed-vs-variable-home-loans",
    articleLabel: "Fixed vs Variable Home Loans",
  },
  {
    title: "Mortgage Rate Trends",
    category: "Interest Rates",
    articleHref: "/articles/how-does-refinancing-work",
    articleLabel: "How Does Refinancing Work?",
  },
  {
    title: "Housing Market",
    category: "Property",
    articleHref: "/articles/how-much-can-i-borrow",
    articleLabel: "How Much Can I Borrow?",
  },
  {
    title: "Lending Trends",
    category: "Lending",
    articleHref: "/articles/how-much-can-i-borrow",
    articleLabel: "How Much Can I Borrow?",
  },
  {
    title: "First Home Buyer Activity",
    category: "First Home Buyers",
    articleHref: "/articles/first-home-buyer-guide",
    articleLabel: "The Complete First Home Buyer Guide",
  },
];

function topStoryFor(items: NewsItem[], category: NewsCategory): NewsItem | undefined {
  return items
    .filter((i) => i.category === category)
    .sort((a, b) => (b.publishedAt ? Date.parse(b.publishedAt) : 0) - (a.publishedAt ? Date.parse(a.publishedAt) : 0))[0];
}

export function MarketInsights({ newsItems }: { newsItems: NewsItem[] }) {
  const counts = new Map<NewsCategory, number>();
  for (const item of newsItems) counts.set(item.category, (counts.get(item.category) ?? 0) + 1);

  return (
    <section className="bg-pine-950 py-16 text-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400">Live from /news</p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
          Australian Mortgage Market Insights
        </h2>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((insight) => {
            const count = counts.get(insight.category) ?? 0;
            const topStory = topStoryFor(newsItems, insight.category);

            return (
              <div
                key={insight.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-cream/10 bg-white/[0.03]"
              >
                {topStory && (
                  <a href={topStory.url} target="_blank" rel="noopener noreferrer nofollow" className="group block">
                    <LiveStoryThumbnail src={topStory.image} alt={topStory.title} category={topStory.category} />
                  </a>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold text-paper">{insight.title}</h3>
                    {count > 0 && (
                      <span className="shrink-0 rounded-full bg-gold-500/15 px-2.5 py-0.5 text-xs font-bold text-gold-300">
                        {count} live
                      </span>
                    )}
                  </div>

                  {topStory && (
                    <a
                      href={topStory.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="mt-3 text-sm font-semibold leading-snug text-cream/90 hover:text-gold-300"
                    >
                      {topStory.title}
                      <span className="mt-1 block text-xs font-normal text-cream/50">
                        {topStory.source} · {relativeTime(topStory.publishedAt)}
                      </span>
                    </a>
                  )}

                  <div className="mt-auto flex flex-col gap-2 pt-4 text-sm font-semibold">
                    <Link
                      href={`/news?category=${encodeURIComponent(insight.category)}#latest-news`}
                      className="text-gold-400 hover:text-gold-300"
                    >
                      See latest {insight.category} news →
                    </Link>
                    <Link href={insight.articleHref} className="text-cream/70 hover:text-cream">
                      Read: {insight.articleLabel} →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
