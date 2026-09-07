import type { LoanIcon } from "@/content/loan-types";

const paths: Record<LoanIcon, string> = {
  home: "M3 11.5 12 4l9 7.5M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9",
  trendingUp: "M4 17 10 11l4 4 6-7M20 8h-4.5M20 8v4.5",
  shieldCheck:
    "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-3 9 2 2 4-4",
  scale:
    "M12 3v18M5 8h14M5 8l-3 5a3 3 0 0 0 6 0l-3-5Zm14 0-3 5a3 3 0 0 0 6 0l-3-5ZM8 21h8",
  briefcase:
    "M4 8h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Zm4 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 13h16",
  car: "M4 16V11l2-5h12l2 5v5M4 16a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1H4v1Zm14 0a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h-3v1ZM4 11h16M7.5 13.5h.01M16.5 13.5h.01",
  handshake:
    "M3 12l4-4 4 3 3-3 4 4-3 3-1-1-3 3-4-3-1 1-3-3Zm9-1 3 3",
  crane: "M5 21V9l7-5v4h7l-3 4h-4v9M9 21h8",
  building:
    "M6 21V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17M14 21v-9h5a1 1 0 0 1 1 1v8M9 7h.01M9 11h.01M9 15h.01",
  wrench:
    "M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2 2.8-2.8Z",
};

export function OfferIcon({ icon, className }: { icon: LoanIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[icon]} />
    </svg>
  );
}
