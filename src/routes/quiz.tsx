import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  RotateCcw,
  Share2,
  Sparkles,
  Trophy,
  Flame,
  ArrowRight,
  Gift,
  Star,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/kp/PageHero";
import { ChapterPortal } from "@/components/kp/ChapterPortal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { burstConfetti } from "@/components/kp/confetti";
import { BRAND_NAME } from "@/config/brand";
import {
  getDynamicQuestion,
  getRank,
  niceScore,
  type QuizOption,
} from "@/config/quiz";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: `The Joyful Wonder Quiz — Earn Points & Join the Nice List | ${BRAND_NAME}` },
      {
        name: "description",
        content:
          "Answer fun holiday questions, earn Wonder Points with every answer, and unlock your official Nice List certificate!",
      },
      { property: "og:title", content: `The Joyful Wonder Quiz — ${BRAND_NAME}` },
      {
        property: "og:description",
        content:
          "Earn points, level up your holiday rank, and celebrate childhood kindness with Wonderpost!",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answersList, setAnswersList] = useState<number[]>([]);
  const [pointPopups, setPointPopups] = useState<
    Array<{ id: number; text: string; x: number; y: number }>
  >([]);
  const [name, setName] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = getDynamicQuestion(questionIndex);
  const currentRank = getRank(points);
  const scorePercentage = niceScore(answersList);

  const handlePick = (option: QuizOption, e: React.MouseEvent) => {
    const gained = option.p * 100;
    const nextStreak = streak + 1;
    const bonus = nextStreak > 2 ? 50 : 0;
    const totalGained = gained + bonus;

    setPoints((prev) => prev + totalGained);
    setStreak(nextStreak);
    setAnswersList((prev) => [...prev, option.p]);

    // Spawn point popup animation
    const rect = e.currentTarget.getBoundingClientRect();
    const popupId = Date.now() + Math.random();
    setPointPopups((prev) => [
      ...prev,
      {
        id: popupId,
        text: `+${totalGained} ⭐ ${option.sparkle || "Wonder Points!"}`,
        x: rect.left + rect.width / 2,
        y: rect.top,
      },
    ]);

    setTimeout(() => {
      setPointPopups((prev) => prev.filter((p) => p.id !== popupId));
    }, 1400);

    // Burst festive confetti on every pick!
    burstConfetti(e.clientX, e.clientY, 40);

    // After 6 questions, give the option to finish or continue
    if (questionIndex + 1 >= 6 && !isFinished) {
      // Advance to next or let them continue!
      setQuestionIndex((prev) => prev + 1);
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setPoints(0);
    setStreak(0);
    setAnswersList([]);
    setIsFinished(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Chapter 03 · The Joyful Wonder Quiz"
        title={
          <>
            The <span className="text-gold-foil">Joyful Wonder</span> Quiz!
          </>
        }
        sub="Answer festive questions, score Wonder Points on every click, and discover your official North Pole status!"
      />

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        {/* Floating Point Popups */}
        {pointPopups.map((popup) => (
          <div
            key={popup.id}
            className="pointer-events-none fixed z-50 -translate-x-1/2 rounded-full bg-gold-gradient px-4 py-2 font-display text-sm font-bold text-midnight shadow-[0_0_25px_var(--gold)]"
            style={{
              left: popup.x,
              top: popup.y - 40,
              animation: "float 1.2s ease-out forwards",
            }}
          >
            {popup.text}
          </div>
        ))}

        {/* Top Gamification Bar: Points, Rank, and Streak */}
        <div className="mb-8 rounded-3xl glass-gold p-4 sm:p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/20 text-2xl shadow-inner">
                {currentRank.emoji}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-snow/60">
                  Current Rank
                </p>
                <p className="font-display text-xl font-bold text-gold">
                  {currentRank.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {streak > 1 && (
                <div className="flex items-center gap-1.5 rounded-full bg-candy/20 px-3 py-1 text-sm font-bold text-candy border border-candy/30 animate-pulse">
                  <Flame className="h-4 w-4" />
                  {streak}x Streak!
                </div>
              )}

              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-widest text-snow/60">
                  Wonder Points
                </p>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-snow tracking-tight">
                  <span className="text-mint">✦</span> {points.toLocaleString()} <span className="text-xs font-sans text-gold">PTS</span>
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs font-semibold text-snow/60">Question #{questionIndex + 1}</span>
            <div className="h-2 flex-1 rounded-full bg-midnight/60 overflow-hidden border border-snow/10">
              <div
                className="h-full rounded-full bg-aurora-gradient transition-all duration-500"
                style={{ width: `${Math.min(100, ((questionIndex % 6) + 1) * 16.6)}%` }}
              />
            </div>
            {answersList.length >= 6 && !isFinished && (
              <Button
                variant="gold"
                size="sm"
                onClick={() => setIsFinished(true)}
                className="h-7 text-xs font-bold rounded-full px-3"
              >
                Claim Certificate Now 📜
              </Button>
            )}
          </div>
        </div>

        {/* Main Quiz / Results Screen */}
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={questionIndex}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-[2.5rem] glass p-6 sm:p-12 text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-mint">
                <Sparkles className="h-3.5 w-3.5" />
                {currentQuestion.badge}
              </div>

              <h2 className="mt-6 font-display text-3xl font-semibold leading-snug text-snow sm:text-5xl max-w-2xl mx-auto">
                {currentQuestion.q}
              </h2>

              <p className="mt-3 text-sm text-snow/60">
                Click any joyful answer to earn +100 to +250 Wonder Points!
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {currentQuestion.a.map((opt, i) => (
                  <motion.button
                    key={opt.t}
                    type="button"
                    onClick={(e) => handlePick(opt, e)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.04, y: -6 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex min-h-56 flex-col items-center justify-between rounded-3xl bg-midnight/50 border border-gold/20 p-6 text-center transition duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-[0_10px_30px_rgba(255,215,0,0.15)] cursor-pointer"
                  >
                    <span className="text-6xl transition duration-300 group-hover:scale-125 group-hover:rotate-6">
                      {opt.e}
                    </span>
                    <span className="font-display text-lg font-semibold text-snow group-hover:text-gold mt-4 leading-snug">
                      {opt.t}
                    </span>
                    <span className="mt-3 inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold border border-gold/30">
                      +{opt.p * 100} Points
                    </span>
                  </motion.button>
                ))}
              </div>

              {answersList.length >= 6 && (
                <div className="mt-10 pt-8 border-t border-snow/10 flex flex-wrap items-center justify-center gap-4">
                  <p className="text-sm text-snow/70">
                    You've answered {answersList.length} questions! Ready for your official verdict?
                  </p>
                  <Button
                    variant="candy"
                    size="lg"
                    onClick={() => {
                      setIsFinished(true);
                      burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
                    }}
                    className="rounded-full shadow-candy"
                  >
                    View Official Nice List Verdict 📜
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <QuizResult
                points={points}
                rank={currentRank}
                score={scorePercentage}
                answersCount={answersList.length}
                name={name}
                setName={setName}
                onContinue={() => setIsFinished(false)}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <ChapterPortal />
    </>
  );
}

function QuizResult({
  points,
  rank,
  score,
  answersCount,
  name,
  setName,
  onContinue,
  onRestart,
}: {
  points: number;
  rank: { title: string; emoji: string };
  score: number;
  answersCount: number;
  name: string;
  setName: (s: string) => void;
  onContinue: () => void;
  onRestart: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCertificate = () => {
    const c = canvasRef.current ?? document.createElement("canvas");
    c.width = 1080;
    c.height = 1350;
    const ctx = c.getContext("2d")!;

    // Background gradient
    const g = ctx.createLinearGradient(0, 0, 0, 1350);
    g.addColorStop(0, "#070B1F");
    g.addColorStop(0.55, "#121A4A");
    g.addColorStop(1, "#070B1F");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1080, 1350);

    // Decorative border
    ctx.strokeStyle = "#F2D06B";
    ctx.lineWidth = 14;
    ctx.strokeRect(40, 40, 1000, 1270);
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, 970, 1240);

    // Header
    ctx.fillStyle = "#2EF2B1";
    ctx.font = "bold 28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("★ OFFICIAL NORTH POLE ACCREDITATION ★", 540, 180);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "italic 72px serif";
    ctx.fillText("Certificate of Wonder", 540, 270);

    ctx.fillStyle = "#F2D06B";
    ctx.font = "bold 44px sans-serif";
    ctx.fillText("100% OFFICIALLY ON THE NICE LIST", 540, 350);

    // Child Name
    ctx.fillStyle = "#EAEFFE";
    ctx.font = "bold 80px serif";
    ctx.fillText(name.trim() || "A Wonderful Child", 540, 520);

    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "32px sans-serif";
    ctx.fillText(`Earned Rank: ${rank.emoji} ${rank.title}`, 540, 620);
    ctx.fillText(`Total Wonder Score: ${points.toLocaleString()} Points`, 540, 680);
    ctx.fillText(`Kindness Rating: ${score}% Extra Nice`, 540, 740);

    // Gold seal
    ctx.beginPath();
    ctx.arc(540, 960, 120, 0, Math.PI * 2);
    ctx.fillStyle = "#F2D06B";
    ctx.fill();

    ctx.fillStyle = "#070B1F";
    ctx.font = "bold 34px sans-serif";
    ctx.fillText("WONDERPOST", 540, 950);
    ctx.font = "24px sans-serif";
    ctx.fillText("SEAL OF JOY", 540, 990);

    return c.toDataURL("image/png");
  };

  const handleDownload = () => {
    const url = drawCertificate();
    const a = document.createElement("a");
    a.href = url;
    a.download = `Wonderpost-Certificate-${(name || "NiceList").replace(/\s+/g, "-")}.png`;
    a.click();
  };

  const handleShare = async () => {
    const text = `${name || "My child"} just scored ${points.toLocaleString()} points on the Wonderpost Joyful Quiz and made the Nice List! 🎄⭐`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Wonderpost Nice List Certificate", text, url: window.location.href });
      } catch {
        // cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert("Certificate text copied to clipboard!");
    }
  };

  return (
    <div className="rounded-[2.5rem] glass-gold p-6 sm:p-14 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold-gradient text-midnight shadow-[0_0_40px_var(--gold)]">
        <Trophy className="h-10 w-10" />
      </div>

      <p className="mt-6 text-xs font-bold uppercase tracking-[0.35em] text-mint">
        Official Verdict Delivered
      </p>

      <h2 className="mt-2 font-display text-4xl sm:text-6xl font-bold text-snow">
        Welcome to the <span className="text-gold-foil">Nice List!</span>
      </h2>

      <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-midnight/50 px-6 py-4 border border-gold/20">
        <div>
          <p className="text-xs text-snow/60 uppercase tracking-widest">Total Wonder Points</p>
          <p className="font-display text-3xl font-extrabold text-gold">{points.toLocaleString()}</p>
        </div>
        <div className="h-10 w-px bg-snow/10 hidden sm:block" />
        <div>
          <p className="text-xs text-snow/60 uppercase tracking-widest">Rank Earned</p>
          <p className="font-display text-2xl font-bold text-snow">{rank.emoji} {rank.title}</p>
        </div>
        <div className="h-10 w-px bg-snow/10 hidden sm:block" />
        <div>
          <p className="text-xs text-snow/60 uppercase tracking-widest">Questions Completed</p>
          <p className="font-display text-2xl font-bold text-mint">{answersCount}</p>
        </div>
      </div>

      {/* Name Input for Certificate */}
      <div className="mt-8 max-w-md mx-auto">
        <label className="block text-left text-sm font-semibold text-snow/80 mb-2">
          Enter child's name for their personalized Certificate:
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Leo or Sophie"
          className="h-14 rounded-2xl border-gold/30 bg-midnight/60 text-lg text-center font-display"
        />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button variant="gold" size="xl" onClick={handleDownload} className="rounded-full shadow-lg">
          <Download className="h-4 w-4 mr-2" /> Download Official Certificate
        </Button>
        <Button variant="glass" size="xl" onClick={handleShare} className="rounded-full">
          <Share2 className="h-4 w-4 mr-2" /> Share Results
        </Button>
        <Button
          variant="candy"
          size="xl"
          onClick={onContinue}
          className="rounded-full shadow-candy"
        >
          <Sparkles className="h-4 w-4 mr-2" /> Keep Answering More Questions (+Points)
        </Button>
      </div>

      <div className="mt-12 rounded-3xl glass p-8 text-left max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-6">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gold/20 text-gold">
          <Gift className="h-8 w-8" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-display text-2xl font-semibold text-snow">
            Ready to find their holiday keepsake?
          </h3>
          <p className="mt-1 text-sm text-snow/70">
            Visit the Holiday Shop to personalize an engraved keepsake or certified letter featuring their name!
          </p>
        </div>
        <Button asChild variant="candy" size="lg" className="rounded-full shrink-0">
          <Link to="/shop">
            Visit Shop <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-sm text-snow/50 hover:text-snow transition"
        >
          <RotateCcw className="h-4 w-4" /> Start Over from Question 1
        </button>
      </div>
    </div>
  );
}
