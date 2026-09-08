"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type LegalSectionMeta = { id: string; number: string; label: string };

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? Math.min(100, (doc.scrollTop / scrollable) * 100) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-pine-700 via-brand-500 to-gold-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function LegalDocumentShell({
  sections,
  children,
}: {
  sections: LegalSectionMeta[];
  children: ReactNode;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    targets.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav className="sticky top-28 flex flex-col gap-1 border-l border-border pl-5">
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className={`group flex items-baseline gap-3 py-1.5 text-sm transition-colors ${
                  activeId === s.id ? "font-semibold text-pine-900" : "text-ink-soft hover:text-ink"
                }`}
              >
                <span
                  className={`h-px w-4 shrink-0 transition-all ${
                    activeId === s.id ? "w-6 bg-gold-500" : "bg-border group-hover:bg-ink-soft"
                  }`}
                />
                {s.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}
