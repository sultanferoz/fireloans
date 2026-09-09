import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getEntryBySlug } from "@/lib/content";

type StoryFrontmatter = {
  title: string;
  loanType: string;
  loanSlug: string;
  hook: string;
  cta: string;
  disclaimer?: string;
};

export function generateStaticParams() {
  return getAllSlugs("stories").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { frontmatter } = getEntryBySlug<StoryFrontmatter>("stories", slug);
    return {
      title: frontmatter.title,
      description: frontmatter.hook,
      alternates: { canonical: `/client-stories/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let entry;
  try {
    entry = getEntryBySlug<StoryFrontmatter>("stories", slug);
  } catch {
    notFound();
  }
  const { frontmatter, content } = entry!;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/client-stories" className="text-sm font-semibold text-brand-600">
        ← All client stories
      </Link>
      <span className="mt-6 inline-flex rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-700">
        {frontmatter.loanType}
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {frontmatter.title}
      </h1>

      <div className="prose prose-lg prose-headings:font-display prose-headings:text-ink prose-p:text-ink-soft prose-strong:text-ink mt-8 max-w-none">
        <MDXRemote source={content} />
      </div>

      {frontmatter.disclaimer && (
        <p className="mt-8 rounded-xl border border-border bg-cream-muted p-4 text-sm text-ink-soft">
          {frontmatter.disclaimer}
        </p>
      )}

      <div className="mt-10 rounded-2xl bg-pine-700 p-8 text-cream">
        <p className="font-display text-xl font-medium">{frontmatter.cta}</p>
        <Link
          href="/apply"
          className="mt-5 inline-flex rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-paper hover:bg-brand-600"
        >
          Talk to Fire Loans
        </Link>
        <Link
          href={`/loans/${frontmatter.loanSlug}`}
          className="mt-5 ml-3 inline-flex rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream hover:bg-cream/10"
        >
          See {frontmatter.loanType} details
        </Link>
      </div>
    </article>
  );
}
