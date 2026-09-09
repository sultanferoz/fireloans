"use client";

import { useNewsFilter } from "./news-context";

export function CategoryNav() {
  const { availableCategories, selected, setSelected } = useNewsFilter();

  function handleSelect(category: typeof selected) {
    setSelected(category);
    document.getElementById("latest-news")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-paper/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex gap-2 overflow-x-auto py-3.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="News categories"
        >
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selected === category}
              onClick={() => handleSelect(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                selected === category
                  ? "bg-pine-900 text-gold-400"
                  : "bg-cream-muted text-ink-soft hover:bg-cream-muted/70 hover:text-ink"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
