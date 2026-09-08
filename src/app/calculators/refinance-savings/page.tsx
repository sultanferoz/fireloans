import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { RefinanceSavingsCalculator } from "@/components/calculators/refinance-savings-calculator";

export const metadata: Metadata = {
  title: "Refinance Savings Calculator",
  description: "See what switching to a new loan could actually save you, fees and honeymoon rates included.",
};

export default function RefinanceSavingsPage() {
  return (
    <CalculatorLayout
      title="Refinance Savings Calculator"
      description="Compare your current loan against a new offer — including intro rates, fees and the real ongoing rate."
    >
      <RefinanceSavingsCalculator />
    </CalculatorLayout>
  );
}
