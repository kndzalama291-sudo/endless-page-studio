import { useEffect, useState } from "react";
import { SleighIcon } from "./SleighIcon";

/** Scroll progress shown as a tiny sleigh travelling left to right. */
export function SleighProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1">
      <div className="h-[2px] bg-aurora-gradient shadow-mint" style={{ width: `${p * 100}%` }} />
      <div className="absolute -top-0.5 text-gold transition-[left] duration-150" style={{ left: `calc(${p * 100}% - 44px)` }}>
        <SleighIcon className="h-4 w-11" />
      </div>
    </div>
  );
}
