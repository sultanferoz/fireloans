"use client";

import type { ReactNode } from "react";

const inputClasses =
  "h-12 w-full rounded-xl border border-border bg-cream-muted px-4 text-sm font-semibold text-ink focus:border-pine-700 focus:outline-none focus:ring-2 focus:ring-pine-700/10";

export function FieldGroup({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label className="text-sm font-semibold text-ink">{label}</label>
        {hint && <span className="text-xs text-ink-soft">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export function CurrencyInput({
  value,
  onChange,
  placeholder,
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">$</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        className={`${inputClasses} pl-7`}
        value={Number.isFinite(value) ? value : ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
      />
    </div>
  );
}

export function PercentInput({ value, onChange, step = 0.01 }: { value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <div className="relative">
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        className={`${inputClasses} pr-9`}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
      />
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft">%</span>
    </div>
  );
}

export function NumberInput({
  value,
  onChange,
  suffix,
  min = 0,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="relative">
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        className={`${inputClasses} ${suffix ? "pr-16" : ""}`}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
          {suffix}
        </span>
      )}
    </div>
  );
}

export function SelectInput<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <select
      className={inputClasses}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function PillToggle<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex overflow-hidden rounded-xl border border-border">
      {options.map((opt, i) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`h-12 flex-1 text-sm font-semibold transition-colors ${
            i > 0 ? "border-l border-border" : ""
          } ${value === opt.value ? "bg-pine-900 text-paper" : "bg-paper text-ink-soft hover:bg-cream-muted"}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function ResultStat({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-cream/10 py-3 last:border-b-0">
      <span className="text-sm text-cream/70">{label}</span>
      <span className={emphasis ? "font-display text-2xl font-semibold text-gold-400" : "font-semibold text-paper"}>
        {value}
      </span>
    </div>
  );
}

export const formatCurrency = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });

export const formatCurrency2 = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 });
