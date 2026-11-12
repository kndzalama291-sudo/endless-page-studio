import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/kp/PageHero";
import { ProductCard } from "@/components/kp/ProductCard";
import { SectionHeading } from "@/components/kp/SectionHeading";
import { ChapterPortal } from "@/components/kp/ChapterPortal";
import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/config/brand";
import { BUNDLE_PARTS, HANDLES, bundleSaving } from "@/config/catalog";
import { productsQueryOptions } from "@/lib/shopify";
import { useMoney } from "@/hooks/useMoney";

export const Route = createFileRoute("/bundles")({
  head: () => ({
    meta: [
      { title: `Santa video & letter bundles — ${BRAND_NAME}` },
      { name: "description", content: "Santa videos, letters, Nice List certificates and family packs. Personalized, digital and delivered anywhere." },
      { property: "og:title", content: `The Bundle Vault — ${BRAND_NAME}` },
      { property: "og:description", content: "Every way to make Christmas morning unforgettable." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BundlesPage,
});

function BundlesPage() {
  const { data: core, isLoading } = useQuery(productsQueryOptions("tag:core"));
  const { data: addons } = useQuery(productsQueryOptions("tag:addon AND NOT tag:core"));
  const money = useMoney();
  const price = (h: string) => parseFloat(core?.find((p) => p.node.handle === h)?.node.priceRange.minVariantPrice.amount ?? addons?.find((p) => p.node.handle === h)?.node.priceRange.minVariantPrice.amount ?? "0");
  const code = core?.[0]?.node.priceRange.minVariantPrice.currencyCode ?? "USD";
  const bundleSave = core && addons ? bundleSaving(price(HANDLES.bundle), BUNDLE_PARTS.bundle!.map((x) => ({ price: price(x.handle), qty: x.qty }))) : null;

  return (
    <>
      <PageHero eyebrow="Chapter 03 · The Vault" title={<>Bundles of <span className="text-gold-foil">pure wonder.</span></>} sub="Everything is digital, personalized by hand, and delivered by email. No postage. No waiting. No elves lost in transit." />
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading && Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse rounded-3xl glass" />)}
          {core?.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
        {bundleSave && (
          <div className="mt-10 rounded-3xl glass-gold p-6 text-center sm:p-8">
            <p className="font-display text-2xl text-snow sm:text-3xl">
              The Magic Bundle saves you <span className="text-gold">{money(bundleSave, code)}</span> versus buying the video, letter and certificate separately.
            </p>
          </div>
        )}
      </section>
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Little extras" title="Sprinkles on top." sub="Add these inside the Santa builder, or pop them in the sack right here." />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {addons?.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
        <div className="mt-12 flex justify-center">
          <Button asChild variant="candy" size="xl">
            <Link to="/create">Start their Santa message <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
      <ChapterPortal />
    </>
  );
}
