import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/news/format";
import { LiveStoryThumbnail } from "@/components/news/live-story-thumbnail";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-lg"
    >
      <div className="relative">
        <LiveStoryThumbnail alt={article.frontmatter.title} category={article.frontmatter.category} />
        <span className="absolute left-3 top-3 inline-flex w-fit items-center rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
          {article.frontmatter.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-pine-700">
          {article.frontmatter.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">{article.frontmatter.excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-ink-soft/80">
          <span>{formatDate(article.frontmatter.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
        </div>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-pine-700 group-hover:text-gold-700">
          Read article
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
