import Image from "next/image";
import Link from "next/link";
import { loanTypes } from "@/content/loan-types";

const columns = [
  {
    heading: "Services",
    links: loanTypes.slice(0, 6).map((loan) => ({ href: `/loans/${loan.slug}`, label: loan.title })),
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Fire Loans" },
      { href: "/client-stories", label: "Client Stories" },
      { href: "/calculators", label: "Calculators" },
      { href: "/#contact", label: "Contact" },
    ],
  },
];

// Self-authored dot-grid texture (data URI)   deliberately not a stock photo,
// keeps the dark footer premium without relying on an external image asset.
const FOOTER_PATTERN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23D8BD85' fill-opacity='0.18'/%3E%3C/svg%3E";

export function SiteFooter() {
  return (
    <footer
      className="relative overflow-hidden border-t border-border bg-pine-900 text-cream"
      style={{ backgroundImage: `url("${FOOTER_PATTERN}")` }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pine-900/40 via-pine-900/85 to-pine-900"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <span className="inline-flex rounded-xl bg-paper px-4 py-3 shadow-md">
              <Image src="/images/logo.png" alt="Fire Loans" width={160} height={80} className="h-10 w-auto" />
            </span>
            <p className="mt-4 max-w-sm text-sm text-cream/70">
              Helping Australians achieve financial independence through the right loan
              structure   not just the next application.
            </p>
            <div className="mt-5 space-y-1.5 text-sm text-cream/80">
              <a href="tel:0478933786" className="flex items-center gap-2 hover:text-paper">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 5c0 8.5 6.5 15 15 15l3-4-6-3-2 2c-2-1-4-3-5-5l2-2-3-6-4 3Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                0478 933 786
              </a>
              <a href="mailto:broker@fireloans.com.au" className="flex items-center gap-2 hover:text-paper">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 6h16v12H4V6Zm0 0 8 7 8-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                broker@fireloans.com.au
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-cream/50">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-cream/80 hover:text-gold-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-cream/5 p-4 text-xs leading-relaxed text-cream/60">
          Fire Financial Services Pty Ltd (ABN 35 689 635 667) is a credit representative
          (572433) authorised under Australian Credit Licence 384704. Information on this site
          is general in nature and does not take into account your personal objectives,
          financial situation or needs. All lending is subject to lender approval, terms and
          conditions.
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-cream/10 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Fire Financial Services Pty Ltd. All rights reserved.</p>
          <div className="flex shrink-0 gap-5">
            <Link href="/privacy" className="hover:text-cream">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-cream">
              Terms
            </Link>
            <Link href="/credit-guide" className="hover:text-cream">
              Credit Guide
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
