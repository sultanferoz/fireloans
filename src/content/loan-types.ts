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
    title: "Owner Occupied",
    formalName: "Owner Occupied Home Loan",
    description: "Home loans to help you buy or refinance your home.",
    icon: "home",
  },
  {
    slug: "investment-loan",
    title: "Investment",
    formalName: "Investment Loan",
    description: "Smart lending solutions to help you build and grow your property portfolio.",
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
    title: "Trust",
    formalName: "Trust Loan",
    description: "Property lending for trusts and complex ownership structures.",
    icon: "scale",
  },
  {
    slug: "company-loan",
    title: "Company",
    formalName: "Company Loan",
    description: "Flexible property and asset finance solutions for companies and businesses.",
    icon: "briefcase",
  },
  {
    slug: "car-loan",
    title: "Car Loan",
    formalName: "Car Loan",
    description: "Competitive car finance for new and used vehicles.",
    icon: "car",
  },
  {
    slug: "construction-loan",
    title: "Construction Loan",
    formalName: "Construction Loan",
    description: "Flexible finance to build your new home or investment property.",
    icon: "crane",
  },
  {
    slug: "commercial-loan",
    title: "Commercial Loan",
    formalName: "Commercial Loan",
    description: "Tailored finance for commercial property, investment and business needs.",
    icon: "building",
  },
  {
    slug: "equipment-loan",
    title: "Equipment Finance",
    formalName: "Equipment Finance",
    description: "Finance for the equipment and assets your business needs to grow.",
    icon: "wrench",
  },
];

export function getLoanType(slug: string): LoanTypeEntry | undefined {
  return loanTypes.find((l) => l.slug === slug);
}
