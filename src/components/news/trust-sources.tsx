import type { SourceStatus } from "@/lib/news/types";

export function TrustSources({ sourceReport }: { sourceReport: SourceStatus[] }) {
  const live = [...new Set(sourceReport.filter((s) => s.status === "PASS").map((s) => s.name))];
  if (live.length === 0) return null;

  return (
    <section className="border-y border-border bg-cream-muted/40 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          News from trusted Australian sources
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {live.map((name) => (
            <span
              key={name}
              className="rounded-full border border-border bg-paper px-4 py-2 text-sm font-semibold text-ink-soft"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink-soft/80">
          Fire Loans aggregates publicly published headlines from the sources above for
          informational purposes. Fire Loans is not affiliated with, endorsed by, or
          representing any of these organisations — all original reporting belongs to the
          named source, and each story links directly back to it.
        </p>
      </div>
    </section>
  );
}
