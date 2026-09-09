import type { NewsCategory } from "./types";

/** Checked in order — first match wins. Keep specific institutional/topic categories before generic ones. */
const CATEGORY_RULES: { category: NewsCategory; keywords: RegExp }[] = [
  { category: "RBA", keywords: /\brba\b|reserve bank of australia|cash rate/i },
  { category: "APRA", keywords: /\bapra\b|prudential regulation/i },
  { category: "ASIC", keywords: /\basic\b|securities and investments commission/i },
  { category: "First Home Buyers", keywords: /first[\s-]home buyer|first home guarantee|fhb\b|help to buy/i },
  { category: "Refinancing", keywords: /refinanc/i },
  { category: "Interest Rates", keywords: /interest rate|cash rate|fixed rate|variable rate|rate (cut|hike|rise|hold|decision)/i },
  { category: "Regulation", keywords: /regulat|legislat|compliance|responsible lending|nccp|royal commission/i },
  { category: "Broker News", keywords: /\bbroker|\bmfaa\b|\bfbaa\b|aggregator/i },
  { category: "Banking", keywords: /\bbank(s|ing)?\b|lender|abn?a\b/i },
  { category: "Lending", keywords: /lending|loan book|credit growth|serviceability|borrowing capacity/i },
  { category: "Property", keywords: /property|housing|home price|dwelling|auction|suburb|listing|real estate/i },
];

export function categorize(text: string, fallback: NewsCategory): NewsCategory {
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.test(text)) return rule.category;
  }
  return fallback;
}

/** Broad allow-list used to filter general property/lifestyle feeds down to genuinely AU mortgage/finance-relevant items. */
const RELEVANCE_KEYWORDS =
  /mortgage|home loan|refinanc|interest rate|cash rate|\brba\b|\bapra\b|\basic\b|first[\s-]home buyer|borrowing|lender|\bbank(s|ing)?\b|property market|housing market|dwelling price|auction clearance|deposit|lvr|lmi|offset account|construction loan|investment propert|negative gearing|stamp duty|serviceability|credit polic/i;

export function isAuMortgageRelevant(text: string): boolean {
  return RELEVANCE_KEYWORDS.test(text);
}
