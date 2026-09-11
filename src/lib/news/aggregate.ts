import { FEED_SOURCES } from "./sources";
import { fetchFeed } from "./fetch-feed";
import { fetchNewsData } from "./newsdata";
import { fetchGNews } from "./gnews";
import type { NewsItem, NewsResult, SourceStatus } from "./types";

const MAX_ITEMS = 60;

function dedupe(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();
  const out: NewsItem[] = [];
  for (const item of items) {
    const key = item.url.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

/**
 * Fetches every configured RSS source in parallel (Promise.allSettled   one failing
 * source never breaks the others), plus NewsData.io / GNews if their API keys are
 * configured, then merges, dedupes, filters to AU mortgage/finance relevance, sorts by
 * publish date, and caps the result. Called only from Server Components   nothing here
 * ever runs in the browser.
 */
export async function getNews(): Promise<NewsResult> {
  const feedResults = await Promise.allSettled(FEED_SOURCES.map((source) => fetchFeed(source)));
  const [newsDataResult, gnewsResult] = await Promise.allSettled([fetchNewsData(), fetchGNews()]);

  const items: NewsItem[] = [];
  const sourceReport: SourceStatus[] = [];

  for (let i = 0; i < feedResults.length; i++) {
    const result = feedResults[i];
    if (result.status === "fulfilled") {
      items.push(...result.value.items);
      sourceReport.push(result.value.status);
    } else {
      sourceReport.push({ name: FEED_SOURCES[i].name, kind: "rss", status: "FAILED", itemCount: 0, detail: "Unhandled rejection" });
    }
  }

  for (const apiResult of [newsDataResult, gnewsResult]) {
    if (apiResult.status === "fulfilled") {
      items.push(...apiResult.value.items);
      sourceReport.push(apiResult.value.status);
    }
  }

  const merged = dedupe(items).sort((a, b) => {
    const at = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bt = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bt - at;
  });

  return { items: merged.slice(0, MAX_ITEMS), sourceReport };
}
