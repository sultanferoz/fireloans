import Link from "next/link";

export function ComingSoon({
  eyebrow = "Coming Soon",
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <span className="inline-flex items-center rounded-full bg-gold-100 px-4 py-1.5 text-sm font-semibold text-gold-700">
        {eyebrow}
      </span>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-lg text-ink-soft">
        {description ??
          "We're still building this page. In the meantime, talk to us directly and we'll help with exactly what you're after."}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center rounded-full bg-brand-500 px-7 py-3.5 text-base font-semibold text-paper shadow-sm hover:bg-brand-600"
        >
          Contact Us
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-ink/15 px-7 py-3.5 text-base font-semibold text-ink hover:bg-ink/5"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
