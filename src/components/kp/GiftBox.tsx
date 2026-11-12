const FILL = { candy: "fill-candy", mint: "fill-mint", violet: "fill-violet", gold: "fill-gold" } as const;

export function GiftBox({ color = "candy", className = "", style }: { color?: keyof typeof FILL; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden>
      <rect x="8" y="24" width="48" height="34" rx="4" className={FILL[color]} />
      <rect x="4" y="16" width="56" height="12" rx="3" className={FILL[color]} opacity="0.85" />
      <rect x="28" y="16" width="8" height="42" className="fill-gold" />
      <path d="M32 16 C24 4 12 8 18 14 C22 18 32 16 32 16 Z M32 16 C40 4 52 8 46 14 C42 18 32 16 32 16 Z" className="fill-gold" />
    </svg>
  );
}
