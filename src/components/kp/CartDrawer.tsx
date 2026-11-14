import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2, Gift, MessageCircle, Sparkles } from "lucide-react";
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
  const [childName, setChildName] = useState("");
  const [childNote, setChildNote] = useState("I've been practicing so hard this week!");

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

  const handleSendWhatsAppWish = () => {
    const itemsText = list.map((item) => `• ${item.product.node.title} (${item.quantity}x)`).join("\n");
    const message = `🪽 Holiday Wish Card from ${childName.trim() || "Your Child"}!\n\n"Mom / Dad, I added these holiday wishes to my Wonderpost sack:"\n${itemsText}\n\nNote from child: "${childNote}"\n\n👉 Click here to review and reply: ${typeof window !== "undefined" ? window.location.href : "https://wonderpost.com"}\n\nHow will you reply?\n1. Yes, approved! 🎉\n2. Saved for your birthday 🎂\n3. Let's swap for another surprise 🔄\n4. Let's talk together tonight 💬`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
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
                <Link to="/shop">Explore the shop</Link>
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
                {/* Kid WhatsApp Wish Box */}
                <div className="rounded-2xl p-4 bg-gradient-to-br from-green-950/60 to-midnight border border-green-500/40 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-400">
                      <MessageCircle className="h-4 w-4" /> Kids: Send Wish on WhatsApp
                    </span>
                    <span className="text-[10px] text-snow/60 font-semibold">Wish Wings 🪽</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Your name or nickname..."
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full text-xs rounded-xl bg-midnight/90 border border-snow/20 px-3 py-2 text-snow placeholder:text-snow/40"
                  />
                  <input
                    type="text"
                    placeholder="Why you wish for this (e.g. Practicing so hard!)..."
                    value={childNote}
                    onChange={(e) => setChildNote(e.target.value)}
                    className="w-full text-xs rounded-xl bg-midnight/90 border border-snow/20 px-3 py-2 text-snow placeholder:text-snow/40"
                  />
                  <button
                    type="button"
                    onClick={handleSendWhatsAppWish}
                    className="w-full py-2.5 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-snow font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-4 w-4" /> Send Wish Card to Mom / Dad 📲
                  </button>
                </div>

                <div className="flex items-baseline justify-between pt-2">
                  <span className="text-sm font-semibold text-snow/75">Parents Checkout Total:</span>
                  <span className="font-display text-2xl font-semibold text-gold">{money(totalPrice, storeCode)}</span>
                </div>
                <Button onClick={handleCheckout} variant="candy" size="xl" className="w-full" disabled={isLoading || isSyncing || pastCutoff}>
                  {isLoading || isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ExternalLink className="h-4 w-4" /> Parent Secure Checkout</>}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
