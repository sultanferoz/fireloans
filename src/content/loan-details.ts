import type { LoanIcon } from "@/content/loan-types";

export type LoanDetail = {
  slug: string;
  heroImage: string;
  headline: string;
  subhead: string;
  keyFacts: [string, string, string];
  whoItsFor: string[];
  process: { title: string; description: string }[];
  features: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  tip: string;
  calculatorHref: string;
  calculatorLabel: string;
};

export const loanDetails: Record<string, LoanDetail> = {
  "owner-occupied": {
    slug: "owner-occupied",
    heroImage: "/images/owner.jpg",
    headline: "The loan you'll actually live in, structured right from day one",
    subhead:
      "Buying the home you'll live in is a different lending conversation to an investment — it's about the rate today and the flexibility over the next ten years. We compare fixed, variable and split structures across our panel so the loan fits your life, not the other way around.",
    keyFacts: ["Up to 95% LVR", "P&I or Interest-Only", "Fixed, variable or split"],
    whoItsFor: [
      "First home buyers navigating deposits, grants and LMI for the first time",
      "Upgraders moving to a bigger home or a better location",
      "Buyers who want offset and redraw flexibility built in, not bolted on",
      "Anyone refinancing their current home for a sharper rate or better structure",
    ],
    process: [
      {
        title: "Free serviceability assessment",
        description: "We work out what you can actually borrow, based on real income, expenses and the APRA buffer lenders apply — not a rough guess.",
      },
      {
        title: "Compare the panel",
        description: "Your numbers go up against lenders on our panel for rate, LMI treatment, offset access and fees — not just the first bank you'd have called.",
      },
      {
        title: "Pre-approval",
        description: "Walk into open homes and auctions with a conditional approval behind you, so you can move when the right property turns up.",
      },
      {
        title: "Settlement support",
        description: "We manage the paperwork and lender back-and-forth through to settlement, and stay on hand after you've got the keys.",
      },
    ],
    features: [
      {
        title: "Offset & redraw access",
        description: "Structure your loan so everyday savings actually reduce the interest you pay, without locking your money away.",
      },
      {
        title: "LMI strategy",
        description: "Where LMI applies over 80% LVR, we compare how it's calculated across lenders — including waivers for some professions.",
      },
      {
        title: "First Home Buyer support",
        description: "Guidance through grants and government schemes you may be eligible for, alongside your loan comparison.",
      },
      {
        title: "Split-rate flexibility",
        description: "Fix part of your rate for certainty and leave the rest variable for offset access — a structure many first-time buyers don't know exists.",
      },
    ],
    faqs: [
      {
        q: "How much can I actually borrow?",
        a: "It depends on your income, expenses, existing debts and the 3% serviceability buffer lenders apply on top of the loan rate. Our borrowing power calculator gives a same-day estimate, and a full assessment refines it further.",
      },
      {
        q: "Do I need a 20% deposit?",
        a: "No — many lenders on our panel go up to 95% LVR. Above 80% LVR, Lenders Mortgage Insurance (LMI) typically applies, which we factor into the comparison.",
      },
      {
        q: "What's the difference between fixed, variable and split?",
        a: "Fixed locks your rate for a set term (certainty, less flexibility). Variable moves with the market (more flexibility, less certainty). Split does both on different portions of the same loan.",
      },
      {
        q: "Can I get pre-approved before I've found a property?",
        a: "Yes — most buyers get pre-approved first, which gives a clear budget and stronger negotiating position at inspections and auctions.",
      },
    ],
    tip: "Ask about split-rate structuring before you fix — most first home buyers only find out it exists after they've already locked in a fully fixed rate.",
    calculatorHref: "/calculators/borrowing-power",
    calculatorLabel: "Estimate your borrowing power",
  },

  "investment-loan": {
    slug: "investment-loan",
    heroImage: "/images/home.jpg",
    headline: "Finance built to grow your portfolio, not just settle one property",
    subhead:
      "An investment loan does more work than an owner-occupied one — it needs to support serviceability for the property after this one. We structure lending around interest-only terms, cross-collateralisation risk and offset access, so your next purchase isn't harder because of how this one was set up.",
    keyFacts: ["Interest-Only to 5 yrs", "Up to 90% LVR", "Fixed & variable"],
    whoItsFor: [
      "First-time property investors comparing structures before they buy",
      "Portfolio builders adding a second, third or fourth property",
      "Investors using equity from an existing home to fund a deposit",
      "Interstate or interstate-remote buyers who want a broker managing the process",
    ],
    process: [
      {
        title: "Portfolio-aware assessment",
        description: "We look at how this loan affects your ability to borrow again later, not just whether it's approved today.",
      },
      {
        title: "Structure comparison",
        description: "Interest-only vs P&I, standalone vs cross-collateralised security — we lay out the trade-offs across panel lenders.",
      },
      {
        title: "Equity & deposit strategy",
        description: "If you're using equity from an existing property, we coordinate valuations and structure the deposit correctly.",
      },
      {
        title: "Settlement & ongoing structure",
        description: "We settle the loan and keep an eye on refinance opportunities as your portfolio and equity position grow.",
      },
    ],
    features: [
      {
        title: "Interest-only structuring",
        description: "Free up cash flow during the investment phase with interest-only terms, where it genuinely suits your strategy.",
      },
      {
        title: "Avoiding cross-collateralisation",
        description: "We default to standalone security wherever possible, so one property's growth isn't tied up in another's loan.",
      },
      {
        title: "Offset on investment lending",
        description: "Not every lender offers offset accounts on investment loans at competitive rates — we know which ones do.",
      },
      {
        title: "Depreciation-friendly structuring",
        description: "We loop in your accountant's depreciation schedule when it affects how a loan should be structured.",
      },
    ],
    faqs: [
      {
        q: "Interest-only or principal & interest for an investment property?",
        a: "Interest-only frees up cash flow but doesn't reduce the loan balance. The right choice depends on your strategy, tax position and how long you plan to hold — worth discussing before you decide.",
      },
      {
        q: "Can I use equity from my home to fund the deposit?",
        a: "Often yes, via a separate loan split secured against your existing property. We keep this structured as standalone security where we can, rather than cross-collateralised.",
      },
      {
        q: "What's cross-collateralisation and why does it matter?",
        a: "It's when one loan is secured against multiple properties. It can limit your flexibility to sell or refinance one property independently — something we try to avoid by default.",
      },
      {
        q: "How does negative gearing affect what I can borrow?",
        a: "Lenders treat rental income and any tax benefit differently — some shade rental income, others factor gearing losses into serviceability. We compare how your numbers actually land across the panel.",
      },
    ],
    tip: "Ask specifically whether your loan will be standalone or cross-collateralised before you sign — it's one of the most common structuring mistakes we see investors inherit from their first lender.",
    calculatorHref: "/calculators/borrowing-power",
    calculatorLabel: "Check your investment borrowing power",
  },

  "smsf-home-loan": {
    slug: "smsf-home-loan",
    heroImage: "/images/smsf.jpg",
    headline: "Property investment through your super, structured to stay compliant",
    subhead:
      "SMSF lending runs through a Limited Recourse Borrowing Arrangement (LRBA) and a bare trust — get the structure wrong and it's not just a lending problem, it's a compliance one. We work alongside your accountant or financial adviser to get the lending side right.",
    keyFacts: ["LRBA structure", "Up to ~80% LVR", "Residential & commercial"],
    whoItsFor: [
      "SMSF trustees looking to add property to the fund's investment strategy",
      "Business owners wanting their SMSF to hold the commercial premises they operate from",
      "Trustees who already have a financial adviser and need the lending side coordinated",
      "Funds with sufficient liquidity to meet the SMSF lending deposit and cost requirements",
    ],
    process: [
      {
        title: "Eligibility & structure check",
        description: "We confirm the fund's position and coordinate with your financial adviser or accountant before anything is submitted to a lender — this isn't a loan we push without that in place.",
      },
      {
        title: "Panel comparison for SMSF lending",
        description: "Not every lender offers LRBA lending, and terms vary — we compare the ones who do against your fund's specific position.",
      },
      {
        title: "Bare trust & LRBA documentation",
        description: "We coordinate the paperwork between your lender, trustee and legal advisers so the borrowing structure is set up correctly.",
      },
      {
        title: "Settlement into the trustee structure",
        description: "The property settles into the bare trust on behalf of the SMSF, with the loan structured as limited recourse to the fund.",
      },
    ],
    features: [
      {
        title: "LRBA-compliant lending",
        description: "Loans structured specifically as limited recourse borrowing arrangements, as required for SMSF property purchases.",
      },
      {
        title: "Works with your advisers",
        description: "We coordinate directly with your financial adviser and accountant rather than working around them.",
      },
      {
        title: "Residential & commercial property",
        description: "Including business real property your own SMSF-linked business may operate from, subject to the fund's rules.",
      },
      {
        title: "Single acquirable asset awareness",
        description: "We structure lending around the single-asset rule that governs what an SMSF can borrow against.",
      },
    ],
    faqs: [
      {
        q: "What is an LRBA, in plain terms?",
        a: "A Limited Recourse Borrowing Arrangement lets an SMSF borrow to buy a single asset, held in a separate bare trust, where the lender's recourse if things go wrong is limited to that asset — not the fund's other assets.",
      },
      {
        q: "Do I need a financial adviser to get an SMSF loan?",
        a: "We strongly recommend it, and many lenders expect to see evidence of financial advice before approving SMSF lending. This is credit assistance, not financial advice — the two need to work together here.",
      },
      {
        q: "Can my SMSF buy the premises my business operates from?",
        a: "Often yes, as business real property, provided the arrangement meets superannuation law requirements — this is exactly the kind of structure we'd confirm with your adviser first.",
      },
      {
        q: "What deposit does the SMSF need?",
        a: "SMSF lending typically requires a larger deposit than standard residential lending, and the fund needs to retain enough liquidity to cover its other obligations — we factor this into the comparison.",
      },
    ],
    tip: "Loop in your financial adviser before we approach lenders, not after — SMSF lending decisions and superannuation strategy need to be made together, not in sequence.",
    calculatorHref: "/calculators/repayments",
    calculatorLabel: "Model SMSF loan repayments",
  },

  "trust-loan": {
    slug: "trust-loan",
    heroImage: "/images/trust.jpg",
    headline: "Lending structured around your trust, not against it",
    subhead:
      "Discretionary trusts, unit trusts and corporate trustees each change how a lender assesses an application. We handle the structuring conversation with your accountant so the loan matches the trust deed, not the other way around.",
    keyFacts: ["Discretionary & unit trusts", "Corporate trustee lending", "Guarantor structures"],
    whoItsFor: [
      "Families using a discretionary trust for asset protection or tax planning",
      "Investors buying property through a unit trust structure",
      "Business owners whose accountant has recommended a trust for a purchase",
      "Trustees who need a broker comfortable reading a trust deed, not just a payslip",
    ],
    process: [
      {
        title: "Trust deed & structure review",
        description: "We review the trust deed and borrowing powers alongside your accountant before approaching any lender.",
      },
      {
        title: "Panel comparison for trust lending",
        description: "Trust lending policies vary significantly between lenders — we compare which ones will actually work with your structure.",
      },
      {
        title: "Guarantor & security documentation",
        description: "Where personal guarantees from trustees or beneficiaries are required, we manage that documentation clearly upfront.",
      },
      {
        title: "Settlement in the trust's name",
        description: "The loan and property settle correctly in the name of the trustee, on behalf of the trust.",
      },
    ],
    features: [
      {
        title: "Corporate & individual trustee lending",
        description: "Whether your trustee is a company or an individual, we match you to lenders comfortable with that structure.",
      },
      {
        title: "Guarantor loan structuring",
        description: "Clear guidance on when and why a personal guarantee is required, and how it affects trustees individually.",
      },
      {
        title: "Asset-protection aware",
        description: "We structure lending in a way that respects why the trust exists in the first place — not just to get a loan approved.",
      },
      {
        title: "Works with your accountant",
        description: "We coordinate directly with your accountant or trust adviser rather than duplicating that conversation.",
      },
    ],
    faqs: [
      {
        q: "Can a trust borrow money the same way an individual can?",
        a: "Yes, but the lender assesses the trustee's borrowing power under the trust deed, and often looks through to the beneficiaries — it's a different assessment path to a standard personal application.",
      },
      {
        q: "Do trustees have to personally guarantee the loan?",
        a: "Often yes, particularly with a corporate trustee that has limited assets of its own. We'll tell you upfront if a lender requires this.",
      },
      {
        q: "What documents will the lender want from the trust?",
        a: "Typically the trust deed, any deed of variation, and evidence of the trustee's authority to borrow — we compile this checklist with your accountant before submission.",
      },
      {
        q: "Is this different from a normal home loan application?",
        a: "Structurally yes — the entity borrowing is the trustee, not you personally, which changes the paperwork and which lenders are a fit, even if the property itself is a standard purchase.",
      },
    ],
    tip: "Send us the trust deed early — the borrowing clause alone can rule out or rule in half the lender panel before we even discuss rates.",
    calculatorHref: "/calculators/repayments",
    calculatorLabel: "Model trust loan repayments",
  },

  "company-loan": {
    slug: "company-loan",
    heroImage: "/images/company.jpg",
    headline: "Finance in your company's name, backed by the right structure",
    subhead:
      "Borrowing through a Pty Ltd company changes what a lender wants to see — trading history, director guarantees and company financials, not just a payslip. We package the application the way a commercial credit team actually wants to read it.",
    keyFacts: ["Corporate borrower lending", "Director guarantees may apply", "Property & asset finance"],
    whoItsFor: [
      "Pty Ltd companies purchasing commercial or investment property",
      "Companies financing vehicles or equipment in the business name",
      "Group structures with a holding company and multiple trading entities",
      "Directors who want the loan on the company's balance sheet, not their own",
    ],
    process: [
      {
        title: "Company structure & financials review",
        description: "We review trading history, financials and group structure to understand how a lender will read the application.",
      },
      {
        title: "Panel comparison for corporate borrowers",
        description: "We compare lenders who lend confidently to trading companies, including newer entities where the financials support it.",
      },
      {
        title: "Director guarantee & security documentation",
        description: "Where a director guarantee is required, we make sure it's understood and documented clearly before signing.",
      },
      {
        title: "Settlement in the company's name",
        description: "The loan and any security settle correctly against the company as borrower.",
      },
    ],
    features: [
      {
        title: "Pty Ltd & group lending",
        description: "Lending structured for single trading companies through to multi-entity group structures.",
      },
      {
        title: "Director guarantee structuring",
        description: "Clarity on what's being guaranteed and by whom, before you're asked to sign anything.",
      },
      {
        title: "Commercial & residential property",
        description: "Property purchased in the company's name, whether for the business to occupy or as an investment.",
      },
      {
        title: "Works with your accountant",
        description: "We coordinate directly on financials and structure with your company's accountant.",
      },
    ],
    faqs: [
      {
        q: "Does the company need a long trading history?",
        a: "It helps, but newer companies can still qualify depending on the director's experience, the financials, and the security offered — we'll tell you honestly where you sit.",
      },
      {
        q: "Do directors have to personally guarantee the loan?",
        a: "Frequently, particularly for smaller or newer companies with limited assets of their own. We flag this upfront rather than after an application's underway.",
      },
      {
        q: "Can a brand-new company borrow?",
        a: "Sometimes, especially with strong director experience and adequate security — but options are more limited than for an established trading entity.",
      },
      {
        q: "What financials will lenders ask for?",
        a: "Typically the last two years of financial statements and tax returns, current BAS, and a company structure chart if there's a group involved.",
      },
    ],
    tip: "Get your accountant to prepare a one-page group structure chart before we submit anything — it answers half the credit team's questions before they ask them.",
    calculatorHref: "/calculators/repayments",
    calculatorLabel: "Model company loan repayments",
  },

  "car-loan": {
    slug: "car-loan",
    heroImage: "/images/car.jpg",
    headline: "Finance sorted before you fall for the car",
    subhead:
      "Walking onto a lot with finance already approved changes the entire negotiation. We compare fixed-rate terms, balloon options and private-sale eligibility across our panel, so you're choosing a car — not being sold a finance package.",
    keyFacts: ["New & used vehicles", "Terms 1–7 years", "Balloon options available"],
    whoItsFor: [
      "Private buyers who want pre-approval before they start shopping",
      "Sole traders and tradies financing a work vehicle",
      "Buyers considering a private sale, not just a dealership",
      "Anyone trading in an existing vehicle as part of the purchase",
    ],
    process: [
      {
        title: "Pre-approval before you shop",
        description: "We get your finance approved first, so you know your budget before you fall for a specific car.",
      },
      {
        title: "Compare the panel",
        description: "Fixed rate, term length and balloon payment options compared across lenders for your actual numbers.",
      },
      {
        title: "Choose your vehicle",
        description: "Shop with confidence, whether it's a dealership, private sale or trade-in — your finance is already sorted.",
      },
      {
        title: "Settlement to the seller",
        description: "Funds are released directly to the dealer or private seller once contracts are finalised.",
      },
    ],
    features: [
      {
        title: "Fixed-rate certainty",
        description: "Know your exact repayment for the life of the loan, with no surprises from rate movements.",
      },
      {
        title: "Balloon payment options",
        description: "Lower your monthly repayment with a structured balloon, where it suits how long you plan to keep the car.",
      },
      {
        title: "Private sale eligible",
        description: "Buying from a private seller, not just a dealership? Many of our panel lenders support it.",
      },
      {
        title: "Fast pre-approval",
        description: "Get a clear approval and budget quickly, so you're not waiting on finance once you've found the right car.",
      },
    ],
    faqs: [
      {
        q: "Can I get pre-approved before I've chosen a car?",
        a: "Yes — most buyers get pre-approved first, which gives a clear budget and stronger position when negotiating on price.",
      },
      {
        q: "Fixed rate or a balloon payment — what's the difference?",
        a: "A fixed rate keeps your repayment the same for the full term. Adding a balloon lowers your monthly repayment but leaves a lump sum owing at the end of the term.",
      },
      {
        q: "Can I finance a car bought from a private seller?",
        a: "Often yes, depending on the lender — we'll confirm which panel lenders support private sales for your situation.",
      },
      {
        q: "Will a car loan affect how much I can borrow for a home loan?",
        a: "Yes — it's counted as an existing commitment in serviceability calculations, so timing matters if you're planning both.",
      },
    ],
    tip: "If you're planning to apply for a home loan in the next 12 months, get that conversation started before you commit to a car loan — the repayment affects your borrowing power either way.",
    calculatorHref: "/calculators/repayments",
    calculatorLabel: "Estimate car loan repayments",
  },

  "business-loan": {
    slug: "business-loan",
    heroImage: "/images/business.jpg",
    headline: "Funding that matches how your business actually earns",
    subhead:
      "Working capital, stock, expansion or a seasonal cash flow gap all need a different kind of funding. We compare secured and unsecured options across our panel so the repayment structure matches how money actually moves through your business.",
    keyFacts: ["Secured & unsecured", "Terms 1–5 years", "Fast turnaround available"],
    whoItsFor: [
      "Business owners needing working capital to smooth cash flow",
      "Businesses funding stock, expansion or a new location",
      "Seasonal businesses managing predictable cash flow gaps",
      "Owners who want options compared rather than a single lender's offer",
    ],
    process: [
      {
        title: "Understand the funding need",
        description: "We start with what the funding is actually for and how repayments should track against your cash flow.",
      },
      {
        title: "Compare secured & unsecured options",
        description: "We lay out the trade-offs — rate, speed, security required — across lenders on our panel.",
      },
      {
        title: "Application & financials",
        description: "We prepare and submit the application and supporting financials on your behalf.",
      },
      {
        title: "Funds released",
        description: "Once approved, funds are released to your business, often faster than a standard property loan.",
      },
    ],
    features: [
      {
        title: "Unsecured lending options",
        description: "Access funding without offering property as security, where your business financials support it.",
      },
      {
        title: "Secured lending",
        description: "Lower rates available when security — property or other assets — backs the facility.",
      },
      {
        title: "Working capital & expansion",
        description: "Facilities structured for everyday cash flow through to funding genuine growth.",
      },
      {
        title: "Fast turnaround",
        description: "Many unsecured facilities can be approved and funded significantly faster than property-secured lending.",
      },
    ],
    faqs: [
      {
        q: "Secured or unsecured — which is right for my business?",
        a: "Unsecured is faster and doesn't require property as security, but typically costs more. Secured lending is usually cheaper but ties up an asset — the right call depends on your cash flow and what you're funding.",
      },
      {
        q: "What financials do I need to provide?",
        a: "Typically recent BAS, bank statements and financial statements — the exact list depends on the lender and facility size.",
      },
      {
        q: "Can a newer business qualify?",
        a: "Some panel lenders will consider businesses with as little as 6–12 months of trading history, particularly for smaller unsecured facilities.",
      },
      {
        q: "How fast can funds actually be released?",
        a: "Some unsecured business facilities can be approved and funded within days — we'll give you a realistic timeframe once we know the facility type.",
      },
    ],
    tip: "Have your last 6 months of bank statements ready before we start — it's the single fastest way to speed up an unsecured business loan assessment.",
    calculatorHref: "/calculators/repayments",
    calculatorLabel: "Model business loan repayments",
  },

  "construction-loan": {
    slug: "construction-loan",
    heroImage: "/images/construction.jpg",
    headline: "Funding released stage by stage, matched to your build",
    subhead:
      "A construction loan isn't a lump sum — it's progressive drawdowns tied to your builder's fixed-price contract, with interest charged only on funds you've actually drawn. We manage the lender side of that process so it keeps pace with your build.",
    keyFacts: ["Progressive drawdown", "Interest-only during build", "Fixed-price contract required"],
    whoItsFor: [
      "Buyers building a new home on a vacant block",
      "Homeowners undertaking a major knockdown-rebuild",
      "Buyers with a fixed-price contract from a licensed builder",
      "Anyone who wants the lender side of a build managed for them, not left to chase",
    ],
    process: [
      {
        title: "Contract & plans review",
        description: "We review your fixed-price building contract and plans before approaching lenders, so nothing holds up approval later.",
      },
      {
        title: "Panel comparison for construction lending",
        description: "Not every lender handles construction the same way — we compare valuation requirements, drawdown fees and rate treatment.",
      },
      {
        title: "Progressive drawdowns",
        description: "Funds are released at each construction stage as your builder invoices, with a valuation check at each milestone.",
      },
      {
        title: "Converts to a standard loan",
        description: "Once the build is complete, the facility converts automatically to a standard principal & interest home loan.",
      },
    ],
    features: [
      {
        title: "Stage payments matched to your builder",
        description: "Drawdowns aligned to your builder's payment schedule — slab, frame, lock-up, fit-out and completion.",
      },
      {
        title: "Interest on funds drawn only",
        description: "You're not paying interest on the full loan amount from day one, only on what's actually been released.",
      },
      {
        title: "Valuation at each stage",
        description: "Lenders check progress at each drawdown, which we help coordinate so it doesn't delay your builder's invoices.",
      },
      {
        title: "Knockdown-rebuild & vacant land",
        description: "Structured for both a straightforward vacant-land build and a knockdown-rebuild on your existing block.",
      },
    ],
    faqs: [
      {
        q: "How do progress payments actually work?",
        a: "Your builder invoices at each stage of the fixed-price contract — slab, frame, lock-up, fit-out, completion — and the lender releases funds against each invoice after a valuation check.",
      },
      {
        q: "Do I pay interest on the full loan amount straight away?",
        a: "No — interest is generally charged only on the portion of the loan that's actually been drawn down at each stage, not the full approved amount.",
      },
      {
        q: "What happens if the build goes over budget or over time?",
        a: "This is worth discussing with us and your builder early — cost overruns can require additional funds to be approved, and delays can affect fixed-rate lock-in periods.",
      },
      {
        q: "Can this be used for a knockdown-rebuild?",
        a: "Yes — the same progressive drawdown structure applies whether you're building on vacant land or rebuilding on your existing block.",
      },
    ],
    tip: "Lock in your builder's fixed-price contract before we submit to lenders — a contract that's still subject to change is one of the most common causes of delayed construction loan approval.",
    calculatorHref: "/calculators/repayments",
    calculatorLabel: "Model construction loan repayments",
  },

  "commercial-loan": {
    slug: "commercial-loan",
    heroImage: "/images/comercial.jpg",
    headline: "Commercial property finance built around the asset and the tenant",
    subhead:
      "Commercial lending is assessed differently to residential — the property type, lease terms and tenant strength all shape what a lender will offer. We compare panel lenders on that basis, not by treating it like a standard home loan with a bigger number.",
    keyFacts: ["Up to ~70–80% LVR", "Owner-occupied & investment", "Terms up to 15–25 years"],
    whoItsFor: [
      "Business owners buying the premises they operate from",
      "Investors purchasing leased office, retail or industrial property",
      "SMSF trustees acquiring commercial property for the fund",
      "Buyers of specialised property types that don't fit standard residential lending",
    ],
    process: [
      {
        title: "Property & lease review",
        description: "We assess the property type and, for investment purchases, the strength and term of any existing lease.",
      },
      {
        title: "Panel comparison for commercial lending",
        description: "Commercial lending policy and pricing vary widely between lenders — we compare on your specific property and use case.",
      },
      {
        title: "Valuation & due diligence",
        description: "We coordinate valuation and any due diligence the lender requires ahead of formal approval.",
      },
      {
        title: "Settlement & ongoing structure",
        description: "We settle the loan and review the structure again as lease terms or your business needs change.",
      },
    ],
    features: [
      {
        title: "Owner-occupied & investment lending",
        description: "Whether you're buying premises to operate from or as a leased investment, we compare both pathways.",
      },
      {
        title: "Lease-backed serviceability",
        description: "For investment purchases, we factor lease income and tenant strength into how much you can borrow.",
      },
      {
        title: "All commercial property types",
        description: "Office, retail, industrial and specialised property, each assessed on its own lending criteria.",
      },
      {
        title: "SMSF commercial pathway",
        description: "If your SMSF is the buyer, we coordinate this alongside our SMSF lending process to stay compliant.",
      },
    ],
    faqs: [
      {
        q: "How is commercial lending different from a home loan?",
        a: "Lenders assess the property type, lease strength and often a shorter loan term with a higher rate than residential lending — the criteria are genuinely different, not just a bigger version of a home loan.",
      },
      {
        q: "Does a strong lease help me borrow more?",
        a: "Often yes — a long lease to a financially strong tenant can improve serviceability and lender appetite for the deal.",
      },
      {
        q: "What deposit is typically required?",
        a: "Commercial lending generally requires a larger deposit than residential — commonly in the order of 20–30%, though it varies by property type and lender.",
      },
      {
        q: "Can my SMSF buy the commercial premises my business uses?",
        a: "Potentially, as business real property held via an LRBA — see our SMSF lending page, and we'd coordinate this with your financial adviser.",
      },
    ],
    tip: "Get a copy of the current lease agreement to us early if this is an investment purchase — tenant strength and lease term can move the borrowing outcome more than the property itself.",
    calculatorHref: "/calculators/repayments",
    calculatorLabel: "Model commercial loan repayments",
  },

  "equipment-loan": {
    slug: "equipment-loan",
    heroImage: "/images/epiqipment.jpg",
    headline: "Keep your equipment moving without draining cash flow",
    subhead:
      "Machinery, trucks and tools rarely need to be paid for in cash to make financial sense. We compare chattel mortgage and lease structures across our panel so new or used equipment is financed in a way that suits your business, not just the supplier's finance desk.",
    keyFacts: ["New & used equipment", "Chattel mortgage or lease", "Terms 1–5 years"],
    whoItsFor: [
      "Tradies and contractors financing tools, utes or trailers",
      "Business owners upgrading or expanding machinery",
      "Fleet owners refreshing vehicles across the business",
      "Buyers comparing finance through us against a supplier's in-house offer",
    ],
    process: [
      {
        title: "Identify the equipment & structure",
        description: "We work out whether a chattel mortgage or lease structure suits your business and tax position.",
      },
      {
        title: "Compare the panel",
        description: "We compare rate, term and structure across lenders — including against any offer the supplier has already made you.",
      },
      {
        title: "Application & supplier coordination",
        description: "We handle the application and liaise directly with the equipment supplier or dealer.",
      },
      {
        title: "Settlement to the supplier",
        description: "Funds are released directly to the supplier once the finance is approved and documentation is complete.",
      },
    ],
    features: [
      {
        title: "Chattel mortgage & lease options",
        description: "The two most common structures for business equipment finance, compared side by side for your situation.",
      },
      {
        title: "New & used equipment",
        description: "Finance available for both brand-new machinery and quality used equipment, depending on the lender.",
      },
      {
        title: "Potential tax benefits",
        description: "Structures like chattel mortgage may offer tax advantages — confirm the specifics with your accountant.",
      },
      {
        title: "Fixed repayments",
        description: "Know exactly what you're paying each month, which makes budgeting around equipment costs straightforward.",
      },
    ],
    faqs: [
      {
        q: "Chattel mortgage or lease — what's the actual difference?",
        a: "With a chattel mortgage, you own the equipment from day one and the lender takes security over it. With a lease, the financier owns it and you pay to use it, often with an option to purchase at the end.",
      },
      {
        q: "Can I finance used equipment, not just new?",
        a: "Often yes, though terms, age limits and rates can differ from new equipment — we'll confirm what's available for the specific item.",
      },
      {
        q: "Are the repayments tax deductible?",
        a: "This depends on the structure and your business circumstances — we'd recommend confirming the specifics with your accountant before choosing a structure.",
      },
      {
        q: "How quickly can funds reach the supplier?",
        a: "For established businesses with straightforward equipment, approval and settlement can often happen within days.",
      },
    ],
    tip: "Get the supplier's own finance quote in writing before you sign anything — it gives us a real number to beat when we compare the panel.",
    calculatorHref: "/calculators/repayments",
    calculatorLabel: "Model equipment loan repayments",
  },
};

export function getLoanDetail(slug: string): LoanDetail | undefined {
  return loanDetails[slug];
}

export type { LoanIcon };
