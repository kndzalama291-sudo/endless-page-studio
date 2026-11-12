import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CHAPTERS, nextChapter } from "@/config/brand";

/** End-of-page portal that pages on to the next chapter, looping forever. */
export function ChapterPortal() {
  const { pathname } = useLocation();
  const next = nextChapter(pathname);
  const idx = CHAPTERS.findIndex((c) => c.to === next.to);
  const isLoop = idx === 0;
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Link
        to={next.to}
        className="group relative block overflow-hidden rounded-[2.5rem] glass-gold p-10 text-center transition hover:-translate-y-1 sm:p-16"
      >
        <div aria-hidden className="absolute inset-0 -z-10 opacity-40 transition group-hover:opacity-70">
          <div className="absolute left-1/2 top-1/2 h-[140%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-gradient blur-[90px]" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mint">
          {isLoop ? "Back to the beginning" : `Chapter 0${idx + 1}`}
        </p>
        <h2 className="mt-4 font-display text-4xl font-semibold text-snow sm:text-6xl">{next.label}</h2>
        <span className="mt-8 inline-flex items-center gap-3 rounded-full bg-candy-gradient px-7 py-4 font-semibold text-snow shadow-candy transition group-hover:gap-5">
          Turn the page <ArrowRight className="h-4 w-4" />
        </span>
        <div className="mt-10 flex justify-center gap-2" aria-hidden>
          {CHAPTERS.map((c) => (
            <span key={c.to} className={`h-1.5 rounded-full transition-all ${c.to === next.to ? "w-8 bg-gold" : c.to === pathname ? "w-4 bg-mint" : "w-1.5 bg-snow/25"}`} />
          ))}
        </div>
      </Link>
    </section>
  );
}
