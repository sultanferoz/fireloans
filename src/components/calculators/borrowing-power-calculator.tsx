"use client";

import { useMemo, useState } from "react";
import {
  calculateBorrowingPower,
  emptyDebtAccount,
  type BorrowingPowerInput,
  type ExistingDebtAccount,
  type RateType,
  type RepaymentBasis,
} from "@/lib/calculators/borrowing-power";
import { CalculatorGrid } from "./calculator-layout";
import {
  CurrencyFrequencyInput,
  CurrencyInput,
  FieldGroup,
  NumberInput,
  PercentInput,
  PillToggle,
  ResultStat,
  formatCurrency,
  formatCurrency2,
} from "./calculator-fields";

const DEFAULT_INPUT: BorrowingPowerInput = {
  isJoint: false,
  dependents: 0,

  salary1: 100000,
  salary1Frequency: "annually",
  overtimeBonus1: 0,
  overtimeBonus1Frequency: "annually",
  salary2: 0,
  salary2Frequency: "annually",
  overtimeBonus2: 0,
  overtimeBonus2Frequency: "annually",
  otherIncome: 0,
  otherIncomeFrequency: "annually",
  nonTaxableIncome: 0,
  nonTaxableIncomeFrequency: "annually",

  generalLivingExpenses: 2000,
  generalLivingExpensesFrequency: "monthly",
  additionalLivingExpenses: 0,
  additionalLivingExpensesFrequency: "monthly",

  homeLoan: emptyDebtAccount(),
  personalLoan: emptyDebtAccount(),
  hirePurchase: emptyDebtAccount(),
  leaseCarLoan: emptyDebtAccount(),
  otherDebts: emptyDebtAccount(),
  marginLoan: emptyDebtAccount(),

  hecsRepayments: 0,
  hecsRepaymentsFrequency: "monthly",
  otherCommitments: 0,
  otherCommitmentsFrequency: "monthly",
  totalCreditCardLimits: 0,
  bnplLimit: 0,
  bnplCurrentMonthlyRepayment: 0,

  interestRatePct: 6.09,
  rateType: "variable",
  fixedTermYears: 3,
  loanTermYears: 30,
  repaymentBasis: "principal_and_interest",
  interestOnlyYears: 3,
};

function DebtAccountFields({
  label,
  hint,
  account,
  onChange,
}: {
  label: string;
  hint?: string;
  account: ExistingDebtAccount;
  onChange: (next: ExistingDebtAccount) => void;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink">{label}</span>
        {hint && <span className="text-xs text-ink-soft">{hint}</span>}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs text-ink-soft">Limit</label>
          <CurrencyInput value={account.limit} onChange={(v) => onChange({ ...account, limit: v })} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-ink-soft">Rate</label>
          <PercentInput value={account.ratePct} onChange={(v) => onChange({ ...account, ratePct: v })} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-ink-soft">Term left</label>
          <NumberInput value={account.termYears} onChange={(v) => onChange({ ...account, termYears: v })} suffix="yrs" max={40} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-ink-soft">Repayment</label>
          <CurrencyInput
            value={account.currentMonthlyRepayment}
            onChange={(v) => onChange({ ...account, currentMonthlyRepayment: v })}
          />
        </div>
      </div>
    </div>
  );
}

export function BorrowingPowerCalculator() {
  const [input, setInput] = useState<BorrowingPowerInput>(DEFAULT_INPUT);

  function set<K extends keyof BorrowingPowerInput>(key: K, value: BorrowingPowerInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const result = useMemo(() => calculateBorrowingPower(input), [input]);

  return (
    <CalculatorGrid
      inputs={
        <div className="flex flex-col gap-7">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Household</h2>
            <div className="mt-4 flex flex-col gap-5">
              <FieldGroup label="Joint application?">
                <PillToggle
                  value={input.isJoint ? "yes" : "no"}
                  onChange={(v) => set("isJoint", v === "yes")}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </FieldGroup>
              <FieldGroup label="Dependent children">
                <PillToggle
                  value={String(Math.min(input.dependents, 3)) as "0" | "1" | "2" | "3"}
                  onChange={(v) => set("dependents", Number(v))}
                  options={[
                    { value: "0", label: "0" },
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3+" },
                  ]}
                />
              </FieldGroup>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Income</h2>
            <p className="mt-1 text-xs text-ink-soft">Gross, before tax. Pick whichever frequency matches your payslip.</p>
            <div className="mt-4 flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldGroup label={input.isJoint ? "Your salary" : "Salary"}>
                  <CurrencyFrequencyInput
                    value={input.salary1}
                    onChange={(v) => set("salary1", v)}
                    frequency={input.salary1Frequency}
                    onFrequencyChange={(f) => set("salary1Frequency", f)}
                  />
                </FieldGroup>
                <FieldGroup label="Overtime / bonus / commission" hint="Assessed at 80%">
                  <CurrencyFrequencyInput
                    value={input.overtimeBonus1}
                    onChange={(v) => set("overtimeBonus1", v)}
                    frequency={input.overtimeBonus1Frequency}
                    onFrequencyChange={(f) => set("overtimeBonus1Frequency", f)}
                  />
                </FieldGroup>
              </div>

              {input.isJoint && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FieldGroup label="Partner's salary">
                    <CurrencyFrequencyInput
                      value={input.salary2}
                      onChange={(v) => set("salary2", v)}
                      frequency={input.salary2Frequency}
                      onFrequencyChange={(f) => set("salary2Frequency", f)}
                    />
                  </FieldGroup>
                  <FieldGroup label="Partner's overtime / bonus" hint="Assessed at 80%">
                    <CurrencyFrequencyInput
                      value={input.overtimeBonus2}
                      onChange={(v) => set("overtimeBonus2", v)}
                      frequency={input.overtimeBonus2Frequency}
                      onFrequencyChange={(f) => set("overtimeBonus2Frequency", f)}
                    />
                  </FieldGroup>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldGroup label="Other income" hint="Rental etc. — assessed at 80%">
                  <CurrencyFrequencyInput
                    value={input.otherIncome}
                    onChange={(v) => set("otherIncome", v)}
                    frequency={input.otherIncomeFrequency}
                    onFrequencyChange={(f) => set("otherIncomeFrequency", f)}
                  />
                </FieldGroup>
                <FieldGroup label="Non-taxable income" hint="Family Tax Benefit, child support">
                  <CurrencyFrequencyInput
                    value={input.nonTaxableIncome}
                    onChange={(v) => set("nonTaxableIncome", v)}
                    frequency={input.nonTaxableIncomeFrequency}
                    onFrequencyChange={(f) => set("nonTaxableIncomeFrequency", f)}
                  />
                </FieldGroup>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Living expenses</h2>
            <div className="mt-4 flex flex-col gap-5">
              <FieldGroup
                label="General living expenses"
                hint={result.expenseFloorApplied ? "Raised to household minimum" : "Groceries, transport, insurance etc."}
              >
                <CurrencyFrequencyInput
                  value={input.generalLivingExpenses}
                  onChange={(v) => set("generalLivingExpenses", v)}
                  frequency={input.generalLivingExpensesFrequency}
                  onFrequencyChange={(f) => set("generalLivingExpensesFrequency", f)}
                />
              </FieldGroup>
              {result.expenseFloorApplied && (
                <p className="-mt-3 text-xs text-ink-soft">
                  We&apos;ve assessed general living expenses at the household expenditure benchmark for
                  your income and household size, since it&apos;s higher than what you entered.
                </p>
              )}
              <FieldGroup label="Additional living expenses" hint="Private school, secondary residence, extra insurance">
                <CurrencyFrequencyInput
                  value={input.additionalLivingExpenses}
                  onChange={(v) => set("additionalLivingExpenses", v)}
                  frequency={input.additionalLivingExpensesFrequency}
                  onFrequencyChange={(f) => set("additionalLivingExpensesFrequency", f)}
                />
              </FieldGroup>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Existing debts</h2>
            <p className="mt-1 text-xs text-ink-soft">
              Leave a category blank if it doesn&apos;t apply. Each is assessed at the greater of your
              actual repayment or a recalculated benchmark at the buffered rate — same as a real lender.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <DebtAccountFields
                label="Existing home loan"
                account={input.homeLoan}
                onChange={(v) => set("homeLoan", v)}
              />
              <DebtAccountFields
                label="Personal loan"
                account={input.personalLoan}
                onChange={(v) => set("personalLoan", v)}
              />
              <DebtAccountFields
                label="Hire purchase"
                account={input.hirePurchase}
                onChange={(v) => set("hirePurchase", v)}
              />
              <DebtAccountFields
                label="Lease / car loan"
                account={input.leaseCarLoan}
                onChange={(v) => set("leaseCarLoan", v)}
              />
              <DebtAccountFields
                label="Other debts"
                account={input.otherDebts}
                onChange={(v) => set("otherDebts", v)}
              />
              <DebtAccountFields
                label="Margin / term loan"
                account={input.marginLoan}
                onChange={(v) => set("marginLoan", v)}
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Other commitments</h2>
            <div className="mt-4 flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldGroup label="HECS / HELP repayment">
                  <CurrencyFrequencyInput
                    value={input.hecsRepayments}
                    onChange={(v) => set("hecsRepayments", v)}
                    frequency={input.hecsRepaymentsFrequency}
                    onFrequencyChange={(f) => set("hecsRepaymentsFrequency", f)}
                  />
                </FieldGroup>
                <FieldGroup label="Rent, board, child maintenance">
                  <CurrencyFrequencyInput
                    value={input.otherCommitments}
                    onChange={(v) => set("otherCommitments", v)}
                    frequency={input.otherCommitmentsFrequency}
                    onFrequencyChange={(f) => set("otherCommitmentsFrequency", f)}
                  />
                </FieldGroup>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldGroup label="Total credit card limits" hint="Assessed at 3.8%/month">
                  <CurrencyInput value={input.totalCreditCardLimits} onChange={(v) => set("totalCreditCardLimits", v)} />
                </FieldGroup>
                <FieldGroup label="Buy Now Pay Later limit">
                  <CurrencyInput value={input.bnplLimit} onChange={(v) => set("bnplLimit", v)} />
                </FieldGroup>
              </div>
              {input.bnplLimit > 0 && (
                <FieldGroup label="Buy Now Pay Later — current monthly repayment" hint="Optional">
                  <CurrencyInput
                    value={input.bnplCurrentMonthlyRepayment}
                    onChange={(v) => set("bnplCurrentMonthlyRepayment", v)}
                  />
                </FieldGroup>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">The loan you&apos;re assessing</h2>
            <div className="mt-4 flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldGroup label="Interest rate">
                  <PercentInput value={input.interestRatePct} onChange={(v) => set("interestRatePct", v)} />
                </FieldGroup>
                <FieldGroup label="Loan term">
                  <NumberInput value={input.loanTermYears} onChange={(v) => set("loanTermYears", v)} suffix="years" max={40} />
                </FieldGroup>
              </div>
              <FieldGroup label="Rate type" hint="Fixed 4-5yr gets a smaller buffer">
                <PillToggle<RateType>
                  value={input.rateType}
                  onChange={(v) => set("rateType", v)}
                  options={[
                    { value: "variable", label: "Variable" },
                    { value: "fixed", label: "Fixed" },
                  ]}
                />
              </FieldGroup>
              {input.rateType === "fixed" && (
                <FieldGroup label="Fixed term">
                  <PillToggle
                    value={input.fixedTermYears >= 4 ? "4-5" : "1-3"}
                    onChange={(v) => set("fixedTermYears", v === "4-5" ? 4 : 2)}
                    options={[
                      { value: "1-3", label: "1–3 years" },
                      { value: "4-5", label: "4–5 years" },
                    ]}
                  />
                </FieldGroup>
              )}
              <FieldGroup label="Repayments" hint="Interest-only is assessed more conservatively">
                <PillToggle<RepaymentBasis>
                  value={input.repaymentBasis}
                  onChange={(v) => set("repaymentBasis", v)}
                  options={[
                    { value: "principal_and_interest", label: "Principal & Interest" },
                    { value: "interest_only", label: "Interest Only" },
                  ]}
                />
              </FieldGroup>
              {input.repaymentBasis === "interest_only" && (
                <FieldGroup label="Interest-only period">
                  <PillToggle
                    value={String(input.interestOnlyYears) as "1" | "2" | "3" | "4" | "5"}
                    onChange={(v) => set("interestOnlyYears", Number(v))}
                    options={[
                      { value: "1", label: "1 yr" },
                      { value: "2", label: "2 yrs" },
                      { value: "3", label: "3 yrs" },
                      { value: "4", label: "4 yrs" },
                      { value: "5", label: "5 yrs" },
                    ]}
                  />
                </FieldGroup>
              )}
            </div>
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
            <p className="mt-2 text-sm text-cream/70">{result.serviceabilityMessage}</p>
          </div>
          <div>
            <ResultStat
              label={input.repaymentBasis === "interest_only" ? "Monthly repayment (interest-only)" : "Monthly repayment"}
              value={formatCurrency2(result.monthlyRepayment)}
            />
            <ResultStat label="Fortnightly repayment" value={formatCurrency2(result.fortnightlyRepayment)} />
            <ResultStat label="Weekly repayment" value={formatCurrency2(result.weeklyRepayment)} />
            {result.monthlyRepaymentAfterIO !== null && (
              <p className="pt-2 text-xs text-cream/60">
                Rises to {formatCurrency2(result.monthlyRepaymentAfterIO)}/month once the interest-only
                period ends and principal repayments begin.
              </p>
            )}
          </div>
          <div>
            <p className="mb-2 text-sm text-cream/60">How this was assessed</p>
            <ResultStat label="Assessed rate (incl. buffer)" value={`${result.assessedRatePct.toFixed(2)}%`} />
            <ResultStat label="Estimated net monthly income" value={formatCurrency(result.netMonthlyIncome)} />
            <ResultStat label="Monthly expenses & liabilities" value={formatCurrency(result.monthlyOutgoings)} />
            <ResultStat label="Monthly surplus assessed" value={formatCurrency(result.monthlySurplus)} emphasis />
            {result.nsr !== null && (
              <ResultStat label="Net serviceability ratio (NSR)" value={`${result.nsr.toFixed(2)}x`} />
            )}
            {result.loanToIncome !== null && (
              <ResultStat label="Loan to income (LTI)" value={`${result.loanToIncome.toFixed(2)}x`} />
            )}
            {result.debtToIncome !== null && (
              <ResultStat label="Debt to income (DTI)" value={`${result.debtToIncome.toFixed(2)}x`} />
            )}
          </div>
          <p className="text-xs text-cream/50">
            This mirrors the real serviceability methodology published in a major Australian lender&apos;s
            broker calculator — real tax brackets, a genuine household expenditure benchmark, a rate
            buffer with a 5.3% floor, existing debts assessed at the greater of actual or recalculated
            repayment, and a $500/month minimum surplus before a loan is treated as an easy pass. It is
            still a general estimate, not a credit decision — actual outcomes vary by lender and your
            complete financial position.
          </p>
        </div>
      }
    />
  );
}
