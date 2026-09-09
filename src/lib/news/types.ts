export const NEWS_CATEGORIES = [
  "Mortgage",
  "Interest Rates",
  "Banking",
  "Property",
  "First Home Buyers",
  "Refinancing",
  "Lending",
  "Broker News",
  "Regulation",
  "RBA",
  "APRA",
  "ASIC",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type SourceTier = "official" | "industry" | "market";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  sourceTier: SourceTier;
  category: NewsCategory;
  publishedAt: string | null;
  image?: string;
};

export type SourceStatus = {
  name: string;
  kind: "rss" | "api";
  status: "PASS" | "FAILED" | "BLOCKED" | "NOT_CONFIGURED";
  itemCount: number;
  detail?: string;
};

export type NewsResult = {
  items: NewsItem[];
  sourceReport: SourceStatus[];
};
