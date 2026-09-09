"use client";

import { useMemo } from "react";
import { useNewsFilter } from "./news-context";
import type { NewsCategory } from "@/lib/news/types";

export function TrendingTopics() {
  const { items, setSelected } = useNewsFilter();

  const trending = useMemo(() => {
    const counts = new Map<NewsCategory, number>();
    for (const item of items) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7);
  }, [items]);

  if (trending.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Trending in Australian Mortgages
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">Calculated from today&apos;s live coverage volume.</p>

        <div className="mt-7 flex flex-wrap gap-3">
          {trending.map(([category, count]) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelected(category);
                document.getElementById("latest-news")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-paper px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-gold-400 hover:text-pine-700"
            >
              {category}
              <span className="rounded-full bg-cream-muted px-2 py-0.5 text-xs font-bold text-ink-soft">{count}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
