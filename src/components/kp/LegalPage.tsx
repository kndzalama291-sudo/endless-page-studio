export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-36 sm:px-6 sm:pt-44">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mint">Last updated {updated}</p>
      <h1 className="mt-4 font-display text-5xl font-semibold text-snow sm:text-6xl">{title}</h1>
      <div className="mt-10 space-y-6 text-snow/80 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-snow [&_a]:text-gold [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">{children}</div>
    </article>
  );
}
