import type { Metadata } from "next";
import { ComingSoon } from "@/components/conversion/coming-soon";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <ComingSoon
      title="Terms of Use"
      description="Our published terms of use are on the way. Get in touch if you need anything in the meantime."
    />
  );
}
