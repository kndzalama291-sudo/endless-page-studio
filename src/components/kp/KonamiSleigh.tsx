import { useEffect, useState } from "react";
import { SleighIcon } from "./SleighIcon";

const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** Konami code easter egg: a sleigh flies across the screen. */
export function KonamiSleigh() {
  const [flying, setFlying] = useState(0);
  useEffect(() => {
    let i = 0;
    const on = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === CODE[i] ? i + 1 : k === CODE[0] ? 1 : 0;
      if (i === CODE.length) {
        i = 0;
        setFlying((n) => n + 1);
      }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);
  if (!flying) return null;
  return (
    <div key={flying} aria-hidden className="pointer-events-none fixed inset-0 z-[85] overflow-hidden">
      <div className="absolute top-1/2 text-gold drop-shadow-[0_0_20px_var(--gold)]" style={{ animation: "sleigh-cross 3.5s ease-in-out forwards" }}>
        <SleighIcon className="h-24 w-80" />
      </div>
    </div>
  );
}
