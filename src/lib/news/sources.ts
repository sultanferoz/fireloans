import type { NewsCategory, SourceTier } from "./types";

export type FeedFormat = "rss2" | "rdf" | "atom";

export type FeedSource = {
  name: string;
  url: string;
  format: FeedFormat;
  tier: SourceTier;
  defaultCategory: NewsCategory;
  /** If true, items must pass the AU mortgage/finance relevance filter to be included. */
  requiresRelevanceFilter: boolean;
};

/**
 * Every feed below was live-tested (Sep 2026) by fetching it directly and confirming a
 * 200 response with parseable items. Feeds that returned 403/404/blocked at test time
 * (APRA, ASIC, ABS, FBAA, big-four banks, several broker trade titles) are not included  
 * see docs/news-articles-integration.md and the build report for the full pass/fail list.
 */
export const FEED_SOURCES: FeedSource[] = [
  {
    name: "RBA",
    url: "https://www.rba.gov.au/rss/rss-cb-media-releases.xml",
    format: "rdf",
    tier: "official",
    defaultCategory: "RBA",
    requiresRelevanceFilter: false,
  },
  {
    name: "RBA",
    url: "https://www.rba.gov.au/rss/rss-cb-speeches.xml",
    format: "rdf",
    tier: "official",
    defaultCategory: "RBA",
    requiresRelevanceFilter: false,
  },
  {
    name: "Australian Treasury",
    url: "https://ministers.treasury.gov.au/rss.xml",
    format: "rss2",
    tier: "official",
    defaultCategory: "Regulation",
    requiresRelevanceFilter: true,
  },
  {
    name: "Australian Banking Association",
    url: "https://www.ausbanking.org.au/feed/",
    format: "rss2",
    tier: "industry",
    defaultCategory: "Banking",
    requiresRelevanceFilter: false,
  },
  {
    name: "Australian Broker",
    url: "https://www.brokernews.com.au/rss",
    format: "atom",
    tier: "industry",
    defaultCategory: "Broker News",
    requiresRelevanceFilter: false,
  },
  {
    name: "MFAA",
    url: "https://www.mfaa.com.au/news/rss",
    format: "rss2",
    tier: "industry",
    defaultCategory: "Broker News",
    requiresRelevanceFilter: false,
  },
  {
    name: "realestate.com.au",
    url: "https://www.realestate.com.au/news/feed/",
    format: "rss2",
    tier: "market",
    defaultCategory: "Property",
    requiresRelevanceFilter: true,
  },
  {
    name: "Property Update",
    url: "https://propertyupdate.com.au/feed/",
    format: "rss2",
    tier: "market",
    defaultCategory: "Property",
    requiresRelevanceFilter: true,
  },
];

/** Feeds we attempted but which are not publicly reachable   kept for transparency/reporting. */
export const KNOWN_UNAVAILABLE_SOURCES = [
  "APRA",
  "ASIC",
  "ABS",
  "FBAA",
  "CBA",
  "ANZ",
  "NAB",
  "Westpac",
  "Macquarie",
  "ING Australia",
  "BOQ",
  "Bendigo Bank",
  "Mortgage Professional Australia",
  "The Adviser",
  "Mortgage Business",
];
