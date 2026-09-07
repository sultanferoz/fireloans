import type { Metadata } from "next";
import { ComingSoon } from "@/components/conversion/coming-soon";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <ComingSoon
      title="About Fire Loans"
      description="Our full story, team and credentials are on the way. In the meantime, call us on 0478 933 786 or use the contact form on the homepage."
    />
  );
}
