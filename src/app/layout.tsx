import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteLoader } from "@/components/layout/site-loader";
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
    "home loans",
    "refinancing",
    "first home buyer",
    "investment loan",
    "SMSF home loan",
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
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        <SiteLoader />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
