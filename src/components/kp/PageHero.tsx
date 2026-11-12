export function PageHero({ eyebrow, title, sub, children }: { eyebrow: string; title: React.ReactNode; sub?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-10 pt-36 text-center sm:px-6 sm:pt-44">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-mint">{eyebrow}</p>
      <h1 className="mx-auto mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.95] text-snow sm:text-7xl">{title}</h1>
      {sub && <p className="mx-auto mt-6 max-w-2xl text-lg text-snow/70">{sub}</p>}
      {children}
    </section>
  );
}
