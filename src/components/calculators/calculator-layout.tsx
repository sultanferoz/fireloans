import Link from "next/link";
import type { ReactNode } from "react";

export function CalculatorLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/calculators" className="text-sm font-semibold text-gold-700 hover:text-gold-500">
          ← All calculators
        </Link>
        <div className="mt-4 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-700">Calculator</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{description}</p>
        </div>

        <div className="mt-10">{children}</div>

        <div className="mt-10 rounded-xl bg-cream-muted p-4 text-sm leading-relaxed text-ink-soft">
          This calculator provides estimates only, based on the figures you enter and general
          assumptions — it doesn&apos;t take into account your full financial situation and isn&apos;t
          formal lending or financial advice. Talk to a Fire Loans broker for an assessment specific to
          you.
        </div>
      </div>
    </div>
  );
}

export function CalculatorGrid({ inputs, results }: { inputs: ReactNode; results: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="rounded-3xl bg-paper p-6 shadow-xl shadow-ink/5 sm:p-8 lg:col-span-7">{inputs}</div>

      {/* This column stays as tall as the inputs column (default grid stretch) purely to give
          the sticky card below room to travel — it un-sticks once its tall parent runs out,
          i.e. exactly when the inputs column ends. */}
      <div className="lg:col-span-5">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-pine-900 p-6 text-cream shadow-2xl shadow-pine-950/40 sm:p-8 lg:sticky lg:top-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, transparent, transparent 68px, currentColor 68px, currentColor 69px)",
            }}
          />
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/10 blur-[90px]"
            aria-hidden="true"
          />
          <div className="relative">{results}</div>
        </div>
      </div>
    </div>
  );
}
