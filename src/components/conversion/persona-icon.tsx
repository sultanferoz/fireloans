import type { Persona } from "@/content/personas";

const paths: Record<Persona["icon"], string> = {
  home: "M3 11.5 12 4l9 7.5M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9",
  refresh:
    "M4 10a8 8 0 0 1 13.5-5.3M20 5v5h-5M20 14a8 8 0 0 1-13.5 5.3M4 19v-5h5",
  chart: "M4 20V10m6 10V4m6 16v-7m6 7v-3M4 20h16",
  briefcase:
    "M4 8h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Zm4 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 13h16",
  building:
    "M6 21V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17M14 21v-9h5a1 1 0 0 1 1 1v8M9 7h.01M9 11h.01M9 15h.01",
  crane:
    "M5 21V9l7-5v4h7l-3 4h-4v9M9 21h8",
};

export function PersonaIcon({ icon, className }: { icon: Persona["icon"]; className?: string }) {
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
