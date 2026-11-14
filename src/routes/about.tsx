import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Heart,
  Star,
  Compass,
  Smile,
  CheckCircle2,
  Gift,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PageHero } from "@/components/kp/PageHero";
import { SectionHeading } from "@/components/kp/SectionHeading";
import { Button } from "@/components/ui/button";
import { BRAND_NAME, MASCOTS } from "@/config/brand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `Our Story & Why We Do It For Kids | ${BRAND_NAME}` },
      {
        name: "description",
        content:
          "Discover the heart behind Wonderpost. Why childhood wonder is sacred, how we celebrate kids, and why our workshop team loves every single thing we do.",
      },
      { property: "og:title", content: `Why We Do It For Kids — ${BRAND_NAME}` },
      {
        property: "og:description",
        content:
          "Preserving the enchantment of childhood. Learn about our mission and workshop team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const reasons = [
    {
      icon: Heart,
      title: "The Joy of Feeling Truly Seen",
      body: "When a child reads a letter or hears a message that mentions their kind deed to a classmate, their bravery at school, or their sweetest wish, their eyes widen. They realize their goodness is recognized and valued.",
    },
    {
      icon: Star,
      title: "Childhood Innocence is Sacred & Fleeting",
      body: "Childhood only happens once. That brief, sparkling window where they believe with their whole heart builds empathy, hope, and imagination that stays with them throughout adulthood.",
    },
    {
      icon: Compass,
      title: "Heirloom Memories That Outlast Toys",
      body: "Plastic toys break and gadgets are forgotten. But an authentic letter and certificate celebrating their heart will be cherished by families for decades to come.",
    },
  ];

  const moments = [
    {
      title: "Stamping Every Golden Wax Seal",
      desc: "There is nothing quite like stamping golden seals onto digital parchment scrolls, knowing a little kid will open it with gasps of excitement.",
      emoji: "🕯️",
    },
    {
      title: "Reading Their Little Accomplishments",
      desc: "Our workshop team smiles, laughs, and celebrates reading about the kindness, bravery, and sweet wishes parents share with us from around the world.",
      emoji: "💌",
    },
    {
      title: "Instant Magic Anytime, Anywhere",
      desc: "Knowing a parent in Tokyo, London, Johannesburg, or New York can get instant magic in their hands even at midnight brings us pure joy.",
      emoji: "⚡",
    },
    {
      title: "Photos of Children Smiling",
      desc: "When families message us photos of their kids smiling and jumping with excitement, it makes every single minute of work worthwhile.",
      emoji: "📸",
    },
  ];

  const photos = [
    {
      url: "https://images.unsplash.com/photo-1543258103-a62bd96b300b?auto=format&fit=crop&w=800&q=80",
      caption: "Pure Awe & Excitement",
      sub: "The moment they see their own name and achievements in a video from Santa.",
    },
    {
      url: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80",
      caption: "Certified Nice List Joy",
      sub: "Framing their official gold-sealed certificate for their bedroom wall.",
    },
    {
      url: "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?auto=format&fit=crop&w=800&q=80",
      caption: "Memories to Cherish",
      sub: "Warm childhood memories that parents and children treasure forever.",
    },
    {
      url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      caption: "Heartfelt Smiles",
      sub: "Instant digital magic delivering gasps of happiness to homes worldwide.",
    },
  ];

  return (
    <div className="pt-28 pb-20">
      <PageHero
        eyebrow="Our Mission & Heart"
        title={
          <>
            Why We Do It: <span className="text-gold-foil">For The Kids.</span>
          </>
        }
        sub="We don't just craft holiday gifts — we protect childhood innocence and create memories that warm families long after the holiday lights are packed away."
      />

      {/* 1. Why We Do It */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-[3rem] glass-gold p-8 sm:p-16 border border-gold/30 shadow-2xl">
          <SectionHeading
            eyebrow="Childhood Wonder is Sacred"
            title="Because Every Child Deserves to Believe."
            sub="In a fast-moving world, the wonder of childhood is a sanctuary of warmth, hope, and kindness."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {reasons.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-3xl bg-midnight/50 border border-gold/20 p-8 sm:p-10 backdrop-blur-md"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/20 text-gold mb-6 shadow-inner">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-snow leading-snug">{title}</h3>
                <p className="mt-4 text-snow/80 leading-relaxed text-base">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <blockquote className="inline-block max-w-3xl rounded-3xl glass px-8 py-6 text-xl sm:text-2xl font-medium text-snow italic border border-gold/30 shadow-lg">
              "We don't just create digital letters — we preserve the enchantment of being little."
            </blockquote>
          </div>
        </div>
      </section>

      {/* 2. Real Smiles Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.35em] text-gold">
            <Smile className="h-4 w-4" /> Real Smiles, Real Wonder
          </span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-snow">
            The Magic We Live For.
          </h2>
          <p className="mt-4 text-lg text-snow/75">
            Every smile below is why our team wakes up excited to create wonder every morning.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((item) => (
            <div
              key={item.caption}
              className="group relative overflow-hidden rounded-[2.5rem] glass border border-gold/20 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-gold/60"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent opacity-80" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-xl font-bold text-snow group-hover:text-gold transition">
                  {item.caption}
                </h3>
                <p className="mt-1 text-sm text-snow/75 leading-relaxed">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. We Enjoy Every Single Thing We Do */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-candy">
            <Heart className="h-4 w-4" /> The Workshop Experience
          </span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-snow">
            We Enjoy Every Single Thing We Do.
          </h2>
          <p className="mt-4 text-lg text-snow/80">
            This isn't an automated factory. It's a joyful holiday workshop powered by real creators who
            adore the spirit of the season.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {moments.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-3xl glass p-8 border border-snow/10 hover:border-gold/40 hover:-translate-y-1 transition duration-300"
            >
              <div>
                <span className="text-5xl block mb-6">{item.emoji}</span>
                <h3 className="font-display text-2xl font-bold text-snow leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-snow/75 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-snow/10 flex items-center gap-2 text-xs font-bold text-gold">
                <CheckCircle2 className="h-4 w-4 text-mint" /> 100% Handcrafted Joy
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="mx-auto max-w-4xl px-4 pt-10 text-center">
        <div className="rounded-[2.5rem] glass p-8 sm:p-12 border border-gold/30">
          <h3 className="font-display text-3xl font-bold text-snow">
            Ready to bring wonder into your child's hands?
          </h3>
          <p className="mt-3 text-snow/75 text-base max-w-xl mx-auto">
            Choose a personalized holiday letter, certificate, or video message in our digital shop.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="candy" size="xl" className="rounded-full shadow-candy">
              <Link to="/shop">
                Explore the Digital Shop <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl" className="rounded-full">
              <Link to="/quiz">Play the Joyful Quiz</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
