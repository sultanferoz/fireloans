import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/news/format";
import { LiveStoryThumbnail } from "@/components/news/live-story-thumbnail";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/articles/${article.slug}`}
          className="group grid grid-cols-1 gap-8 rounded-3xl border border-border bg-paper p-8 transition-shadow hover:shadow-lg sm:p-10 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-700">
              Featured Guide · {article.frontmatter.category}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink group-hover:text-pine-700 sm:text-4xl">
              {article.frontmatter.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{article.frontmatter.excerpt}</p>
            <div className="mt-5 flex items-center gap-2 text-sm text-ink-soft/80">
              <span className="font-semibold text-ink-soft">{article.frontmatter.author}</span>
              <span aria-hidden="true">·</span>
              <span>{formatDate(article.frontmatter.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-pine-900 px-6 py-3 text-sm font-semibold text-gold-400">
              Read Article
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <div className="hidden overflow-hidden rounded-2xl lg:block">
            <LiveStoryThumbnail
              alt={article.frontmatter.title}
              category={article.frontmatter.category}
              size="large"
              sizes="40vw"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
