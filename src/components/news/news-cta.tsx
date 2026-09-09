import Link from "next/link";

export function NewsCta() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-pine-950 p-8 text-center text-cream sm:p-14">
          <h2 className="mx-auto max-w-xl font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
            Need help understanding what the latest news means for your mortgage?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/65">
            News can change quickly. Your mortgage strategy should be based on your
            individual situation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-gold-500 px-7 py-3.5 text-base font-semibold text-pine-950 shadow-sm transition-colors hover:bg-gold-400"
            >
              Talk to Fire Loans
            </Link>
            <Link
              href="/calculators/borrowing-power"
              className="inline-flex items-center justify-center rounded-full border border-cream/25 px-7 py-3.5 text-base font-semibold text-cream transition-colors hover:bg-white/5"
            >
              Calculate Your Borrowing Power
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
