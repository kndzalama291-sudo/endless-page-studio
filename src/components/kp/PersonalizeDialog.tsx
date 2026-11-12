import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/cartStore";
import { usePrefs } from "@/stores/prefsStore";
import { useMoney } from "@/hooks/useMoney";
import { ORDER_BY_DATES, arrivalStatus } from "@/config/delivery";
import type { ShopifyProduct } from "@/lib/shopify";

export function PersonalizeDialog({ product, onClose }: { product: ShopifyProduct | null; onClose: () => void }) {
  const [text, setText] = useState("");
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const setOpen = useCartStore((s) => s.setOpen);
  const country = usePrefs((s) => s.country);
  const money = useMoney();
  const region = country ? ORDER_BY_DATES[country] : null;
  const tooLate = region ? arrivalStatus(region.date) === "red" : false;

  if (!product) return null;
  const n = product.node;
  const v = n.variants.edges[0]?.node;
  const img = n.images.edges[0]?.node;

  const add = async () => {
    if (!v || !text.trim() || tooLate) return;
    const ok = await addItem({
      product,
      variantId: v.id,
      variantTitle: v.title,
      price: v.price,
      quantity: 1,
      selectedOptions: v.selectedOptions,
      attributes: [{ key: "Personalization", value: text.trim() }],
    });
    if (ok) {
      toast.success(`${n.title} for "${text.trim()}" is in the sack`, { position: "top-center" });
      setText("");
      onClose();
      setOpen(true);
    }
  };

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl border-gold/30 bg-midnight/95 text-snow backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">{n.title}</DialogTitle>
          <DialogDescription className="text-snow/65">Type the name or message. Watch it appear.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            {img && <img src={img.url} alt={img.altText ?? n.title} className="h-full w-full object-cover" />}
            <div className="absolute inset-x-4 bottom-6 grid place-items-center">
              <span className="max-w-full truncate rounded-2xl bg-midnight/60 px-5 py-2 font-display text-3xl italic text-gold-foil backdrop-blur-sm" aria-live="polite">
                {text.trim() || "Your text here"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="block">
              <span className="mb-2 block text-sm text-snow/75">Name or short message</span>
              <Input value={text} onChange={(e) => setText(e.target.value)} maxLength={28} placeholder="e.g. The Mokoena Family" className="h-14 rounded-2xl border-gold/25 bg-midnight/50 text-lg" autoFocus />
              <span className="mt-1 block text-right text-xs text-snow/40">{text.length}/28</span>
            </label>
            <p className="text-sm text-snow/65">{n.description}</p>
            {tooLate && region && (
              <p className="rounded-2xl bg-candy/15 p-4 text-sm">
                The last order date for {region.label} has passed, so this won't arrive by Christmas.{" "}
                <Link to="/create" className="font-semibold text-mint underline" onClick={onClose}>Send an instant Santa message instead →</Link>
              </p>
            )}
            <Button variant="candy" size="xl" className="mt-auto" onClick={add} disabled={!text.trim() || isLoading || tooLate}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Add to sack · {v && money(v.price.amount, v.price.currencyCode)}</>}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
