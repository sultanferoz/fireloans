import type { NewsItem } from "@/lib/news/types";
import { relativeTime, estimateReadingTime } from "@/lib/news/format";
import { LiveStoryThumbnail } from "./live-story-thumbnail";

function CategoryPill({ category }: { category: string }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
      {category}
    </span>
  );
}

export function NewsCard({ item, size = "default" }: { item: NewsItem; size?: "default" | "large" }) {
  const isLarge = size === "large";

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-lg"
    >
      <div className="relative">
        <LiveStoryThumbnail
          src={item.image}
          alt={item.title}
          category={item.category}
          size={isLarge ? "large" : "default"}
          sizes={isLarge ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <CategoryPill category={item.category} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className={`font-display font-semibold leading-snug text-ink ${isLarge ? "text-2xl" : "text-base"}`}>
          {item.title}
        </h3>
        {isLarge && item.summary && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{item.summary}</p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 text-xs text-ink-soft/80">
          <span className="font-semibold text-ink-soft">{item.source}</span>
          <span aria-hidden="true">·</span>
          <span>{relativeTime(item.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{estimateReadingTime(item.summary || item.title)}</span>
        </div>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-pine-700 transition-colors group-hover:text-gold-700">
          Read story
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </a>
  );
}
