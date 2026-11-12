/** Slowly shifting aurora behind everything. */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-1/3 left-[-20%] h-[70vh] w-[90vw] rounded-full bg-mint/20 blur-[120px] animate-aurora" />
      <div
        className="absolute -top-1/4 right-[-25%] h-[60vh] w-[80vw] rounded-full bg-violet/25 blur-[140px] animate-aurora"
        style={{ animationDelay: "-8s", animationDuration: "28s" }}
      />
      <div
        className="absolute top-1/3 left-1/4 h-[40vh] w-[50vw] rounded-full bg-mint/10 blur-[120px] animate-aurora"
        style={{ animationDelay: "-15s", animationDuration: "34s" }}
      />
      <Stars />
    </div>
  );
}

function Stars() {
  // Deterministic star field so SSR and client match.
  const stars = Array.from({ length: 70 }, (_, i) => {
    const a = (i * 9301 + 49297) % 233280;
    const b = (i * 7919 + 12345) % 233280;
    return { x: (a / 233280) * 100, y: (b / 233280) * 70, s: (i % 3) + 1, d: (i % 7) * 0.4 };
  });
  return (
    <>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-snow animate-twinkle"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }}
        />
      ))}
    </>
  );
}
