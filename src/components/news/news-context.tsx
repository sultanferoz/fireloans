"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { NEWS_CATEGORIES, type NewsCategory, type NewsItem } from "@/lib/news/types";

type NewsFilterContextValue = {
  items: NewsItem[];
  selected: NewsCategory | "All";
  setSelected: (category: NewsCategory | "All") => void;
  filtered: NewsItem[];
  availableCategories: (NewsCategory | "All")[];
};

const NewsFilterContext = createContext<NewsFilterContextValue | null>(null);

export function NewsFilterProvider({
  items,
  initialCategory,
  children,
}: {
  items: NewsItem[];
  initialCategory?: NewsCategory | "All";
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<NewsCategory | "All">(initialCategory ?? "All");

  const availableCategories = useMemo(() => {
    const present = new Set(items.map((i) => i.category));
    return ["All", ...NEWS_CATEGORIES.filter((c) => present.has(c))] as (NewsCategory | "All")[];
  }, [items]);

  const filtered = useMemo(
    () => (selected === "All" ? items : items.filter((i) => i.category === selected)),
    [items, selected]
  );

  return (
    <NewsFilterContext.Provider value={{ items, selected, setSelected, filtered, availableCategories }}>
      {children}
    </NewsFilterContext.Provider>
  );
}

export function useNewsFilter() {
  const ctx = useContext(NewsFilterContext);
  if (!ctx) throw new Error("useNewsFilter must be used within a NewsFilterProvider");
  return ctx;
}
