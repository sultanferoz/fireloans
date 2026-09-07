import Link from "next/link";

export type StoryCardProps = {
  slug: string;
  title: string;
  loanType: string;
  hook: string;
};

export function StoryCard({ slug, title, loanType, hook }: StoryCardProps) {
  return (
    <Link
      href={`/client-stories/${slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-border bg-paper p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div>
        <span className="inline-flex rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-700">
          {loanType}
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{hook}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-700 group-hover:gap-2 transition-all">
        Read the story
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
