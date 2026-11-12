const COLORS = ["bg-candy", "bg-gold", "bg-mint", "bg-violet"];

/** Twinkling string lights draped across the top of the header. */
export function StringLights() {
  const bulbs = Array.from({ length: 36 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-5 overflow-hidden">
      <svg className="absolute inset-x-0 top-0 h-5 w-full" viewBox="0 0 1000 20" preserveAspectRatio="none">
        <path
          d="M0 2 Q 14 14 28 2 T 56 2 T 84 2 T 112 2 T 140 2 T 168 2 T 196 2 T 224 2 T 252 2 T 280 2 T 308 2 T 336 2 T 364 2 T 392 2 T 420 2 T 448 2 T 476 2 T 504 2 T 532 2 T 560 2 T 588 2 T 616 2 T 644 2 T 672 2 T 700 2 T 728 2 T 756 2 T 784 2 T 812 2 T 840 2 T 868 2 T 896 2 T 924 2 T 952 2 T 980 2 T 1008 2"
          className="fill-none stroke-snow/25"
          strokeWidth="1"
        />
      </svg>
      <div className="relative flex justify-between px-[1.4%]">
        {bulbs.map((_, i) => (
          <span
            key={i}
            className={`mt-2 h-2 w-1.5 rounded-b-full ${COLORS[i % 4]} animate-twinkle shadow-[0_0_10px_currentColor]`}
            style={{ animationDelay: `${(i % 5) * 0.37}s` }}
          />
        ))}
      </div>
    </div>
  );
}
