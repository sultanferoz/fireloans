"use client";

import Link from "next/link";
import { useState } from "react";

type ChecklistItem = {
  title: string;
  description: string;
  status: string;
  highlight?: boolean;
};

type TabIconName = "home" | "refresh" | "building" | "wrench";

type ServiceTab = {
  key: string;
  label: string;
  icon: TabIconName;
  microLabel: string;
  heading: string;
  description: string;
  bullets: string[];
  linkLabel: string;
  mockup: {
    title: string;
    subtitle: string;
    status: string;
    items: ChecklistItem[];
  };
};

const iconPaths: Record<TabIconName, string> = {
  home: "M3 11.5 12 4l9 7.5M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9",
  refresh: "M4 10a8 8 0 0 1 13.5-5.3M20 5v5h-5M20 14a8 8 0 0 1-13.5 5.3M4 19v-5h5",
  building:
    "M6 21V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17M14 21v-9h5a1 1 0 0 1 1 1v8M9 7h.01M9 11h.01M9 15h.01",
  wrench:
    "M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2 2.8-2.8Z",
};

function TabIcon({ icon, className }: { icon: TabIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={iconPaths[icon]} />
    </svg>
  );
}

const tabs: ServiceTab[] = [
  {
    key: "purchasing",
    label: "Purchasing",
    icon: "home",
    microLabel: "Smart Entry",
    heading: "Buying, structured around your real position",
    description:
      "Whether it's your first home, your next home, or your next investment, we assess your full financial position before recommending a lender   not just the first rate you're offered.",
    bullets: [
      "Pre-approval before you start shopping",
      "First home buyer grants, schemes and LMI guidance",
      "Owner-occupied and investment purchases across our lender panel",
    ],
    linkLabel: "Structure your purchase application",
    mockup: {
      title: "Home Purchase Journey",
      subtitle: "Live Application Timeline",
      status: "Approved",
      items: [
        {
          title: "Home Loan Appointment",
          description: "Your goals, income and position reviewed with a broker",
          status: "Completed",
        },
        {
          title: "Submit Application for Pre-Approval",
          description: "Application lodged with your matched lender",
          status: "Approved",
        },
        {
          title: "Contract signed and valuation ordered",
          description: "Purchase contract signed and property valuation requested",
          status: "Executed",
        },
        {
          title: "Unconditional Approval Obtained",
          description: "Finance secured, ready to settle",
          status: "100% Complete",
          highlight: true,
        },
      ],
    },
  },
  {
    key: "refinance",
    label: "Refinance",
    icon: "refresh",
    microLabel: "Better Terms",
    heading: "Refinancing that's actually worth the switch",
    description:
      "We check what a better rate or structure really saves you   after fees, after cashback, after the fine print   before you make a move.",
    bullets: [
      "Rate and cashback comparison across lenders",
      "Debt consolidation and equity release",
      "Fixed, variable and split-rate structuring",
    ],
    linkLabel: "Structure your refinance application",
    mockup: {
      title: "Refinance Journey",
      subtitle: "Live Application Timeline",
      status: "Switched",
      items: [
        {
          title: "Home Loan Appointment",
          description: "Current position and refinance goals reviewed",
          status: "Completed",
        },
        {
          title: "Order Valuation",
          description: "Property valuation requested to confirm current equity",
          status: "Approved",
        },
        {
          title: "Lender Comparison Review",
          description: "Panel lenders compared on real, not advertised, rates",
          status: "Reviewed",
        },
        {
          title: "Submit Application for Formal Approval",
          description: "Application lodged with your matched lender",
          status: "Executed",
        },
        {
          title: "Unconditional Approval Obtained",
          description: "Discharge lodged and new facility settled",
          status: "100% Complete",
          highlight: true,
        },
      ],
    },
  },
  {
    key: "commercial",
    label: "Commercial and Partner Funding",
    icon: "building",
    microLabel: "Structured Growth",
    heading: "Finance built around your business structure",
    description:
      "Commercial property and partnership finance assessed against your business and personal position together   not in isolation.",
    bullets: [
      "Commercial property purchase and refinance",
      "Partnership and trust lending structures",
      "Serviceability assessed across business and personal income",
    ],
    linkLabel: "Structure your commercial application",
    mockup: {
      title: "Loan Approval Journey",
      subtitle: "Live Application Timeline",
      status: "Approved",
      items: [
        {
          title: "Commercial Loan Appointment",
          description: "Business goals and lending position reviewed",
          status: "Completed",
        },
        {
          title: "Business Financials Review",
          description: "Trading position and cash flow assessed",
          status: "Approved",
        },
        {
          title: "Submit Application For Pre-Approval",
          description: "Application lodged with your matched lender",
          status: "Reviewed",
        },
        {
          title: "Commercial Property Purchased",
          description: "Contract signed and settlement scheduled",
          status: "Executed",
        },
        {
          title: "Unconditional Approval Obtained",
          description: "Finance secured, ready to settle",
          status: "100% Complete",
          highlight: true,
        },
      ],
    },
  },
  {
    key: "asset",
    label: "Asset Finance",
    icon: "wrench",
    microLabel: "Capital Velocity",
    heading: "Keep the equipment moving, not your cash flow",
    description:
      "Finance for the vehicles, equipment and machinery your business runs on   approved fast, without draining working capital.",
    bullets: [
      "Vehicle and equipment finance",
      "Chattel mortgage, hire purchase and leasing options",
      "Fast approval so opportunities don't wait",
    ],
    linkLabel: "Structure your asset application",
    mockup: {
      title: "Asset Finance Journey",
      subtitle: "Live Application Timeline",
      status: "Settled",
      items: [
        {
          title: "Finance Lending Appointment",
          description: "Funding needs and business position reviewed",
          status: "Completed",
        },
        {
          title: "Financials Review",
          description: "Business financials assessed against lender policy",
          status: "Approved",
        },
        {
          title: "Submit Application For Pre-Approval",
          description: "Application lodged with your matched lender",
          status: "Reviewed",
        },
        {
          title: "Purchase Asset",
          description: "Asset selected and purchase confirmed",
          status: "Executed",
        },
        {
          title: "Unconditional Approval Obtained",
          description: "Funds released, asset settled",
          status: "100% Complete",
          highlight: true,
        },
      ],
    },
  },
];

export function ServicesTabs() {
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const active = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Fire Loans services"
        className="flex flex-wrap items-center justify-center gap-2 overflow-x-auto pb-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={tab.key === activeKey}
            onClick={() => setActiveKey(tab.key)}
            className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab.key === activeKey
                ? "bg-pine-900 text-paper shadow-sm"
                : "text-ink-soft hover:bg-cream-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-10 rounded-3xl bg-cream-muted p-6 sm:p-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold-700">
              <TabIcon icon={active.icon} className="h-4 w-4" />
              {active.microLabel}
            </div>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              {active.heading}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{active.description}</p>
            <ul className="mt-6 space-y-3">
              {active.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pine-900 text-gold-400">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3}>
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-ink">{bullet}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:text-gold-500"
            >
              {active.linkLabel}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Right: illustrative dossier card */}
          <div className="overflow-hidden rounded-2xl bg-paper shadow-xl shadow-ink/5">
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pine-900 text-gold-400">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-3 9 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h4 className="font-display text-lg font-semibold text-ink">{active.mockup.title}</h4>
                  <p className="text-sm text-ink-soft">{active.mockup.subtitle}</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-pine-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold-400">
                {active.mockup.status}
              </span>
            </div>

            <div className="flex flex-col gap-2 px-4 pb-5 sm:px-5">
              {active.mockup.items.map((item) => (
                <div
                  key={item.title}
                  className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 ${
                    item.highlight ? "bg-pine-900" : "bg-cream-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        item.highlight ? "bg-gold-400 text-pine-950" : "bg-pine-900 text-gold-400"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3}>
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <p className={`font-semibold ${item.highlight ? "text-paper" : "text-ink"}`}>{item.title}</p>
                      <p className={`text-sm ${item.highlight ? "text-cream/70" : "text-ink-soft"}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-sm font-semibold ${item.highlight ? "text-gold-400" : "text-gold-700"}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-border px-6 py-3 text-xs text-ink-soft">
              <span>{active.mockup.items.length} of {active.mockup.items.length} steps</span>
              <span>Illustrative example. Not client data.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
