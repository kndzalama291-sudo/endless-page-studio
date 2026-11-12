import { LANGUAGES, TONES } from "@/config/catalog";
import type { BuilderState } from "./types";
import { deliveryLabel } from "./types";

const OPENERS = {
  gentle: "My dear",
  funny: "Well, well, well…",
  epic: "Hear ye, hear ye!",
};

/** Live preview styled as an unrolling parchment scroll. */
export function ParchmentPreview({ s }: { s: BuilderState }) {
  const name = s.name.trim() || "______";
  const loves = [...s.loves, ...(s.lovesOther.trim() ? [s.lovesOther.trim()] : [])];
  const tone = TONES.find((t) => t.key === s.tone);
  const lang = LANGUAGES.find((l) => l.code === s.language);
  return (
    <div className="relative">
      <div aria-hidden className="mx-auto h-5 w-[104%] -translate-x-[2%] rounded-full bg-gradient-to-b from-parchment to-ink/40 shadow-lg" />
      <div className="parchment relative -my-2 rounded-sm px-7 py-9 font-display sm:px-10" style={{ animation: "unroll 1.2s cubic-bezier(.2,.8,.3,1) both" }}>
        <p className="text-xs font-sans font-semibold uppercase tracking-[0.3em] text-ink/60">From the desk of Santa · North Pole</p>
        <p className="mt-6 text-2xl italic">
          {s.tone === "gentle" ? `${OPENERS.gentle} ${name},` : `${OPENERS[s.tone]} If it isn't ${name}!`}
        </p>
        {s.pronunciation && <p className="mt-1 font-sans text-xs text-ink/60">(say it like “{s.pronunciation}”)</p>}
        <div className="mt-5 space-y-4 text-lg leading-relaxed">
          <p>
            {s.age ? `${s.age} years old already!` : "Look how much you've grown!"} The elves tell me you love{" "}
            <Highlight>{loves.length ? listify(loves.slice(0, 3)) : "…"}</Highlight>
            {loves.length > 3 ? " and so much more" : ""}.
          </p>
          <p>
            And this year you <Highlight>{s.proud.trim() || "did something wonderful"}</Highlight>. Mrs. Claus read it twice.
          </p>
          <p>
            About that wish for <Highlight>{s.wish.trim() || "something special"}</Highlight>… I've written it down in my very best ink.
          </p>
        </div>
        <p className="mt-8 text-right text-2xl italic">— Santa</p>
        <div className="mt-6 flex flex-wrap gap-2 border-t border-ink/15 pt-4 font-sans text-[11px] font-semibold uppercase tracking-wider text-ink/60">
          <span>{tone?.emoji} {tone?.label}</span>
          <span>· {lang?.label}</span>
          <span>· {deliveryLabel(s)}</span>
        </div>
        <span aria-hidden className="absolute bottom-8 left-6 grid h-14 w-14 place-items-center rounded-full bg-candy font-sans text-xl text-snow shadow-candy">✦</span>
      </div>
      <div aria-hidden className="mx-auto h-5 w-[104%] -translate-x-[2%] rounded-full bg-gradient-to-t from-parchment to-ink/40 shadow-lg" />
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <strong className="rounded bg-gold/40 px-1 font-semibold text-ink">{children}</strong>;
}

function listify(a: string[]) {
  if (a.length <= 1) return a.join("");
  return `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;
}
