export function SectionHeading({ eyebrow, title, sub, center = true }: { eyebrow?: string; title: React.ReactNode; sub?: React.ReactNode; center?: boolean }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mint">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] text-snow sm:text-6xl">{title}</h2>
      {sub && <p className="mt-5 text-lg text-snow/70">{sub}</p>}
    </div>
  );
}
