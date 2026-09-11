import { categorize, isAuMortgageRelevant } from "./categorize";
import type { NewsItem, SourceStatus } from "./types";

type NewsDataArticle = {
  article_id: string;
  title: string;
  description?: string | null;
  link: string;
  source_id?: string;
  pubDate?: string;
  image_url?: string | null;
};

/**
 * Secondary discovery source per NewsData.io (https://newsdata.io/documentation).
 * Server-only   reads NEWSDATA_API_KEY, never NEXT_PUBLIC_*. No-ops if unconfigured.
 * NewsData's free tier is delayed, not real-time   the UI must never call this "real-time".
 */
export async function fetchNewsData(): Promise<{ items: NewsItem[]; status: SourceStatus }> {
  const apiKey = process.env.NEWSDATA_API_KEY;
  if (!apiKey) {
    return { items: [], status: { name: "NewsData.io", kind: "api", status: "NOT_CONFIGURED", itemCount: 0, detail: "NEWSDATA_API_KEY not set" } };
  }

  try {
    const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=au&language=en&q=mortgage%20OR%20%22home%20loan%22%20OR%20%22interest%20rate%22%20OR%20RBA`;
    const res = await fetch(url, { next: { revalidate: 1800 } });

    if (!res.ok) {
      return { items: [], status: { name: "NewsData.io", kind: "api", status: "FAILED", itemCount: 0, detail: `HTTP ${res.status}` } };
    }

    const data = (await res.json()) as { results?: NewsDataArticle[] };
    const articles = data.results ?? [];

    const items: NewsItem[] = [];
    for (const a of articles) {
      const text = `${a.title} ${a.description ?? ""}`;
      if (!isAuMortgageRelevant(text)) continue;
      items.push({
        id: a.article_id,
        title: a.title,
        summary: (a.description ?? "").slice(0, 220),
        url: a.link,
        source: a.source_id ?? "NewsData.io",
        sourceTier: "market",
        category: categorize(text, "Mortgage"),
        publishedAt: a.pubDate ? new Date(a.pubDate).toISOString() : null,
        image: a.image_url ?? undefined,
      });
    }

    return { items, status: { name: "NewsData.io", kind: "api", status: "PASS", itemCount: items.length } };
  } catch (err) {
    return {
      items: [],
      status: { name: "NewsData.io", kind: "api", status: "FAILED", itemCount: 0, detail: err instanceof Error ? err.message : "Unknown error" },
    };
  }
}
