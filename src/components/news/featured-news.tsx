import type { NewsItem } from "@/lib/news/types";
import { NewsCard } from "./news-card";

const TIER_WEIGHT: Record<NewsItem["sourceTier"], number> = { official: 0, industry: 1, market: 2 };

function rankForFeature(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    const tierDiff = TIER_WEIGHT[a.sourceTier] - TIER_WEIGHT[b.sourceTier];
    if (tierDiff !== 0) return tierDiff;
    const at = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bt = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bt - at;
  });
}

export function FeaturedNews({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;

  const ranked = rankForFeature(items);
  const [lead, ...rest] = ranked;
  const supporting = rest.slice(0, 3);

  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Featured Today
        </h2>
        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <NewsCard item={lead} size="large" />
          </div>
          <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
            {supporting.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
