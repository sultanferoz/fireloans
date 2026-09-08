type Point = { x: number; y: number };

export function MiniAreaChart({
  points,
  color = "#00B389",
  height = 180,
  formatX,
  formatY,
}: {
  points: Point[];
  color?: string;
  height?: number;
  formatX?: (x: number) => string;
  formatY?: (y: number) => string;
}) {
  if (points.length < 2) return null;
  const width = 480;
  const padding = { top: 12, right: 12, bottom: 24, left: 12 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const maxX = Math.max(...points.map((p) => p.x));
  const maxY = Math.max(...points.map((p) => p.y), 1);

  // Rounded to 2dp: SSR and client can otherwise serialize the same float
  // with a last-digit difference and trigger a hydration mismatch.
  const round = (n: number) => Math.round(n * 100) / 100;
  const toSvgX = (x: number) => round(padding.left + (x / maxX) * innerW);
  const toSvgY = (y: number) => round(padding.top + innerH - (y / maxY) * innerH);

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${toSvgX(p.x)} ${toSvgY(p.y)}`).join(" ");
  const areaPath = `${linePath} L ${toSvgX(points[points.length - 1].x)} ${padding.top + innerH} L ${toSvgX(0)} ${padding.top + innerH} Z`;

  const gradientId = `chart-gradient-${color.replace("#", "")}`;
  const yTicks = [0, 0.5, 1].map((f) => f * maxY);
  const xTicks = [0, Math.round(maxX / 2), maxX];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
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

      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

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
  );
}
