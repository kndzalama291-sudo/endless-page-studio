import { useEffect, useState } from "react";
import { usePrefs } from "@/stores/prefsStore";
import { CURRENCIES, convert, formatMoney, type CurrencyCode } from "@/config/currency";

/** Formats a Shopify price in the visitor's chosen display currency (display only). */
export function useMoney() {
  const currency = usePrefs((s) => s.currency);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return (amount: number | string, storeCode: string) => {
    const n = typeof amount === "string" ? parseFloat(amount) : amount;
    const target = hydrated ? currency : null;
    if (!target || target === storeCode) {
      const sym = (CURRENCIES as Record<string, { symbol: string }>)[storeCode]?.symbol ?? `${storeCode} `;
      return `${sym}${n.toFixed(2)}`;
    }
    return formatMoney(convert(n, storeCode, target as CurrencyCode), target as CurrencyCode);
  };
}
