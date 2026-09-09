/**
 * Icon + colour treatment for topic placeholders (News and Articles cards without a
 * source image). Keyed loosely by keyword so it works across both category unions
 * without duplicating a map per type.
 */
const ICONS: { match: RegExp; path: string }[] = [
  { match: /first.home/i, path: "M3 11.5 12 4l9 7.5M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9" },
  { match: /refinanc/i, path: "M4 4v5h.582M20 20v-5h-.581M4.582 9A8 8 0 0 1 19.42 9M19.418 15A8 8 0 0 1 4.58 15" },
  { match: /interest rate/i, path: "M4 17 10 11l4 4 6-7M20 8h-4.5M20 8v4.5" },
  { match: /borrowing/i, path: "M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" },
  { match: /investment/i, path: "M4 17 10 11l4 4 6-7M20 8h-4.5M20 8v4.5" },
  { match: /propert|housing/i, path: "M6 21V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17M14 21v-9h5a1 1 0 0 1 1 1v8M9 7h.01M9 11h.01M9 15h.01" },
  { match: /bank/i, path: "M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6" },
  { match: /^(rba|apra|asic)$/i, path: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-3 9 2 2 4-4" },
  { match: /regulat/i, path: "M12 3v18M5 8h14M5 8l-3 5a3 3 0 0 0 6 0l-3-5Zm14 0-3 5a3 3 0 0 0 6 0l-3-5ZM8 21h8" },
  { match: /broker/i, path: "M3 12l4-4 4 3 3-3 4 4-3 3-1-1-3 3-4-3-1 1-3-3Zm9-1 3 3" },
  { match: /lending|loan/i, path: "M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m5-3a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" },
  { match: /tip/i, path: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.5.4.8 1 .8 1.6v.7h6.4v-.7c0-.6.3-1.2.8-1.6A7 7 0 0 0 12 2Z" },
];

const DEFAULT_ICON = "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-3 9 2 2 4-4";

export function iconPathForCategory(category: string): string {
  return ICONS.find((i) => i.match.test(category))?.path ?? DEFAULT_ICON;
}

const GRADIENTS = [
  "from-pine-700 to-pine-950",
  "from-brand-700 to-pine-950",
  "from-gold-700 to-pine-950",
  "from-pine-500 to-pine-950",
];

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function gradientForCategory(category: string): string {
  return GRADIENTS[hash(category) % GRADIENTS.length];
}
