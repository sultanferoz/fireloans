import { periodicPayment } from "./amortization";

// Resident tax rates for the 2026–27 year: the "Round 2" cuts legislated in
// the 2024–25 Budget took the 16% bracket to 15% from 1 July 2026 (and to
// 14% from 1 July 2027 — update again when this site is still live then).
const TAX_BRACKETS_2026_27 = [
  { upTo: 18200, base: 0, rate: 0 },
  { upTo: 45000, base: 0, rate: 0.15 },
  { upTo: 135000, base: 4020, rate: 0.3 },
  { upTo: 190000, base: 31020, rate: 0.37 },
  { upTo: Infinity, base: 51370, rate: 0.45 },
];

/** Rough resident income tax + 2% Medicare levy estimate — for illustration only. */
export function estimateAnnualNetIncome(gross: number): number {
  if (gross <= 0) return 0;
  const bracket =
    TAX_BRACKETS_2026_27.find((b, i) => gross <= b.upTo || i === TAX_BRACKETS_2026_27.length - 1) ??
    TAX_BRACKETS_2026_27[0];
  const prevCap = TAX_BRACKETS_2026_27[TAX_BRACKETS_2026_27.indexOf(bracket) - 1]?.upTo ?? 0;
  const tax = bracket.base + (gross - prevCap) * bracket.rate;
  const medicare = gross * 0.02;
  return Math.max(0, gross - tax - medicare);
}

export const SERVICEABILITY_BUFFER_PCT = 3;
export const CREDIT_CARD_ASSESSMENT_RATE = 0.038;
export const SAFETY_MARGIN = 0.9;
// Variable/"other" income (rental, bonus, overtime, commission) is rarely
// accepted dollar-for-dollar by a real lender — this is a simple, single
// shading factor standing in for that until income sources are split out.
export const OTHER_INCOME_SHADING = 0.8;

/**
 * A minimum assessed living-expense benchmark by household size — a rough
 * stand-in for the real HEM (Household Expenditure Measure) tables lenders
 * use, since we don't have access to the actual ABS/HEM dataset. Applied as
 * a floor: if the user's declared expenses are below this, the benchmark is
 * used instead, same as a real lender would.
 */
export function estimateMinimumLivingExpenses(isJoint: boolean, dependents: number): number {
  const base = isJoint ? 30000 : 24000;
  return base + dependents * 6000;
}

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
  expenseFloorApplied: boolean;
  assessedMonthlyExpenses: number;
};

export function calculateBorrowingPower(input: BorrowingPowerInput): BorrowingPowerResult {
  const netAnnual =
    estimateAnnualNetIncome(input.annualSalary1) +
    (input.isJoint ? estimateAnnualNetIncome(input.annualSalary2) : 0) +
    estimateAnnualNetIncome(input.annualOtherIncome * OTHER_INCOME_SHADING);
  const netMonthlyIncome = netAnnual / 12;

  const expenseFloor = estimateMinimumLivingExpenses(input.isJoint, input.dependents) / 12;
  const assessedMonthlyExpenses = Math.max(input.monthlyLivingExpenses, expenseFloor);
  const expenseFloorApplied = expenseFloor > input.monthlyLivingExpenses;

  const creditCardLiability = input.totalCreditCardLimits * CREDIT_CARD_ASSESSMENT_RATE;
  const monthlyOutgoings = assessedMonthlyExpenses + input.monthlyOtherDebtRepayments + creditCardLiability;

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
    expenseFloorApplied,
    assessedMonthlyExpenses,
  };
}
