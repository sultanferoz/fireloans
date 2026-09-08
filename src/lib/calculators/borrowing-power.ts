import { periodicPayment } from "./amortization";

const TAX_BRACKETS_2024_25 = [
  { upTo: 18200, base: 0, rate: 0 },
  { upTo: 45000, base: 0, rate: 0.16 },
  { upTo: 135000, base: 4288, rate: 0.3 },
  { upTo: 190000, base: 31288, rate: 0.37 },
  { upTo: Infinity, base: 51638, rate: 0.45 },
];

/** Rough resident income tax + 2% Medicare levy estimate — for illustration only. */
export function estimateAnnualNetIncome(gross: number): number {
  if (gross <= 0) return 0;
  const bracket =
    TAX_BRACKETS_2024_25.find((b, i) => gross <= b.upTo || i === TAX_BRACKETS_2024_25.length - 1) ??
    TAX_BRACKETS_2024_25[0];
  const prevCap = TAX_BRACKETS_2024_25[TAX_BRACKETS_2024_25.indexOf(bracket) - 1]?.upTo ?? 0;
  const tax = bracket.base + (gross - prevCap) * bracket.rate;
  const medicare = gross * 0.02;
  return Math.max(0, gross - tax - medicare);
}

export const SERVICEABILITY_BUFFER_PCT = 3;
export const CREDIT_CARD_ASSESSMENT_RATE = 0.038;
export const SAFETY_MARGIN = 0.9;

export type BorrowingPowerInput = {
  isJoint: boolean;
  dependents: number;
  annualSalary1: number;
  annualSalary2: number;
  annualOtherIncome: number;
  monthlyLivingExpenses: number;
  monthlyOtherDebtRepayments: number;
  totalCreditCardLimits: number;
  interestRatePct: number;
  loanTermYears: number;
};

export type BorrowingPowerResult = {
  maxLoanAmount: number;
  monthlyRepayment: number;
  fortnightlyRepayment: number;
  weeklyRepayment: number;
  netMonthlyIncome: number;
  monthlyOutgoings: number;
  monthlySurplus: number;
};

export function calculateBorrowingPower(input: BorrowingPowerInput): BorrowingPowerResult {
  const netAnnual =
    estimateAnnualNetIncome(input.annualSalary1) +
    (input.isJoint ? estimateAnnualNetIncome(input.annualSalary2) : 0) +
    estimateAnnualNetIncome(input.annualOtherIncome);
  const netMonthlyIncome = netAnnual / 12;

  const creditCardLiability = input.totalCreditCardLimits * CREDIT_CARD_ASSESSMENT_RATE;
  const monthlyOutgoings = input.monthlyLivingExpenses + input.monthlyOtherDebtRepayments + creditCardLiability;

  const monthlySurplus = Math.max(0, netMonthlyIncome - monthlyOutgoings);
  const assessableCapacity = monthlySurplus * SAFETY_MARGIN;

  const assessedRate = input.interestRatePct + SERVICEABILITY_BUFFER_PCT;
  const n = input.loanTermYears * 12;
  const r = assessedRate / 100 / 12;

  const maxLoanAmount =
    r === 0 ? assessableCapacity * n : (assessableCapacity * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));

  const roundedLoan = Math.floor(maxLoanAmount / 1000) * 1000;
  const monthlyRepayment = periodicPayment(roundedLoan, input.interestRatePct, n, 12);

  return {
    maxLoanAmount: roundedLoan,
    monthlyRepayment,
    fortnightlyRepayment: (monthlyRepayment * 12) / 26,
    weeklyRepayment: (monthlyRepayment * 12) / 52,
    netMonthlyIncome,
    monthlyOutgoings,
    monthlySurplus,
  };
}
