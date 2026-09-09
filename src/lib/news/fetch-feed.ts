import { extractBlocks, extractText, extractLink, extractImage, parseDate } from "./xml";
import { categorize, isAuMortgageRelevant } from "./categorize";
import type { FeedSource } from "./sources";
import type { NewsItem, SourceStatus } from "./types";

const ITEM_TAG_BY_FORMAT = { rss2: "item", rdf: "item", atom: "entry" } as const;

function hashId(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

export async function fetchFeed(
  source: FeedSource
): Promise<{ items: NewsItem[]; status: SourceStatus }> {
  try {
    const res = await fetch(source.url, {
      headers: { "User-Agent": "FireLoansNewsBot/1.0 (+https://www.fireloans.com.au)" },
      next: { revalidate: 1800 },
    });

    if (res.status === 403 || res.status === 401) {
      return { items: [], status: { name: source.name, kind: "rss", status: "BLOCKED", itemCount: 0, detail: `HTTP ${res.status}` } };
    }
    if (!res.ok) {
      return { items: [], status: { name: source.name, kind: "rss", status: "FAILED", itemCount: 0, detail: `HTTP ${res.status}` } };
    }

    const xml = await res.text();
    const tag = ITEM_TAG_BY_FORMAT[source.format];
    const blocks = extractBlocks(xml, tag);

    const items: NewsItem[] = [];
    for (const block of blocks) {
      const title = extractText(block, ["title"]);
      const url = extractLink(block);
      if (!title || !url) continue;

      const summary = extractText(block, ["description", "summary", "content:encoded", "content"]) ?? "";
      const publishedAt =
        parseDate(extractText(block, ["pubDate", "dc:date", "published", "updated", "date"])) ?? null;
      const image = extractImage(block);

      const text = `${title} ${summary}`;
      if (source.requiresRelevanceFilter && !isAuMortgageRelevant(text)) continue;

      items.push({
        id: hashId(url),
        title,
        summary: summary.length > 220 ? `${summary.slice(0, 217)}...` : summary,
        url,
        source: source.name,
        sourceTier: source.tier,
        category: categorize(text, source.defaultCategory),
        publishedAt,
        image,
      });
    }

    return {
      items,
      status: { name: source.name, kind: "rss", status: "PASS", itemCount: items.length },
    };
  } catch (err) {
    return {
      items: [],
      status: {
        name: source.name,
        kind: "rss",
        status: "FAILED",
        itemCount: 0,
        detail: err instanceof Error ? err.message : "Unknown error",
      },
    };
  }
}
