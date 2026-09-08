import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Fire Loans — an Australian mortgage broker structuring loans around your financial independence, not just the next application.",
};

// Real Fire Loans team members (confirmed). Fayaz and Rumina's supplied
// photos turned out to be AI-generated template headshots (Fayaz's even
// carries a different company's name on the desk plate/bookshelf —
// "Meridian Private Wealth") so they keep the monogram placeholder until
// real photos are supplied. James, Emily and Sarah's photos are real.
const team = [
  {
    name: "Fayaz",
    role: "Founder & Managing Director",
    tag: "Executive Desk",
    bio: "15+ years in the industry, guiding complex commercial deals and long-term client relationships from first call to settlement.",
    email: "fayaz@fireloans.com.au",
    initial: "F",
    photo: null,
  },
  {
    name: "James Wilson",
    role: "Business Loan Specialist",
    tag: "Asset Finance",
    bio: "Focused on business expansion finance, asset financing structures, and working capital facilities for Australian businesses.",
    email: "james@fireloans.com.au",
    initial: "J",
    photo: "/images/james.jpg",
  },
  {
    name: "Emily Carter",
    role: "Client Relationship Manager",
    tag: "Client Care",
    bio: "Keeps communication clear from application to settlement, coordinating every milestone so nothing falls through the cracks.",
    email: "emily@fireloans.com.au",
    initial: "E",
    photo: "/images/Emily.jpg",
  },
  {
    name: "Sarah Mitchell",
    role: "Senior Mortgage Broker",
    tag: "SMSF Specialist",
    bio: "Specialises in investment property portfolios, high-LVR strategies, and SMSF loan structures.",
    email: "sarah@fireloans.com.au",
    initial: "S",
    photo: "/images/Sarah.jpg",
  },
];

// Premium illustrated placeholder — used until real photos exist for Fayaz
// and Rumina. Deliberately not a fake "photo": a crafted badge (ring +
// silhouette + monogram) so it reads as an intentional placeholder, not a
// deceptive stand-in for a real portrait.
function BrandAvatar({ initial, size = "card" }: { initial: string; size?: "card" | "hero" }) {
  const dotPattern =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Ccircle cx='2' cy='2' r='1.3' fill='%23D8BD85' fill-opacity='0.35'/%3E%3C/svg%3E";
  const ringSize = size === "hero" ? "h-32 w-32" : "h-20 w-20";
  const iconSize = size === "hero" ? "h-14 w-14" : "h-9 w-9";
  const letterSize = size === "hero" ? "text-3xl" : "text-xl";

  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{
        backgroundImage: `url("${dotPattern}"), linear-gradient(135deg, var(--color-pine-900), var(--color-pine-700))`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div className={`relative flex ${ringSize} items-center justify-center rounded-full border-2 border-gold-400/50`}>
        <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full bg-pine-950/40 backdrop-blur-sm">
          <svg viewBox="0 0 24 24" className={`${iconSize} text-gold-400/70`} fill="none" stroke="currentColor" strokeWidth={1.3}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" strokeLinecap="round" />
          </svg>
        </div>
        <span className={`absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 font-display font-bold text-pine-950 ${letterSize}`}>
          {initial}
        </span>
      </div>
    </div>
  );
}

const pillars = [
  {
    title: "Straight Advice",
    description:
      "We tell you what's actually achievable before we tell you what sounds good — clear guidance, not a sales pitch.",
    icon: "M12 3a9 9 0 1 0 5.5 16.1V21l3-1.5-1-2A9 9 0 0 0 12 3Zm-2 9h4M12 9v6",
  },
  {
    title: "Every Loan Type, One Broker",
    description:
      "Home, investment, SMSF, trust, business, construction, commercial and equipment finance — structured around your position, not a single product.",
    icon: "M4 21V8l8-5 8 5v13M9 21v-7h6v7",
  },
  {
    title: "Fast, Real Answers",
    description:
      "A lender panel and a process built to get you a genuine answer quickly — not a runaround.",
    icon: "M13 2 4 14h6l-1 8 9-12h-6l1-8Z",
  },
  {
    title: "Support to Settlement",
    description:
      "From your first call to the day you get the keys (or the funds) — the same broker, the whole way through.",
    icon: "M12 21c-4-3-7-6.5-7-10a7 7 0 0 1 14 0c0 3.5-3 7-7 10Z M12 8v4l2.5 1.5",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-100/50 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-ink-soft">
            <Link href="/" className="hover:text-pine-700">
              Home
            </Link>
            <span className="text-border">/</span>
            <span className="font-semibold text-ink">About Us</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-cream-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-700">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                From Fire Loans
              </span>

              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Hello, my name is <span className="text-gold-700 italic">Rumina</span>
              </h1>
              <p className="mt-2 text-lg font-semibold text-pine-700">Financial Strategist, Fire Loans</p>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                I&apos;m passionate about helping individuals, families and businesses find the right
                financing to actually get closer to financial independence — not just a settled
                loan. My focus is honest advice, options genuinely matched to your situation, and
                being there through every stage of the process. Trust and transparency come first;
                everything else follows from that.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-pine-900 px-7 py-3.5 text-base font-semibold text-paper shadow-sm transition-colors hover:bg-pine-700"
                >
                  Get in Touch
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a href="tel:0478933786" className="inline-flex items-center gap-2 text-base font-semibold text-pine-700 hover:text-gold-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 5c0 8.5 6.5 15 15 15l3-4-6-3-2 2c-2-1-4-3-5-5l2-2-3-6-4 3Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  0478 933 786
                </a>
              </div>

              <div className="mt-8 flex items-center gap-4 rounded-2xl bg-paper p-4 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pine-900 text-gold-400">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-3 9 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/70">Compliance</p>
                  <p className="font-semibold text-ink">
                    Credit Representative 572433 &middot; ACL 384704
                  </p>
                </div>
              </div>
            </div>

            {/* TODO: replace with a real photo of Rumina — the supplied one was an AI-generated headshot */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-square w-full max-w-[380px] overflow-hidden rounded-3xl shadow-xl">
                <BrandAvatar initial="R" size="hero" />
                <span className="absolute bottom-4 left-4 right-4 rounded-xl bg-paper/95 px-4 py-3 text-center text-sm text-ink-soft backdrop-blur">
                  Photo of Rumina coming soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-cream-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-700">Who We Are</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Trusted loan guidance, built around you
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Tailored loan solutions for individuals and businesses, with a process designed to
              be simple, transparent and stress-free.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-paper p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-pine-700/20 hover:shadow-xl hover:shadow-ink/10"
              >
                <span
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-pine-900 via-brand-500 to-gold-500 transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute -bottom-7 -right-3 font-display text-8xl font-bold text-ink/0 transition-all duration-500 group-hover:text-pine-900/[0.06]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-cream-muted text-pine-700 ring-1 ring-inset ring-border transition-all duration-300 group-hover:scale-110 group-hover:bg-pine-900 group-hover:text-gold-400 group-hover:ring-transparent">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d={pillar.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                <h3 className="relative mt-5 font-display text-lg font-semibold text-ink">{pillar.title}</h3>
                <span className="relative mt-2 block h-0.5 w-8 rounded-full bg-gold-500/60 transition-all duration-300 group-hover:w-14" />
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Fire Loans */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-pine-900 p-8 text-cream sm:p-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">Why Fire Loans</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                  Here to manage the finance, so you can focus on the goal
                </h2>
                <p className="mt-4 text-cream/75">
                  We&apos;re committed to helping individuals and businesses achieve financial
                  independence with confidence — personalised guidance, real options, and a
                  process that doesn&apos;t waste your time.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { title: "Whole-of-market comparison", desc: "We compare across our lender panel, not just one bank's rate card." },
                  { title: "One point of contact", desc: "You deal with a person, not a call centre queue." },
                  { title: "No cost to you", desc: "We're paid by the lender on settlement — talking to us costs nothing." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 rounded-xl bg-white/5 p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-400 text-pine-950">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3}>
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-semibold text-paper">{item.title}</p>
                      <p className="text-sm text-cream/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-cream-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-700">Our Team</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Meet the people you&apos;ll actually deal with
            </h2>
            <p className="mt-4 text-lg text-ink-soft">Hover a card for a little more about each person.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-pine-900 shadow-md transition-shadow duration-300 hover:shadow-2xl hover:shadow-ink/20"
              >
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  // TODO: replace with a real photo of Fayaz — the supplied one was an AI-generated headshot for a different company
                  <BrandAvatar initial={member.initial} />
                )}

                {/* Always-on base gradient so text stays legible even without hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-pine-900 backdrop-blur">
                  {member.tag}
                </span>

                {/* Name + role always visible; bio + contact link reveal on hover/focus */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-lg font-semibold text-paper">{member.name}</h3>
                  <p className="text-sm font-semibold text-gold-400">{member.role}</p>

                  <div className="grid grid-rows-[0fr] transition-all duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-2 text-sm leading-relaxed text-cream/85">{member.bio}</p>
                      <a
                        href={`mailto:${member.email}`}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-paper hover:gap-2 transition-all"
                      >
                        Contact {member.name.split(" ")[0]}
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
