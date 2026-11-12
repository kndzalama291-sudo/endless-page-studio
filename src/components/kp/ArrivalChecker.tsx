import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ORDER_BY_DATES, arrivalStatus, formatCutoff, type ArrivalStatus } from "@/config/delivery";
import { usePrefs } from "@/stores/prefsStore";

const COPY: Record<ArrivalStatus, { title: string; tone: string; dot: string }> = {
  green: { title: "Plenty of time. Sleigh's on schedule.", tone: "text-ok", dot: "bg-ok" },
  amber: { title: "Cutting it close. Order soon!", tone: "text-warn", dot: "bg-warn" },
  red: { title: "Too late for the post, not for magic.", tone: "text-candy", dot: "bg-candy" },
};

/** "Will it arrive by Christmas?" checker driven by ORDER_BY_DATES. */
export function ArrivalChecker() {
  const country = usePrefs((s) => s.country);
  const setCountry = usePrefs((s) => s.setCountry);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const selected = ready ? country : null;
  const region = selected ? ORDER_BY_DATES[selected] : null;
  const status = region ? arrivalStatus(region.date) : null;

  return (
    <div id="arrival" className="scroll-mt-28 rounded-[2rem] glass-gold p-6 sm:p-10">
      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mint">Killer feature</p>
          <h3 className="mt-3 font-display text-3xl font-semibold text-snow sm:text-4xl">Will it arrive by Christmas?</h3>
          <p className="mt-3 text-snow/70">Pick where it's going and we'll tell you straight. No fibbing, the reindeer are watching.</p>
          <label className="mt-6 block">
            <span className="sr-only">Destination country</span>
            <select
              value={selected ?? ""}
              onChange={(e) => setCountry(e.target.value || null)}
              className="h-14 w-full cursor-pointer rounded-2xl border border-gold/30 bg-midnight/60 px-5 text-base text-snow outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <option value="">Choose a country…</option>
              {Object.entries(ORDER_BY_DATES).map(([code, r]) => (
                <option key={code} value={code}>
                  {r.flag} {r.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div aria-live="polite" className="min-h-40 rounded-3xl bg-midnight/50 p-6">
          {region && status ? (
            <div style={{ animation: "page-in .5s ease both" }}>
              <div className="flex items-center gap-3">
                <span className={`relative h-4 w-4 rounded-full ${COPY[status].dot}`}>
                  <span className={`absolute inset-0 animate-ping rounded-full ${COPY[status].dot} opacity-60`} />
                </span>
                <span className={`font-display text-2xl font-semibold ${COPY[status].tone}`}>{COPY[status].title}</span>
              </div>
              <p className="mt-4 text-snow/80">
                Last order date for {region.flag} {region.label}: <strong className="text-gold">{formatCutoff(region.date)}</strong>
              </p>
              {status === "red" && (
                <p className="mt-4 text-snow/80">
                  Physical gifts can't make it now, but a personalized Santa message lands in minutes.{" "}
                  <Link to="/create" className="font-semibold text-mint underline">Send instant magic →</Link>
                </p>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-snow/50">
              <p>Choose a country to see the elves' verdict.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
