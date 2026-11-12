import { useEffect, useRef } from "react";

function treeRow(seed: number, count: number, minH: number, maxH: number) {
  let d = "M0 200 ";
  const step = 1600 / count;
  for (let i = 0; i <= count; i++) {
    const r = ((i * 9301 + seed * 49297) % 233280) / 233280;
    const hgt = minH + r * (maxH - minH);
    const x = i * step;
    const wdt = step * (0.9 + r * 0.5);
    d += `L${x - wdt / 2} 200 L${x - wdt * 0.32} ${200 - hgt * 0.35} L${x - wdt * 0.42} ${200 - hgt * 0.35} L${x - wdt * 0.2} ${200 - hgt * 0.65} L${x - wdt * 0.3} ${200 - hgt * 0.65} L${x} ${200 - hgt} L${x + wdt * 0.3} ${200 - hgt * 0.65} L${x + wdt * 0.2} ${200 - hgt * 0.65} L${x + wdt * 0.42} ${200 - hgt * 0.35} L${x + wdt * 0.32} ${200 - hgt * 0.35} L${x + wdt / 2} 200 `;
  }
  return d + "L1600 200 Z";
}

const ROWS = [
  { d: treeRow(3, 22, 60, 110), cls: "fill-indigo-deep/70", speed: 0.04 },
  { d: treeRow(7, 16, 90, 150), cls: "fill-indigo-deep", speed: 0.08 },
  { d: treeRow(11, 11, 120, 190), cls: "fill-midnight", speed: 0.14 },
];

/** Layered pine silhouettes at the bottom of each page with scroll parallax. */
export function PineForest() {
  const refs = useRef<(SVGSVGElement | null)[]>([]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const fromBottom = Math.max(0, max - window.scrollY);
        refs.current.forEach((el, i) => {
          if (el) el.style.transform = `translateY(${fromBottom * (ROWS[i]?.speed ?? 0) * 0.3}px)`;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div aria-hidden className="pointer-events-none relative -mt-40 h-56 overflow-hidden md:h-72">
      {ROWS.map((r, i) => (
        <svg
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          viewBox="0 0 1600 200"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-full w-full will-change-transform"
        >
          <path d={r.d} className={r.cls} />
        </svg>
      ))}
    </div>
  );
}
