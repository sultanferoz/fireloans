export type RepaymentFrequency = "weekly" | "fortnightly" | "monthly";

export const PERIODS_PER_YEAR: Record<RepaymentFrequency, number> = {
  weekly: 52,
  fortnightly: 26,
  monthly: 12,
};

/** Standard reducing-balance principal & interest payment per period. */
export function periodicPayment(principal: number, annualRatePct: number, totalPeriods: number, periodsPerYear: number): number {
  const r = annualRatePct / 100 / periodsPerYear;
  if (totalPeriods <= 0) return 0;
  if (r === 0) return principal / totalPeriods;
  const factor = Math.pow(1 + r, totalPeriods);
  return (principal * r * factor) / (factor - 1);
}

/** Remaining balance after `periodsElapsed` payments of `payment` at rate `annualRatePct`. */
export function remainingBalance(
  principal: number,
  annualRatePct: number,
  periodsPerYear: number,
  payment: number,
  periodsElapsed: number
): number {
  const r = annualRatePct / 100 / periodsPerYear;
  if (periodsElapsed <= 0) return principal;
  if (r === 0) return Math.max(0, principal - payment * periodsElapsed);
  const factor = Math.pow(1 + r, periodsElapsed);
  const balance = principal * factor - payment * ((factor - 1) / r);
  return Math.max(0, balance);
}

export type BalancePoint = { period: number; year: number; balance: number; cumulativePaid: number };

/**
 * Builds a yearly balance series for charting, supporting a rate change at
 * `rateChangeAtPeriod` (used for intro/honeymoon-rate loans) — the payment is
 * recalculated on the remaining balance over the remaining term once the
 * rate changes, matching how real lenders reamortize a loan.
 */
export function buildAmortizationSeries(params: {
  principal: number;
  annualRatePct: number;
  totalPeriods: number;
  periodsPerYear: number;
  secondRatePct?: number;
  rateChangeAtPeriod?: number;
}): { series: BalancePoint[]; firstPayment: number; secondPayment: number | null } {
  const { principal, annualRatePct, totalPeriods, periodsPerYear, secondRatePct, rateChangeAtPeriod } = params;

  const firstPayment = periodicPayment(principal, annualRatePct, totalPeriods, periodsPerYear);
  const hasRateChange =
    typeof secondRatePct === "number" && typeof rateChangeAtPeriod === "number" && rateChangeAtPeriod < totalPeriods;

  let secondPayment: number | null = null;
  let balanceAtChange = principal;
  if (hasRateChange) {
    balanceAtChange = remainingBalance(principal, annualRatePct, periodsPerYear, firstPayment, rateChangeAtPeriod!);
    secondPayment = periodicPayment(balanceAtChange, secondRatePct!, totalPeriods - rateChangeAtPeriod!, periodsPerYear);
  }

  const series: BalancePoint[] = [];
  let cumulativePaid = 0;
  const yearsTotal = Math.ceil(totalPeriods / periodsPerYear);

  for (let year = 0; year <= yearsTotal; year++) {
    const period = Math.min(year * periodsPerYear, totalPeriods);
    let balance: number;
    if (!hasRateChange || period <= rateChangeAtPeriod!) {
      balance = remainingBalance(principal, annualRatePct, periodsPerYear, firstPayment, period);
      cumulativePaid = firstPayment * period;
    } else {
      const periodsIntoSecond = period - rateChangeAtPeriod!;
      balance = remainingBalance(balanceAtChange, secondRatePct!, periodsPerYear, secondPayment!, periodsIntoSecond);
      cumulativePaid = firstPayment * rateChangeAtPeriod! + secondPayment! * periodsIntoSecond;
    }
    series.push({ period, year, balance, cumulativePaid });
  }

  return { series, firstPayment, secondPayment };
}
