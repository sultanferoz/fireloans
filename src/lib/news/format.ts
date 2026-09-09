/** Relative time for a known ISO timestamp; never fabricates a time for missing data. */
export function relativeTime(iso: string | null): string {
  if (!iso) return "Published recently";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "Published recently";

  const diffMs = Date.now() - then;
  if (diffMs < 0) return "Just now";

  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  return formatDate(iso);
}

export function formatDate(iso: string | null): string {
  if (!iso) return "Published recently";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Published recently";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

export function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
