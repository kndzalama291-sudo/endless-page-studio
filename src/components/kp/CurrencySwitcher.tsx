import { useEffect, useState } from "react";
import { CURRENCIES, type CurrencyCode } from "@/config/currency";
import { usePrefs } from "@/stores/prefsStore";

export function CurrencySwitcher({ className = "" }: { className?: string }) {
  const currency = usePrefs((s) => s.currency);
  const setCurrency = usePrefs((s) => s.setCurrency);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <label className={`relative ${className}`}>
      <span className="sr-only">Display currency</span>
      <select
        value={ready ? (currency ?? "") : ""}
        onChange={(e) => setCurrency((e.target.value || null) as CurrencyCode | null)}
        className="h-10 cursor-pointer appearance-none rounded-full glass px-4 pr-8 text-xs font-semibold tracking-wider text-snow outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <option value="" className="bg-midnight">Store</option>
        {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
          <option key={c} value={c} className="bg-midnight">
            {c}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gold">▾</span>
    </label>
  );
}
