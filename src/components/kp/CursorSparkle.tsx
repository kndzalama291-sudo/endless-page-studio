import { useEffect, useRef } from "react";

const SPARKLE_SHAPES = ["✨", "⭐", "❄️", "🪄", "🌟"];
const COLORS = ["#F2D06B", "#4ECCA3", "#FF3366", "#99CCFF", "#FFF"];

/** Magical rainbow sparkle & star trail that follows the cursor and bursts on click. */
export function CursorSparkle() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let last = 0;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const now = performance.now();
      if (now - last < 45 || !layer.current) return;
      last = now;

      const clientX = "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY ?? 0 : e.clientY;

      const s = document.createElement("span");
      const isIcon = Math.random() > 0.6;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]!;

      if (isIcon) {
        s.textContent = SPARKLE_SHAPES[Math.floor(Math.random() * SPARKLE_SHAPES.length)]!;
        s.style.cssText = `
          position: fixed;
          left: ${clientX}px;
          top: ${clientY}px;
          font-size: ${12 + Math.random() * 14}px;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          filter: drop-shadow(0 0 6px ${color});
          animation: float-sparkle 750ms ease-out forwards;
        `;
      } else {
        const size = 5 + Math.random() * 7;
        s.style.cssText = `
          position: fixed;
          left: ${clientX}px;
          top: ${clientY}px;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${color};
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 0 10px ${color};
          transform: translate(-50%, -50%);
          animation: float-sparkle 650ms ease-out forwards;
        `;
      }

      layer.current.appendChild(s);
      setTimeout(() => s.remove(), 760);
    };

    const onClick = (e: MouseEvent) => {
      if (!layer.current) return;
      for (let i = 0; i < 6; i++) {
        const s = document.createElement("span");
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]!;
        s.textContent = SPARKLE_SHAPES[Math.floor(Math.random() * SPARKLE_SHAPES.length)]!;
        const dx = (Math.random() - 0.5) * 80;
        const dy = (Math.random() - 0.5) * 80;
        s.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          font-size: 16px;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          filter: drop-shadow(0 0 8px ${color});
          transition: transform 600ms cubic-bezier(0.1, 0.8, 0.3, 1), opacity 600ms ease-out;
        `;
        layer.current.appendChild(s);
        requestAnimationFrame(() => {
          s.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.4)`;
          s.style.opacity = "0";
        });
        setTimeout(() => s.remove(), 620);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-[90]" />;
}
