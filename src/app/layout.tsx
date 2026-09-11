import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteLoader } from "@/components/layout/site-loader";
import { FloatingCta } from "@/components/conversion/floating-cta";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const fontDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const fontBody = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = "https://www.fireloans.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Fire Loans",
  title: {
    default: "Fire Loans | Mortgage Broker for First Home Buyers, Refinancing & Investors",
    template: "%s | Fire Loans",
  },
  description:
    "Fire Loans is an Australian mortgage broker helping first home buyers, refinancers, investors and business owners find the right loan structure across home, SMSF, trust, business, construction and commercial finance.",
  keywords: [
    "mortgage broker Australia",
    "home loan broker",
    "home loans",
    "refinancing",
    "first home buyer",
    "investment loan",
    "SMSF home loan",
    "business loan broker",
    "commercial property finance",
    "construction loan",
    "compare home loans Australia",
    "Fire Loans",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Fire Loans",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// No fixed shopfront address is published for Fire Loans, so this deliberately does not use
// LocalBusiness/PostalAddress/geo coordinates   inventing one would be false structured data
// (and inconsistent with any real Google Business Profile, which Google penalises). A
// nationwide broker's correct "geo" signal is areaServed, not a fabricated street address.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "FinancialService"],
  name: "Fire Loans",
  legalName: "Fire Financial Services Pty Ltd",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  image: `${siteUrl}/images/logo.png`,
  telephone: "+61478933786",
  email: "broker@fireloans.com.au",
  areaServed: { "@type": "Country", name: "Australia" },
  serviceType: [
    "Mortgage Broking",
    "Home Loans",
    "Investment Property Loans",
    "SMSF Loans",
    "Trust Loans",
    "Business Loans",
    "Construction Loans",
    "Commercial Loans",
    "Equipment Finance",
    "Car Loans",
  ],
  knowsAbout: [
    "Australian home loans",
    "Mortgage refinancing",
    "First home buyer grants",
    "SMSF property lending",
    "Investment property finance",
    "Australian stamp duty",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+61478933786",
    email: "broker@fireloans.com.au",
    contactType: "customer service",
    areaServed: "AU",
    availableLanguage: ["en"],
  },
  identifier: [
    { "@type": "PropertyValue", name: "ABN", value: "35 689 635 667" },
    { "@type": "PropertyValue", name: "Credit Representative Number", value: "572433" },
    { "@type": "PropertyValue", name: "Australian Credit Licence", value: "384704" },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Fire Loans",
  url: siteUrl,
  inLanguage: "en-AU",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/articles?category={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export const viewport: Viewport = {
  themeColor: "#051710",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${fontDisplay.variable} ${fontBody.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans pb-[76px] sm:pb-0">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <SiteLoader />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <FloatingCta />
      </body>
    </html>
  );
}
