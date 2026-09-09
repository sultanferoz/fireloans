"use client";

import { useState } from "react";
import { useNewsFilter } from "./news-context";
import { NewsCard } from "./news-card";

const PAGE_SIZE = 9;

export function NewsFeedGrid() {
  const { filtered } = useNewsFilter();
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (filtered.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-paper p-8 text-center text-ink-soft">
        No latest stories are available right now. Please check back shortly.
      </p>
    );
  }

  const shown = filtered.slice(0, visible);

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
      {visible < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center justify-center rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
          >
            Load more stories
          </button>
        </div>
      )}
    </div>
  );
}
