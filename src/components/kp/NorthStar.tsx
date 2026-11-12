import { useState } from "react";
import { burstConfetti } from "./confetti";
import { EASTER_EGG_CODE } from "@/config/brand";

/** Easter egg: click the North Star for confetti and a secret code. */
export function NorthStar({ className = "" }: { className?: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className={`absolute ${className}`}>
      <button
        type="button"
        aria-label="A suspiciously bright star"
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          burstConfetti(r.left + r.width / 2, r.top + r.height / 2);
          setRevealed(true);
        }}
        className="group relative grid h-14 w-14 place-items-center"
      >
        <span className="absolute inset-0 rounded-full bg-gold/30 blur-xl animate-twinkle" />
        <svg viewBox="0 0 32 32" className="relative h-9 w-9 text-gold drop-shadow-[0_0_14px_var(--gold)] transition duration-500 group-hover:rotate-45 group-hover:scale-125">
          <path fill="currentColor" d="M16 0 L18.5 13.5 L32 16 L18.5 18.5 L16 32 L13.5 18.5 L0 16 L13.5 13.5 Z" />
        </svg>
      </button>
      {revealed && (
        <div role="status" className="absolute left-1/2 top-16 w-60 -translate-x-1/2 rounded-2xl glass-gold p-4 text-center" style={{ animation: "page-in .5s ease both" }}>
          <p className="text-xs text-snow/70">You found the North Star! Use code</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-wider text-gold-foil">{EASTER_EGG_CODE}</p>
          <p className="mt-1 text-xs text-snow/60">for 10% off at checkout.</p>
        </div>
      )}
    </div>
  );
}
