import { useEffect, useRef } from "react";

type Flake = { x: number; y: number; r: number; vy: number; vx: number; layer: number; phase: number };

/** Full-screen canvas snow with 3 depth layers; flakes drift away from the pointer. */
export function Snowfall() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = isMobile ? 70 : 180;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const make = (y?: number): Flake => {
      const layer = Math.random() < 0.5 ? 0 : Math.random() < 0.7 ? 1 : 2;
      return {
        x: Math.random() * w,
        y: y ?? Math.random() * h,
        r: (layer === 0 ? 0.8 : layer === 1 ? 1.6 : 2.8) + Math.random() * 0.8,
        vy: (layer === 0 ? 0.35 : layer === 1 ? 0.7 : 1.2) + Math.random() * 0.3,
        vx: 0,
        layer,
        phase: Math.random() * Math.PI * 2,
      };
    };
    const flakes: Flake[] = Array.from({ length: count }, () => make());

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        const dx = f.x - pointer.x;
        const dy = f.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 120 * 120) {
          const d = Math.sqrt(dist2) || 1;
          const force = (1 - d / 120) * 0.9 * (f.layer + 1);
          f.vx += (dx / d) * force;
          f.y += (dy / d) * force * 0.5;
        }
        f.vx *= 0.94;
        f.x += Math.sin(t * 2 + f.phase) * 0.3 * (f.layer + 1) + f.vx;
        f.y += f.vy;
        if (f.y > h + 5) Object.assign(f, make(-5));
        if (f.x > w + 5) f.x = -5;
        if (f.x < -5) f.x = w + 5;
        ctx.beginPath();
        ctx.fillStyle = `rgba(247,250,255,${[0.35, 0.6, 0.9][f.layer]})`;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-40" />;
}
