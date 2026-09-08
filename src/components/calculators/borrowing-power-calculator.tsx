"use client";

import { useMemo, useState } from "react";
import { calculateBorrowingPower } from "@/lib/calculators/borrowing-power";
import { CalculatorGrid } from "./calculator-layout";
import {
  CurrencyInput,
  FieldGroup,
  NumberInput,
  PercentInput,
  PillToggle,
  ResultStat,
  formatCurrency,
  formatCurrency2,
} from "./calculator-fields";

export function BorrowingPowerCalculator() {
  const [isJoint, setIsJoint] = useState(false);
  const [dependents, setDependents] = useState(0);
  const [salary1, setSalary1] = useState(96000);
  const [salary2, setSalary2] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [livingExpenses, setLivingExpenses] = useState(30000);
  const [otherDebt, setOtherDebt] = useState(300);
  const [creditCardLimits, setCreditCardLimits] = useState(5000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const result = useMemo(
    () =>
      calculateBorrowingPower({
        isJoint,
        dependents,
        annualSalary1: salary1,
        annualSalary2: salary2,
        annualOtherIncome: otherIncome,
        monthlyLivingExpenses: livingExpenses / 12,
        monthlyOtherDebtRepayments: otherDebt,
        totalCreditCardLimits: creditCardLimits,
        interestRatePct: interestRate,
        loanTermYears: loanTerm,
      }),
    [isJoint, dependents, salary1, salary2, otherIncome, livingExpenses, otherDebt, creditCardLimits, interestRate, loanTerm]
  );

  return (
    <CalculatorGrid
      inputs={
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-xl font-semibold text-ink">Enter your income &amp; expenses</h2>

          <FieldGroup label="Joint application?">
            <PillToggle
              value={isJoint ? "yes" : "no"}
              onChange={(v) => setIsJoint(v === "yes")}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </FieldGroup>

          <FieldGroup label="Dependent children">
            <PillToggle
              value={String(dependents) as "0" | "1" | "2" | "3"}
              onChange={(v) => setDependents(Number(v))}
              options={[
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3+" },
              ]}
            />
          </FieldGroup>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldGroup label={isJoint ? "Your annual income" : "Annual income"} hint="Gross / before tax">
              <CurrencyInput value={salary1} onChange={setSalary1} />
            </FieldGroup>
            {isJoint && (
              <FieldGroup label="Partner's annual income" hint="Gross / before tax">
                <CurrencyInput value={salary2} onChange={setSalary2} />
              </FieldGroup>
            )}
          </div>

          <FieldGroup label="Other annual income" hint="Rental, bonus, etc. — assessed at 80%">
            <CurrencyInput value={otherIncome} onChange={setOtherIncome} />
          </FieldGroup>

          <FieldGroup
            label="Annual living expenses"
            hint={result.expenseFloorApplied ? "Raised to household minimum below" : "Editable estimate"}
          >
            <CurrencyInput value={livingExpenses} onChange={setLivingExpenses} />
          </FieldGroup>
          {result.expenseFloorApplied && (
            <p className="-mt-3 text-xs text-ink-soft">
              We&apos;ve assessed at {formatCurrency(result.assessedMonthlyExpenses * 12)}/year — a minimum
              benchmark for your household size, since it&apos;s higher than what you entered.
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldGroup label="Other loan repayments" hint="Per month">
              <CurrencyInput value={otherDebt} onChange={setOtherDebt} />
            </FieldGroup>
            <FieldGroup label="Total credit card limits">
              <CurrencyInput value={creditCardLimits} onChange={setCreditCardLimits} />
            </FieldGroup>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldGroup label="Interest rate">
              <PercentInput value={interestRate} onChange={setInterestRate} />
            </FieldGroup>
            <FieldGroup label="Loan term">
              <NumberInput value={loanTerm} onChange={setLoanTerm} suffix="years" max={40} />
            </FieldGroup>
          </div>
        </div>
      }
      results={
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-cream/60">You may be able to borrow up to</p>
            <p className="font-display text-4xl font-semibold text-gold-400">
              {formatCurrency(result.maxLoanAmount)}
            </p>
          </div>
          <div>
            <ResultStat label="Monthly repayment" value={formatCurrency2(result.monthlyRepayment)} />
            <ResultStat label="Fortnightly repayment" value={formatCurrency2(result.fortnightlyRepayment)} />
            <ResultStat label="Weekly repayment" value={formatCurrency2(result.weeklyRepayment)} />
          </div>
          <div>
            <p className="mb-2 text-sm text-cream/60">How this was estimated</p>
            <ResultStat label="Estimated net monthly income" value={formatCurrency(result.netMonthlyIncome)} />
            <ResultStat label="Monthly expenses &amp; liabilities" value={formatCurrency(result.monthlyOutgoings)} />
            <ResultStat label="Monthly surplus assessed" value={formatCurrency(result.monthlySurplus)} emphasis />
          </div>
          <p className="text-xs text-cream/50">
            We assess this using your rate plus a 3% serviceability buffer (aligned with APRA
            guidance), and conservative assumptions about your available monthly surplus and
            household expenses. Actual borrowing capacity varies by lender and your complete
            financial position.
          </p>
        </div>
      }
    />
  );
}
