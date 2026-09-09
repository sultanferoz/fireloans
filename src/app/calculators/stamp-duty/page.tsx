import type { Metadata } from "next";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { StampDutyCalculator } from "@/components/calculators/stamp-duty-calculator";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator",
  description: "Estimate stamp duty, government fees and first home owner grants across every Australian state and territory.",
  alternates: { canonical: "/calculators/stamp-duty" },
};

export default function StampDutyPage() {
  return (
    <CalculatorLayout
      title="Stamp Duty Calculator"
      description="Estimate government fees and grants for your state — including first home buyer concessions."
    >
      <StampDutyCalculator />
    </CalculatorLayout>
  );
}
