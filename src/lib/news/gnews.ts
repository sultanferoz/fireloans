import { categorize, isAuMortgageRelevant } from "./categorize";
import type { NewsItem, SourceStatus } from "./types";

type GNewsArticle = {
  title: string;
  description?: string;
  url: string;
  source?: { name?: string };
  publishedAt?: string;
  image?: string;
};

/**
 * Optional secondary discovery source (https://gnews.io/api/v4). Server-only — reads
 * GNEWS_API_KEY. Not used as a primary production source; only queried if a key is set.
 */
export async function fetchGNews(): Promise<{ items: NewsItem[]; status: SourceStatus }> {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    return { items: [], status: { name: "GNews", kind: "api", status: "NOT_CONFIGURED", itemCount: 0, detail: "GNEWS_API_KEY not set" } };
  }

  try {
    const url = `https://gnews.io/api/v4/search?q=mortgage%20Australia&lang=en&country=au&apikey=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 1800 } });

    if (!res.ok) {
      return { items: [], status: { name: "GNews", kind: "api", status: "FAILED", itemCount: 0, detail: `HTTP ${res.status}` } };
    }

    const data = (await res.json()) as { articles?: GNewsArticle[] };
    const articles = data.articles ?? [];

    const items: NewsItem[] = [];
    for (const a of articles) {
      const text = `${a.title} ${a.description ?? ""}`;
      if (!isAuMortgageRelevant(text)) continue;
      items.push({
        id: a.url,
        title: a.title,
        summary: (a.description ?? "").slice(0, 220),
        url: a.url,
        source: a.source?.name ?? "GNews",
        sourceTier: "market",
        category: categorize(text, "Mortgage"),
        publishedAt: a.publishedAt ? new Date(a.publishedAt).toISOString() : null,
        image: a.image,
      });
    }

    return { items, status: { name: "GNews", kind: "api", status: "PASS", itemCount: items.length } };
  } catch (err) {
    return {
      items: [],
      status: { name: "GNews", kind: "api", status: "FAILED", itemCount: 0, detail: err instanceof Error ? err.message : "Unknown error" },
    };
  }
}
