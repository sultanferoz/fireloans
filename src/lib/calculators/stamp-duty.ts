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

function bracketDuty(value: number, brackets: Bracket[]): number {
  const bracket = brackets.find((b) => value <= b.upTo) ?? brackets[brackets.length - 1];
  return Math.max(0, bracket.base + (value - bracket.over) * bracket.rate);
}

type StateConfig = {
  brackets: Bracket[];
  mortgageRegistration: number;
  transferFee: number;
  fhb: {
    fullExemptionUpTo: number;
    concessionUpTo: number;
    grant: number;
    grantMaxValue: number;
    /** Some states (e.g. SA) only offer FHB relief on new builds/vacant land */
    newOnly?: boolean;
  };
};

const INF = Number.POSITIVE_INFINITY;

const STATE_CONFIG: Record<AuState, StateConfig> = {
  NSW: {
    brackets: [
      { upTo: 17000, base: 20, rate: 0.0125, over: 0 },
      { upTo: 36000, base: 212, rate: 0.015, over: 17000 },
      { upTo: 97000, base: 497, rate: 0.0175, over: 36000 },
      { upTo: 364000, base: 1564, rate: 0.035, over: 97000 },
      { upTo: 1212000, base: 10909, rate: 0.045, over: 364000 },
      { upTo: INF, base: 49069, rate: 0.055, over: 1212000 },
    ],
    mortgageRegistration: 154,
    transferFee: 154,
    fhb: { fullExemptionUpTo: 800000, concessionUpTo: 1000000, grant: 10000, grantMaxValue: 750000 },
  },
  VIC: {
    brackets: [
      { upTo: 25000, base: 0, rate: 0.014, over: 0 },
      { upTo: 130000, base: 350, rate: 0.024, over: 25000 },
      { upTo: 960000, base: 2870, rate: 0.06, over: 130000 },
      { upTo: 2000000, base: 0, rate: 0.055, over: 0 },
      { upTo: INF, base: 110000, rate: 0.065, over: 2000000 },
    ],
    mortgageRegistration: 123,
    transferFee: 110,
    fhb: { fullExemptionUpTo: 600000, concessionUpTo: 750000, grant: 10000, grantMaxValue: 750000 },
  },
  QLD: {
    brackets: [
      { upTo: 5000, base: 0, rate: 0, over: 0 },
      { upTo: 75000, base: 0, rate: 0.015, over: 5000 },
      { upTo: 540000, base: 1050, rate: 0.035, over: 75000 },
      { upTo: 1000000, base: 17325, rate: 0.045, over: 540000 },
      { upTo: INF, base: 38025, rate: 0.0575, over: 1000000 },
    ],
    mortgageRegistration: 224,
    transferFee: 200,
    fhb: { fullExemptionUpTo: 700000, concessionUpTo: 800000, grant: 30000, grantMaxValue: 750000 },
  },
  WA: {
    brackets: [
      { upTo: 120000, base: 0, rate: 0.019, over: 0 },
      { upTo: 150000, base: 2280, rate: 0.0285, over: 120000 },
      { upTo: 360000, base: 3135, rate: 0.038, over: 150000 },
      { upTo: 725000, base: 11115, rate: 0.0475, over: 360000 },
      { upTo: INF, base: 28453, rate: 0.0515, over: 725000 },
    ],
    mortgageRegistration: 210,
    transferFee: 195,
    fhb: { fullExemptionUpTo: 450000, concessionUpTo: 600000, grant: 10000, grantMaxValue: 750000 },
  },
  SA: {
    brackets: [
      { upTo: 12000, base: 0, rate: 0.01, over: 0 },
      { upTo: 30000, base: 120, rate: 0.02, over: 12000 },
      { upTo: 50000, base: 480, rate: 0.03, over: 30000 },
      { upTo: 100000, base: 1080, rate: 0.035, over: 50000 },
      { upTo: 200000, base: 2830, rate: 0.04, over: 100000 },
      { upTo: 250000, base: 6830, rate: 0.0425, over: 200000 },
      { upTo: 300000, base: 8955, rate: 0.0475, over: 250000 },
      { upTo: 500000, base: 11330, rate: 0.05, over: 300000 },
      { upTo: INF, base: 21330, rate: 0.055, over: 500000 },
    ],
    mortgageRegistration: 196,
    transferFee: 196,
    fhb: { fullExemptionUpTo: 650000, concessionUpTo: 650000, grant: 15000, grantMaxValue: 650000, newOnly: true },
  },
  TAS: {
    brackets: [
      { upTo: 3000, base: 50, rate: 0, over: 0 },
      { upTo: 25000, base: 50, rate: 0.0175, over: 3000 },
      { upTo: 75000, base: 435, rate: 0.0225, over: 25000 },
      { upTo: 200000, base: 1560, rate: 0.035, over: 75000 },
      { upTo: 375000, base: 5935, rate: 0.04, over: 200000 },
      { upTo: 725000, base: 12935, rate: 0.0425, over: 375000 },
      { upTo: INF, base: 27810, rate: 0.045, over: 725000 },
    ],
    mortgageRegistration: 172,
    transferFee: 172,
    fhb: { fullExemptionUpTo: 0, concessionUpTo: 600000, grant: 10000, grantMaxValue: 750000 },
  },
  ACT: {
    brackets: [
      { upTo: 260000, base: 0, rate: 0.0122, over: 0 },
      { upTo: 300000, base: 3172, rate: 0.024, over: 260000 },
      { upTo: 500000, base: 4132, rate: 0.0264, over: 300000 },
      { upTo: 750000, base: 9412, rate: 0.0432, over: 500000 },
      { upTo: 1000000, base: 20212, rate: 0.059, over: 750000 },
      { upTo: 1455000, base: 34962, rate: 0.064, over: 1000000 },
      { upTo: INF, base: 64082, rate: 0.064, over: 1455000 },
    ],
    mortgageRegistration: 184,
    transferFee: 496,
    fhb: { fullExemptionUpTo: 0, concessionUpTo: 0, grant: 0, grantMaxValue: 0 },
  },
  NT: {
    brackets: [
      { upTo: 525000, base: 0, rate: 0, over: 0 }, // NT uses a formula band below; approximated linearly further down
      { upTo: 3000000, base: 0, rate: 0.0495, over: 0 },
      { upTo: INF, base: 148500, rate: 0.0595, over: 3000000 },
    ],
    mortgageRegistration: 165,
    transferFee: 165,
    fhb: { fullExemptionUpTo: 650000, concessionUpTo: 650000, grant: 10000, grantMaxValue: 650000 },
  },
};

// NT's actual duty formula for value <= $525,000 is D = (0.06571441 × V^2) + 15V, all divided by 1000
function ntDutyUnder525k(value: number): number {
  return (0.06571441 * value * value + 15 * value) / 1000;
}

export function calculateStampDuty(input: StampDutyInput): StampDutyResult {
  const { state, propertyValue, isFirstHomeBuyer, purchaseType } = input;
  const config = STATE_CONFIG[state];

  let stampDuty: number;
  if (state === "NT" && propertyValue <= 525000) {
    stampDuty = ntDutyUnder525k(propertyValue);
  } else {
    stampDuty = bracketDuty(propertyValue, config.brackets);
  }

  let concessionApplied = false;
  const eligibleForFhbRelief = isFirstHomeBuyer && (!config.fhb.newOnly || purchaseType !== "established");

  if (eligibleForFhbRelief) {
    if (propertyValue <= config.fhb.fullExemptionUpTo) {
      stampDuty = 0;
      concessionApplied = true;
    } else if (propertyValue <= config.fhb.concessionUpTo && config.fhb.concessionUpTo > config.fhb.fullExemptionUpTo) {
      // Simple straight-line taper of the exempt amount across the concession band.
      const band = config.fhb.concessionUpTo - config.fhb.fullExemptionUpTo;
      const position = (propertyValue - config.fhb.fullExemptionUpTo) / band;
      stampDuty = stampDuty * position;
      concessionApplied = true;
    }
  }

  const firstHomeOwnerGrant =
    isFirstHomeBuyer && purchaseType !== "established" && propertyValue <= config.fhb.grantMaxValue
      ? config.fhb.grant
      : 0;

  const mortgageRegistration = config.mortgageRegistration;
  const transferFee = config.transferFee;

  return {
    stampDuty: Math.round(stampDuty),
    mortgageRegistration,
    transferFee,
    totalGovernmentFees: Math.round(stampDuty) + mortgageRegistration + transferFee,
    firstHomeOwnerGrant,
    totalGovernmentGrant: firstHomeOwnerGrant,
    concessionApplied,
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
