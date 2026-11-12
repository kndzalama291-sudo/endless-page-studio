import { useEffect, useRef } from "react";
import { Music, Music2 } from "lucide-react";
import { usePrefs } from "@/stores/prefsStore";
import { AMBIENT_AUDIO_SRC } from "@/config/brand";

/** Ambient music toggle. Off by default; remembers the choice. */
export function MusicToggle() {
  const on = usePrefs((s) => s.musicOn);
  const setOn = usePrefs((s) => s.setMusicOn);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audio.current) {
      audio.current = new Audio(AMBIENT_AUDIO_SRC);
      audio.current.loop = true;
      audio.current.volume = 0.35;
    }
    if (on) audio.current.play().catch(() => setOn(false));
    else audio.current.pause();
  }, [on, setOn]);

  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      aria-pressed={on}
      aria-label={on ? "Turn ambient music off" : "Turn ambient music on"}
      className="grid h-10 w-10 place-items-center rounded-full glass text-snow/80 transition hover:text-gold"
    >
      {on ? <Music2 className="h-4 w-4 animate-twinkle" /> : <Music className="h-4 w-4" />}
    </button>
  );
}
