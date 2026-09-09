import { getAllEntries, getEntryBySlug, type ContentEntry } from "@/lib/content";
import { estimateReadingTime } from "@/lib/news/format";

export type ArticleCategory =
  | "Home Loans"
  | "First Home Buyers"
  | "Refinancing"
  | "Interest Rates"
  | "Borrowing Power"
  | "Property"
  | "Investment Property"
  | "Mortgage Tips"
  | "Banking"
  | "Market Insights"
  | "Broker Insights";

export type ArticleFrontmatter = {
  title: string;
  category: ArticleCategory;
  excerpt: string;
  author: string;
  publishedAt: string;
  tags: string[];
  relatedCalculator?: { href: string; label: string };
  relatedService?: { href: string; label: string };
  image?: string;
};

export type Article = ContentEntry<ArticleFrontmatter> & { readingTime: string };

function withReadingTime(entry: ContentEntry<ArticleFrontmatter>): Article {
  return { ...entry, readingTime: estimateReadingTime(entry.content) };
}

export function getAllArticles(): Article[] {
  return getAllEntries<ArticleFrontmatter>("learn")
    .map(withReadingTime)
    .sort((a, b) => Date.parse(b.frontmatter.publishedAt) - Date.parse(a.frontmatter.publishedAt));
}

export function getArticleBySlug(slug: string): Article | undefined {
  try {
    return withReadingTime(getEntryBySlug<ArticleFrontmatter>("learn", slug));
  } catch {
    return undefined;
  }
}
