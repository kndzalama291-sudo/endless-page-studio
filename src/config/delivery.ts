// Last order dates for physical gifts to arrive by Christmas. Edit freely (YYYY-MM-DD, local to the region).
export const ORDER_BY_DATES: Record<string, { label: string; flag: string; date: string }> = {
  ZA: { label: "South Africa", flag: "🇿🇦", date: "2026-12-15" },
  US: { label: "United States", flag: "🇺🇸", date: "2026-12-12" },
  GB: { label: "United Kingdom", flag: "🇬🇧", date: "2026-12-14" },
  IE: { label: "Ireland", flag: "🇮🇪", date: "2026-12-12" },
  CA: { label: "Canada", flag: "🇨🇦", date: "2026-12-09" },
  AU: { label: "Australia", flag: "🇦🇺", date: "2026-12-08" },
  NZ: { label: "New Zealand", flag: "🇳🇿", date: "2026-12-07" },
  DE: { label: "Germany", flag: "🇩🇪", date: "2026-12-11" },
  FR: { label: "France", flag: "🇫🇷", date: "2026-12-11" },
  NL: { label: "Netherlands", flag: "🇳🇱", date: "2026-12-12" },
  ES: { label: "Spain", flag: "🇪🇸", date: "2026-12-10" },
  NG: { label: "Nigeria", flag: "🇳🇬", date: "2026-12-04" },
  KE: { label: "Kenya", flag: "🇰🇪", date: "2026-12-04" },
};

export const AMBER_WINDOW_DAYS = 7;

export type ArrivalStatus = "green" | "amber" | "red";

/** green = comfortably in time, amber = within AMBER_WINDOW_DAYS of cutoff, red = cutoff passed. */
export function arrivalStatus(cutoffISO: string, now: Date = new Date()): ArrivalStatus {
  const [y, m, d] = cutoffISO.split("-").map(Number);
  const endOfCutoff = new Date(y, m - 1, d, 23, 59, 59, 999);
  const msLeft = endOfCutoff.getTime() - now.getTime();
  if (msLeft < 0) return "red";
  const daysLeft = msLeft / 86_400_000;
  return daysLeft <= AMBER_WINDOW_DAYS ? "amber" : "green";
}

export function formatCutoff(cutoffISO: string) {
  const [y, m, d] = cutoffISO.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
}
