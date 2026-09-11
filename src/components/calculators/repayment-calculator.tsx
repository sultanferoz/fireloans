"use client";

import { useMemo, useState } from "react";
import {
  PERIODS_PER_YEAR,
  type RepaymentFrequency,
  buildAmortizationSeries,
  buildExtraRepaymentPlan,
} from "@/lib/calculators/amortization";
import { CalculatorGrid } from "./calculator-layout";
import {
  CurrencyInput,
  FieldGroup,
  NumberInput,
  PercentInput,
  PillToggle,
  ResultStat,
  SelectInput,
  formatCurrency,
  formatCurrency2,
} from "./calculator-fields";
import { DualAreaChart } from "./dual-area-chart";

type FeeFrequency = "monthly" | "annually" | "one-off";

function formatYearsMonths({ years, months }: { years: number; months: number }): string {
  if (years <= 0 && months <= 0) return "0 months";
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "month" : "months"}`);
  return parts.join(" ");
}

export function RepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(400000);
  const [interestRate, setInterestRate] = useState(6.09);
  const [loanTerm, setLoanTerm] = useState(30);
  const [fee, setFee] = useState(0);
  const [feeFrequency, setFeeFrequency] = useState<FeeFrequency>("monthly");
  const [frequency, setFrequency] = useState<RepaymentFrequency>("monthly");
  const [extraRepayment, setExtraRepayment] = useState(0);

  const result = useMemo(() => {
    const periodsPerYear = PERIODS_PER_YEAR[frequency];
    const totalPeriods = loanTerm * periodsPerYear;
    const { series, firstPayment } = buildAmortizationSeries({
      principal: loanAmount,
      annualRatePct: interestRate,
      totalPeriods,
      periodsPerYear,
    });

    let feePerPeriod = 0;
    let oneOffFee = 0;
    if (feeFrequency === "one-off") {
      oneOffFee = fee;
    } else {
      const feePeriodsPerYear = feeFrequency === "monthly" ? 12 : 1;
      const annualFee = fee * feePeriodsPerYear;
      feePerPeriod = annualFee / periodsPerYear;
    }

    const repaymentWithFee = firstPayment + feePerPeriod;
    const totalPayments = repaymentWithFee * totalPeriods + oneOffFee;
    const totalInterestAndFees = totalPayments - loanAmount;

    const extraPlan =
      extraRepayment > 0
        ? buildExtraRepaymentPlan({
            principal: loanAmount,
            annualRatePct: interestRate,
            totalPeriods,
            periodsPerYear,
            extraPerPeriod: extraRepayment,
          })
        : null;

    return {
      series,
      periodicRepayment: repaymentWithFee,
      totalPayments,
      totalInterestAndFees,
      periodsPerYear,
      loanTerm,
      extraPlan,
    };
  }, [loanAmount, interestRate, loanTerm, fee, feeFrequency, frequency, extraRepayment]);

  const chartSeries = [
    {
      label: result.extraPlan ? "Without extra repayments" : "Loan balance",
      color: "#D8BD85",
      points: result.series.map((p) => ({ x: p.year, y: p.balance })),
    },
    ...(result.extraPlan
      ? [
          {
            label: "With extra repayments",
            color: "#0E8F68",
            points: result.extraPlan.series.map((p) => ({ x: p.year, y: p.balance })),
          },
        ]
      : []),
  ];
  const frequencyLabel = { weekly: "Weekly", fortnightly: "Fortnightly", monthly: "Monthly" }[frequency];

  return (
    <CalculatorGrid
      inputs={
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-xl font-semibold text-ink">Enter your details</h2>
          <FieldGroup label="Loan amount">
            <CurrencyInput value={loanAmount} onChange={setLoanAmount} />
          </FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <FieldGroup label="Interest rate">
              <PercentInput value={interestRate} onChange={setInterestRate} />
            </FieldGroup>
            <FieldGroup label="Loan term">
              <NumberInput value={loanTerm} onChange={setLoanTerm} suffix="years" max={40} />
            </FieldGroup>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FieldGroup label="Loan fee">
              <CurrencyInput value={fee} onChange={setFee} />
            </FieldGroup>
            <FieldGroup label="Fee frequency">
              <SelectInput
                value={feeFrequency}
                onChange={setFeeFrequency}
                options={[
                  { value: "monthly", label: "Monthly" },
                  { value: "annually", label: "Annually" },
                  { value: "one-off", label: "One-off" },
                ]}
              />
            </FieldGroup>
          </div>
          <FieldGroup label="Repayment frequency">
            <PillToggle
              value={frequency}
              onChange={setFrequency}
              options={[
                { value: "weekly", label: "Weekly" },
                { value: "fortnightly", label: "Fortnightly" },
                { value: "monthly", label: "Monthly" },
              ]}
            />
          </FieldGroup>
          <FieldGroup
            label="Extra repayment"
            hint={`Optional, on top of your ${frequencyLabel.toLowerCase()} repayment`}
          >
            <CurrencyInput value={extraRepayment} onChange={setExtraRepayment} />
          </FieldGroup>
        </div>
      }
      results={
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-cream/60">{frequencyLabel} repayment</p>
            <p className="font-display text-4xl font-semibold text-gold-400">
              {formatCurrency2(result.periodicRepayment)}
            </p>
          </div>
          <div>
            <ResultStat label="Total interest &amp; fees" value={formatCurrency(result.totalInterestAndFees)} />
            <ResultStat label="Total payments" value={formatCurrency(result.totalPayments)} />
          </div>

          {result.extraPlan && (
            <div className="rounded-2xl border border-gold-500/25 bg-gold-500/10 p-4">
              <p className="text-sm font-semibold text-gold-400">With extra repayments, you could:</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-cream/55">Pay off your loan in</p>
                  <p className="font-display text-lg font-semibold text-paper">
                    {formatYearsMonths(result.extraPlan.payoffTime)}
                  </p>
                  <p className="text-xs text-gold-400">{formatYearsMonths(result.extraPlan.timeSaved)} sooner</p>
                </div>
                <div>
                  <p className="text-xs text-cream/55">Interest saved</p>
                  <p className="font-display text-lg font-semibold text-paper">
                    {formatCurrency(result.extraPlan.interestSaved)}
                  </p>
                  <p className="text-xs text-cream/50">
                    new repayment {formatCurrency2(result.extraPlan.paymentWithExtra)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 text-sm text-cream/60">Loan balance over time</p>
            <DualAreaChart series={chartSeries} formatX={(x) => `Yr ${x}`} formatY={(y) => formatCurrency(y)} />
          </div>
        </div>
      }
    />
  );
}
