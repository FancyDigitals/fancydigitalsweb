// ============================================
// PLAN DEFINITIONS
// ============================================
export const PLANS = {
  FREE: "FREE",
  PRO_MONTHLY: "PRO_MONTHLY",
  AGENCY_MONTHLY: "AGENCY_MONTHLY",
};

export function isPro(plan) {
  if (!plan) return false;

  const p = String(plan).toUpperCase();

  return [
    "PRO",
    "PRO_MONTHLY",
    "PRO_YEARLY",
    "AGENCY",
    "AGENCY_MONTHLY",
    "AGENCY_YEARLY",
  ].includes(p);
}

export function isAgency(plan) {
  if (!plan) return false;

  const p = String(plan).toUpperCase();

  return [
    "AGENCY",
    "AGENCY_MONTHLY",
    "AGENCY_YEARLY",
  ].includes(p);
}

// ============================================
// PLAN LIMITS
// ============================================
export const PLAN_LIMITS = {
  FREE: {
    publishedPages: 1,
    clientSites: 0,
    customDomains: 0,
    resumePerDay: 3,
    coverLetterPerDay: 3,
    landingPagePerDay: 2,
    videoGeneratorPerDay: 2,
    aiCheckerPerDay: 2,
    documentViewerPerDay: 10,
    websiteAuditPerDay: 1,
    extraLanguages: false,
    brandColors: false,
    extendedLeadForm: false,
    whiteLabel: false,
    youtubeAuditPerDay: 1,
    youtubeTitlesPerDay: 3,
    youtubeCompetitorCompare: false,
    youtubeNicheReport: false,
    youtubePDFExport: false,
    pitchDeckPerDay: 1,
    businessPlanPerDay: 1,
    emailSequencePerDay: 1,
    socialPostPerDay: 3,
    brandKitPerDay: 1,
brandKitZipExport: false,
  },
  PRO_MONTHLY: {
    publishedPages: Infinity,
    clientSites: 0,
    customDomains: 1,
    resumePerDay: Infinity,
    coverLetterPerDay: Infinity,
    landingPagePerDay: Infinity,
    videoGeneratorPerDay: 10,
    aiCheckerPerDay: Infinity,
    documentViewerPerDay: Infinity,
    websiteAuditPerDay: Infinity,
    extraLanguages: true,
    brandColors: true,
    extendedLeadForm: true,
    whiteLabel: false,
    youtubeAuditPerDay: 20,
    youtubeTitlesPerDay: Infinity,
    youtubeCompetitorCompare: true,
    youtubeNicheReport: true,
    youtubePDFExport: false,
    pitchDeckPerDay: Infinity,
    businessPlanPerDay: Infinity,
    emailSequencePerDay: Infinity,
    socialPostPerDay: Infinity,
    brandKitPerDay: Infinity,
brandKitZipExport: true,
  },
  AGENCY_MONTHLY: {
    publishedPages: Infinity,
    clientSites: 10,
    customDomains: 3,
    resumePerDay: Infinity,
    coverLetterPerDay: Infinity,
    landingPagePerDay: Infinity,
    videoGeneratorPerDay: Infinity,
    aiCheckerPerDay: Infinity,
    documentViewerPerDay: Infinity,
    websiteAuditPerDay: Infinity,
    extraLanguages: true,
    brandColors: true,
    extendedLeadForm: true,
    whiteLabel: true,
    youtubeAuditPerDay: Infinity,
    youtubeTitlesPerDay: Infinity,
    youtubeCompetitorCompare: true,
    youtubeNicheReport: true,
    youtubePDFExport: true,
    pitchDeckPerDay: Infinity,
    businessPlanPerDay: Infinity,
    emailSequencePerDay: Infinity,
    socialPostPerDay: Infinity,
    brandKitPerDay: Infinity,
brandKitZipExport: true,
  },
};

export function getLimits(plan) {
  const p = String(plan || "FREE").toUpperCase();
  if (p === "PRO_YEARLY") return PLAN_LIMITS.PRO_MONTHLY;
  if (p === "AGENCY_YEARLY") return PLAN_LIMITS.AGENCY_MONTHLY;
  if (p === "PRO") return PLAN_LIMITS.PRO_MONTHLY;
  if (p === "AGENCY") return PLAN_LIMITS.AGENCY_MONTHLY;
  return PLAN_LIMITS[p] || PLAN_LIMITS.FREE;
}

// ============================================
// PPP-BASED REGIONAL PRICING
// ============================================
export const REGIONAL_PRICING = {
  US: {
    code: "USD", symbol: "$", flag: "🇺🇸", country: "United States",
    monthly: 9, yearly: 79,
    agencyMonthly: 29, agencyYearly: 279,
    addonClient: 6, addonDomain: 4,
  },
  GB: {
    code: "GBP", symbol: "£", flag: "🇬🇧", country: "United Kingdom",
    monthly: 7, yearly: 65,
    agencyMonthly: 23, agencyYearly: 219,
    addonClient: 5, addonDomain: 3,
  },
  EU: {
    code: "EU", symbol: "€", flag: "🇪🇺", country: "Europe",
    monthly: 8, yearly: 75,
    agencyMonthly: 26, agencyYearly: 249,
    addonClient: 5, addonDomain: 4,
  },
  CA: {
    code: "CAD", symbol: "C$", flag: "🇨🇦", country: "Canada",
    monthly: 12, yearly: 109,
    agencyMonthly: 39, agencyYearly: 379,
    addonClient: 8, addonDomain: 5,
  },
  AU: {
    code: "AUD", symbol: "A$", flag: "🇦🇺", country: "Australia",
    monthly: 13, yearly: 119,
    agencyMonthly: 42, agencyYearly: 399,
    addonClient: 9, addonDomain: 6,
  },
  NG: {
    code: "NGN", symbol: "₦", flag: "🇳🇬", country: "Nigeria",
    monthly: 4500, yearly: 39000,
    agencyMonthly: 15000, agencyYearly: 140000,
    addonClient: 3000, addonDomain: 2000,
  },
  IN: {
    code: "INR", symbol: "₹", flag: "🇮🇳", country: "India",
    monthly: 349, yearly: 2999,
    agencyMonthly: 1199, agencyYearly: 10999,
    addonClient: 249, addonDomain: 149,
  },
  ZA: {
    code: "ZAR", symbol: "R", flag: "🇿🇦", country: "South Africa",
    monthly: 89, yearly: 799,
    agencyMonthly: 299, agencyYearly: 2799,
    addonClient: 59, addonDomain: 39,
  },
  KE: {
    code: "KES", symbol: "KSh", flag: "🇰🇪", country: "Kenya",
    monthly: 699, yearly: 5999,
    agencyMonthly: 2299, agencyYearly: 21999,
    addonClient: 499, addonDomain: 299,
  },
  BR: {
    code: "BRL", symbol: "R$", flag: "🇧🇷", country: "Brazil",
    monthly: 27, yearly: 239,
    agencyMonthly: 89, agencyYearly: 849,
    addonClient: 19, addonDomain: 12,
  },
  PH: {
    code: "PHP", symbol: "₱", flag: "🇵🇭", country: "Philippines",
    monthly: 249, yearly: 2199,
    agencyMonthly: 799, agencyYearly: 7599,
    addonClient: 169, addonDomain: 109,
  },
  MX: {
    code: "MXN", symbol: "$", flag: "🇲🇽", country: "Mexico",
    monthly: 149, yearly: 1299,
    agencyMonthly: 489, agencyYearly: 4599,
    addonClient: 99, addonDomain: 69,
  },
};

const EU_COUNTRIES = [
  "DE","FR","ES","IT","NL","BE","AT","PT","IE","FI","GR","PL",
  "CZ","HU","RO","SE","DK","SK","BG","HR","LU","SI","LV","EE","CY","MT","LT",
];

export function getRegionForCountry(countryCode) {
  if (!countryCode) return "US";
  const cc = countryCode.toUpperCase();
  if (EU_COUNTRIES.includes(cc)) return "EU";
  if (REGIONAL_PRICING[cc]) return cc;
  return "US";
}

export function formatPrice(amount, currency) {
  const { symbol, code } = REGIONAL_PRICING[currency] || REGIONAL_PRICING.US;
  if (["USD", "GBP", "EU", "CAD", "AUD"].includes(code)) {
    return `${symbol}${Number(amount).toFixed(2)}`;
  }
  return `${symbol}${Number(amount).toLocaleString()}`;
}