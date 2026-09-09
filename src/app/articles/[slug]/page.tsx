import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs } from "@/lib/content";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { formatDate } from "@/lib/news/format";
import { JsonLd } from "@/components/seo/json-ld";

const SITE_URL = "https://www.fireloans.com.au";

export function generateStaticParams() {
  return getAllSlugs("learn").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.excerpt,
    alternates: { canonical: `/articles/${slug}` },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { frontmatter, content, readingTime } = article;
  const related = getAllArticles()
    .filter((a) => a.slug !== slug && a.frontmatter.category === frontmatter.category)
    .slice(0, 2);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: frontmatter.title,
      description: frontmatter.excerpt,
      author: { "@type": "Organization", name: frontmatter.author },
      datePublished: frontmatter.publishedAt,
      publisher: { "@type": "Organization", name: "Fire Loans" },
      url: `${SITE_URL}/articles/${slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Fire Loans", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE_URL}/articles` },
        { "@type": "ListItem", position: 3, name: frontmatter.title, item: `${SITE_URL}/articles/${slug}` },
      ],
    },
  ];

  return (
    <article className="bg-cream">
      <JsonLd data={jsonLd} />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/articles" className="text-sm font-semibold text-pine-700 hover:text-gold-700">
          ← All articles
        </Link>

        <span className="mt-6 inline-flex rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-700">
          {frontmatter.category}
        </span>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {frontmatter.title}
        </h1>
        <div className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
          <span className="font-semibold">{frontmatter.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(frontmatter.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{readingTime}</span>
        </div>

        <div className="prose prose-lg prose-headings:font-display prose-headings:text-ink prose-p:text-ink-soft prose-li:text-ink-soft prose-strong:text-ink prose-a:text-pine-700 mt-8 max-w-none">
          <MDXRemote source={content} />
        </div>

        {(frontmatter.relatedCalculator || frontmatter.relatedService) && (
          <div className="mt-10 rounded-2xl bg-pine-950 p-8 text-cream">
            <p className="font-display text-xl font-medium text-paper">Put this into practice</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {frontmatter.relatedCalculator && (
                <Link
                  href={frontmatter.relatedCalculator.href}
                  className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-pine-950 hover:bg-gold-400"
                >
                  {frontmatter.relatedCalculator.label}
                </Link>
              )}
              {frontmatter.relatedService && (
                <Link
                  href={frontmatter.relatedService.href}
                  className="inline-flex items-center justify-center rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream hover:bg-white/10"
                >
                  {frontmatter.relatedService.label}
                </Link>
              )}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="font-display text-lg font-semibold text-ink">More on {frontmatter.category}</h2>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/articles/${r.slug}`} className="font-semibold text-pine-700 hover:text-gold-700">
                    {r.frontmatter.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
