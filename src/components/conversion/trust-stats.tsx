/**
 * Every value below is a bracketed placeholder — do not present as fact until
 * confirmed with the real Fire Loans business (ACL number, years trading,
 * lender panel size, loans settled, etc.). See docs/site-plan.md §4.3.
 */
const stats = [
  { value: "[X]+", label: "years helping Australians borrow" },
  { value: "[X]+", label: "lenders on our panel" },
  { value: "[X]+", label: "loans settled" },
  { value: "ACL [XXXXXX]", label: "Australian Credit Licence holder" },
];

export function TrustStats() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center sm:text-left">
          <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">{stat.value}</p>
          <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
