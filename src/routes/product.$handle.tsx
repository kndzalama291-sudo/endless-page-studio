import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrustRow } from "@/components/kp/TrustRow";
import { BRAND_NAME } from "@/config/brand";
import { productQueryOptions, isPhysical } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useMoney } from "@/hooks/useMoney";
import { usePrefs } from "@/stores/prefsStore";
import { ORDER_BY_DATES, arrivalStatus } from "@/config/delivery";

export const Route = createFileRoute("/product/$handle")({
  loader: async ({ context, params }) => {
    const product = await context.queryClient.ensureQueryData(productQueryOptions(params.handle));
    if (!product) throw notFound();
    return { title: product.node.title, description: product.node.description, image: product.node.images.edges[0]?.node.url, price: product.node.priceRange.minVariantPrice };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: `Unavailable — ${BRAND_NAME}` }, { name: "robots", content: "noindex" }] };
    const meta = [
      { title: `${loaderData.title} — ${BRAND_NAME}` },
      { name: "description", content: loaderData.description.slice(0, 155) },
      { property: "og:title", content: `${loaderData.title} — ${BRAND_NAME}` },
      { property: "og:description", content: loaderData.description.slice(0, 155) },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(loaderData.image ? [{ property: "og:image", content: loaderData.image }, { name: "twitter:image", content: loaderData.image }] : []),
    ];
    return {
      meta,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: loaderData.title,
            description: loaderData.description,
            image: loaderData.image ? [loaderData.image] : undefined,
            brand: { "@type": "Brand", name: BRAND_NAME },
            offers: { "@type": "Offer", price: loaderData.price.amount, priceCurrency: loaderData.price.currencyCode, availability: "https://schema.org/InStock" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 pb-20 pt-44 text-center">
      <h1 className="font-display text-5xl text-snow">The elves can't find that one.</h1>
      <Button asChild variant="candy" size="xl" className="mt-8"><Link to="/shop">Back to the shop</Link></Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQueryOptions(handle));
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const setOpen = useCartStore((s) => s.setOpen);
  const country = usePrefs((s) => s.country);
  const money = useMoney();
  const [text, setText] = useState("");
  const [imgIdx, setImgIdx] = useState(0);
  if (!product) return null;
  const n = product.node;
  const v = n.variants.edges[0]?.node;
  const physical = isPhysical(product);
  const region = country ? ORDER_BY_DATES[country] : null;
  const tooLate = physical && region ? arrivalStatus(region.date) === "red" : false;
  const images = n.images.edges;

  const add = async () => {
    if (!v) return;
    const ok = await addItem({
      product,
      variantId: v.id,
      variantTitle: v.title,
      price: v.price,
      quantity: 1,
      selectedOptions: v.selectedOptions,
      attributes: physical && text.trim() ? [{ key: "Personalization", value: text.trim() }] : [],
    });
    if (ok) {
      toast.success(`${n.title} is in the sack`, { position: "top-center" });
      setOpen(true);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-snow/60 hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-[2rem] glass-gold">
            {images[imgIdx] ? (
              <img src={images[imgIdx].node.url} alt={images[imgIdx].node.altText ?? n.title} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center font-display text-8xl text-gold">✦</div>
            )}
            {physical && text.trim() && (
              <span className="absolute inset-x-6 bottom-8 truncate rounded-2xl bg-midnight/60 px-5 py-2 text-center font-display text-3xl italic text-gold-foil backdrop-blur-sm">{text}</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((im, i) => (
                <button key={im.node.url} onClick={() => setImgIdx(i)} className={`h-16 w-16 overflow-hidden rounded-xl border-2 ${i === imgIdx ? "border-gold" : "border-transparent"}`}>
                  <img src={im.node.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mint">{physical ? "Personalized keepsake" : "Digital magic"}</p>
          <h1 className="font-display text-5xl font-semibold leading-[0.95] text-snow sm:text-6xl">{n.title}</h1>
          <p className="font-display text-3xl font-semibold text-gold">{money(n.priceRange.minVariantPrice.amount, n.priceRange.minVariantPrice.currencyCode)}</p>
          <p className="text-lg text-snow/75">{n.description}</p>
          {physical && (
            <label className="block">
              <span className="mb-2 block text-sm text-snow/75">Personalization (name or short message)</span>
              <Input value={text} onChange={(e) => setText(e.target.value)} maxLength={28} className="h-14 rounded-2xl border-gold/25 bg-midnight/50 text-lg" placeholder="e.g. Amara" />
            </label>
          )}
          {tooLate && region && (
            <p className="rounded-2xl bg-candy/15 p-4 text-sm">
              Too late for {region.label} delivery by Christmas. <Link to="/quiz" className="font-semibold text-mint underline">Take the Nice List Quiz instead →</Link>
            </p>
          )}
          <Button variant="candy" size="xl" onClick={add} disabled={isLoading || !v?.availableForSale || tooLate || (physical && !text.trim())}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4" /> Add to sack</>}
          </Button>
          {physical && (
            <Link to="/shop" hash="arrival" className="text-sm text-mint underline">Will it arrive by Christmas? Check your country</Link>
          )}
          <TrustRow />
          <div className="rounded-3xl glass p-6">
            <h2 className="font-display text-xl text-snow">Reviews</h2>
            <p className="mt-2 text-sm text-snow/60">No reviews yet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
