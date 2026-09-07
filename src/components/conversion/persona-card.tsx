import Link from "next/link";
import type { Persona } from "@/content/personas";
import { PersonaIcon } from "./persona-icon";

export function PersonaCard({ persona }: { persona: Persona }) {
  return (
    <Link
      href={`/${persona.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <PersonaIcon icon={persona.icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{persona.label}</h3>
      <p className="mt-1 text-sm font-medium text-brand-600">{persona.headline}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{persona.description}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:text-brand-600">
        Explore path
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
