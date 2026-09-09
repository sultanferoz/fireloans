"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Article, ArticleCategory } from "@/lib/articles";

type ArticlesFilterContextValue = {
  selected: ArticleCategory | "All";
  setSelected: (category: ArticleCategory | "All") => void;
  search: string;
  setSearch: (value: string) => void;
  filtered: Article[];
  availableCategories: (ArticleCategory | "All")[];
};

const ArticlesFilterContext = createContext<ArticlesFilterContextValue | null>(null);

export function ArticlesFilterProvider({
  articles,
  initialCategory,
  children,
}: {
  articles: Article[];
  initialCategory?: ArticleCategory | "All";
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<ArticleCategory | "All">(initialCategory ?? "All");
  const [search, setSearch] = useState("");

  const availableCategories = useMemo(() => {
    const present = new Set(articles.map((a) => a.frontmatter.category));
    return ["All", ...present] as (ArticleCategory | "All")[];
  }, [articles]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCategory = selected === "All" || a.frontmatter.category === selected;
      if (!matchesCategory) return false;
      if (!query) return true;
      const haystack = [
        a.frontmatter.title,
        a.frontmatter.excerpt,
        a.frontmatter.category,
        ...a.frontmatter.tags,
        a.content,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [articles, selected, search]);

  return (
    <ArticlesFilterContext.Provider value={{ selected, setSelected, search, setSearch, filtered, availableCategories }}>
      {children}
    </ArticlesFilterContext.Provider>
  );
}

export function useArticlesFilter() {
  const ctx = useContext(ArticlesFilterContext);
  if (!ctx) throw new Error("useArticlesFilter must be used within an ArticlesFilterProvider");
  return ctx;
}
