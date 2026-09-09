# News & Articles — integration plan (BUILT — see status below)

**Status: built.** `/news` and `/articles` are live, nav links point to them, and the
RSS aggregation pipeline described below is implemented at `src/lib/news/`. This file
is kept as the reference for how it works and how to extend it — see the build report
delivered in-conversation for the full file list, source PASS/FAIL results, and test
results.

## News (real-time AU mortgage/finance news)

**Recommended approach: RSS-first, API as enrichment.**

| Option | Cost | Notes |
|---|---|---|
| **RSS aggregation** (recommended primary) | Free, no key, no rate limit | Pull from AU finance/broker sources directly: ABC News Business RSS, RBA media releases RSS, *Australian Broker* RSS, *The Adviser* RSS, MFAA news page. Parse with `rss-parser` (npm) in a Next.js Route Handler, filter by keyword (`mortgage`, `broker`, `home loan`, `interest rate`, `RBA`), cache with `revalidate` (e.g. 30–60 min) via ISR or `fetch(..., { next: { revalidate: 1800 } })`. |
| **GNews.io** | Free tier: 100 requests/day | Supports country + keyword filters (`country=au&q=mortgage`). Good as a secondary/enrichment source once RSS is live. |
| **NewsData.io** | Free tier available | Similar to GNews; check current quota before relying on it. |
| **NewsAPI.org** | Free tier is dev/testing only — blocks production use on paid plans required | Avoid for a live production feed unless upgrading to a paid plan. |

**Implementation sketch:** `src/app/api/news/route.ts` → fetch + parse RSS feeds server-side →
return normalized `{ title, url, source, publishedAt }[]` → render in a `/news` page and
a homepage/footer widget, with ISR caching so we're not hitting feeds on every request.

## Articles (posts/updates from mortgage-broker officials)

**X/Twitter API is not viable on the free tier** for a live feed — as of research
current tier caps free read access at ~1,500 posts/month, which won't sustain a
real-time widget. Two viable alternatives:

1. **RSS from industry bodies/publications** (recommended primary) — MFAA, FBAA,
   ASIC MoneySmart, *Australian Broker*, *The Adviser*, RBA — same pipeline as News
   above, filtered/tagged as "Articles" instead of "News."
2. **Curated tweet embeds** — for specific tweets from named officials/bodies worth
   featuring, use Twitter's free `publish.twitter.com` oEmbed widget (no API key,
   no rate limit, but each tweet is manually selected — not a live auto-pulling feed).

## When this gets built
Both features should reuse the same `src/lib/content.ts`-style pattern already used
for stories/loans — a typed fetch/parse layer, not scattered fetch calls in
components. Build only on explicit instruction (per the original request).
