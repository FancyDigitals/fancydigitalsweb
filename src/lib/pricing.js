// ============================================
// PLAN DEFINITIONS
// ============================================
export const PLANS = {
  FREE: "FREE",
  PRO_MONTHLY: "PRO_MONTHLY",
  LIFETIME: "LIFETIME",
};

export function isPro(plan) {
  return plan === PLANS.PRO_MONTHLY || plan === PLANS.LIFETIME;
}

export function isLifetime(plan) {
  return plan === PLANS.LIFETIME;
}

// ============================================
// PLAN LIMITS
// ============================================
export const PLAN_LIMITS = {
  FREE: {
    publishedPages: 1,        // max 1 active published page
    clientSites: 0,           // no client portal
    customDomains: 0,         // no custom domains
    resumePerDay: 3,
    coverLetterPerDay: 3,
    landingPagePerDay: 2,
    extraLanguages: false,
    brandColors: false,
    extendedLeadForm: false,
  },
  PRO_MONTHLY: {
    publishedPages: Infinity,
    clientSites: 3,
    customDomains: 1,
    resumePerDay: Infinity,
    coverLetterPerDay: Infinity,
    landingPagePerDay: Infinity,
    extraLanguages: true,
    brandColors: true,
    extendedLeadForm: true,
  },
  LIFETIME: {
    publishedPages: Infinity,
    clientSites: 3,
    customDomains: 1,
    resumePerDay: Infinity,
    coverLetterPerDay: Infinity,
    landingPagePerDay: Infinity,
    extraLanguages: true,
    brandColors: true,
    extendedLeadForm: true,
  },
};

export function getLimits(plan) {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.FREE;
}

// ============================================
// PPP-BASED REGIONAL PRICING
// ============================================
export const REGIONAL_PRICING = {
  US: { code: "USD", symbol: "$", monthly: 4.99, yearly: 39, lifetime: 49, flag: "🇺🇸", country: "United States" },
  GB: { code: "GBP", symbol: "£", monthly: 3.99, yearly: 31, lifetime: 39, flag: "🇬🇧", country: "United Kingdom" },
  EU: { code: "EUR", symbol: "€", monthly: 4.49, yearly: 35, lifetime: 45, flag: "🇪🇺", country: "Europe" },
  CA: { code: "CAD", symbol: "C$", monthly: 6.49, yearly: 51, lifetime: 65, flag: "🇨🇦", country: "Canada" },
  AU: { code: "AUD", symbol: "A$", monthly: 7.49, yearly: 59, lifetime: 75, flag: "🇦🇺", country: "Australia" },
  NG: { code: "NGN", symbol: "₦", monthly: 2500, yearly: 20000, lifetime: 25000, flag: "🇳🇬", country: "Nigeria" },
  IN: { code: "INR", symbol: "₹", monthly: 199, yearly: 1499, lifetime: 1999, flag: "🇮🇳", country: "India" },
  ZA: { code: "ZAR", symbol: "R", monthly: 49, yearly: 399, lifetime: 499, flag: "🇿🇦", country: "South Africa" },
  KE: { code: "KES", symbol: "KSh", monthly: 399, yearly: 2999, lifetime: 3999, flag: "🇰🇪", country: "Kenya" },
  BR: { code: "BRL", symbol: "R$", monthly: 15, yearly: 119, lifetime: 149, flag: "🇧🇷", country: "Brazil" },
  PH: { code: "PHP", symbol: "₱", monthly: 149, yearly: 1199, lifetime: 1499, flag: "🇵🇭", country: "Philippines" },
  MX: { code: "MXN", symbol: "$", monthly: 89, yearly: 699, lifetime: 899, flag: "🇲🇽", country: "Mexico" },
};

const EU_COUNTRIES = ["DE", "FR", "ES", "IT", "NL", "BE", "AT", "PT", "IE", "FI", "GR", "PL", "CZ", "HU", "RO", "SE", "DK", "SK", "BG", "HR", "LU", "SI", "LV", "EE", "CY", "MT", "LT"];

export function getRegionForCountry(countryCode) {
  if (!countryCode) return "US";
  const cc = countryCode.toUpperCase();
  if (EU_COUNTRIES.includes(cc)) return "EU";
  if (REGIONAL_PRICING[cc]) return cc;
  return "US";
}

export function formatPrice(amount, currency) {
  const { symbol, code } = REGIONAL_PRICING[currency] || REGIONAL_PRICING.US;
  if (["USD", "GBP", "EUR", "CAD", "AUD"].includes(code)) {
    return `${symbol}${amount.toFixed(2)}`;
  }
  return `${symbol}${amount.toLocaleString()}`;
}