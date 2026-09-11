import { z } from "zod";

/** Shared between the client form and the server route so validation can never drift apart. */
export const contactSchema = z.object({
  fullName: z.string().min(2, "Enter your full name").max(200),
  email: z.string().email("Enter a valid email").max(320),
  phone: z.string().min(8, "Enter a valid phone number").max(30),
  loanType: z.string().min(1, "Select a loan type").max(100),
  savings: z.string().max(100).optional().or(z.literal("")),
  loanAmount: z.string().max(100).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  // Honeypot   real users never fill this in; a bot usually does. Deliberately NOT
  // constrained to empty here: validation must pass either way so a filled-in value
  // reaches the route handler, which is what decides to silently fake success rather
  // than reveal to the bot that this field is what gave it away.
  company: z.string().max(200).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
