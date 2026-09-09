"use client";

import { useArticlesFilter } from "./articles-context";

export function CategorySearchBar() {
  const { availableCategories, selected, setSelected, search, setSearch } = useArticlesFilter();

  return (
    <div className="border-b border-border bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/60"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mortgage guides and insights"
            className="w-full rounded-full border border-border bg-cream-muted/40 py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink-soft/60 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
          />
        </div>

        <div
          className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Article categories"
        >
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selected === category}
              onClick={() => setSelected(category)}
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
