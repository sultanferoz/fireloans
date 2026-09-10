import type { Metadata } from "next";
import { loanTypes, getLoanType } from "@/content/loan-types";
import { getLoanDetail } from "@/content/loan-details";
import { getAllSlugs } from "@/lib/content";
import { ComingSoon } from "@/components/conversion/coming-soon";
import { JsonLd } from "@/components/seo/json-ld";
import {
  LoanHero,
  LoanSection,
  LoanWhoList,
  LoanProcess,
  LoanFeatureGrid,
  LoanTip,
  LoanFaq,
  LoanCta,
} from "@/components/loans/loan-page";

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
  const detail = getLoanDetail(slug);
  return {
    title: loan ? `${loan.title} — ${loan.formalName}` : "Coming Soon",
    description: detail?.subhead ?? loan?.description,
    alternates: { canonical: `/loans/${slug}` },
  };
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
  const detail = getLoanDetail(slug);
  const title = loan ? loan.title : titleize(slug);

  if (!loan || !detail) {
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

  const storySlugs = getAllSlugs("stories");
  const storyHref = storySlugs.includes(slug) ? `/client-stories/${slug}` : undefined;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Fire Loans", item: "https://www.fireloans.com.au" },
      { "@type": "ListItem", position: 2, name: loan.title, item: `https://www.fireloans.com.au/loans/${slug}` },
    ],
  };

  return (
    <div className="bg-cream">
      <JsonLd data={[faqJsonLd, breadcrumbJsonLd]} />
      <LoanHero
        icon={loan.icon}
        category={`${loan.title} · ${loan.formalName}`}
        title={loan.title}
        headline={detail.headline}
        subhead={detail.subhead}
        keyFacts={detail.keyFacts}
        image={detail.heroImage}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <LoanSection number="01" title="Who it's for">
          <LoanWhoList items={detail.whoItsFor} />
        </LoanSection>

        <LoanSection
          number="02"
          title="How it works"
          description="The same clear process every time, shaped around this specific loan type."
        >
          <LoanProcess steps={detail.process} />
        </LoanSection>

        <LoanSection number="03" title="What's included">
          <LoanFeatureGrid icon={loan.icon} features={detail.features} />
          <div className="mt-8">
            <LoanTip>{detail.tip}</LoanTip>
          </div>
        </LoanSection>

        <LoanSection number="04" title="Common questions">
          <LoanFaq faqs={detail.faqs} />
        </LoanSection>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <LoanCta
          title={`Ready to explore ${loan.title}?`}
          calculatorHref={detail.calculatorHref}
          calculatorLabel={detail.calculatorLabel}
          storyHref={storyHref}
        />
      </div>
    </div>
  );
}
