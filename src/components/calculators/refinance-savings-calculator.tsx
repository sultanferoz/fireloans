"use client";

import { useMemo, useState } from "react";
import { buildAmortizationSeries } from "@/lib/calculators/amortization";
import { CalculatorGrid } from "./calculator-layout";
import {
  CurrencyInput,
  FieldGroup,
  NumberInput,
  PercentInput,
  formatCurrency,
  formatCurrency2,
} from "./calculator-fields";
import { MiniAreaChart } from "./mini-area-chart";

export function RefinanceSavingsCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [loanTerm, setLoanTerm] = useState(30);

  const [currentRate, setCurrentRate] = useState(6.09);
  const [currentFee, setCurrentFee] = useState(15);

  const [newUpfrontFee, setNewUpfrontFee] = useState(300);
  const [newOngoingFee, setNewOngoingFee] = useState(0);
  const [introRate, setIntroRate] = useState(6.09);
  const [introTermMonths, setIntroTermMonths] = useState(12);
  const [newOngoingRate, setNewOngoingRate] = useState(6.09);

  const result = useMemo(() => {
    const totalMonths = loanTerm * 12;

    const current = buildAmortizationSeries({
      principal: loanAmount,
      annualRatePct: currentRate,
      totalPeriods: totalMonths,
      periodsPerYear: 12,
    });

    const hasIntro = introTermMonths > 0 && introTermMonths < totalMonths;
    const next = buildAmortizationSeries({
      principal: loanAmount,
      annualRatePct: hasIntro ? introRate : newOngoingRate,
      totalPeriods: totalMonths,
      periodsPerYear: 12,
      secondRatePct: hasIntro ? newOngoingRate : undefined,
      rateChangeAtPeriod: hasIntro ? introTermMonths : undefined,
    });

    const currentTotalCost = current.series[current.series.length - 1].cumulativePaid + currentFee * totalMonths;
    const newTotalCost =
      next.series[next.series.length - 1].cumulativePaid + newOngoingFee * totalMonths + newUpfrontFee;

    const savingsSeries = current.series.map((point, i) => {
      const nextPoint = next.series[i];
      const currentCostSoFar = point.cumulativePaid + currentFee * point.period;
      const newCostSoFar = nextPoint.cumulativePaid + newOngoingFee * nextPoint.period + newUpfrontFee;
      return { x: point.year, y: Math.max(0, currentCostSoFar - newCostSoFar) };
    });

    return {
      totalSavings: currentTotalCost - newTotalCost,
      currentInitial: current.firstPayment + currentFee,
      newInitial: (hasIntro ? next.firstPayment : next.firstPayment) + newOngoingFee,
      currentOngoing: current.firstPayment + currentFee,
      newOngoing: (hasIntro ? next.secondPayment ?? next.firstPayment : next.firstPayment) + newOngoingFee,
      savingsSeries,
    };
  }, [loanAmount, loanTerm, currentRate, currentFee, newUpfrontFee, newOngoingFee, introRate, introTermMonths, newOngoingRate]);

  const isSaving = result.totalSavings >= 0;

  return (
    <CalculatorGrid
      inputs={
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Loan details</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FieldGroup label="Remaining loan balance">
                <CurrencyInput value={loanAmount} onChange={setLoanAmount} />
              </FieldGroup>
              <FieldGroup label="Remaining loan term">
                <NumberInput value={loanTerm} onChange={setLoanTerm} suffix="years" max={40} />
              </FieldGroup>
            </div>
          </div>

          <div className="rounded-2xl border border-border p-4">
            <h3 className="font-semibold text-ink">Your current loan</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FieldGroup label="Current interest rate">
                <PercentInput value={currentRate} onChange={setCurrentRate} />
              </FieldGroup>
              <FieldGroup label="Ongoing monthly fee">
                <CurrencyInput value={currentFee} onChange={setCurrentFee} />
              </FieldGroup>
            </div>
          </div>

          <div className="rounded-2xl border border-gold-500/30 bg-gold-100/30 p-4">
            <h3 className="font-semibold text-ink">New loan offer</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FieldGroup label="Upfront fees" hint="One-off">
                <CurrencyInput value={newUpfrontFee} onChange={setNewUpfrontFee} />
              </FieldGroup>
              <FieldGroup label="Ongoing monthly fee">
                <CurrencyInput value={newOngoingFee} onChange={setNewOngoingFee} />
              </FieldGroup>
              <FieldGroup label="Intro rate" hint="0 = no honeymoon rate">
                <PercentInput value={introRate} onChange={setIntroRate} />
              </FieldGroup>
              <FieldGroup label="Intro period">
                <NumberInput value={introTermMonths} onChange={setIntroTermMonths} suffix="months" max={60} />
              </FieldGroup>
              <FieldGroup label="Ongoing rate">
                <PercentInput value={newOngoingRate} onChange={setNewOngoingRate} />
              </FieldGroup>
            </div>
          </div>
        </div>
      }
      results={
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-cream/60">
              {isSaving ? "Switching could save you" : "Switching could cost you"}
            </p>
            <p className="font-display text-4xl font-semibold text-gold-400">
              {formatCurrency(Math.abs(result.totalSavings))}
            </p>
            <p className="mt-1 text-xs text-cream/50">over the remaining {loanTerm}-year term</p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div />
            <div className="font-semibold text-cream/70">Current</div>
            <div className="font-semibold text-gold-400">New</div>
            <div className="text-left text-cream/60">Initial /mo</div>
            <div>{formatCurrency2(result.currentInitial)}</div>
            <div className="font-semibold text-gold-400">{formatCurrency2(result.newInitial)}</div>
            <div className="text-left text-cream/60">Ongoing /mo</div>
            <div>{formatCurrency2(result.currentOngoing)}</div>
            <div className="font-semibold text-gold-400">{formatCurrency2(result.newOngoing)}</div>
          </div>

          <div>
            <p className="mb-2 text-sm text-cream/60">Cumulative savings over time</p>
            <MiniAreaChart
              points={result.savingsSeries}
              color="#00B389"
              formatX={(x) => `Yr ${x}`}
              formatY={(y) => formatCurrency(y)}
            />
          </div>
        </div>
      }
    />
  );
}
