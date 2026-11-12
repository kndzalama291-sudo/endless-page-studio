/** Original sleigh-and-reindeer silhouette. */
export function SleighIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 60" className={className} aria-hidden fill="currentColor">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${120 + i * 32} ${8 - i * 2})`}>
          <path d="M2 22 C6 16 14 14 20 16 L24 10 L26 4 L24 2 L28 4 L27 9 L30 6 L31 9 L26 14 C28 18 27 22 24 24 L22 34 L19 34 L20 25 L10 26 L8 34 L5 34 L6 25 C3 25 1 24 2 22 Z" />
        </g>
      ))}
      <path d="M118 28 L60 34" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M14 24 L58 24 C66 24 70 30 66 38 L62 44 L16 44 C10 44 6 38 8 32 Z" />
      <path d="M4 50 L70 50 C76 50 78 46 76 42" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="18" r="7" />
      <path d="M24 16 L36 16 L32 6 Z" />
    </svg>
  );
}
