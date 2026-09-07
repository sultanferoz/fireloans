import type { Metadata } from "next";
import { ComingSoon } from "@/components/conversion/coming-soon";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <ComingSoon
      eyebrow="Page Not Found"
      title="This page is on the way"
      description="That page doesn't exist yet, or has moved. Head back home, or contact us and we'll point you in the right direction."
    />
  );
}
