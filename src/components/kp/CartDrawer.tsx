import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2, Gift } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { usePrefs } from "@/stores/prefsStore";
import { useMoney } from "@/hooks/useMoney";
import { ORDER_BY_DATES, arrivalStatus, formatCutoff } from "@/config/delivery";
import { isPhysical } from "@/lib/shopify";

export function CartDrawer() {
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart, isOpen, setOpen } = useCartStore();
  const country = usePrefs((s) => s.country);
  const money = useMoney();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const list = mounted ? items : [];
  const totalItems = list.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = list.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const storeCode = list[0]?.price.currencyCode ?? "USD";

  const hasPhysical = list.some((i) => isPhysical(i.product));
  const region = country ? ORDER_BY_DATES[country] : null;
  const pastCutoff = hasPhysical && region ? arrivalStatus(region.date) === "red" : false;

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url && !pastCutoff) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Open your sack, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
          className="relative grid h-10 w-10 place-items-center rounded-full glass text-snow transition hover:text-gold"
        >
          <ShoppingBag className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-candy px-1 text-[10px] font-bold text-snow shadow-candy">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col border-l border-gold/20 bg-midnight/95 text-snow backdrop-blur-xl sm:max-w-lg">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-3xl text-snow">Santa's sack</SheetTitle>
          <SheetDescription className="text-snow/60">
            {totalItems === 0 ? "Empty for now. The elves are waiting." : `${totalItems} magical item${totalItems !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col pt-4">
          {list.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
              <Gift className="h-14 w-14 text-gold/60" />
              <p className="text-snow/70">Nothing in the sack yet.</p>
              <Button asChild variant="candy" size="lg" onClick={() => setOpen(false)}>
                <Link to="/create">Create a Santa message</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <ul className="space-y-3">
                  {list.map((item) => {
                    const img = item.product.node.images?.edges?.[0]?.node;
                    const forName = item.attributes.find((a) => a.key === "Child's name" || a.key === "For")?.value;
                    return (
                      <li key={item.key} className="flex gap-3 rounded-2xl glass p-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
                          {img && <img src={img.url} alt={img.altText ?? item.product.node.title} className="h-full w-full object-cover" loading="lazy" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate font-semibold">{item.product.node.title}</h4>
                          {forName && <p className="truncate text-xs text-mint">For {forName}</p>}
                          <p className="font-semibold text-gold">{money(item.price.amount, item.price.currencyCode)}</p>
                        </div>
                        <div className="flex flex-shrink-0 flex-col items-end gap-2">
                          <button aria-label="Remove" className="text-snow/50 hover:text-candy" onClick={() => removeItem(item.key)}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <div className="flex items-center gap-1">
                            <button aria-label="Decrease" className="grid h-6 w-6 place-items-center rounded-full border border-border hover:border-gold" onClick={() => updateQuantity(item.key, item.quantity - 1)}>
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button aria-label="Increase" className="grid h-6 w-6 place-items-center rounded-full border border-border hover:border-gold" onClick={() => updateQuantity(item.key, item.quantity + 1)}>
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex-shrink-0 space-y-3 border-t border-border pt-4">
                {hasPhysical && !region && (
                  <p className="rounded-xl bg-warn/10 p-3 text-xs text-warn">
                    Check your country in the <Link to="/shop" hash="arrival" className="underline" onClick={() => setOpen(false)}>Christmas arrival checker</Link> before you check out.
                  </p>
                )}
                {pastCutoff && region && (
                  <p className="rounded-xl bg-candy/15 p-3 text-sm text-snow">
                    Oh, snowballs. The last order date for {region.label} was {formatCutoff(region.date)}, so physical gifts won't make it by Christmas. Remove them and send an instant Santa message instead — it arrives in minutes.
                  </p>
                )}
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="font-display text-2xl font-semibold text-gold">{money(totalPrice, storeCode)}</span>
                </div>
                <p className="text-[11px] text-snow/50">You'll be charged in {storeCode} at checkout. Other currencies are shown as an estimate only.</p>
                <Button onClick={handleCheckout} variant="candy" size="xl" className="w-full" disabled={isLoading || isSyncing || pastCutoff}>
                  {isLoading || isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ExternalLink className="h-4 w-4" /> Secure checkout</>}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
