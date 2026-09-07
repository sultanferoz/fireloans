import type { Metadata } from "next";
import { ComingSoon } from "@/components/conversion/coming-soon";

export const metadata: Metadata = { title: "Calculators" };

export default function CalculatorsPage() {
  return (
    <ComingSoon
      title="Calculators"
      description="Borrowing power, repayments, stamp duty and refinance-savings calculators are on the way. Want a real number today? Contact us and we'll run it for you."
    />
  );
}
