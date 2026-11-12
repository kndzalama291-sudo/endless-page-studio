import { ShieldCheck } from "lucide-react";

export function MagicPromise() {
  return (
    <section className="relative my-16 overflow-hidden border-y border-gold/20 bg-indigo-deep/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center md:flex-row md:text-left">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gold-gradient shadow-[0_0_40px_var(--gold)]">
          <ShieldCheck className="h-10 w-10 text-midnight" />
        </div>
        <div>
          <h3 className="font-display text-3xl font-semibold text-snow">The Magic Promise</h3>
          <p className="mt-2 max-w-3xl text-snow/75">
            If we spell a name wrong or mix up a detail, tell us and we'll fix it free within 24 hours. Santa takes typos very personally.
          </p>
        </div>
      </div>
    </section>
  );
}
