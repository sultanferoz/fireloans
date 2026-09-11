/**
 * Stamp duty rates for all 8 AU states/territories, sourced by extracting the
 * "Rates and Thresholds" disclosure directly from the live VisionAbacus
 * widget embedded on accountinghomeloans.com.au (2026–27 rates)   not from
 * memory. Every bracket, FHB rule and fee below was captured verbatim and
 * cross-checked against that tool's own displayed output. Still: state
 * budgets change these, so treat this as "as accurate as the reference tool
 * itself," not as a live government feed.
 */

export type AuState = "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT";
export type PropertyType = "owner-occupied" | "investment";
export type PurchaseType = "established" | "new" | "vacant-land";

export type StampDutyInput = {
  state: AuState;
  propertyValue: number;
  isFirstHomeBuyer: boolean;
  propertyType: PropertyType;
  purchaseType: PurchaseType;
};

export type StampDutyResult = {
  stampDuty: number;
  mortgageRegistration: number;
  transferFee: number;
  totalGovernmentFees: number;
  firstHomeOwnerGrant: number;
  totalGovernmentGrant: number;
  concessionApplied: boolean;
};

type Bracket = { upTo: number; base: number; rate: number; over: number };
const INF = Number.POSITIVE_INFINITY;

function bracketDuty(value: number, brackets: Bracket[]): number {
  const bracket = brackets.find((b) => value <= b.upTo) ?? brackets[brackets.length - 1];
  return Math.max(0, bracket.base + (value - bracket.over) * bracket.rate);
}

// ---------------------------------------------------------------------------
// ACT   from 1 July 2025 general rates; FHB gets a full, uncapped exemption
// from 1 July 2026 (no income test, no value cap) for a principal residence.
// ---------------------------------------------------------------------------
const ACT_OWNER: Bracket[] = [
  { upTo: 260000, base: 0, rate: 0.0028, over: 0 },
  { upTo: 300000, base: 728, rate: 0.022, over: 260000 },
  { upTo: 500000, base: 1608, rate: 0.034, over: 300000 },
  { upTo: 750000, base: 8408, rate: 0.0432, over: 500000 },
  { upTo: 1000000, base: 19208, rate: 0.059, over: 750000 },
  { upTo: 1455000, base: 33958, rate: 0.064, over: 1000000 },
  { upTo: INF, base: 0, rate: 0.0454, over: 0 }, // flat rate of total value above this point
];
const ACT_INVESTOR: Bracket[] = [
  { upTo: 200000, base: 0, rate: 0.012, over: 0 },
  { upTo: 300000, base: 2400, rate: 0.022, over: 200000 },
  { upTo: 500000, base: 4600, rate: 0.034, over: 300000 },
  { upTo: 750000, base: 11400, rate: 0.0432, over: 500000 },
  { upTo: 1000000, base: 22200, rate: 0.059, over: 750000 },
  { upTo: 1455000, base: 36950, rate: 0.064, over: 1000000 },
  { upTo: INF, base: 0, rate: 0.0454, over: 0 },
];

function calcACT(input: StampDutyInput): { duty: number; concession: boolean } {
  const brackets = input.propertyType === "owner-occupied" ? ACT_OWNER : ACT_INVESTOR;
  const duty = bracketDuty(input.propertyValue, brackets);
  if (input.isFirstHomeBuyer && input.propertyType === "owner-occupied") {
    return { duty: 0, concession: true };
  }
  return { duty, concession: false };
}

// ---------------------------------------------------------------------------
// NSW   general rate from 1 July 2026. FHB Assistance: full exemption to
// $800k / taper to $1M for homes; full exemption to $350k / taper to $450k
// for vacant land.
// ---------------------------------------------------------------------------
const NSW_GENERAL: Bracket[] = [
  { upTo: 18000, base: 0, rate: 0.0125, over: 0 },
  { upTo: 38000, base: 225, rate: 0.015, over: 18000 },
  { upTo: 103000, base: 525, rate: 0.0175, over: 38000 },
  { upTo: 387000, base: 1662, rate: 0.035, over: 103000 },
  { upTo: 1290000, base: 11602, rate: 0.045, over: 387000 },
  { upTo: 3870000, base: 52237, rate: 0.055, over: 1290000 },
  { upTo: INF, base: 194137, rate: 0.07, over: 3870000 },
];

function taper(duty: number, value: number, fullExemptTo: number, concessionTo: number): number {
  if (value <= fullExemptTo) return 0;
  if (value < concessionTo) return duty * ((value - fullExemptTo) / (concessionTo - fullExemptTo));
  return duty;
}

function calcNSW(input: StampDutyInput): { duty: number; concession: boolean } {
  const duty = bracketDuty(input.propertyValue, NSW_GENERAL);
  if (!input.isFirstHomeBuyer) return { duty, concession: false };
  const isLand = input.purchaseType === "vacant-land";
  const tapered = isLand
    ? taper(duty, input.propertyValue, 350000, 450000)
    : taper(duty, input.propertyValue, 800000, 1000000);
  return { duty: tapered, concession: tapered < duty };
}

// ---------------------------------------------------------------------------
// NT   formula-based below $525k, flat percentage tiers above.
// ---------------------------------------------------------------------------
function ntDutyUnder525k(value: number): number {
  // V in the published formula is the value in thousands, not raw dollars  
  // using raw dollars here previously produced a duty figure in the
  // millions on an ordinary property. Verified against a known benchmark:
  // $500,000 -> $23,928.60.
  const v = value / 1000;
  return 0.06571441 * v * v + 15 * v;
}

function calcNT(input: StampDutyInput): { duty: number; concession: boolean } {
  const v = input.propertyValue;
  let duty: number;
  if (v <= 525000) duty = ntDutyUnder525k(v);
  else if (v < 3000000) duty = v * 0.0495;
  else if (v < 5000000) duty = v * 0.0575;
  else duty = v * 0.0595;

  if (input.isFirstHomeBuyer && input.purchaseType !== "established") {
    return { duty: 0, concession: true };
  }
  return { duty, concession: false };
}

// ---------------------------------------------------------------------------
// QLD   separate "Home Concession" rate for owner-occupiers vs the general
// rate for investors. FHB: full exemption for new/vacant land (no cap);
// established homes get the Home Concession rate minus a sliding rebate
// that phases out between $700k and $800k.
// ---------------------------------------------------------------------------
const QLD_GENERAL: Bracket[] = [
  { upTo: 5000, base: 0, rate: 0, over: 0 },
  { upTo: 75000, base: 0, rate: 0.015, over: 5000 },
  { upTo: 540000, base: 1050, rate: 0.035, over: 75000 },
  { upTo: 1000000, base: 17325, rate: 0.045, over: 540000 },
  { upTo: INF, base: 38025, rate: 0.0575, over: 1000000 },
];
const QLD_HOME_CONCESSION: Bracket[] = [
  { upTo: 350000, base: 0, rate: 0.01, over: 0 },
  { upTo: 540000, base: 3500, rate: 0.035, over: 350000 },
  { upTo: 1000000, base: 10150, rate: 0.045, over: 540000 },
  { upTo: INF, base: 30850, rate: 0.0575, over: 1000000 },
];

function qldFhbEstablishedRebate(value: number): number {
  if (value >= 800000) return 0;
  if (value < 700000) return 17350;
  return (17350 * (800000 - value)) / 100000;
}

function calcQLD(input: StampDutyInput): { duty: number; concession: boolean } {
  const isOwnerOcc = input.propertyType === "owner-occupied";
  const baseDuty = bracketDuty(input.propertyValue, isOwnerOcc ? QLD_HOME_CONCESSION : QLD_GENERAL);

  if (input.isFirstHomeBuyer && isOwnerOcc) {
    if (input.purchaseType !== "established") return { duty: 0, concession: true };
    const rebated = Math.max(0, baseDuty - qldFhbEstablishedRebate(input.propertyValue));
    return { duty: rebated, concession: rebated < baseDuty };
  }
  return { duty: baseDuty, concession: false };
}

// ---------------------------------------------------------------------------
// SA   single rate scale for all buyers. Full FHB relief (uncapped) for new
// homes / vacant land to build, since 6 June 2024.
// ---------------------------------------------------------------------------
const SA_GENERAL: Bracket[] = [
  { upTo: 12000, base: 0, rate: 0.01, over: 0 },
  { upTo: 30000, base: 120, rate: 0.02, over: 12000 },
  { upTo: 50000, base: 480, rate: 0.03, over: 30000 },
  { upTo: 100000, base: 1080, rate: 0.035, over: 50000 },
  { upTo: 200000, base: 2830, rate: 0.04, over: 100000 },
  { upTo: 250000, base: 6830, rate: 0.0425, over: 200000 },
  { upTo: 300000, base: 8955, rate: 0.0475, over: 250000 },
  { upTo: 500000, base: 11330, rate: 0.05, over: 300000 },
  { upTo: INF, base: 21330, rate: 0.055, over: 500000 },
];

function calcSA(input: StampDutyInput): { duty: number; concession: boolean } {
  const duty = bracketDuty(input.propertyValue, SA_GENERAL);
  if (input.isFirstHomeBuyer && input.purchaseType !== "established") {
    return { duty: 0, concession: true };
  }
  return { duty, concession: false };
}

// ---------------------------------------------------------------------------
// TAS   single rate scale. No stamp duty concession currently listed for
// FHB (the grant is the only FHB benefit)   a past concession has lapsed.
// ---------------------------------------------------------------------------
const TAS_GENERAL: Bracket[] = [
  { upTo: 3000, base: 50, rate: 0, over: 0 },
  { upTo: 25000, base: 50, rate: 0.0175, over: 3000 },
  { upTo: 75000, base: 435, rate: 0.0225, over: 25000 },
  { upTo: 200000, base: 1560, rate: 0.035, over: 75000 },
  { upTo: 375000, base: 5935, rate: 0.04, over: 200000 },
  { upTo: 725000, base: 12935, rate: 0.0425, over: 375000 },
  { upTo: INF, base: 27810, rate: 0.045, over: 725000 },
];

function calcTAS(input: StampDutyInput): { duty: number; concession: boolean } {
  return { duty: bracketDuty(input.propertyValue, TAS_GENERAL), concession: false };
}

// ---------------------------------------------------------------------------
// VIC   separate Principal Place of Residence (PPR) rate applies only
// between $130k–$550k; outside that band even owner-occupiers pay the
// general/non-PPR rate. FHB: full exemption to $600k / taper to $750k.
// ---------------------------------------------------------------------------
const VIC_NON_PPR: Bracket[] = [
  { upTo: 25000, base: 0, rate: 0.014, over: 0 },
  { upTo: 130000, base: 350, rate: 0.024, over: 25000 },
  { upTo: 960000, base: 2870, rate: 0.06, over: 130000 },
  { upTo: 2000000, base: 0, rate: 0.055, over: 0 }, // flat rate of total value
  { upTo: INF, base: 110000, rate: 0.065, over: 2000000 },
];

function calcVIC(input: StampDutyInput): { duty: number; concession: boolean } {
  const v = input.propertyValue;
  let duty: number;
  if (input.propertyType === "owner-occupied" && v > 130000 && v <= 550000) {
    duty = v <= 440000 ? 2870 + (v - 130000) * 0.05 : 18370 + (v - 440000) * 0.06;
  } else {
    duty = bracketDuty(v, VIC_NON_PPR);
  }

  if (input.isFirstHomeBuyer && input.propertyType === "owner-occupied") {
    const tapered = taper(duty, v, 600000, 750000);
    return { duty: tapered, concession: tapered < duty };
  }
  return { duty, concession: false };
}

// ---------------------------------------------------------------------------
// WA   general rate scale. FHB has its own standalone formula (not a taper
// of the general rate): free to $600k, then $16.15 per $100 up to $800k
// (Perth metro/Peel   regional caps differ and aren't modelled here).
// ---------------------------------------------------------------------------
const WA_GENERAL: Bracket[] = [
  { upTo: 120000, base: 0, rate: 0.019, over: 0 },
  { upTo: 150000, base: 2280, rate: 0.0285, over: 120000 },
  { upTo: 360000, base: 3135, rate: 0.038, over: 150000 },
  { upTo: 725000, base: 11115, rate: 0.0475, over: 360000 },
  { upTo: INF, base: 28453, rate: 0.0515, over: 725000 },
];

function calcWA(input: StampDutyInput): { duty: number; concession: boolean } {
  const v = input.propertyValue;
  const generalDuty = bracketDuty(v, WA_GENERAL);

  if (input.isFirstHomeBuyer && input.propertyType === "owner-occupied") {
    if (input.purchaseType === "vacant-land") {
      if (v <= 450000) return { duty: 0, concession: true };
      if (v <= 550000) return { duty: (v - 450000) * 0.2014, concession: true };
      return { duty: generalDuty, concession: false };
    }
    if (v <= 600000) return { duty: 0, concession: true };
    if (v <= 800000) return { duty: (v - 600000) * 0.1615, concession: true };
  }
  return { duty: generalDuty, concession: false };
}

// ---------------------------------------------------------------------------
// Registration/transfer fees and FHOG per state   also pulled from the same
// disclosure. Several states have small tiered transfer-fee tables; the
// common/lower tiers are modelled, higher tiers fall back to the top rate.
// ---------------------------------------------------------------------------
type StateFees = {
  mortgageRegistration: number;
  transferFee: (value: number) => number;
  grant: number;
  grantMaxValue: number;
};

const STATE_FEES: Record<AuState, StateFees> = {
  ACT: { mortgageRegistration: 184, transferFee: () => 496, grant: 0, grantMaxValue: 0 },
  NSW: { mortgageRegistration: 182.73, transferFee: () => 182.73, grant: 10000, grantMaxValue: 600000 },
  NT: { mortgageRegistration: 181, transferFee: () => 181, grant: 50000, grantMaxValue: INF },
  QLD: {
    mortgageRegistration: 248.04,
    transferFee: (v) => 248.04 + Math.ceil(Math.max(0, v - 180000) / 10000) * 46.56,
    grant: 30000,
    grantMaxValue: 750000,
  },
  SA: {
    mortgageRegistration: 204,
    transferFee: (v) => (v <= 5000 ? 204 : v <= 20000 ? 228 : v <= 40000 ? 251 : v <= 50000 ? 353 : 353 + Math.ceil((v - 50000) / 10000) * 102),
    grant: 15000,
    grantMaxValue: INF,
  },
  TAS: { mortgageRegistration: 167.58, transferFee: () => 256.76, grant: 20000, grantMaxValue: INF },
  VIC: { mortgageRegistration: 129.2, transferFee: () => 110, grant: 10000, grantMaxValue: 750000 },
  WA: {
    mortgageRegistration: 225.1,
    transferFee: waTransferFee,
    grant: 10000,
    grantMaxValue: 800000,
  },
};

// WA's registration-fee tiers are irregular below $200k ($85k/$120k/$200k
// bands) before settling into even $100k steps   a formula can't reproduce
// that, so this is the exact published table.
const WA_TRANSFER_TIERS: [number, number][] = [
  [85000, 225.1],
  [120000, 235.1],
  [200000, 255.1],
  [300000, 275.1],
  [400000, 295.1],
  [500000, 315.1],
  [600000, 335.1],
  [700000, 355.1],
  [800000, 375.1],
  [900000, 395.1],
  [1000000, 415.1],
  [1100000, 435.1],
  [1200000, 455.1],
  [1300000, 475.1],
  [1400000, 495.1],
  [1500000, 515.1],
  [1600000, 535.1],
  [1700000, 555.1],
  [1800000, 575.1],
  [1900000, 595.1],
  [2000000, 615.1],
];

function waTransferFee(value: number): number {
  const tier = WA_TRANSFER_TIERS.find(([upTo]) => value <= upTo);
  if (tier) return tier[1];
  return 615.1 + Math.ceil((value - 2000000) / 100000) * 20;
}

const CALCULATORS: Record<AuState, (input: StampDutyInput) => { duty: number; concession: boolean }> = {
  ACT: calcACT,
  NSW: calcNSW,
  NT: calcNT,
  QLD: calcQLD,
  SA: calcSA,
  TAS: calcTAS,
  VIC: calcVIC,
  WA: calcWA,
};

export function calculateStampDuty(input: StampDutyInput): StampDutyResult {
  const { duty, concession } = CALCULATORS[input.state](input);
  const fees = STATE_FEES[input.state];

  const firstHomeOwnerGrant =
    input.isFirstHomeBuyer && input.purchaseType !== "established" && input.propertyValue <= fees.grantMaxValue
      ? fees.grant
      : 0;

  const mortgageRegistration = fees.mortgageRegistration;
  const transferFee = fees.transferFee(input.propertyValue);
  const stampDuty = Math.round(duty);

  return {
    stampDuty,
    mortgageRegistration: Math.round(mortgageRegistration * 100) / 100,
    transferFee: Math.round(transferFee * 100) / 100,
    totalGovernmentFees: Math.round(stampDuty + mortgageRegistration + transferFee),
    firstHomeOwnerGrant,
    totalGovernmentGrant: firstHomeOwnerGrant,
    concessionApplied: concession,
  };
}

export const AU_STATES: { code: AuState; label: string }[] = [
  { code: "NSW", label: "NSW" },
  { code: "VIC", label: "VIC" },
  { code: "QLD", label: "QLD" },
  { code: "WA", label: "WA" },
  { code: "SA", label: "SA" },
  { code: "TAS", label: "TAS" },
  { code: "ACT", label: "ACT" },
  { code: "NT", label: "NT" },
];
