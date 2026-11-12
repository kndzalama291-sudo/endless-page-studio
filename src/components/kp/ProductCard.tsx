import { Link } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useMoney } from "@/hooks/useMoney";
import type { ShopifyProduct } from "@/lib/shopify";

/** Product card with an animated "unwrap" ribbon on hover. */
export function ProductCard({ product, onPersonalize }: { product: ShopifyProduct; onPersonalize?: (p: ShopifyProduct) => void }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const setOpen = useCartStore((s) => s.setOpen);
  const money = useMoney();
  const n = product.node;
  const variant = n.variants.edges[0]?.node;
  const img = n.images.edges[0]?.node;

  const add = async () => {
    if (!variant) return;
    const ok = await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
      attributes: [],
    });
    if (ok) {
      toast.success(`${n.title} is in the sack`, { position: "top-center" });
      setOpen(true);
    }
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl glass transition duration-500 hover:-translate-y-2 hover:border-gold/40">
      <Link to="/product/$handle" params={{ handle: n.handle }} className="relative block aspect-square overflow-hidden">
        {img ? (
          <img src={img.url} alt={img.altText ?? n.title} loading="lazy" width={600} height={600} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        ) : (
          <div className="grid h-full w-full place-items-center bg-secondary font-display text-5xl text-gold">✦</div>
        )}
        {/* unwrap ribbon */}
        <span aria-hidden className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-candy/90 shadow-candy transition-all duration-700 group-hover:-translate-y-full group-hover:opacity-0" />
        <span aria-hidden className="absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 bg-candy/90 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-0" />
        <span aria-hidden className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gold bg-candy transition-all duration-500 group-hover:scale-0 group-hover:rotate-180" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <Link to="/product/$handle" params={{ handle: n.handle }} className="font-display text-xl font-semibold leading-tight text-snow hover:text-gold">
            {n.title}
          </Link>
          <span className="shrink-0 font-display text-lg font-semibold text-gold">
            {money(n.priceRange.minVariantPrice.amount, n.priceRange.minVariantPrice.currencyCode)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-snow/65">{n.description}</p>
        <div className="mt-auto flex gap-2 pt-2">
          {onPersonalize ? (
            <Button variant="candy" className="flex-1" onClick={() => onPersonalize(product)}>
              Personalize
            </Button>
          ) : (
            <Button variant="candy" className="flex-1" onClick={add} disabled={isLoading || !variant?.availableForSale}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4" /> Add to sack</>}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
