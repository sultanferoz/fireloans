"use client";

import { useMemo, useState } from "react";
import {
  AU_STATES,
  calculateStampDuty,
  type AuState,
  type PropertyType,
  type PurchaseType,
} from "@/lib/calculators/stamp-duty";
import { CalculatorGrid } from "./calculator-layout";
import { CurrencyInput, FieldGroup, PillToggle, ResultStat, formatCurrency } from "./calculator-fields";

export function StampDutyCalculator() {
  const [state, setState] = useState<AuState>("NSW");
  const [propertyValue, setPropertyValue] = useState(650000);
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState(false);
  const [propertyType, setPropertyType] = useState<PropertyType>("owner-occupied");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("established");

  const result = useMemo(
    () => calculateStampDuty({ state, propertyValue, isFirstHomeBuyer, propertyType, purchaseType }),
    [state, propertyValue, isFirstHomeBuyer, propertyType, purchaseType]
  );

  return (
    <CalculatorGrid
      inputs={
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-xl font-semibold text-ink">Enter your details</h2>

          <FieldGroup label="State / territory">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {AU_STATES.map((s) => (
                <button
                  key={s.code}
                  type="button"
                  onClick={() => setState(s.code)}
                  className={`rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                    state === s.code
                      ? "bg-pine-900 text-paper"
                      : "border border-border bg-paper text-ink-soft hover:bg-cream-muted"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup label="Property value">
            <CurrencyInput value={propertyValue} onChange={setPropertyValue} />
          </FieldGroup>

          <FieldGroup label="Are you a first home buyer?">
            <PillToggle
              value={isFirstHomeBuyer ? "yes" : "no"}
              onChange={(v) => setIsFirstHomeBuyer(v === "yes")}
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
              ]}
            />
          </FieldGroup>

          <FieldGroup label="Property type">
            <PillToggle
              value={propertyType}
              onChange={setPropertyType}
              options={[
                { value: "owner-occupied", label: "Owner Occupied" },
                { value: "investment", label: "Investment" },
              ]}
            />
          </FieldGroup>

          <FieldGroup label="Are you purchasing a...">
            <PillToggle
              value={purchaseType}
              onChange={setPurchaseType}
              options={[
                { value: "established", label: "Established" },
                { value: "new", label: "New Home" },
                { value: "vacant-land", label: "Vacant Land" },
              ]}
            />
          </FieldGroup>
        </div>
      }
      results={
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-cream/60">Total government fees</p>
            <p className="font-display text-4xl font-semibold text-gold-400">
              {formatCurrency(result.totalGovernmentFees)}
            </p>
            {result.concessionApplied && (
              <span className="mt-2 inline-flex rounded-full bg-gold-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-400">
                First home buyer concession applied
              </span>
            )}
          </div>
          <div>
            <ResultStat label="Stamp duty on property" value={formatCurrency(result.stampDuty)} />
            <ResultStat label="Mortgage registration" value={formatCurrency(result.mortgageRegistration)} />
            <ResultStat label="Transfer fee" value={formatCurrency(result.transferFee)} />
          </div>
          <div>
            <p className="mb-2 text-sm text-cream/60">Government grant</p>
            <ResultStat label="First home owner grant" value={formatCurrency(result.firstHomeOwnerGrant)} emphasis />
          </div>
          <p className="text-xs text-cream/50">
            Rates and thresholds shown are {state} general estimates and change with each state
            budget   confirm the current figure with {state} Revenue Office or your Fire Loans
            broker before relying on it.
          </p>
        </div>
      }
    />
  );
}
