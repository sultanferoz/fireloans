export type Persona = {
  slug: string;
  label: string;
  headline: string;
  description: string;
  icon: "home" | "refresh" | "chart" | "briefcase" | "building" | "crane";
};

export const personas: Persona[] = [
  {
    slug: "first-home-buyer",
    label: "First Home Buyer",
    headline: "Owning sooner than you think",
    description:
      "Grants, LMI, deposit options and a lender panel matched to your real borrowing position   not just the first bank you ask.",
    icon: "home",
  },
  {
    slug: "refinancing",
    label: "Refinancing",
    headline: "Switch and keep more of your income",
    description:
      "See what a better rate or structure actually saves you, without the guesswork or the hard-sell.",
    icon: "refresh",
  },
  {
    slug: "investing",
    label: "Investing",
    headline: "Structure your next property, not just fund it",
    description:
      "From your first investment property to portfolio structuring and SMSF lending, built around your long-term goals.",
    icon: "chart",
  },
  {
    slug: "self-employed",
    label: "Self-Employed",
    headline: "Lending that understands variable income",
    description:
      "Low-doc and alt-doc pathways for business owners, contractors and sole traders whose income doesn't fit a payslip template.",
    icon: "briefcase",
  },
  {
    slug: "business-and-commercial",
    label: "Business & Commercial",
    headline: "Finance that keeps pace with growth",
    description:
      "Business loans, equipment finance and commercial property lending structured around cash flow, not just collateral.",
    icon: "building",
  },
  {
    slug: "construction",
    label: "Construction",
    headline: "From empty block to finished home",
    description:
      "Progressive drawdown finance planned around your build schedule, so funding keeps up with construction.",
    icon: "crane",
  },
];
