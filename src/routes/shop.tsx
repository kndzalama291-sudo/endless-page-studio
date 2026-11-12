import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Zap } from "lucide-react";
import { PageHero } from "@/components/kp/PageHero";
import { ProductCard } from "@/components/kp/ProductCard";
import { SectionHeading } from "@/components/kp/SectionHeading";
import { ArrivalChecker } from "@/components/kp/ArrivalChecker";
import { PersonalizeDialog } from "@/components/kp/PersonalizeDialog";
import { ChapterPortal } from "@/components/kp/ChapterPortal";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { BRAND_NAME, SHOP_ENABLED } from "@/config/brand";
import { RECIPIENTS, filterGifts } from "@/config/giftFinder";
import { productsQueryOptions, type ShopifyProduct } from "@/lib/shopify";
import { useMoney } from "@/hooks/useMoney";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: `Personalized Christmas gift shop — ${BRAND_NAME}` },
      { name: "description", content: "Personalized ornaments, stockings, night lights and keepsakes. Check if your gift will arrive by Christmas." },
      { property: "og:title", content: `The Gift Shop — ${BRAND_NAME}` },
      { property: "og:description", content: "Personalized keepsakes, with an honest 'will it arrive by Christmas?' checker." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { data: physical, isLoading } = useQuery({ ...productsQueryOptions("tag:physical"), enabled: SHOP_ENABLED });
  const [recipient, setRecipient] = useState<string | null>(null);
  const maxPrice = useMemo(() => Math.ceil(Math.max(0, ...(physical ?? []).map((p) => parseFloat(p.node.priceRange.minVariantPrice.amount)))), [physical]);
  const [budget, setBudget] = useState<number | null>(null);
  const [personalize, setPersonalize] = useState<ShopifyProduct | null>(null);
  const money = useMoney();
  const code = physical?.[0]?.node.priceRange.minVariantPrice.currencyCode ?? "USD";
  useEffect(() => {
    if (budget === null && maxPrice) setBudget(maxPrice);
  }, [maxPrice, budget]);
  const filtered = physical ? filterGifts(physical, recipient, budget ?? maxPrice) : [];

  if (!SHOP_ENABLED) {
    return (
      <>
        <PageHero eyebrow="Chapter 05 · The Gift Shop" title="The workshop is resting." sub="Physical keepsakes are paused for now. Digital magic never sleeps." />
        <div className="flex justify-center"><Button asChild variant="candy" size="xl"><Link to="/create">Create a Santa message</Link></Button></div>
        <ChapterPortal />
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Chapter 05 · The Gift Shop" title={<>Keepsakes with <span className="text-gold-foil">their name</span> on.</>} sub="Hand-personalized treasures for the tree, the mantel and the bedside table." />

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-[2rem] glass p-6 sm:p-10">
          <h2 className="font-display text-3xl font-semibold text-snow sm:text-4xl">Who are you shopping for?</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="chip" size="lg" className="px-5" data-active={recipient === null} onClick={() => setRecipient(null)}>Everyone</Button>
            {RECIPIENTS.map((r) => (
              <Button key={r.key} variant="chip" size="lg" className="px-5" data-active={recipient === r.key} aria-pressed={recipient === r.key} onClick={() => setRecipient(r.key)}>
                {r.label}
              </Button>
            ))}
          </div>
          {maxPrice > 0 && budget !== null && (
            <div className="mt-8 max-w-md">
              <div className="flex justify-between text-sm">
                <span className="text-snow/70">Budget</span>
                <span className="font-semibold text-gold">Up to {money(budget, code)}</span>
              </div>
              <Slider className="mt-4" min={0} max={maxPrice} step={1} value={[budget]} onValueChange={(v) => setBudget(v[0])} aria-label="Budget" />
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading && Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse rounded-3xl glass" />)}
          {filtered.map((p) => <ProductCard key={p.node.id} product={p} onPersonalize={setPersonalize} />)}
        </div>
        {!isLoading && filtered.length === 0 && (
          <p className="mt-10 rounded-3xl glass p-8 text-center text-snow/70">
            {physical?.length ? "Nothing matches that budget. Nudge the slider, or try an instant digital gift." : "No products found."}
          </p>
        )}
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <ArrivalChecker />
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 rounded-[2rem] glass p-8 text-center sm:p-12">
          <Zap className="h-10 w-10 text-candy" />
          <SectionHeading title="Forgot someone? Magic arrives in minutes." sub="Digital Santa messages skip the post entirely. Schedule them for the perfect moment." />
          <Button asChild variant="candy" size="xl"><Link to="/create">Send instant magic</Link></Button>
        </div>
      </section>

      <PersonalizeDialog product={personalize} onClose={() => setPersonalize(null)} />
      <ChapterPortal />
    </>
  );
}
