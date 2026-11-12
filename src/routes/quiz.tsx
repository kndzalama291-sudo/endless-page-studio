import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Download, RotateCcw, Share2 } from "lucide-react";
import { PageHero } from "@/components/kp/PageHero";
import { ChapterPortal } from "@/components/kp/ChapterPortal";
import { Button } from "@/components/ui/button";
import { burstConfetti } from "@/components/kp/confetti";
import { BRAND_NAME } from "@/config/brand";
import { QUIZ, niceScore } from "@/config/quiz";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: `The Nice List Quiz — how nice are you? | ${BRAND_NAME}` },
      { name: "description", content: "Six quick questions, one official verdict. Find out your Nice List score and download a shareable certificate." },
      { property: "og:title", content: `The Nice List Quiz — ${BRAND_NAME}` },
      { property: "og:description", content: "Six questions. One official Nice List verdict." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [name, setName] = useState("");
  const done = answers.length === QUIZ.length;
  const step = answers.length;
  const current = QUIZ[Math.min(step, QUIZ.length - 1)]!;

  const pick = (p: number, e: React.MouseEvent) => {
    const next = [...answers, p];
    setAnswers(next);
    if (next.length === QUIZ.length) burstConfetti(e.clientX, e.clientY, 140);
  };

  return (
    <>
      <PageHero eyebrow="Chapter 04 · The Verdict" title={<>The <span className="text-gold-foil">Nice List</span> Quiz.</>} sub="Six questions. Totally scientific. Reviewed by at least one reindeer." />
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-6 flex gap-1.5" aria-hidden>
          {QUIZ.map((_, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i < step ? "bg-aurora-gradient" : "bg-snow/15"}`} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={step} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.35 }}>
              <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-mint">Question {step + 1} of {QUIZ.length}</p>
              <h2 className="mt-4 text-center font-display text-3xl font-semibold text-snow sm:text-5xl">{current.q}</h2>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {current.a.map((a, i) => (
                  <motion.button
                    key={a.t}
                    type="button"
                    onClick={(e) => pick(a.p, e)}
                    initial={{ opacity: 0, y: 20, rotate: -2 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -8, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
                    whileTap={{ scale: 0.96 }}
                    className="group flex min-h-48 flex-col items-center justify-center gap-4 rounded-[2rem] glass p-6 text-center hover:border-gold/50"
                  >
                    <span className="text-6xl transition group-hover:scale-125">{a.e}</span>
                    <span className="font-display text-xl font-semibold text-snow">{a.t}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Result score={niceScore(answers)} name={name} setName={setName} onRestart={() => setAnswers([])} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <ChapterPortal />
    </>
  );
}

function Result({ score, name, setName, onRestart }: { score: number; name: string; setName: (s: string) => void; onRestart: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = () => {
    const c = canvasRef.current ?? document.createElement("canvas");
    c.width = 1080;
    c.height = 1350;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 1350);
    g.addColorStop(0, "#070B1F");
    g.addColorStop(0.55, "#121A4A");
    g.addColorStop(1, "#070B1F");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1080, 1350);
    const a = ctx.createRadialGradient(300, 200, 0, 300, 200, 700);
    a.addColorStop(0, "rgba(46,242,177,0.35)");
    a.addColorStop(1, "rgba(46,242,177,0)");
    ctx.fillStyle = a;
    ctx.fillRect(0, 0, 1080, 1350);
    const b = ctx.createRadialGradient(850, 300, 0, 850, 300, 600);
    b.addColorStop(0, "rgba(139,92,255,0.35)");
    b.addColorStop(1, "rgba(139,92,255,0)");
    ctx.fillStyle = b;
    ctx.fillRect(0, 0, 1080, 1350);
    for (let i = 0; i < 120; i++) {
      ctx.fillStyle = `rgba(247,250,255,${Math.random() * 0.8})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 1080, Math.random() * 1350, Math.random() * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "#FFD36B";
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, 960, 1230);
    ctx.textAlign = "center";
    ctx.fillStyle = "#2EF2B1";
    ctx.font = "600 34px 'DM Sans', sans-serif";
    ctx.fillText("OFFICIAL NICE LIST VERDICT", 540, 240);
    ctx.fillStyle = "#F7FAFF";
    ctx.font = "600 80px 'Fraunces', serif";
    ctx.fillText(name.trim() ? `${name.trim()} is` : "You're", 540, 470);
    ctx.fillStyle = "#FFD36B";
    ctx.font = "700 300px 'Fraunces', serif";
    ctx.fillText(`${score}%`, 540, 800);
    ctx.fillStyle = "#F7FAFF";
    ctx.font = "600 110px 'Fraunces', serif";
    ctx.fillText("Nice!", 540, 950);
    ctx.fillStyle = "rgba(247,250,255,0.7)";
    ctx.font = "400 36px 'DM Sans', sans-serif";
    ctx.fillText("Verified at the North Pole", 540, 1130);
    ctx.fillStyle = "#FFD36B";
    ctx.font = "600 40px 'Fraunces', serif";
    ctx.fillText(BRAND_NAME, 540, 1210);
    return c;
  };

  const download = () => {
    const c = draw();
    const link = document.createElement("a");
    link.download = `nice-list-${score}.png`;
    link.href = c.toDataURL("image/png");
    link.click();
  };

  const share = async () => {
    const c = draw();
    const blob: Blob | null = await new Promise((r) => c.toBlob(r, "image/png"));
    if (blob && navigator.canShare?.({ files: [new File([blob], "nice-list.png", { type: "image/png" })] })) {
      await navigator.share({ files: [new File([blob], "nice-list.png", { type: "image/png" })], title: "I'm on the Nice List!", text: `${score}% Nice — verified at the North Pole.` }).catch(() => {});
    } else download();
  };

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
      <div className="relative overflow-hidden rounded-[2rem] glass-gold p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mint">Official verdict</p>
        <p className="mt-6 font-display text-3xl text-snow">{name.trim() ? `${name.trim()} is` : "You're"}</p>
        <p className="font-display text-[7rem] font-bold leading-none text-gold-foil sm:text-[9rem]">{score}%</p>
        <p className="font-display text-5xl font-semibold text-snow">Nice!</p>
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm text-snow/70">Put a name on the certificate (optional)</span>
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={24} placeholder="e.g. Leo" className="h-12 w-full rounded-2xl border border-gold/25 bg-midnight/50 px-4 text-snow outline-none focus-visible:ring-2 focus-visible:ring-gold" />
        </label>
        <div className="flex flex-wrap gap-3">
          <Button variant="gold" size="lg" className="px-6" onClick={share}><Share2 className="h-4 w-4" /> Share</Button>
          <Button variant="glass" size="lg" className="px-6" onClick={download}><Download className="h-4 w-4" /> Download</Button>
          <Button variant="ghost" size="lg" className="rounded-full px-6 text-snow/70" onClick={onRestart}><RotateCcw className="h-4 w-4" /> Retake</Button>
        </div>
        <div className="rounded-3xl glass p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mint">Santa recommends</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-snow">{score >= 92 ? "The Magic Bundle" : "A personal Santa video"}</h3>
          <p className="mt-2 text-sm text-snow/70">
            {score >= 92 ? "A score like that deserves the full treatment: video, letter and an official Nice List Certificate." : "Nobody's perfect. A personal word from Santa works wonders before the big night."}
          </p>
          <Button asChild variant="candy" size="lg" className="mt-4 px-6">
            <Link to="/create">Create it now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
