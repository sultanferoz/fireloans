"use client";

import { useArticlesFilter } from "./articles-context";
import { ArticleCard } from "./article-card";

export function ArticlesGrid() {
  const { filtered } = useArticlesFilter();

  if (filtered.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-paper p-8 text-center text-ink-soft">
        No guides match your search yet. Try a different term or category.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
