import type { Metadata } from "next";
import { getAllArticles, type ArticleCategory } from "@/lib/articles";
import { getNews } from "@/lib/news/aggregate";
import { ArticlesHero } from "@/components/articles/articles-hero";
import { ArticlesFilterProvider } from "@/components/articles/articles-context";
import { CategorySearchBar } from "@/components/articles/category-search-bar";
import { FeaturedArticle } from "@/components/articles/featured-article";
import { PopularGuides } from "@/components/articles/popular-guides";
import { ArticlesGrid } from "@/components/articles/articles-grid";
import { KnowledgeHub } from "@/components/articles/knowledge-hub";
import { MarketInsights } from "@/components/articles/market-insights";
import { ArticlesCta } from "@/components/articles/articles-cta";
import { JsonLd } from "@/components/seo/json-ld";

export const revalidate = 1800;

const SITE_URL = "https://www.fireloans.com.au";
const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "Home Loans",
  "First Home Buyers",
  "Refinancing",
  "Interest Rates",
  "Borrowing Power",
  "Property",
  "Investment Property",
  "Mortgage Tips",
  "Banking",
  "Market Insights",
  "Broker Insights",
];

export const metadata: Metadata = {
  title: "Australian Mortgage Guides & Home Loan Advice",
  description:
    "Practical Australian mortgage guides, home loan advice, refinancing tips, first home buyer information, interest rate insights and property finance guidance from Fire Loans.",
  alternates: { canonical: "/articles" },
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const articles = getAllArticles();
  let newsItems: Awaited<ReturnType<typeof getNews>>["items"] = [];
  try {
    ({ items: newsItems } = await getNews());
  } catch {
    newsItems = [];
  }

  const { category } = await searchParams;
  const initialCategory = ARTICLE_CATEGORIES.includes(category as ArticleCategory)
    ? (category as ArticleCategory)
    : "All";

  const featured = articles.find((a) => a.slug === "first-home-buyer-guide") ?? articles[0];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Fire Loans",
      url: SITE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Fire Loans",
      url: SITE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Australian Mortgage Guides & Home Loan Advice",
      description:
        "Practical Australian mortgage guides, home loan advice, refinancing tips, first home buyer information, interest rate insights and property finance guidance from Fire Loans.",
      url: `${SITE_URL}/articles`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Fire Loans", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE_URL}/articles` },
      ],
    },
  ];

  return (
    <div className="bg-cream">
      <JsonLd data={jsonLd} />
      <ArticlesHero />

      {featured && <FeaturedArticle article={featured} />}
      <PopularGuides articles={articles} />

      <ArticlesFilterProvider articles={articles} initialCategory={initialCategory}>
        <CategorySearchBar />
        <section id="latest-articles" className="scroll-mt-24 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Latest Insights
            </h2>
            <div className="mt-8">
              <ArticlesGrid />
            </div>
          </div>
        </section>
      </ArticlesFilterProvider>

      <KnowledgeHub />
      <MarketInsights newsItems={newsItems} />
      <ArticlesCta />
    </div>
  );
}
