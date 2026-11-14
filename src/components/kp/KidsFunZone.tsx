import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Gift,
  Smile,
  Volume2,
  Flame,
  Award,
  RefreshCw,
  Heart,
  Star,
  CheckCircle2,
  Zap,
  Music,
  Compass,
  Rocket,
  Wand2,
  Cookie,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { burstConfetti } from "@/components/kp/confetti";
import { sounds } from "@/lib/kidsAudio";
import { MASCOTS } from "@/config/brand";

const HOLIDAY_JOKES = [
  { q: "What kind of candy is never on time?", a: "Choco-LATE! 🍫😂" },
  { q: "What is an elf's favorite school subject?", a: "The ELF-abet! 🧝‍♂️📚" },
  { q: "What do snowmen eat for breakfast?", a: "Frosted Flakes or Ice Krispies! ❄️🥣" },
  { q: "Where does Santa keep all his money?", a: "In a snowbank! ⛄💰" },
  { q: "What do you call a reindeer who tells jokes?", a: "A COMEDIAN-deer! 🦌🎤" },
  { q: "What falls at the North Pole but never gets hurt?", a: "The snow! ❄️✨" },
  { q: "What did one snowman say to the other?", a: "'Do you smell carrots?' 🥕😆" },
  { q: "What do you call an elf who won the lottery?", a: "WELF-y! 💰✨" },
];

const SURPRISE_REWARDS = [
  { title: "Golden Starlight Badge", emoji: "⭐", desc: "You unlocked the North Pole Star of Kindness!" },
  { title: "Peppermint Champion", emoji: "🍬", desc: "You have supreme holiday sweet energy!" },
  { title: "Reindeer Whisperer", emoji: "🦌", desc: "Rudolph just nudged your shoulder with a nuzzle!" },
  { title: "Master Snowball Architect", emoji: "🏰", desc: "Your snow fort is 100% impenetrable!" },
  { title: "Head Cookie Taster", emoji: "🍪", desc: "Santa's head baker approved your taste buds!" },
  { title: "Super Sleigh Pilot", emoji: "🛷", desc: "You just earned your Junior Co-Pilot Wings!" },
];

const ELF_FIRST_NAMES = [
  "Twinkle", "Sparky", "Jingle", "Peppermint", "Pip", "Waffles", "Cocoa",
  "Bubbles", "Gizmo", "Sugar-Plum", "Buttons", "Marshmallow", "Zippy",
];

const ELF_LAST_NAMES = [
  "Cookie-Crumbs", "Jelly-Belly", "Snow-Paws", "Twinkle-Toes", "Fluffernutter",
  "Silver-Bells", "Candycane-Boots", "Star-Glider", "Mistletoe-Spinner",
];

const COOKIE_BASES = [
  { id: "gingerbread", label: "Gingerbread Pal", emoji: "🍪" },
  { id: "snowman", label: "Frosty Snowman", emoji: "⛄" },
  { id: "tree", label: "Pine Tree", emoji: "🎄" },
];

const TOPPINGS = [
  { id: "frosting", label: "Rainbow Sprinkles", emoji: "🌈" },
  { id: "candycane", label: "Candy Cane", emoji: "🦯" },
  { id: "gumdrops", label: "Gumdrop Buttons", emoji: "🍬" },
  { id: "glasses", label: "Cool Sunglasses", emoji: "🕶️" },
  { id: "hat", label: "Santa Hat", emoji: "🎅" },
  { id: "star", label: "Gold Star", emoji: "⭐" },
];

export function KidsFunZone() {
  // Active Tab for games
  const [activeTab, setActiveTab] = useState<"arcade" | "bakery" | "elfname" | "radar" | "mascots">("arcade");

  // Gift Box state
  const [giftOpen, setGiftOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState(SURPRISE_REWARDS[0]!);
  
  // Joke State
  const [jokeIndex, setJokeIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Mascot Play state
  const [pippinMood, setPippinMood] = useState<string>("Waiting for a snack!");
  const [pippinAnimation, setPippinAnimation] = useState<number>(0);
  const [barnabySpeech, setBarnabySpeech] = useState<string>("Whoo-whoo! Tap me to inspect your kindness!");

  // Snowball Popper mini-game
  const [snowballs, setSnowballs] = useState([
    { id: 1, text: "❄️", popped: false, pts: 50 },
    { id: 2, text: "☃️", popped: false, pts: 100 },
    { id: 3, text: "⭐", popped: false, pts: 75 },
    { id: 4, text: "🍪", popped: false, pts: 120 },
    { id: 5, text: "🎁", popped: false, pts: 150 },
    { id: 6, text: "🎈", popped: false, pts: 200 },
  ]);
  const [kidScore, setKidScore] = useState(0);

  // Bakery state
  const [cookieBase, setCookieBase] = useState(COOKIE_BASES[0]!);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(["frosting", "hat"]);
  const [bakerySpeech, setBakerySpeech] = useState<string>("Pick your base and add delicious toppings!");

  // Elf Name Generator
  const [elfName, setElfName] = useState<{ first: string; last: string; title: string }>({
    first: "Twinkle",
    last: "Cookie-Crumbs",
    title: "Chief Toy Tinker",
  });
  const [isSpinningName, setIsSpinningName] = useState(false);

  // Radar Boost state
  const [radarBoostCount, setRadarBoostCount] = useState(3);
  const [turboActive, setTurboActive] = useState(false);
  const [rudolphMood, setRudolphMood] = useState("Nose glowing at 100% brightness!");

  // Sound triggers
  const handleUnwrapGift = (e: React.MouseEvent) => {
    sounds.playTada();
    sounds.playJingle();
    burstConfetti(e.clientX, e.clientY, 150);
    const randomReward = SURPRISE_REWARDS[Math.floor(Math.random() * SURPRISE_REWARDS.length)]!;
    setCurrentReward(randomReward);
    setGiftOpen(true);
  };

  const handleNextJoke = () => {
    sounds.playBoing();
    setShowAnswer(false);
    setJokeIndex((prev) => (prev + 1) % HOLIDAY_JOKES.length);
  };

  const handleRevealAnswer = () => {
    sounds.playGiggle();
    setShowAnswer(true);
  };

  const handleFeedPippin = (food: string, soundFn: () => void) => {
    soundFn();
    setPippinAnimation((prev) => prev + 1);
    if (food === "cookie") {
      setPippinMood("Nom nom nom! The crunchiest gingerbread EVER! 🍪🎉");
    } else if (food === "carrot") {
      setPippinMood("Crunch crunch! Sweet & crisp! Pippin approves! 🥕✨");
    } else {
      setPippinMood("Slurp! Warm chocolate with mini marshmallows! ☕❤️");
    }
  };

  const handleTickleBarnaby = (e: React.MouseEvent) => {
    sounds.playChime();
    burstConfetti(e.clientX, e.clientY, 50);
    setBarnabySpeech("Hee-hee! That tickles my snowy wings! Barnaby rates you 100/100 on Joy!");
  };

  const handlePopSnowball = (id: number, pts: number, e: React.MouseEvent) => {
    sounds.playPop();
    burstConfetti(e.clientX, e.clientY, 35);
    setKidScore((prev) => prev + pts);
    setSnowballs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, popped: true } : s))
    );
  };

  const handleResetSnowballs = () => {
    sounds.playChime();
    setSnowballs((prev) => prev.map((s) => ({ ...s, popped: false })));
  };

  // Toggle bakery toppings
  const toggleTopping = (id: string) => {
    sounds.playPop();
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleFeedCookieToPippin = (e: React.MouseEvent) => {
    sounds.playCrunch();
    sounds.playGiggle();
    burstConfetti(e.clientX, e.clientY, 100);
    setBakerySpeech("CRUNCH! Pippin ate it in ONE BITE! 🦊 Awarded: 500 Wonder Points!");
    setKidScore((prev) => prev + 500);
  };

  const handleSpinElfName = (e: React.MouseEvent) => {
    sounds.playRocket();
    setIsSpinningName(true);
    setTimeout(() => {
      const f = ELF_FIRST_NAMES[Math.floor(Math.random() * ELF_FIRST_NAMES.length)]!;
      const l = ELF_LAST_NAMES[Math.floor(Math.random() * ELF_LAST_NAMES.length)]!;
      const titles = [
        "Head Reindeer Feeder",
        "Master Sleigh Waxer",
        "Supreme Candy Cane Taster",
        "Chief Gift Wrapper",
        "Starlight Navigator",
      ];
      setElfName({
        first: f,
        last: l,
        title: titles[Math.floor(Math.random() * titles.length)]!,
      });
      setIsSpinningName(false);
      sounds.playTada();
      burstConfetti(e.clientX, e.clientY, 80);
    }, 600);
  };

  const handleTriggerTurbo = (e: React.MouseEvent) => {
    sounds.playRocket();
    sounds.playJingle();
    burstConfetti(e.clientX, e.clientY, 120);
    setTurboActive(true);
    setRadarBoostCount((prev) => prev + 1);
    setRudolphMood("⚡ TURBO CARROT BOOST ACTIVATED! Rudolph zooming at supersonic holiday speed!");
    setTimeout(() => setTurboActive(false), 2500);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6" id="kids-playland">
      <div className="relative overflow-hidden rounded-[3.5rem] bg-gradient-to-b from-indigo-950/95 via-midnight to-blue-950 border-4 border-gold/50 p-6 sm:p-12 shadow-[0_0_100px_rgba(242,208,107,0.25)]">
        
        {/* Glow ambient effects */}
        <div aria-hidden className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-candy/30 blur-[130px] pointer-events-none" />
        <div aria-hidden className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-mint/30 blur-[130px] pointer-events-none" />
        <div aria-hidden className="absolute left-1/2 top-1/3 -translate-x-1/2 h-80 w-80 rounded-full bg-gold/20 blur-[140px] pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-candy via-gold to-mint px-6 py-2.5 text-xs font-black uppercase tracking-[0.25em] text-midnight shadow-lg mb-4 animate-bounce">
            <Sparkles className="h-4 w-4 fill-midnight" /> 🎪 Kids Magic Wonderland & Toy Box 🎈
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-snow leading-tight tracking-tight drop-shadow-md">
            Tap, Play, Decorate & <span className="text-gold-foil">Unwrap the Magic!</span>
          </h2>
          <p className="mt-3 text-snow/90 text-base sm:text-xl font-medium">
            Everything here is interactive! Decorate treats, pop floating snowballs, trigger sound effects, and spin your official Elf Name!
          </p>

          {/* Kid Score & Trophies Ribbon */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full glass-gold px-5 py-2 border-2 border-gold/60 shadow-gold">
              <span className="text-2xl">⭐</span>
              <span className="font-display text-lg font-bold text-snow">
                Wonder Score: <span className="text-gold text-2xl font-black">{kidScore}</span> PTS
              </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 border border-mint/40 text-mint text-sm font-bold">
              <Award className="h-4 w-4" /> Official Junior Elf Status
            </div>
          </div>
        </div>

        {/* Interactive Navigation Tabs */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {[
            { id: "arcade", label: "🎯 Toy Box & Arcade", icon: Sparkles },
            { id: "bakery", label: "🍪 Cookie Decorator", icon: Cookie },
            { id: "elfname", label: "🧝 Silly Elf Name", icon: Wand2 },
            { id: "radar", label: "🦌 Rudolph Flight Radar", icon: Compass },
            { id: "mascots", label: "🦊 Meet The Mascots", icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all cursor-pointer shadow-md ${
                  active
                    ? "bg-gradient-to-r from-gold via-amber-300 to-yellow-400 text-midnight scale-105 border-2 border-white shadow-gold"
                    : "glass text-snow/90 hover:bg-snow/15 hover:text-snow border border-snow/20"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-midnight" : "text-gold"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: ARCADE & TOY BOX ================= */}
        {activeTab === "arcade" && (
          <div className="relative z-10 space-y-12 animate-fade-in">
            {/* Secret Gift Box */}
            <div className="text-center">
              <div className="max-w-xl mx-auto rounded-3xl glass p-8 border-2 border-gold/40 shadow-2xl relative overflow-hidden bg-midnight/60">
                <span className="text-xs font-black uppercase tracking-widest text-gold block mb-1">
                  🎁 The Secret Wonder Box
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-snow">
                  Tap to Pop & Unwrap Your Surprise!
                </h3>

                <div className="my-6 flex justify-center">
                  {!giftOpen ? (
                    <motion.button
                      type="button"
                      onClick={handleUnwrapGift}
                      whileHover={{ scale: 1.18, rotate: [-3, 3, -3] }}
                      whileTap={{ scale: 0.88 }}
                      className="relative group cursor-pointer"
                    >
                      <div className="text-8xl sm:text-9xl drop-shadow-[0_15px_35px_rgba(255,51,102,0.5)] animate-bounce">
                        🎁
                      </div>
                      <span className="inline-block mt-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-candy to-pink-500 text-snow font-black text-sm tracking-wide shadow-candy group-hover:scale-105 transition">
                        TAP TO POP OPEN! ✨
                      </span>
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ scale: 0, rotate: -25 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="rounded-3xl bg-gradient-to-br from-gold/30 via-midnight to-amber-950 p-6 border-2 border-gold shadow-2xl w-full"
                    >
                      <span className="text-6xl sm:text-7xl block mb-2">{currentReward.emoji}</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-gold bg-midnight/80 px-3 py-1 rounded-full border border-gold/40">
                        ⭐ UNLOCKED SPECIAL REWARD! ⭐
                      </span>
                      <h4 className="font-display text-2xl sm:text-3xl font-black text-snow mt-2">
                        {currentReward.title}
                      </h4>
                      <p className="text-sm sm:text-base text-snow/90 mt-2 max-w-sm mx-auto">
                        {currentReward.desc}
                      </p>
                      <div className="mt-5 flex justify-center gap-3">
                        <Button
                          variant="gold"
                          size="sm"
                          onClick={(e) => {
                            sounds.playPop();
                            setGiftOpen(false);
                          }}
                          className="rounded-full text-xs font-bold"
                        >
                          🎀 Wrap Another Box
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Tactile Soundboard */}
            <div>
              <div className="text-center mb-6">
                <span className="text-xs font-extrabold uppercase tracking-widest text-mint">
                  🔊 North Pole Soundboard Machine
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-snow mt-1">
                  Tap for Silly & Cheerful Sounds!
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  { label: "Ho Ho Ho!", emoji: "🎅", play: () => sounds.playHoHoHo(), color: "hover:border-candy hover:bg-candy/20" },
                  { label: "Sleigh Bells", emoji: "🔔", play: () => sounds.playJingle(), color: "hover:border-gold hover:bg-gold/20" },
                  { label: "Ta-Da!", emoji: "🎺", play: () => sounds.playTada(), color: "hover:border-yellow-400 hover:bg-yellow-400/20" },
                  { label: "Rocket Zoom", emoji: "🚀", play: () => sounds.playRocket(), color: "hover:border-orange-400 hover:bg-orange-400/20" },
                  { label: "Squeaky Toy", emoji: "🐥", play: () => sounds.playSqueak(), color: "hover:border-lime-400 hover:bg-lime-400/20" },
                  { label: "Magic Wand", emoji: "🪄", play: () => sounds.playChime(), color: "hover:border-mint hover:bg-mint/20" },
                  { label: "Cookie Crunch", emoji: "🍪", play: () => sounds.playCrunch(), color: "hover:border-amber-400 hover:bg-amber-400/20" },
                  { label: "Elf Giggle", emoji: "😂", play: () => sounds.playGiggle(), color: "hover:border-pink-400 hover:bg-pink-400/20" },
                ].map((btn) => (
                  <motion.button
                    key={btn.label}
                    type="button"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={btn.play}
                    className={`p-4 rounded-2xl glass border border-snow/15 flex flex-col items-center justify-center gap-2 cursor-pointer transition ${btn.color}`}
                  >
                    <span className="text-4xl">{btn.emoji}</span>
                    <span className="font-extrabold text-xs text-snow">{btn.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Snowball Bubble Popper Arcade */}
            <div className="rounded-3xl glass p-6 sm:p-8 border-2 border-mint/40 text-center bg-midnight/50">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <div className="text-left">
                  <span className="text-xs font-black uppercase tracking-widest text-mint block">
                    🎯 Floating Snowball Popper
                  </span>
                  <h4 className="font-display text-2xl font-black text-snow">
                    Tap the Floating Toys to Pop Them!
                  </h4>
                </div>
                <div className="bg-mint/25 border-2 border-mint px-5 py-2 rounded-full font-bold text-snow text-sm">
                  Snowball Points: <span className="text-mint text-xl font-black">{kidScore}</span> PTS ⭐
                </div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 py-6 min-h-36">
                {snowballs.map((ball) =>
                  !ball.popped ? (
                    <motion.button
                      key={ball.id}
                      type="button"
                      whileHover={{ scale: 1.3, rotate: 12 }}
                      whileTap={{ scale: 0.7 }}
                      onClick={(e) => handlePopSnowball(ball.id, ball.pts, e)}
                      className="h-20 w-20 rounded-full glass border-2 border-mint/60 text-4xl grid place-items-center cursor-pointer shadow-mint animate-float"
                      style={{ animationDelay: `-${ball.id * 0.9}s` }}
                    >
                      {ball.text}
                    </motion.button>
                  ) : (
                    <div
                      key={ball.id}
                      className="h-20 w-20 rounded-full border border-dashed border-mint/40 text-xs text-mint grid place-items-center font-black animate-scale-in"
                    >
                      +{ball.pts} POP! ✨
                    </div>
                  )
                )}
              </div>

              <div className="pt-2">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={handleResetSnowballs}
                  className="rounded-full text-xs font-bold text-snow"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" /> Toss More Snowballs!
                </Button>
              </div>
            </div>

            {/* Holiday Joke Machine */}
            <div className="max-w-xl mx-auto rounded-3xl glass-gold p-6 sm:p-8 text-center border-2 border-gold/50 shadow-xl bg-midnight/60">
              <span className="text-xs font-black uppercase tracking-widest text-candy block mb-1">
                😂 The Holiday Giggle Dispenser
              </span>
              <h4 className="font-display text-2xl font-black text-snow">
                Need a Holiday Chuckle?
              </h4>

              <div className="my-5 p-5 rounded-2xl bg-midnight/80 border border-gold/30 min-h-24 flex flex-col justify-center">
                <p className="font-display text-lg font-bold text-gold">
                  "{HOLIDAY_JOKES[jokeIndex]!.q}"
                </p>
                {showAnswer ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-xl font-extrabold text-mint mt-3"
                  >
                    {HOLIDAY_JOKES[jokeIndex]!.a}
                  </motion.p>
                ) : (
                  <button
                    type="button"
                    onClick={handleRevealAnswer}
                    className="mt-3 text-sm font-bold text-candy underline hover:text-snow cursor-pointer"
                  >
                    Click to reveal the punchline! 🙈
                  </button>
                )}
              </div>

              <Button
                variant="candy"
                size="sm"
                onClick={handleNextJoke}
                className="rounded-full text-xs font-black shadow-candy"
              >
                Tell me another joke! 🤣
              </Button>
            </div>
          </div>
        )}

        {/* ================= TAB 2: COOKIE DECORATOR ================= */}
        {activeTab === "bakery" && (
          <div className="relative z-10 animate-fade-in max-w-4xl mx-auto">
            <div className="rounded-3xl glass p-8 border-2 border-gold/50 text-center bg-midnight/70 shadow-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-gold block mb-1">
                🧁 The North Pole Cookie Workshop
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-snow">
                Design Your Dream Holiday Treat!
              </h3>
              <p className="text-snow/80 text-sm sm:text-base mt-2">
                Choose a cookie shape, click the toppings to decorate it, and feed it to Pippin!
              </p>

              {/* Cookie Shape Picker */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {COOKIE_BASES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      setCookieBase(b);
                    }}
                    className={`px-4 py-2 rounded-2xl font-bold text-sm flex items-center gap-2 border transition cursor-pointer ${
                      cookieBase.id === b.id
                        ? "bg-gold text-midnight border-white font-black scale-105"
                        : "glass text-snow border-snow/20 hover:bg-snow/10"
                    }`}
                  >
                    <span className="text-2xl">{b.emoji}</span> {b.label}
                  </button>
                ))}
              </div>

              {/* The Live Interactive Cookie Plate */}
              <div className="my-8 relative mx-auto h-64 w-64 sm:h-72 sm:w-72 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-8 border-gold shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
                <div className="text-8xl sm:text-9xl transition-transform duration-300 drop-shadow-lg relative select-none">
                  {cookieBase.emoji}

                  {/* Layered Toppings */}
                  {selectedToppings.includes("hat") && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl animate-bounce">
                      🎅
                    </span>
                  )}
                  {selectedToppings.includes("glasses") && (
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl">
                      🕶️
                    </span>
                  )}
                  {selectedToppings.includes("candycane") && (
                    <span className="absolute -right-6 top-6 text-5xl rotate-12">
                      🦯
                    </span>
                  )}
                  {selectedToppings.includes("gumdrops") && (
                    <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl">
                      🍬
                    </span>
                  )}
                  {selectedToppings.includes("star") && (
                    <span className="absolute -left-6 top-6 text-4xl animate-pulse">
                      ⭐
                    </span>
                  )}
                  {selectedToppings.includes("frosting") && (
                    <span className="absolute -bottom-4 right-0 text-4xl">
                      🌈
                    </span>
                  )}
                </div>
              </div>

              {/* Topping Clickers */}
              <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-wider text-mint mb-3">
                  Click to add or remove toppings:
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {TOPPINGS.map((t) => {
                    const active = selectedToppings.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTopping(t.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                          active
                            ? "bg-mint text-midnight border-white scale-105 font-black"
                            : "glass text-snow border-snow/20 hover:border-mint/50"
                        }`}
                      >
                        <span className="text-lg">{t.emoji}</span> {t.label}
                        {active && " ✓"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback Message */}
              <div className="bg-midnight/90 p-4 rounded-2xl border border-gold/30 max-w-md mx-auto text-snow font-bold text-sm sm:text-base mb-6">
                {bakerySpeech}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={handleFeedCookieToPippin}
                  className="rounded-full font-black text-midnight shadow-gold text-base px-8 h-12"
                >
                  🦊 Feed to Pippin! (+500 PTS)
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  onClick={(e) => {
                    sounds.playTada();
                    burstConfetti(e.clientX, e.clientY, 80);
                    setBakerySpeech("🌟 Certified by Santa's Head Baker as a Masterpiece!");
                  }}
                  className="rounded-full text-base font-bold text-snow px-6 h-12"
                >
                  ⭐ Santa's Baker Stamp
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ELF NAME GENERATOR ================= */}
        {activeTab === "elfname" && (
          <div className="relative z-10 animate-fade-in max-w-2xl mx-auto text-center">
            <div className="rounded-3xl glass-gold p-8 border-2 border-gold/50 bg-midnight/70 shadow-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-candy block mb-1">
                🧝 Official North Pole Registry
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-snow">
                What's Your Silly Elf Name?
              </h3>
              <p className="text-snow/80 text-sm sm:text-base mt-2">
                Spin the magical slot machine to find your certified holiday title!
              </p>

              {/* Elf Badge Card */}
              <div className="my-8 rounded-3xl bg-gradient-to-b from-candy/30 via-midnight to-blue-950 p-8 border-4 border-gold shadow-2xl relative overflow-hidden">
                <div className="text-6xl mb-3">🧝‍♀️✨</div>
                <div className="text-xs font-black uppercase tracking-[0.3em] text-gold mb-1">
                  OFFICIAL NORTH POLE PASSPORT
                </div>
                <div className="font-display text-3xl sm:text-5xl font-black text-snow drop-shadow-md">
                  {elfName.first} {elfName.last}
                </div>
                <div className="mt-3 inline-block rounded-full bg-mint/20 border border-mint/40 px-4 py-1.5 text-xs sm:text-sm font-black text-mint">
                  Rank: {elfName.title}
                </div>
              </div>

              {/* Spin Button */}
              <Button
                variant="candy"
                size="xl"
                disabled={isSpinningName}
                onClick={handleSpinElfName}
                className="rounded-full h-14 px-10 text-lg font-black shadow-candy hover:scale-105 transition"
              >
                {isSpinningName ? "🌀 Spinning Magic..." : "🎲 Spin My Silly Elf Name!"}
              </Button>
            </div>
          </div>
        )}

        {/* ================= TAB 4: RUDOLPH RADAR ================= */}
        {activeTab === "radar" && (
          <div className="relative z-10 animate-fade-in max-w-3xl mx-auto">
            <div className="rounded-3xl glass p-8 border-2 border-candy/50 text-center bg-midnight/70 shadow-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-candy block mb-1">
                📡 Live Holiday Airspace Tracker
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-snow">
                Rudolph's Sleigh Flight Radar
              </h3>
              <p className="text-snow/80 text-sm sm:text-base mt-2">
                Track Santa's co-pilot in real time and send him supersonic carrot fuel!
              </p>

              {/* Radar Screen Visual */}
              <div className="my-8 relative mx-auto h-64 sm:h-72 w-full max-w-md rounded-3xl bg-slate-950 border-4 border-mint/60 shadow-mint overflow-hidden flex flex-col items-center justify-center p-4">
                {/* Radar Grid circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                  <div className="h-24 w-24 rounded-full border border-mint" />
                  <div className="h-44 w-44 rounded-full border border-mint absolute" />
                  <div className="h-60 w-60 rounded-full border border-mint absolute" />
                  <div className="w-full h-px bg-mint absolute" />
                  <div className="h-full w-px bg-mint absolute" />
                </div>

                {/* Sweeping Radar Line */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-mint/20 to-transparent pointer-events-none"
                  style={{ animation: "spin 4s linear infinite" }}
                />

                {/* Rudolph Blip */}
                <div className={`relative z-10 flex flex-col items-center ${turboActive ? "animate-bounce scale-125" : ""}`}>
                  <div className="text-6xl sm:text-7xl drop-shadow-[0_0_25px_rgba(255,51,102,0.8)]">
                    🦌
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-candy text-snow text-xs font-black shadow-candy">
                    🔴 Nose Glow: 100% {turboActive ? "⚡ TURBO!" : ""}
                  </span>
                </div>
              </div>

              {/* Status bar */}
              <div className="bg-midnight/90 p-4 rounded-2xl border border-snow/15 text-snow text-sm sm:text-base font-bold mb-6">
                {rudolphMood}
              </div>

              {/* Turbo Boost Button */}
              <Button
                variant="candy"
                size="xl"
                onClick={handleTriggerTurbo}
                className="rounded-full h-14 px-10 text-lg font-black shadow-candy hover:scale-105 transition"
              >
                🥕 Fire Turbo Carrot Boost! 🚀
              </Button>
            </div>
          </div>
        )}

        {/* ================= TAB 5: MASCOTS ================= */}
        {activeTab === "mascots" && (
          <div className="relative z-10 animate-fade-in grid gap-8 lg:grid-cols-2">
            {/* Play with Pippin */}
            <div className="rounded-3xl glass p-8 border-2 border-candy/40 text-center flex flex-col justify-between bg-midnight/60 shadow-xl">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-candy">
                  🦊 Pippin's Snack Bar
                </div>
                <motion.div
                  key={pippinAnimation}
                  initial={{ scale: 0.8, rotate: -8 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-8xl sm:text-9xl my-4 inline-block drop-shadow-[0_10px_25px_rgba(255,51,102,0.4)]"
                >
                  🦊
                </motion.div>
                <div className="bg-midnight/80 p-4 rounded-2xl border border-snow/15 max-w-sm mx-auto text-base text-snow font-bold">
                  "{pippinMood}"
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs text-snow/70 mb-3 font-extrabold uppercase tracking-wider">
                  Feed Pippin a holiday treat:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    variant="gold"
                    size="md"
                    onClick={() => handleFeedPippin("cookie", () => sounds.playCrunch())}
                    className="rounded-full text-xs font-black"
                  >
                    🍪 Cookie
                  </Button>
                  <Button
                    variant="candy"
                    size="md"
                    onClick={() => handleFeedPippin("carrot", () => sounds.playCrunch())}
                    className="rounded-full text-xs font-black"
                  >
                    🥕 Crunchy Carrot
                  </Button>
                  <Button
                    variant="glass"
                    size="md"
                    onClick={() => handleFeedPippin("cocoa", () => sounds.playGiggle())}
                    className="rounded-full text-xs font-black"
                  >
                    ☕ Marshmallow Cocoa
                  </Button>
                </div>
              </div>
            </div>

            {/* Play with Barnaby */}
            <div className="rounded-3xl glass p-8 border-2 border-gold/40 text-center flex flex-col justify-between bg-midnight/60 shadow-xl">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-gold">
                  🦉 Barnaby's Wisdom Tree
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  whileTap={{ scale: 0.88 }}
                  onClick={handleTickleBarnaby}
                  className="text-8xl sm:text-9xl my-4 inline-block drop-shadow-[0_10px_25px_rgba(242,208,107,0.4)] cursor-pointer"
                >
                  🦉
                </motion.button>
                <div className="bg-midnight/80 p-4 rounded-2xl border border-snow/15 max-w-sm mx-auto text-base text-snow font-bold">
                  "{barnabySpeech}"
                </div>
              </div>

              <div className="mt-8">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={handleTickleBarnaby}
                  className="rounded-full text-sm font-black shadow-gold px-8"
                >
                  ✨ Tickle Barnaby's Feathers!
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}