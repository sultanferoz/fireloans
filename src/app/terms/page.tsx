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
  title: "Terms of Use",
  description: "The terms that apply to using the Fire Loans website.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSectionMeta[] = [
  { id: "using-this-site", number: "01", label: "Using This Site" },
  { id: "calculators", number: "02", label: "Calculators Are Estimates" },
  { id: "intellectual-property", number: "03", label: "Intellectual Property" },
  { id: "liability", number: "04", label: "Liability & Disclaimers" },
  { id: "third-party-links", number: "05", label: "Third-Party Links" },
  { id: "governing-law", number: "06", label: "Governing Law & Changes" },
];

export default function TermsPage() {
  return (
    <div className="bg-cream">
      <ReadingProgressBar />
      <LegalHero
        eyebrow="Terms of Use"
        title="The ground rules for this site"
        intro="Kept deliberately short — you shouldn't need a law degree to know what you're agreeing to by using a website."
        reference="FIN-TOU-2026"
        updated="September 2026"
        tldr="Short version: this site is general information, calculators are estimates, and nothing here guarantees loan approval."
        image="/images/terms.jpg"
      />

      <LegalDocumentShell sections={sections}>
        <LegalSection
          id="using-this-site"
          number="01"
          title="Using this website"
          description="What this site is for, and what it isn't."
        >
          <LegalProse>
            <p>
              Everything on this site — calculators, guides and Fire Stories included — is general in
              nature. It doesn&apos;t account for your personal circumstances and isn&apos;t financial or
              credit advice.
            </p>
          </LegalProse>
          <LegalPullQuote>Nothing on this site is a substitute for a conversation with a broker.</LegalPullQuote>
        </LegalSection>

        <LegalSection id="calculators" number="02" title="Calculators are estimates">
          <LegalProse>
            <p>
              Every calculator on this site produces an estimate based on the figures you enter and standard
              lending assumptions. Always confirm your real numbers with a broker before acting on them —
              actual serviceability, rates and fees depend on a full lender assessment.
            </p>
          </LegalProse>
        </LegalSection>

        <LegalSection id="intellectual-property" number="03" title="Intellectual property">
          <LegalProse>
            <p>
              The content, design and branding on this site belong to Fire Financial Services Pty Ltd.
              You&apos;re welcome to link to it, but not to copy or republish it without permission.
            </p>
          </LegalProse>
        </LegalSection>

        <LegalSection
          id="liability"
          number="04"
          title="Liability & disclaimers"
          description="Standard disclaimers that keep expectations realistic on both sides."
        >
          <LegalFactGrid
            facts={[
              {
                term: "No guarantees",
                detail:
                  "Lending is always subject to lender approval, valuation and credit assessment — we can't guarantee a specific rate, approval, or loan amount.",
              },
              {
                term: "Acceptable use",
                detail:
                  "Don't use this site unlawfully, attempt unauthorised access, or interfere with how it works for other visitors.",
              },
            ]}
          />
        </LegalSection>

        <LegalSection id="third-party-links" number="05" title="Third-party links">
          <LegalProse>
            <p>
              We may link to lender or government websites for convenience. We don&apos;t control their
              content and aren&apos;t responsible for it.
            </p>
          </LegalProse>
        </LegalSection>

        <LegalSection id="governing-law" number="06" title="Governing law & changes">
          <LegalProse>
            <p>
              These terms are governed by the laws of Australia, and any dispute is subject to the
              jurisdiction of Australian courts. We may update these terms as our services or the law
              change — the &quot;effective&quot; date at the top of this page always reflects the current
              version.
            </p>
          </LegalProse>
        </LegalSection>
      </LegalDocumentShell>
    </div>
  );
}
