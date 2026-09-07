"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loanTypes } from "@/content/loan-types";

const savingsRanges = ["Under $20,000", "$20,000–$50,000", "$50,000–$100,000", "$100,000+"];
const loanAmountRanges = ["Under $300,000", "$300,000–$600,000", "$600,000–$1,000,000", "$1,000,000+", "Not sure yet"];

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  loanType: z.string().min(1, "Select a loan type"),
  savings: z.string().min(1, "Select a range"),
  loanAmount: z.string().min(1, "Select a range"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const fieldClasses =
  "h-12 w-full rounded-lg border border-white/20 bg-white/10 px-4 text-sm text-paper placeholder:text-cream/40 backdrop-blur-md transition-colors focus:border-gold-400/60 focus:outline-none focus:ring-2 focus:ring-gold-400/20 [color-scheme:dark]";
const labelClasses = "mb-1.5 block text-sm font-semibold text-cream/90";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    // TODO: wire this up to a real destination (email API, CRM webhook, etc.)
    // once a delivery channel is decided — nothing is sent anywhere yet.
    await new Promise((r) => setTimeout(r, 500));
    console.log("Fire Loans enquiry (not yet wired to a backend):", values);
    reset();
  }

  if (isSubmitSuccessful) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-brand-50 p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-paper">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">Thanks — got it.</h3>
        <p className="mt-2 text-ink-soft">
          A broker will review this and reach out within one business day. Urgent? Call{" "}
          <a href="tel:0478933786" className="font-semibold text-brand-600">
            0478 933 786
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="fullName">
            Full Name *
          </label>
          <input id="fullName" className={fieldClasses} placeholder="e.g. Jordan Smith" {...register("fullName")} />
          {errors.fullName && <p className="mt-1.5 text-sm text-error">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className={labelClasses} htmlFor="email">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            className={fieldClasses}
            placeholder="jordan@email.com"
            {...register("email")}
          />
          {errors.email && <p className="mt-1.5 text-sm text-error">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="phone">
            Phone Number *
          </label>
          <input id="phone" type="tel" className={fieldClasses} placeholder="04XX XXX XXX" {...register("phone")} />
          {errors.phone && <p className="mt-1.5 text-sm text-error">{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClasses} htmlFor="loanType">
            What Kind of Loan? *
          </label>
          <select id="loanType" className={fieldClasses} defaultValue="" {...register("loanType")}>
            <option value="" disabled>
              Select a loan type
            </option>
            {loanTypes.map((loan) => (
              <option key={loan.slug} value={loan.title}>
                {loan.title}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
          {errors.loanType && <p className="mt-1.5 text-sm text-error">{errors.loanType.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="savings">
            Savings / Deposit Available
          </label>
          <select id="savings" className={fieldClasses} defaultValue="" {...register("savings")}>
            <option value="" disabled>
              Select a range
            </option>
            {savingsRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.savings && <p className="mt-1.5 text-sm text-error">{errors.savings.message}</p>}
        </div>
        <div>
          <label className={labelClasses} htmlFor="loanAmount">
            Loan Amount Needed
          </label>
          <select id="loanAmount" className={fieldClasses} defaultValue="" {...register("loanAmount")}>
            <option value="" disabled>
              Select a range
            </option>
            {loanAmountRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.loanAmount && <p className="mt-1.5 text-sm text-error">{errors.loanAmount.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClasses} htmlFor="message">
          What&apos;s the Situation? (Optional)
        </label>
        <textarea
          id="message"
          rows={3}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-paper placeholder:text-cream/40 backdrop-blur-md focus:border-gold-400/60 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
          placeholder="Tell us about the property, timeline, employment type, or existing hurdles…"
          {...register("message")}
        />
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gold-400 text-base font-semibold text-pine-950 shadow-lg shadow-pine-950/30 transition-colors hover:bg-gold-300 disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Request My Free Assessment"}
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-center text-sm text-cream/60">
          We reply within one business day. Your details go only to Fire Loans.
        </p>
      </div>
    </form>
  );
}
