"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const PHONE_NUMBER = "0478 933 786";
const PHONE_HREF = "tel:0478933786";
const DISMISS_KEY = "fireloans-floating-cta-dismissed";
const RING_TEXT = "FREE ASSESSMENT • ".repeat(4);

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M4 5c0 8.5 6.5 15 15 15l3-4-6-3-2 2c-2-1-4-3-5-5l2-2-3-6-4 3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Sticky floating CTA: a spinning "sticker" badge on desktop that expands into
 * a card, and a full-width sticky bar on mobile (a tiny hover-to-expand badge
 * isn't a reliable touch target). Both link to the homepage's #contact section,
 * with a direct tel: link alongside as the fallback for anyone who'd rather call.
 */
export function FloatingCta() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // setTimeout(0) defers these updates to a callback rather than running
    // them synchronously as the first lines of the effect body.
    const timer = setTimeout(() => {
      setMounted(true);
      if (sessionStorage.getItem(DISMISS_KEY) === "1") setDismissed(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    setOpen(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  if (!mounted || dismissed) return null;

  return (
    <>
      {/* Desktop / tablet: spinning sticker badge that expands into a card */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.95 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute bottom-[92px] right-0 w-[300px] rounded-3xl border border-gold-500/20 bg-pine-950 p-6 text-cream shadow-2xl shadow-pine-950/40"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Collapse"
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-cream/50 transition-colors hover:bg-white/10 hover:text-cream"
              >
                <CloseIcon className="h-4 w-4" />
              </button>

              <p className="pr-6 font-display text-2xl font-semibold leading-tight text-paper">
                Unlock your 
                <br />
                <span className="text-gold-400">borrowing power.</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">
                A free, no obligation assessment  know exactly what you can borrow before you decide.
              </p>

              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-pine-950 transition-colors hover:bg-gold-400"
              >
                Get My Free Assessment
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <a
                href={PHONE_HREF}
                className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-cream/60 transition-colors hover:text-gold-400"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
                or call {PHONE_NUMBER}
              </a>
              <button
                type="button"
                onClick={dismiss}
                className="mt-3 w-full text-center text-[11px] text-cream/30 transition-colors hover:text-cream/55"
              >
                Don&apos;t show this again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Collapse free assessment offer" : "Open free assessment offer"}
          className="group relative flex h-20 w-20 items-center justify-center rounded-full transition-transform hover:scale-105"
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full animate-[spin_12s_linear_infinite] drop-shadow-[0_8px_20px_rgba(3,15,10,0.35)] motion-reduce:animate-none"
            aria-hidden="true"
          >
            <defs>
              <path id="fl-cta-ring" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
            </defs>
            <circle cx="50" cy="50" r="49" className="fill-pine-950 stroke-gold-500/50" strokeWidth="1" />
            <text
              className="fill-gold-400"
              style={{ fontSize: "7.4px", letterSpacing: "0.04em", fontWeight: 600 }}
            >
              <textPath href="#fl-cta-ring" startOffset="0%">
                {RING_TEXT}
              </textPath>
            </text>
          </svg>
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-pine-950 transition-transform group-hover:scale-110">
            {open ? <CloseIcon className="h-4 w-4" /> : <ArrowIcon className="h-4 w-4 -rotate-45" />}
          </span>
        </button>
      </div>

      {/* Mobile: sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-500/20 bg-pine-950 px-3 py-3 shadow-[0_-8px_24px_rgba(3,15,10,0.35)] sm:hidden">
        <div className="flex items-center gap-2.5">
          <a
            href={PHONE_HREF}
            aria-label={`Call Fire Loans on ${PHONE_NUMBER}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-cream"
          >
            <PhoneIcon className="h-[18px] w-[18px]" />
          </a>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[9.5px] font-semibold uppercase tracking-wide text-gold-400">
              Your biggest move
            </p>
            <p className="text-[11px] text-cream/70">deserves clarity.</p>
          </div>
          <Link
            href="/#contact"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-gold-500 px-4 py-2.5 text-xs font-semibold text-pine-950"
          >
            Free Assessment
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-cream/40"
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </>
  );
}
