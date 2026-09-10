export type LoanIcon =
  | "home"
  | "trendingUp"
  | "shieldCheck"
  | "scale"
  | "briefcase"
  | "car"
  | "handshake"
  | "crane"
  | "building"
  | "wrench";

export type LoanTypeEntry = {
  slug: string;
  title: string;
  /** Plain, literal category name — used in SEO metadata and anywhere the branded
   * name alone would be ambiguous (search results, page titles). */
  formalName: string;
  description: string;
  icon: LoanIcon;
};

export const loanTypes: LoanTypeEntry[] = [
  {
    slug: "owner-occupied",
    title: "Home & Lifestyle",
    formalName: "Owner Occupied Home Loan",
    description: "Finance your place to call home.",
    icon: "home",
  },
  {
    slug: "investment-loan",
    title: "Property Growth",
    formalName: "Investment Loan",
    description: "Build and grow your property portfolio.",
    icon: "trendingUp",
  },
  {
    slug: "smsf-home-loan",
    title: "Super & Property",
    formalName: "SMSF Home Loan",
    description: "Invest in property through your SMSF.",
    icon: "shieldCheck",
  },
  {
    slug: "trust-loan",
    title: "Trust & Entity",
    formalName: "Trust Loan",
    description: "Lending for trusts and complex structures.",
    icon: "scale",
  },
  {
    slug: "company-loan",
    title: "Company Lending",
    formalName: "Company Loan",
    description: "Property and asset finance in your company's name.",
    icon: "briefcase",
  },
  {
    slug: "car-loan",
    title: "Drive Forward",
    formalName: "Car Loan",
    description: "Finance your next vehicle.",
    icon: "car",
  },
  {
    slug: "business-loan",
    title: "Business Capital",
    formalName: "Business Loan",
    description: "Funding for your next business move.",
    icon: "handshake",
  },
  {
    slug: "construction-loan",
    title: "Build & Create",
    formalName: "Construction Loan",
    description: "Finance your next property project.",
    icon: "crane",
  },
  {
    slug: "commercial-loan",
    title: "Commercial Property",
    formalName: "Commercial Loan",
    description: "Finance for commercial property and opportunities.",
    icon: "building",
  },
  {
    slug: "equipment-loan",
    title: "Business Essentials",
    formalName: "Equipment Loan",
    description: "Finance the equipment your business needs.",
    icon: "wrench",
  },
];

export function getLoanType(slug: string): LoanTypeEntry | undefined {
  return loanTypes.find((l) => l.slug === slug);
}
