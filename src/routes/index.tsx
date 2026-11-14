import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Gift,
  Heart,
  Sparkles,
  Mail,
  Star,
  CheckCircle2,
  Smile,
  Zap,
} from "lucide-react";
import heroImg from "@/assets/hero-north-pole.jpg";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/kp/Countdown";
import { NorthStar } from "@/components/kp/NorthStar";
import { TrustRow } from "@/components/kp/TrustRow";
import { GiftBox } from "@/components/kp/GiftBox";
import { SleighIcon } from "@/components/kp/SleighIcon";
import { SectionHeading } from "@/components/kp/SectionHeading";
import { MagicPromise } from "@/components/kp/MagicPromise";
import { KidsFunZone } from "@/components/kp/KidsFunZone";
import { BRAND_NAME, TAGLINE, MASCOTS, GLOBAL_GREETINGS } from "@/config/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND_NAME} — Delivering Pure Childhood Holiday Wonder Worldwide` },
      {
        name: "description",
        content:
          "Personalized holiday letters, certified certificates, and magical moments crafted especially for kids. 100% digital, instant worldwide delivery.",
      },
      { property: "og:title", content: `${BRAND_NAME} — ${TAGLINE}` },
      {
        property: "og:description",
        content:
          "Instant digital holiday magic delivered to families in all countries and currencies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="relative">
      <GlobalGreetingsRibbon />
      <Hero />
      <KidsFunZone />
      <DestinationPortals />
      <DigitalMagicHighlight />
      <MagicPromise />
    </div>
  );
}

function GlobalGreetingsRibbon() {
  return (
    <div className="bg-gradient-to-r from-gold/20 via-mint/20 to-candy/20 border-b border-gold/25 py-2 px-4 text-center text-xs font-semibold text-snow/90 backdrop-blur-md">
      <div className="mx-auto flex flex-wrap items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-gold font-bold">
          🌍 Global Family Magic:
        </span>
        <span>{GLOBAL_GREETINGS.join(" · ")}</span>
        <span className="hidden sm:inline text-mint font-bold">
          · ⚡ 100% Digital Delivery in Minutes Worldwide
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-[90svh] items-center overflow-hidden pb-20 pt-28 sm:pt-36">
      <img
        src={heroImg}
        alt="Enchanted winter holiday landscape"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] opacity-65"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-midnight/50 via-midnight/35 to-midnight" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight/95 via-midnight/60 to-transparent" />

      {/* Sleigh crossing the moon animation */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[12%] hidden h-44 w-[36rem] overflow-hidden md:block"
      >
        <div
          className="absolute top-1/2 text-midnight"
          style={{ animation: "moon-sleigh 14s linear infinite" }}
        >
          <SleighIcon className="h-12 w-44" />
        </div>
      </div>

      <NorthStar className="left-[10%] top-28 sm:left-[45%] sm:top-36" />

      {/* Floating decorative gifts */}
      <GiftBox
        color="candy"
        className="absolute bottom-[16%] right-[8%] hidden h-24 w-24 animate-float drop-shadow-[0_15px_35px_var(--candy)] md:block"
      />
      <GiftBox
        color="mint"
        className="absolute bottom-[36%] right-[24%] hidden h-16 w-16 animate-float md:block"
        style={{ animationDelay: "-2s" }}
      />
      <GiftBox
        color="violet"
        className="absolute right-[4%] top-[45%] hidden h-14 w-14 animate-float lg:block"
        style={{ animationDelay: "-4s" }}
      />

      {/* Enlarged Center Stack */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-mint border border-mint/30 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-mint animate-twinkle" />
              Welcome to {BRAND_NAME}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-bold text-gold border border-gold/30">
              <Sparkles className="h-3.5 w-3.5" /> 100% Kid-Approved Wonder
            </span>
          </div>

          <h1 className="font-display text-[3.6rem] font-bold leading-[0.92] tracking-[-0.04em] text-snow sm:text-7xl lg:text-[7.8rem]">
            Where holiday wonder <em className="text-gold-foil not-italic">lights up their eyes.</em>
          </h1>

          <p className="mt-8 max-w-2xl text-xl text-snow/90 sm:text-2xl font-normal leading-relaxed">
            Personalized holiday letters, certified certificates, and magical moments
            delivered instantly to your screen and inbox anywhere on Earth — even on Christmas Eve.
          </p>

          <div className="mt-8">
            <Countdown />
          </div>

          {/* Clean Action Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="candy" size="xl" className="h-16 px-8 text-lg rounded-full shadow-candy hover:scale-105 transition font-black">
              <Link to="/shop">
                Explore the Digital Shop <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="gold" size="xl" className="h-16 px-8 text-lg rounded-full shadow-gold hover:scale-105 transition text-midnight font-black">
              <a href="#kids-playland">
                🎪 Kids Magic Playland & Toys 🎈
              </a>
            </Button>
            <Button asChild variant="glass" size="xl" className="h-16 px-8 text-lg rounded-full hover:scale-105 transition font-bold">
              <Link to="/quiz">
                Play the Joyful Quiz ⭐
              </Link>
            </Button>
          </div>

          <div className="mt-10">
            <TrustRow />
          </div>
        </div>
      </div>
    </section>
  );
}

function MeetTheMascots() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="rounded-[3rem] glass-gold p-8 sm:p-14 border border-gold/30 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-mint">
            Meet Your Wonderpost Guides
          </span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-snow">
            Barnaby & Pippin
          </h2>
          <p className="mt-3 text-snow/75 text-base sm:text-lg">
            Our beloved holiday companions who hand-stamp every wax seal and cheer with every quiz answer!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Barnaby */}
          <div className="flex flex-col sm:flex-row items-center gap-6 rounded-3xl bg-midnight/50 p-6 sm:p-8 border border-gold/20">
            <div className="text-7xl sm:text-8xl p-4 rounded-3xl bg-gold/15 border border-gold/30 shrink-0">
              {MASCOTS.primary.avatar}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                {MASCOTS.primary.title}
              </span>
              <h3 className="font-display text-3xl font-bold text-snow mt-1">
                {MASCOTS.primary.name} the {MASCOTS.primary.species}
              </h3>
              <p className="mt-3 text-snow/80 text-sm sm:text-base leading-relaxed">
                Equipped with tiny brass spectacles, Barnaby inspects every child's letter to ensure names and milestones are 100% perfect.
              </p>
              <p className="mt-3 text-gold italic font-medium text-sm">
                "{MASCOTS.primary.catchphrase}"
              </p>
            </div>
          </div>

          {/* Pippin */}
          <div className="flex flex-col sm:flex-row items-center gap-6 rounded-3xl bg-midnight/50 p-6 sm:p-8 border border-candy/20">
            <div className="text-7xl sm:text-8xl p-4 rounded-3xl bg-candy/15 border border-candy/30 shrink-0">
              {MASCOTS.secondary.avatar}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-candy">
                {MASCOTS.secondary.title}
              </span>
              <h3 className="font-display text-3xl font-bold text-snow mt-1">
                {MASCOTS.secondary.name} the {MASCOTS.secondary.species}
              </h3>
              <p className="mt-3 text-snow/80 text-sm sm:text-base leading-relaxed">
                Bouncy, cheerful, and loves sneaking holiday cookies. Pippin showers kids with festive confetti and bonus Wonder Points during quizzes!
              </p>
              <p className="mt-3 text-candy italic font-medium text-sm">
                "{MASCOTS.secondary.catchphrase}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DestinationPortals() {
  const destinations = [
    {
      to: "/shop",
      title: "The Digital Shop",
      badge: "🎁 Keepsakes & Letters",
      desc: "Personalized cinematic videos from Santa, wax-sealed printable letters, and official Nice List certificates delivered in minutes.",
      cta: "Explore Shop",
      color: "border-gold/30 hover:border-gold",
      btnVariant: "candy" as const,
    },
    {
      to: "/quiz",
      title: "The Joyful Quiz",
      badge: "⭐ Points & Gamification",
      desc: "Answer festive questions, earn Wonder Points with every click, level up your rank, and download a custom Nice List certificate.",
      cta: "Play the Quiz",
      color: "border-mint/30 hover:border-mint",
      btnVariant: "gold" as const,
    },
    {
      to: "/wish-wings",
      title: "Wish Wings",
      badge: "🪽 A Wish Card, Not a Cart",
      desc: "Kids pick a card design, write why they wish for an item, and send it to parents on WhatsApp. Parents reply with 1 tap!",
      cta: "Build a Wish Wing",
      color: "border-candy/30 hover:border-candy",
      btnVariant: "candy" as const,
    },
    {
      to: "/about",
      title: "Why For Kids",
      badge: "❤️ Our Story & Gallery",
      desc: "Discover why childhood wonder is sacred, see real photos of smiling kids, and learn why our workshop loves every single thing we do.",
      cta: "Read Our Story",
      color: "border-blue-400/30 hover:border-blue-400",
      btnVariant: "glass" as const,
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Explore Wonderpost"
        title="Everything Created with Pure Heart."
        sub="Each part of our holiday world has its own dedicated place. Choose where you would like to explore:"
      />

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {destinations.map((d) => (
          <div
            key={d.title}
            className={`group rounded-[2.5rem] glass p-8 sm:p-10 border ${d.color} transition-all duration-300 hover:-translate-y-2 shadow-xl flex flex-col justify-between`}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-mint">
                {d.badge}
              </span>
              <h3 className="font-display text-3xl font-bold text-snow mt-2">
                {d.title}
              </h3>
              <p className="mt-4 text-snow/75 text-base sm:text-lg leading-relaxed">
                {d.desc}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-snow/10">
              <Button asChild variant={d.btnVariant} size="lg" className="rounded-full w-full sm:w-auto px-6">
                <Link to={d.to}>
                  {d.cta} <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DigitalMagicHighlight() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="rounded-[3rem] glass p-8 sm:p-14 border border-snow/15 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-mint/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-mint border border-mint/30 mb-4">
          <Zap className="h-4 w-4" /> The 100% Digital Advantage
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-snow">
          No Shipping Delays. No Lost Mail.
        </h2>
        <p className="mt-4 text-lg text-snow/80 max-w-2xl mx-auto leading-relaxed">
          Because Wonderpost is 100% digital, your child's personalized letter, certificate, or video
          arrives directly in your hands within minutes, anywhere in the world — even at 11:59 PM on Christmas Eve.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold text-gold">
          <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-mint" /> High-Resolution Print Ready</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-mint" /> 24-Hour Free Typo Guarantee</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-mint" /> All Currencies & Countries Supported</span>
        </div>
      </div>
    </section>
  );
}
