import type { Metadata } from "next";
import { ComingSoon } from "@/components/conversion/coming-soon";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <ComingSoon
      title="Privacy Policy"
      description="Our published privacy policy is on the way. Questions about how your data is handled in the meantime? Contact us directly."
    />
  );
}
