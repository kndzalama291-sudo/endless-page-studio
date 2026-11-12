const COLORS = ["var(--gold)", "var(--candy)", "var(--mint)", "var(--violet)", "var(--snow)"];

/** Bursts DOM confetti from a point on screen. */
export function burstConfetti(x: number, y: number, count = 90) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const layer = document.createElement("div");
  layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:90;";
  document.body.appendChild(layer);
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 280;
    const w = 5 + Math.random() * 6;
    p.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${w * 0.45}px;background:${COLORS[i % COLORS.length]};border-radius:2px;--dx:${Math.cos(angle) * dist}px;--dy:${Math.sin(angle) * dist + 200}px;--rot:${Math.random() * 720}deg;animation:confetti-fall ${1100 + Math.random() * 700}ms cubic-bezier(.2,.7,.3,1) forwards;`;
    layer.appendChild(p);
  }
  setTimeout(() => layer.remove(), 2000);
}
