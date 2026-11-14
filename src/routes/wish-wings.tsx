import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/kp/PageHero";
import { SectionHeading } from "@/components/kp/SectionHeading";
import { Button } from "@/components/ui/button";
import { WishWingsDialog } from "@/components/kp/WishWingsDialog";
import { BRAND_NAME, MASCOTS } from "@/config/brand";

export const Route = createFileRoute("/wish-wings")({
  head: () => ({
    meta: [
      { title: `Wish Wings — A Wish Card, Not a Cart | ${BRAND_NAME}` },
      {
        name: "description",
        content:
          "Kids pick a card design, write why they wish for an item, and send it to parents on WhatsApp. Parents reply with one tap!",
      },
      { property: "og:title", content: `Wish Wings — ${BRAND_NAME}` },
      {
        property: "og:description",
        content:
          "The child-safe way to share holiday wishes with family without commercial pressure.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WishWingsPage,
});

function WishWingsPage() {
  return (
    <div className="pt-28 pb-20">
      <PageHero
        eyebrow="Child & Family Gifting"
        title={
          <>
            Wish Wings: <span className="text-gold-foil">A Wish Card, Not a Cart.</span>
          </>
        }
        sub="Children pick a card design, write or record why they want an item, and send it straight to parents or grandparents on WhatsApp looking like a gift request, not a receipt."
      />

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="rounded-[3rem] glass-gold p-8 sm:p-14 border border-gold/30 shadow-2xl text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gold/20 text-gold text-4xl mb-4 shadow-inner">
            🪽
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-snow">
            How Wish Wings Works
          </h2>
          <p className="mt-3 text-lg text-snow/80 max-w-2xl mx-auto">
            No shopping carts full of pressure. A creative, child-centered dialogue between kids and their loved ones.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3 text-left">
            <div className="rounded-3xl bg-midnight/50 p-6 border border-gold/20">
              <span className="text-3xl block mb-3">🎨</span>
              <h3 className="font-display text-xl font-bold text-snow">1. Pick Card & Add Reason</h3>
              <p className="mt-2 text-sm text-snow/75">
                The child chooses a card style and shares their heartfelt reason: <em>"I've been practicing reading so hard!"</em>
              </p>
            </div>

            <div className="rounded-3xl bg-midnight/50 p-6 border border-mint/20">
              <span className="text-3xl block mb-3">📲</span>
              <h3 className="font-display text-xl font-bold text-snow">2. Send to Family on WhatsApp</h3>
              <p className="mt-2 text-sm text-snow/75">
                One link can be shared with Mom, Dad, Grandparents, or Aunts. It looks like a beautiful gift card.
              </p>
            </div>

            <div className="rounded-3xl bg-midnight/50 p-6 border border-candy/20">
              <span className="text-3xl block mb-3">💬</span>
              <h3 className="font-display text-xl font-bold text-snow">3. Four One-Tap Parent Replies</h3>
              <p className="mt-2 text-sm text-snow/75">
                Parents choose: <em>"Approved! 🎉"</em>, <em>"For Birthday 🎂"</em>, <em>"Swap for another 🔄"</em>, or <em>"Let's chat 💬"</em>.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <WishWingsDialog
              triggerButton={
                <Button variant="candy" size="xl" className="h-16 px-10 text-xl rounded-full shadow-candy hover:scale-105 transition">
                  <Sparkles className="h-5 w-5 mr-2" /> Open Interactive Wish Wings Builder 🪽
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {/* Safety & Parent Guarantee */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="rounded-3xl glass p-8 flex flex-col sm:flex-row items-center gap-6 border border-snow/10">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-mint/20 text-mint shrink-0">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div>
            <h4 className="font-display text-2xl font-bold text-snow">
              Parents Stay in Complete Control
            </h4>
            <p className="mt-1 text-sm text-snow/75">
              Kids never see checkout forms, payment fields, or prices. Zero credit card risk, zero advertising, and no personal data collected from children.
            </p>
          </div>
          <Button asChild variant="glass" className="shrink-0 rounded-full">
            <Link to="/shop">Browse the Shop</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
