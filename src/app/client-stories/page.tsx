import type { Metadata } from "next";
import { getAllEntries } from "@/lib/content";
import { StoryCard } from "@/components/stories/story-card";

type StoryFrontmatter = {
  title: string;
  loanType: string;
  hook: string;
  order?: number;
};

export const metadata: Metadata = {
  title: "Client Stories",
  description:
    "How real Fire Loans clients — first home buyers, investors, business owners and builders — found the right loan structure for their situation.",
  alternates: { canonical: "/client-stories" },
};

export default function ClientStoriesPage() {
  const stories = getAllEntries<StoryFrontmatter>("stories").sort(
    (a, b) => (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold-700">
          Client Stories
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Every loan has a story behind it
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          These are composite, anonymised illustrations of the situations we help clients work
          through — not verbatim testimonials. They&apos;re here so you can see whether your own
          situation looks familiar.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <StoryCard
            key={story.slug}
            slug={story.slug}
            title={story.frontmatter.title}
            loanType={story.frontmatter.loanType}
            hook={story.frontmatter.hook}
          />
        ))}
      </div>
    </div>
  );
}
