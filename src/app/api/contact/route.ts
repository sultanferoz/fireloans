import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const ASSESSMENT_RECIPIENT = "rumina@fireloans.com.au";
// Resend requires the "from" domain to be verified in the Resend dashboard before it can send
// as @fireloans.com.au. Until that's done, swap this for the Resend sandbox sender
// ("onboarding@resend.dev") for testing   it only delivers to the account owner's own address.
const FROM_ADDRESS = "Fire Loans Website <noreply@fireloans.com.au>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // 5 submissions per 10 minutes per IP   a real enquirer never needs more than that.
  const { allowed, retryAfterMs } = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly, or call us directly on 0478 933 786." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot: a real visitor never sees or fills this field. Pretend success so bots
  // don't learn what tripped them up, without ever sending the fake enquiry as a real email.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form submission received but RESEND_API_KEY is not configured   email not sent.", {
      name: data.fullName,
      email: data.email,
    });
    return NextResponse.json(
      { error: "We couldn't submit that right now. Please call 0478 933 786 or email broker@fireloans.com.au directly." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: ASSESSMENT_RECIPIENT,
      replyTo: data.email,
      subject: `New assessment request   ${data.fullName} (${data.loanType})`,
      html: `
        <h2>New free assessment request</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Loan type:</strong> ${escapeHtml(data.loanType)}</p>
        <p><strong>Savings / deposit:</strong> ${escapeHtml(data.savings || "Not provided")}</p>
        <p><strong>Loan amount needed:</strong> ${escapeHtml(data.loanAmount || "Not provided")}</p>
        <p><strong>Situation:</strong><br />${escapeHtml(data.message || "Not provided").replace(/\n/g, "<br />")}</p>
        <hr />
        <p style="color:#888;font-size:12px;">Submitted from the Fire Loans website contact form.</p>
      `,
    });

    if (error) {
      console.error("Resend failed to send contact form email:", error);
      return NextResponse.json(
        { error: "We couldn't submit that right now. Please call 0478 933 786 or email broker@fireloans.com.au directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending contact form email:", err);
    return NextResponse.json(
      { error: "We couldn't submit that right now. Please call 0478 933 786 or email broker@fireloans.com.au directly." },
      { status: 500 }
    );
  }
}
