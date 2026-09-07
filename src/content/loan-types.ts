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
  description: string;
  icon: LoanIcon;
};

export const loanTypes: LoanTypeEntry[] = [
  {
    slug: "owner-occupied",
    title: "Owner Occupied",
    description: "Flexible home financing with expert guidance.",
    icon: "home",
  },
  {
    slug: "investment-loan",
    title: "Investment Loan",
    description: "Smart lending for long-term property growth.",
    icon: "trendingUp",
  },
  {
    slug: "smsf-home-loan",
    title: "SMSF Home Loan",
    description: "Investments through property finance.",
    icon: "shieldCheck",
  },
  {
    slug: "trust-loan",
    title: "Trust Loans",
    description: "Lending solutions for trust structures.",
    icon: "scale",
  },
  {
    slug: "company-loan",
    title: "Company Loans",
    description: "Business designed for sustainable growth.",
    icon: "briefcase",
  },
  {
    slug: "car-loan",
    title: "Car Loan",
    description: "Fast vehicle finance with flexible repayments.",
    icon: "car",
  },
  {
    slug: "business-loan",
    title: "Business Loan",
    description: "Flexible funding to support business.",
    icon: "handshake",
  },
  {
    slug: "construction-loan",
    title: "Construction Loan",
    description: "Stage-by-stage finance for every building project.",
    icon: "crane",
  },
  {
    slug: "commercial-loan",
    title: "Commercial Loan",
    description: "Commercial property finance with competitive solutions.",
    icon: "building",
  },
  {
    slug: "equipment-loan",
    title: "Equipment Loan",
    description: "Finance essential equipment without cash flow strain.",
    icon: "wrench",
  },
];

export function getLoanType(slug: string): LoanTypeEntry | undefined {
  return loanTypes.find((l) => l.slug === slug);
}
