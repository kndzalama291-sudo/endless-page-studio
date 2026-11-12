// Display-only conversion. Checkout always charges in the Shopify store currency.
// Rates are "units per 1 USD". Update whenever you like.
export const CURRENCIES = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.79 },
  AUD: { symbol: "A$", rate: 1.52 },
  CAD: { symbol: "C$", rate: 1.37 },
  ZAR: { symbol: "R", rate: 18.2 },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export function convert(amount: number, from: string, to: CurrencyCode) {
  const fromRate = (CURRENCIES as Record<string, { rate: number }>)[from]?.rate;
  if (!fromRate) return amount;
  return (amount / fromRate) * CURRENCIES[to].rate;
}

export function formatMoney(amount: number, code: CurrencyCode) {
  return `${CURRENCIES[code].symbol}${amount.toFixed(2)}`;
}
