import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, PenLine, Wand2, Send, Zap } from "lucide-react";
import heroImg from "@/assets/hero-north-pole.jpg";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/kp/Countdown";
import { NorthStar } from "@/components/kp/NorthStar";
import { TrustRow } from "@/components/kp/TrustRow";
import { GiftBox } from "@/components/kp/GiftBox";
import { SleighIcon } from "@/components/kp/SleighIcon";
import { SectionHeading } from "@/components/kp/SectionHeading";
import { ProductCard } from "@/components/kp/ProductCard";
import { MagicPromise } from "@/components/kp/MagicPromise";
import { ChapterPortal } from "@/components/kp/ChapterPortal";
import { BRAND_NAME, TAGLINE } from "@/config/brand";
import { productsQueryOptions } from "@/lib/shopify";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND_NAME} — Personalized Santa videos & letters` },
      { name: "description", content: "Personalized Santa videos, letters and keepsakes, made just for them and delivered anywhere on Earth, even on Christmas Eve." },
      { property: "og:title", content: `${BRAND_NAME} — ${TAGLINE}` },
      { property: "og:description", content: "Personalized Santa videos, letters and keepsakes, delivered anywhere on Earth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedMagic />
      <LastMinute />
      <MagicPromise />
      <ChapterPortal />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 sm:items-center sm:pb-0">
      <img src={heroImg} alt="" width={1920} height={1088} className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-midnight/40 via-midnight/30 to-midnight" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight/90 via-midnight/40 to-transparent" />

      {/* sleigh crossing the moon */}
      <div aria-hidden className="pointer-events-none absolute right-[8%] top-[14%] hidden h-40 w-[34rem] overflow-hidden md:block">
        <div className="absolute top-1/2 text-midnight" style={{ animation: "moon-sleigh 14s linear infinite" }}>
          <SleighIcon className="h-10 w-36" />
        </div>
      </div>

      <NorthStar className="left-[12%] top-28 sm:left-[46%] sm:top-32" />

      {/* floating gifts */}
      <GiftBox color="candy" className="absolute bottom-[18%] right-[8%] hidden h-20 w-20 animate-float drop-shadow-[0_10px_30px_var(--candy)] md:block" />
      <GiftBox color="mint" className="absolute bottom-[34%] right-[22%] hidden h-14 w-14 animate-float md:block" style={{ animationDelay: "-2s" }} />
      <GiftBox color="violet" className="absolute right-[4%] top-[48%] hidden h-12 w-12 animate-float lg:block" style={{ animationDelay: "-4s" }} />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint animate-twinkle" /> Live from the North Pole
          </p>
          <h1 className="font-display text-[3.4rem] font-semibold leading-[0.88] tracking-[-0.045em] text-snow sm:text-8xl lg:text-[8.5rem]">
            Santa knows <em className="text-gold-foil not-italic">their name.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-snow/80 sm:text-xl">
            Personalized Santa videos, letters and keepsakes, made just for them and delivered anywhere on Earth, even on Christmas Eve.
          </p>
          <div className="mt-8">
            <Countdown />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="candy" size="xl">
              <Link to="/create">
                Create their Santa message <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/quiz">Take the Nice List quiz</Link>
            </Button>
          </div>
          <div className="mt-8">
            <TrustRow />
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: PenLine, title: "Tell us about them", body: "Their name (and how to say it), what they love, the proud thing they did this year, and their big wish." },
  { icon: Wand2, title: "We craft the magic", body: "Santa and the elves weave every detail into a message that feels impossibly, wonderfully real." },
  { icon: Send, title: "Delivered when you choose", body: "Instantly, on Christmas Eve evening, or Christmas morning — in their timezone, not yours." },
];

function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="How it works" title={<>Three steps to <span className="text-aurora">gasps</span>.</>} />
      <ol className="mt-16 grid gap-6 md:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <li key={title} className="group relative overflow-hidden rounded-3xl glass p-8 transition duration-500 hover:-translate-y-2 hover:border-mint/40" style={{ animation: `page-in .8s ${i * 0.15}s both` }}>
            <span className="absolute -right-4 -top-8 font-display text-[9rem] font-bold leading-none text-snow/5 transition group-hover:text-mint/10">{i + 1}</span>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-aurora-gradient text-midnight shadow-mint">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold text-snow">{title}</h3>
            <p className="mt-3 text-snow/70">{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function FeaturedMagic() {
  const { data, isLoading } = useQuery(productsQueryOptions("tag:core"));
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading center={false} eyebrow="The magic menu" title="Pick their kind of wonder." />
        <Button asChild variant="glass" size="lg" className="rounded-full">
          <Link to="/bundles">See every bundle <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading && Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse rounded-3xl glass" />)}
        {data?.map((p) => <ProductCard key={p.node.id} product={p} />)}
        {!isLoading && data?.length === 0 && <p className="text-snow/60">No products found.</p>}
      </div>
    </section>
  );
}

function LastMinute() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-[2.5rem] glass-gold p-8 sm:p-14">
        <div aria-hidden className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-candy/30 blur-[100px]" />
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-candy">
              <Zap className="h-4 w-4" /> Last-minute saviour
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-snow sm:text-6xl">Forgot someone? Magic arrives in minutes.</h2>
            <p className="mt-4 max-w-lg text-snow/75">
              Digital gifts skip the post entirely. Choose instant delivery, or schedule it for the exact moment they'll open it.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button asChild variant="candy" size="xl">
              <Link to="/create">Send instant magic</Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/shop" hash="arrival">Check physical gift cutoffs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
