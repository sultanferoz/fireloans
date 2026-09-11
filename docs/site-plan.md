# Fire Loans   Rebuild Plan

## 1. Goal
Rebuild fireloans.com.au as the #1-feeling mortgage broker site in the AU market: persona-first navigation, real working calculators, plain-English education, genuine client stories, and SEO built in from the folder structure up.

## 2. Tech stack
- **Next.js 15 (App Router) + TypeScript**   SSR/SSG for SEO, file-based routing maps cleanly to the sitemap below.
- **Tailwind CSS**   fast iteration on a conversion-focused design system.
- **MDX or a headless CMS field-set (decide in step 4 below)** for blog/education content so non-developers can publish without a redeploy.
- **next/image** with AVIF/WebP   required for Core Web Vitals targets (LCP < 2.5s).
- **Zod + React Hook Form** for the lead-capture and calculator forms (validation, type-safe payloads).
- **next-seo / native Metadata API** for per-page canonical, OG, Twitter Card tags.
- **schema-dts or hand-rolled JSON-LD** for `RealEstateAgent`/`FinancialService`, `Organization`, `Person` (broker profiles), and `FAQPage` structured data.

## 3. Sitemap (persona-first, not product-first)

```
/                          Home   persona picker hero, trust stack, calculators teaser, stories teaser
/first-home-buyer          Persona landing: FHB grants, LMI explainer, step-by-step journey
/refinancing               Persona landing: refinance savings calculator, "switch and save" proof
/investing                 Persona landing: investment loan structuring, SMSF loans, portfolio growth
/self-employed             Persona landing: low-doc/alt-doc pathways, BAS/financials guidance
/business-and-commercial   Business loans, commercial property finance, equipment finance
/construction              Stage-by-stage construction finance
/loans                     Product index (owner-occupied, investment, SMSF, trust, company, car,
                           business, construction, commercial, equipment)   for search intent capture
/loans/[slug]              One SEO landing page per loan product
/calculators               Hub: borrowing power, repayments, stamp duty, extra repayments,
                           refinance savings, LMI estimator
/calculators/[slug]        Individual calculator, each independently indexable
/how-it-works              The process, step by step, in plain English
/client-stories            Real story hub (see content sourcing, §5)
/client-stories/[slug]     Individual story page (schema: Review/Testimonial where genuinely sourced)
/about                     Team, ACL number, MFAA/FBAA membership, why Fire Loans
/brokers/[slug]            Individual broker profile pages (Person schema; local SEO + trust)
/learn (blog)              Education hub: guides, glossary, rate-news
/learn/[slug]              Article page
/faq                       FAQPage schema, plain-English Q&A
/contact                   Contact + appointment booking
/apply                     Short (5–7 field) pre-qualification form → CRM handoff
/privacy, /terms, /credit-guide   Compliance pages (required for an Australian credit licensee)
```

## 4. Open decisions   need your input before content generation
1. **Branding assets**   do you have an existing Fire Loans logo, brand colors, or brand guide to keep, or is visual identity fully open to redesign?
2. **Real client stories**   per `CLAUDE.md`'s standing rule for this workspace, I will not invent client testimonials, names, or outcome numbers (the current site's fabricated-looking reviews are flagged in the competitive analysis as a trust liability   I won't repeat that mistake). I need either: (a) real client quotes/case studies you can supply, or (b) sign-off to ship the story sections as clearly-labeled placeholder/sample content structurally ready for your real stories before launch.
3. **Compliance details**   ACL (Australian Credit Licence) number, MFAA/FBAA membership status, and broker names/photos for real trust signals and schema markup.
4. **Content backend**   plain MDX files in the repo (simplest, free, git-versioned) vs. a headless CMS (Sanity/Contentful) so non-developers can edit copy later. Recommend MDX to start; can migrate later.
5. **Domain/hosting**   staying on current domain/host, or moving (e.g., to Vercel, which pairs best with Next.js)?

## 5. Build phases
1. **Scaffold**   Next.js app, design tokens, folder structure (this step).
2. **Design system**   typography, color, spacing, component primitives (buttons, cards, forms) in `src/components/conversion/`.
3. **Core pages**   Home, persona landings, How It Works, About.
4. **Calculators**   `src/modules/calculators/` business logic, unit-tested, then wired into `/calculators` pages.
5. **Content & SEO**   loan product pages, learn/blog, FAQ, JSON-LD, metadata, sitemap.xml/robots.txt.
6. **Client stories**   once real content is sourced (see §4.2).
7. **Performance & accessibility pass**   Lighthouse/axe audit against the Core Web Vitals and WCAG 2.1 AA targets in `CLAUDE.md`.
8. **Launch checklist**   analytics, search console, redirects from old URLs, final QA.

## 6. Folder structure (created in step "Scaffold")
```
fireloans/
  docs/                          strategy & planning (this folder)
  src/
    app/                         Next.js App Router routes (maps to sitemap above)
    components/
      conversion/                CTAs, lead forms, sticky apply bar
      calculators/                calculator UI widgets
      stories/                   testimonial/story cards
      layout/                    header, footer, nav
    modules/
      calculators/               borrowing-power, repayments, stamp-duty, refinance-savings logic
      lead-engine/                form validation, submission handling
      seo/                        JSON-LD builders, metadata helpers
    content/                     MDX for loan products, learn articles, stories (until CMS decision)
    lib/                         shared utilities
  public/
    images/                      optimized property/finance imagery, team photos
```
