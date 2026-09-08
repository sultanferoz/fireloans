import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { BorrowingPowerCalculator } from "@/components/calculators/borrowing-power-calculator";

export const metadata: Metadata = {
  title: "Borrowing Power Calculator",
  description: "Get an estimate of how much you could borrow, based on your income and expenses.",
};

export default function BorrowingPowerPage() {
  return (
    <CalculatorLayout
      title="Borrowing Power Calculator"
      description="A real first answer before you talk to anyone — based on your income, expenses and existing commitments."
    >
      <BorrowingPowerCalculator />
    </CalculatorLayout>
  );
}
