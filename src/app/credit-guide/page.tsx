import type { Metadata } from "next";
import { ComingSoon } from "@/components/conversion/coming-soon";

export const metadata: Metadata = { title: "Credit Guide" };

export default function CreditGuidePage() {
  return (
    <ComingSoon
      title="Credit Guide"
      description="Our published Australian Credit Licence guide is on the way. Contact us if you need a copy now."
    />
  );
}
