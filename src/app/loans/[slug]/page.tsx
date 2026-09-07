import type { Metadata } from "next";
import { loanTypes, getLoanType } from "@/content/loan-types";
import { ComingSoon } from "@/components/conversion/coming-soon";

export function generateStaticParams() {
  return loanTypes.map((loan) => ({ slug: loan.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loan = getLoanType(slug);
  return { title: loan ? loan.title : "Coming Soon" };
}

function titleize(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function LoanTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loan = getLoanType(slug);
  const title = loan ? loan.title : titleize(slug);

  return (
    <ComingSoon
      eyebrow="Coming Soon"
      title={title}
      description={
        loan
          ? `${loan.description} We're building out the full ${loan.title} page — get in touch now and a broker can walk you through it today.`
          : "We're building out this page. Get in touch and a broker can help you directly today."
      }
    />
  );
}
