import { useEffect, useRef } from "react";

/** Gold sparkle trail that follows the cursor, desktop only. */
export function CursorSparkle() {
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = 0;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 35 || !layer.current) return;
      last = now;
      const s = document.createElement("span");
      const size = 4 + Math.random() * 6;
      s.className = "absolute rounded-full bg-gold pointer-events-none";
      s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;box-shadow:0 0 12px currentColor;--dx:${(Math.random() - 0.5) * 40}px;--dy:${20 + Math.random() * 30}px;--rot:${Math.random() * 180}deg;animation:confetti-fall 800ms ease-out forwards;`;
      layer.current.appendChild(s);
      setTimeout(() => s.remove(), 820);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-[80] text-gold" />;
}
