import type { Metadata } from "next";
import { getNews } from "@/lib/news/aggregate";
import { NewsHero } from "@/components/news/news-hero";
import { NewsFilterProvider } from "@/components/news/news-context";
import { CategoryNav } from "@/components/news/category-nav";
import { FeaturedNews } from "@/components/news/featured-news";
import { WhatMattersToday } from "@/components/news/what-matters-today";
import { NewsFeedGrid } from "@/components/news/news-feed-grid";
import { TrendingTopics } from "@/components/news/trending-topics";
import { BorrowerImpact } from "@/components/news/borrower-impact";
import { TrustSources } from "@/components/news/trust-sources";
import { NewsCta } from "@/components/news/news-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { NEWS_CATEGORIES, type NewsCategory, type NewsResult } from "@/lib/news/types";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Australian Mortgage & Banking News",
  description:
    "Latest Australian mortgage, home loan, interest rate, banking, property and lending news, with practical insights from Fire Loans.",
  alternates: { canonical: "/news" },
};

async function safeGetNews(): Promise<NewsResult> {
  try {
    return await getNews();
  } catch {
    return { items: [], sourceReport: [] };
  }
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { items, sourceReport } = await safeGetNews();
  const failedEverything = items.length === 0 && sourceReport.every((s) => s.status !== "PASS");

  const { category } = await searchParams;
  const initialCategory = NEWS_CATEGORIES.includes(category as NewsCategory)
    ? (category as NewsCategory)
    : "All";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Australian Mortgage & Banking News",
      description:
        "Latest Australian mortgage, home loan, interest rate, banking, property and lending news, with practical insights from Fire Loans.",
      url: "https://www.fireloans.com.au/news",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Fire Loans", item: "https://www.fireloans.com.au" },
        { "@type": "ListItem", position: 2, name: "News", item: "https://www.fireloans.com.au/news" },
      ],
    },
  ];

  return (
    <div className="bg-cream">
      <JsonLd data={jsonLd} />
      <NewsHero />

      {failedEverything ? (
        <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
          <p className="text-lg font-semibold text-ink">News updates are temporarily unavailable.</p>
          <p className="mt-2 text-ink-soft">Please check back shortly, or talk to a broker directly in the meantime.</p>
        </div>
      ) : (
        <NewsFilterProvider items={items} initialCategory={initialCategory}>
          <CategoryNav />
          <FeaturedNews items={items} />
          <WhatMattersToday items={items} />

          <section id="latest-news" className="scroll-mt-24 py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Latest Australian Mortgage News
              </h2>
              <div className="mt-8">
                <NewsFeedGrid />
              </div>
            </div>
          </section>

          <TrendingTopics />
        </NewsFilterProvider>
      )}

      <BorrowerImpact />
      {sourceReport.length > 0 && <TrustSources sourceReport={sourceReport} />}
      <NewsCta />
    </div>
  );
}
