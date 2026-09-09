import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { RepaymentCalculator } from "@/components/calculators/repayment-calculator";

export const metadata: Metadata = {
  title: "Loan Repayment Calculator",
  description: "Work out your weekly, fortnightly or monthly loan repayments in seconds.",
  alternates: { canonical: "/calculators/repayments" },
};

export default function RepaymentsPage() {
  return (
    <CalculatorLayout
      title="Loan Repayment Calculator"
      description="See exactly what a loan will cost you per period, and how the balance reduces over time."
    >
      <RepaymentCalculator />
    </CalculatorLayout>
  );
}
