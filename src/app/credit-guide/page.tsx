import type { Metadata } from "next";
import {
  LegalHero,
  LegalSection,
  LegalProse,
  LegalPullQuote,
  LegalFactGrid,
} from "@/components/legal/legal-page";
import { LegalDocumentShell, ReadingProgressBar, type LegalSectionMeta } from "@/components/legal/legal-document";

export const metadata: Metadata = {
  title: "Credit Guide",
  description: "Fire Loans' Credit Guide — who we are, what we do, how we're paid, and how to raise a concern.",
  alternates: { canonical: "/credit-guide" },
};

const sections: LegalSectionMeta[] = [
  { id: "about-us", number: "01", label: "About Us & Our Licensing" },
  { id: "services", number: "02", label: "Services We Provide" },
  { id: "how-we-work", number: "03", label: "How We Work With You" },
  { id: "how-were-paid", number: "04", label: "How We're Paid" },
  { id: "complaints", number: "05", label: "Complaints & Disputes" },
  { id: "your-privacy", number: "06", label: "Your Privacy" },
];

export default function CreditGuidePage() {
  return (
    <div className="bg-cream">
      <ReadingProgressBar />
      <LegalHero
        eyebrow="Credit Guide"
        title="Who we are, before you sign anything"
        intro="Australian law requires every credit representative to give you this guide before providing credit assistance — here's ours, in full, before you need to ask."
        reference="FIN-CG-2026"
        updated="September 2026"
        tldr="Short version: we're licensed, we compare lenders on your behalf, we're paid by the lender not you, and you're never obliged to proceed."
        image="/images/credit.jpg"
      />

      <LegalDocumentShell sections={sections}>
        <LegalSection
          id="about-us"
          number="01"
          title="About us & our licensing"
          description="Who you're actually dealing with, and the authority we operate under."
        >
          <LegalFactGrid
            facts={[
              { term: "Entity", detail: "Fire Financial Services Pty Ltd" },
              { term: "ABN", detail: "35 689 635 667" },
              { term: "Credit Representative", detail: "Number 572433" },
              { term: "Authorised under", detail: "Australian Credit Licence 384704" },
            ]}
          />
        </LegalSection>

        <LegalSection id="services" number="02" title="Services we provide">
          <LegalProse>
            <p>
              Owner-occupied, investment, SMSF, trust, company, construction, commercial, business, car and
              equipment finance — we assess your situation and compare options across our lender panel.
            </p>
          </LegalProse>
        </LegalSection>

        <LegalSection id="how-we-work" number="03" title="How we work with you">
          <LegalProse>
            <p>
              We gather information about your objectives and financial situation, compare suitable options
              across our panel, and only recommend a loan we reasonably believe is not unsuitable for you —
              in line with our responsible lending obligations.
            </p>
          </LegalProse>
          <LegalPullQuote>
            You&apos;re not obliged to accept any recommendation we make, and you&apos;re free to seek finance
            through any other channel of your choosing.
          </LegalPullQuote>
        </LegalSection>

        <LegalSection
          id="how-were-paid"
          number="04"
          title="How we're paid"
          description="Transparency on remuneration, and the conflict of interest it creates."
        >
          <LegalProse>
            <p>
              We&apos;re generally paid a commission by the lender when your loan settles — at no direct cost
              to you. Some lenders may also pay volume-based benefits; ask us for the specifics relevant to
              your loan.
            </p>
            <p>
              Because we&apos;re paid by lenders, this creates a potential conflict of interest — which is
              exactly why our responsible lending obligations require us to recommend only what&apos;s
              suitable for you, not what pays the most.
            </p>
          </LegalProse>
        </LegalSection>

        <LegalSection id="complaints" number="05" title="Complaints & disputes">
          <LegalFactGrid
            facts={[
              { term: "Step 1", detail: "Contact us on 0478 933 786 or broker@fireloans.com.au — we aim to resolve it directly." },
              {
                term: "Step 2",
                detail:
                  "If unresolved, escalate free of charge to the Australian Financial Complaints Authority (AFCA) — afca.org.au, 1800 931 678.",
              },
            ]}
          />
        </LegalSection>

        <LegalSection id="your-privacy" number="06" title="Your privacy">
          <LegalProse>
            <p>
              We handle your personal information in line with our{" "}
              <a href="/privacy" className="font-semibold text-pine-700 hover:text-gold-700">
                Privacy Policy
              </a>{" "}
              and the Australian Privacy Principles.
            </p>
          </LegalProse>
        </LegalSection>
      </LegalDocumentShell>
    </div>
  );
}
