type Point = { x: number; y: number };
type Series = { label: string; color: string; points: Point[] };

/** Overlays up to two balance-over-time series (e.g. with vs. without extra repayments) on one chart, with a colour-coded legend. */
export function DualAreaChart({
  series,
  height = 200,
  formatX,
  formatY,
}: {
  series: Series[];
  height?: number;
  formatX?: (x: number) => string;
  formatY?: (y: number) => string;
}) {
  const longest = series.reduce((a, b) => (b.points.length > a.points.length ? b : a), series[0]);
  if (!longest || longest.points.length < 2) return null;

  const width = 480;
  const padding = { top: 12, right: 12, bottom: 24, left: 12 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const maxX = Math.max(...series.flatMap((s) => s.points.map((p) => p.x)));
  const maxY = Math.max(...series.flatMap((s) => s.points.map((p) => p.y)), 1);

  // Rounded to 2dp: SSR and client can otherwise serialize the same float with a last-digit difference and trigger a hydration mismatch.
  const round = (n: number) => Math.round(n * 100) / 100;
  const toSvgX = (x: number) => round(padding.left + (x / maxX) * innerW);
  const toSvgY = (y: number) => round(padding.top + innerH - (y / maxY) * innerH);

  const yTicks = [0, 0.5, 1].map((f) => f * maxY);
  const xTicks = [0, Math.round(maxX / 2), maxX];

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
        <defs>
          {series.map((s) => (
            <linearGradient key={s.label} id={`dual-chart-${s.color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>

        {yTicks.map((t) => (
          <line
            key={t}
            x1={padding.left}
            x2={width - padding.right}
            y1={toSvgY(t)}
            y2={toSvgY(t)}
            stroke="currentColor"
            strokeOpacity={0.08}
            strokeWidth={1}
          />
        ))}

        {series.map((s) => {
          const linePath = s.points.map((p, i) => `${i === 0 ? "M" : "L"} ${toSvgX(p.x)} ${toSvgY(p.y)}`).join(" ");
          const areaPath = `${linePath} L ${toSvgX(s.points[s.points.length - 1].x)} ${padding.top + innerH} L ${toSvgX(0)} ${padding.top + innerH} Z`;
          return (
            <g key={s.label}>
              <path d={areaPath} fill={`url(#dual-chart-${s.color.replace("#", "")})`} />
              <path d={linePath} fill="none" stroke={s.color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
            </g>
          );
        })}

        {xTicks.map((t) => (
          <text
            key={t}
            x={toSvgX(t)}
            y={height - 6}
            fontSize={11}
            textAnchor={t === 0 ? "start" : t === maxX ? "end" : "middle"}
            fill="currentColor"
            fillOpacity={0.5}
          >
            {formatX ? formatX(t) : t}
          </text>
        ))}
        {formatY && (
          <text x={padding.left} y={padding.top + 10} fontSize={11} fill="currentColor" fillOpacity={0.5}>
            {formatY(maxY)}
          </text>
        )}
      </svg>

      {series.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {series.map((s) => (
            <span key={s.label} className="flex items-center gap-1.5 text-xs text-cream/60">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} aria-hidden="true" />
              {s.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
