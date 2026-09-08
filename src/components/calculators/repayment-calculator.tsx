"use client";

import { useMemo, useState } from "react";
import {
  PERIODS_PER_YEAR,
  type RepaymentFrequency,
  buildAmortizationSeries,
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
import { MiniAreaChart } from "./mini-area-chart";

type FeeFrequency = "monthly" | "annually" | "one-off";

export function RepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(400000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [fee, setFee] = useState(0);
  const [feeFrequency, setFeeFrequency] = useState<FeeFrequency>("monthly");
  const [frequency, setFrequency] = useState<RepaymentFrequency>("monthly");

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

    return { series, periodicRepayment: repaymentWithFee, totalPayments, totalInterestAndFees, periodsPerYear };
  }, [loanAmount, interestRate, loanTerm, fee, feeFrequency, frequency]);

  const chartPoints = result.series.map((p) => ({ x: p.year, y: p.balance }));
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
          <div>
            <p className="mb-2 text-sm text-cream/60">Loan balance over time</p>
            <MiniAreaChart
              points={chartPoints}
              color="#D8BD85"
              formatX={(x) => `Yr ${x}`}
              formatY={(y) => formatCurrency(y)}
            />
          </div>
        </div>
      }
    />
  );
}
