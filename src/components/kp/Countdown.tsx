import { useEffect, useState } from "react";

export function msUntilChristmas(now: Date = new Date()) {
  let target = new Date(now.getFullYear(), 11, 25, 0, 0, 0);
  if (now.getTime() >= new Date(now.getFullYear(), 11, 26).getTime()) target = new Date(now.getFullYear() + 1, 11, 25);
  return Math.max(0, target.getTime() - now.getTime());
}

export function splitTime(ms: number) {
  const s = Math.floor(ms / 1000);
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}

function useCountdown() {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setMs(msUntilChristmas());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return ms;
}

function FlipDigit({ value, label }: { value: number | null; label: string }) {
  const text = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative [perspective:400px]">
        <div
          key={text}
          className="glass-gold relative grid h-16 w-14 place-items-center overflow-hidden rounded-2xl font-display text-3xl font-semibold tabular-nums text-snow sm:h-20 sm:w-[4.5rem] sm:text-4xl"
          style={{ animation: "flip-in 0.45s cubic-bezier(.2,.8,.3,1)" }}
        >
          <span className="relative z-10">{text}</span>
          <span className="absolute inset-x-0 top-1/2 h-px bg-midnight/60" />
          <span className="absolute inset-x-0 top-0 h-1/2 bg-snow/5" />
        </div>
      </div>
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-snow/60">{label}</span>
    </div>
  );
}

/** Live flip-style countdown to 25 December in the visitor's own timezone. */
export function Countdown() {
  const ms = useCountdown();
  const t = ms === null ? null : splitTime(ms);
  return (
    <div className="flex items-start gap-2 sm:gap-3" role="timer" aria-label="Time until Christmas Day">
      <FlipDigit value={t?.days ?? null} label="Days" />
      <FlipDigit value={t?.hours ?? null} label="Hours" />
      <FlipDigit value={t?.minutes ?? null} label="Mins" />
      <FlipDigit value={t?.seconds ?? null} label="Secs" />
    </div>
  );
}

export function MiniCountdown() {
  const ms = useCountdown();
  if (ms === null) return <span className="tabular-nums">--d --h</span>;
  const t = splitTime(ms);
  return (
    <span className="tabular-nums">
      {t.days}d {String(t.hours).padStart(2, "0")}h {String(t.minutes).padStart(2, "0")}m
    </span>
  );
}
