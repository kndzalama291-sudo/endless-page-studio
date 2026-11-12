import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ADDONS, BUNDLE_PARTS, HANDLES, LANGUAGES, LOVES, PACKAGES, TONES, bundleSaving, type PackageKey } from "@/config/catalog";
import { productsQueryOptions, type ShopifyProduct, type CartAttribute } from "@/lib/shopify";
import { useCartStore, type NewCartItem } from "@/stores/cartStore";
import { useMoney } from "@/hooks/useMoney";
import { ParchmentPreview } from "./ParchmentPreview";
import { type BuilderState, deliveryLabel, initialState, validateStep } from "./types";

const STEP_TITLES = ["Who's it for?", "What do they love?", "Their proudest moment", "Their Christmas wish", "Santa's tone", "Language", "Delivery", "Choose the magic"];

function useTimezones() {
  const [zones, setZones] = useState<string[]>([]);
  useEffect(() => {
    try {
      const fn = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf;
      setZones(fn ? fn("timeZone") : ["UTC"]);
    } catch {
      setZones(["UTC"]);
    }
  }, []);
  return zones;
}

export function SantaBuilder() {
  const [s, setS] = useState<BuilderState>(initialState);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [pkg, setPkg] = useState<PackageKey>("bundle");
  const [addons, setAddons] = useState<string[]>([]);
  const zones = useTimezones();
  const reduce = useReducedMotion();
  const money = useMoney();
  const { data: products } = useQuery(productsQueryOptions("tag:digital"));
  const addItems = useCartStore((st) => st.addItems);
  const isLoading = useCartStore((st) => st.isLoading);
  const setOpen = useCartStore((st) => st.setOpen);

  useEffect(() => {
    setS((p) => ({ ...p, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }));
  }, []);

  const byHandle = useMemo(() => {
    const m = new Map<string, ShopifyProduct>();
    products?.forEach((p) => m.set(p.node.handle, p));
    return m;
  }, [products]);
  const priceOf = (handle: string) => parseFloat(byHandle.get(handle)?.node.priceRange.minVariantPrice.amount ?? "0");
  const storeCode = products?.[0]?.node.priceRange.minVariantPrice.currencyCode ?? "USD";

  const pkgDef = PACKAGES.find((p) => p.key === pkg)!;
  const included = new Set<string>(pkg === "bundle" ? ["letter", "certificate"] : pkg === "letter" ? ["letter"] : []);
  const activeAddons = addons.filter((a) => !included.has(a));
  const addonQty = (key: string) => (key === "rush" ? 1 : pkgDef.children);
  const total =
    priceOf(HANDLES[pkg]) + activeAddons.reduce((sum, a) => sum + priceOf(HANDLES[a as keyof typeof HANDLES]) * addonQty(a), 0);

  const set = <K extends keyof BuilderState>(k: K, v: BuilderState[K]) => setS((p) => ({ ...p, [k]: v }));

  const go = (delta: number) => {
    if (delta > 0) {
      const err = validateStep(step, s, pkgDef.children);
      if (err) {
        setError(err);
        return;
      }
    }
    setError(null);
    setDir(delta);
    setStep((x) => Math.min(STEP_TITLES.length - 1, Math.max(0, x + delta)));
  };

  const addToSack = async () => {
    for (let i = 0; i < STEP_TITLES.length; i++) {
      const err = validateStep(i, s, pkgDef.children);
      if (err) {
        setError(err);
        setStep(i);
        return;
      }
    }
    const main = byHandle.get(HANDLES[pkg]);
    if (!main) {
      toast.error("Couldn't reach the North Pole. Try again in a moment.");
      return;
    }
    const loves = [...s.loves, ...(s.lovesOther.trim() ? [s.lovesOther.trim()] : [])].join(", ");
    const attrs: CartAttribute[] = [
      { key: "Child's name", value: s.name.trim() },
      { key: "Pronunciation", value: s.pronunciation.trim() || "—" },
      { key: "Age", value: s.age },
      { key: "Loves", value: loves },
      { key: "Proud moment", value: s.proud.trim() || "—" },
      { key: "Wish", value: s.wish.trim() || "—" },
      { key: "Tone", value: TONES.find((t) => t.key === s.tone)?.label ?? s.tone },
      { key: "Language", value: LANGUAGES.find((l) => l.code === s.language)?.label ?? s.language },
      { key: "Deliver", value: deliveryLabel(s) },
      { key: "Buyer email", value: s.buyerEmail.trim() },
      { key: "Recipient email", value: s.recipientEmail.trim() || "Same as buyer" },
    ];
    if (pkgDef.children > 1) attrs.push({ key: "Other children", value: s.extraNames.map((n) => n.trim()).join(", ") });

    const toItem = (p: ShopifyProduct, qty: number, attributes: CartAttribute[]): NewCartItem => {
      const v = p.node.variants.edges[0]!.node;
      return { product: p, variantId: v.id, variantTitle: v.title, price: v.price, quantity: qty, selectedOptions: v.selectedOptions, attributes };
    };
    const items: NewCartItem[] = [toItem(main, 1, attrs)];
    for (const a of activeAddons) {
      const p = byHandle.get(HANDLES[a as keyof typeof HANDLES]);
      if (p) items.push(toItem(p, addonQty(a), [{ key: "For", value: s.name.trim() }]));
    }
    const ok = await addItems(items);
    if (ok) {
      toast.success(`${s.name.trim()}'s magic is in the sack ✨`, { position: "top-center" });
      setOpen(true);
    } else toast.error("The sleigh hit turbulence. Please try again.");
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 60, filter: "blur(6px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -60, filter: "blur(6px)" }),
  };

  return (
    <div id="builder" className="grid scroll-mt-28 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative overflow-hidden rounded-[2rem] glass-gold p-6 sm:p-10">
        {/* progress */}
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-snow/60">
          <span>Step {step + 1} of {STEP_TITLES.length}</span>
          <span className="text-gold">{money(total, storeCode)}</span>
        </div>
        <div className="mt-3 flex gap-1.5" aria-hidden>
          {STEP_TITLES.map((_, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-aurora-gradient" : "bg-snow/15"}`} />
          ))}
        </div>

        <div className="relative mt-8 min-h-[22rem]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <h2 className="font-display text-3xl font-semibold text-snow sm:text-4xl">{STEP_TITLES[step]}</h2>
              <div className="mt-6 space-y-5">
                {step === 0 && (
                  <>
                    <Field label="Child's first name">
                      <Input value={s.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Thandi" className="h-14 rounded-2xl border-gold/25 bg-midnight/50 text-lg" maxLength={40} autoFocus />
                    </Field>
                    <div className="grid gap-5 sm:grid-cols-[1fr_8rem]">
                      <Field label="How do you say it? (optional)">
                        <Input value={s.pronunciation} onChange={(e) => set("pronunciation", e.target.value)} placeholder="e.g. TAHN-dee" className="h-14 rounded-2xl border-gold/25 bg-midnight/50" maxLength={60} />
                      </Field>
                      <Field label="Age">
                        <Input type="number" inputMode="numeric" min={0} max={120} value={s.age} onChange={(e) => set("age", e.target.value)} placeholder="6" className="h-14 rounded-2xl border-gold/25 bg-midnight/50 text-lg" />
                      </Field>
                    </div>
                  </>
                )}
                {step === 1 && (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {LOVES.map((l) => {
                        const on = s.loves.includes(l);
                        return (
                          <Button key={l} type="button" variant="chip" size="lg" data-active={on} aria-pressed={on} className="px-5" onClick={() => set("loves", on ? s.loves.filter((x) => x !== l) : [...s.loves, l])}>
                            {on && <Check className="h-4 w-4" />} {l}
                          </Button>
                        );
                      })}
                    </div>
                    <Field label="Anything else? (optional)">
                      <Input value={s.lovesOther} onChange={(e) => set("lovesOther", e.target.value)} placeholder="e.g. their hamster, Biscuit" className="h-12 rounded-2xl border-gold/25 bg-midnight/50" maxLength={80} />
                    </Field>
                  </>
                )}
                {step === 2 && (
                  <Field label="One thing they did this year that made you proud">
                    <Textarea value={s.proud} onChange={(e) => set("proud", e.target.value)} rows={5} placeholder="e.g. learned to ride a bike without training wheels" className="rounded-2xl border-gold/25 bg-midnight/50 text-base" maxLength={240} />
                  </Field>
                )}
                {step === 3 && (
                  <Field label="Their Christmas wish">
                    <Textarea value={s.wish} onChange={(e) => set("wish", e.target.value)} rows={4} placeholder="e.g. a telescope to find new planets" className="rounded-2xl border-gold/25 bg-midnight/50 text-base" maxLength={160} />
                  </Field>
                )}
                {step === 4 && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {TONES.map((t) => (
                      <button key={t.key} type="button" aria-pressed={s.tone === t.key} onClick={() => set("tone", t.key)} className={`rounded-3xl border p-6 text-left transition ${s.tone === t.key ? "border-mint bg-mint/10 shadow-mint" : "border-border bg-midnight/40 hover:border-mint/50"}`}>
                        <span className="text-4xl">{t.emoji}</span>
                        <span className="mt-3 block font-display text-xl font-semibold text-snow">{t.label}</span>
                      </button>
                    ))}
                  </div>
                )}
                {step === 5 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {LANGUAGES.map((l) => (
                      <button key={l.code} type="button" disabled={!l.available} aria-pressed={s.language === l.code} onClick={() => set("language", l.code)} className={`rounded-2xl border px-4 py-4 text-left font-semibold transition disabled:opacity-40 ${s.language === l.code ? "border-mint bg-mint/10 text-mint" : "border-border bg-midnight/40 text-snow hover:border-mint/50"}`}>
                        {l.label}
                        {!l.available && <span className="block text-xs font-normal text-snow/50">Coming soon</span>}
                      </button>
                    ))}
                  </div>
                )}
                {step === 6 && (
                  <>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {([
                        ["instant", "Instantly", "Lands in minutes"],
                        ["eve", "Christmas Eve", "24 Dec, 6pm their time"],
                        ["morning", "Christmas morning", "25 Dec, 7am their time"],
                        ["custom", "Pick a moment", "Any date & time"],
                      ] as const).map(([k, t, d]) => (
                        <button key={k} type="button" aria-pressed={s.delivery === k} onClick={() => set("delivery", k)} className={`rounded-2xl border p-4 text-left transition ${s.delivery === k ? "border-mint bg-mint/10" : "border-border bg-midnight/40 hover:border-mint/50"}`}>
                          <span className="block font-semibold text-snow">{t}</span>
                          <span className="text-xs text-snow/60">{d}</span>
                        </button>
                      ))}
                    </div>
                    {s.delivery !== "instant" && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {s.delivery === "custom" && (
                          <Field label="Date & time">
                            <Input type="datetime-local" value={s.customAt} onChange={(e) => set("customAt", e.target.value)} className="h-12 rounded-2xl border-gold/25 bg-midnight/50" />
                          </Field>
                        )}
                        <Field label="Their timezone">
                          <select value={s.timezone} onChange={(e) => set("timezone", e.target.value)} className="h-12 w-full rounded-2xl border border-gold/25 bg-midnight/50 px-3 text-sm text-snow">
                            {(zones.length ? zones : [s.timezone]).map((z) => (
                              <option key={z} value={z}>{z}</option>
                            ))}
                          </select>
                        </Field>
                      </div>
                    )}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Your email">
                        <Input type="email" autoComplete="email" value={s.buyerEmail} onChange={(e) => set("buyerEmail", e.target.value)} placeholder="you@example.com" className="h-12 rounded-2xl border-gold/25 bg-midnight/50" />
                      </Field>
                      <Field label="Recipient email (optional)">
                        <Input type="email" value={s.recipientEmail} onChange={(e) => set("recipientEmail", e.target.value)} placeholder="grown-up@example.com" className="h-12 rounded-2xl border-gold/25 bg-midnight/50" />
                      </Field>
                    </div>
                  </>
                )}
                {step === 7 && (
                  <>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {PACKAGES.map((p) => {
                        const price = priceOf(HANDLES[p.key]);
                        const parts = BUNDLE_PARTS[p.key];
                        const saving = parts && price ? bundleSaving(price, parts.map((x) => ({ price: priceOf(x.handle), qty: x.qty }))) : null;
                        return (
                          <button key={p.key} type="button" aria-pressed={pkg === p.key} onClick={() => setPkg(p.key)} className={`relative rounded-3xl border p-5 text-left transition ${pkg === p.key ? "border-gold bg-gold/10 shadow-[0_0_30px_-10px_var(--gold)]" : "border-border bg-midnight/40 hover:border-gold/50"}`}>
                            {saving && <span className="absolute -top-2.5 right-4 rounded-full bg-candy px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-snow">Save {money(saving, storeCode)}</span>}
                            <span className="flex items-baseline justify-between gap-2">
                              <span className="font-display text-xl font-semibold text-snow">{p.label}</span>
                              <span className="font-semibold text-gold">{price ? money(price, storeCode) : "…"}</span>
                            </span>
                            <span className="mt-1 block text-sm text-snow/60">{p.blurb}</span>
                          </button>
                        );
                      })}
                    </div>
                    {pkgDef.children > 1 && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[0, 1].map((i) => (
                          <Field key={i} label={`Child ${i + 2}'s name`}>
                            <Input value={s.extraNames[i]} onChange={(e) => { const n = [...s.extraNames] as [string, string]; n[i] = e.target.value; set("extraNames", n); }} className="h-12 rounded-2xl border-gold/25 bg-midnight/50" maxLength={40} />
                          </Field>
                        ))}
                      </div>
                    )}
                    <fieldset>
                      <legend className="mb-3 text-sm font-semibold text-snow/80">Sprinkle on extras</legend>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {ADDONS.map((a) => {
                          const inc = included.has(a.key);
                          const on = inc || addons.includes(a.key);
                          return (
                            <label key={a.key} className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-4 transition ${on ? "border-mint bg-mint/10" : "border-border bg-midnight/40"} ${inc ? "cursor-default opacity-70" : ""}`}>
                              <span className="flex items-center gap-3">
                                <input type="checkbox" className="h-4 w-4 accent-[var(--mint)]" checked={on} disabled={inc} onChange={() => setAddons(on ? addons.filter((x) => x !== a.key) : [...addons, a.key])} />
                                <span className="text-sm font-medium text-snow">{a.label}</span>
                              </span>
                              <span className="text-sm text-gold">{inc ? "Included" : `+${money(priceOf(HANDLES[a.key]) * addonQty(a.key), storeCode)}`}</span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {error && <p role="alert" className="mt-4 rounded-2xl bg-candy/15 px-4 py-3 text-sm text-snow">{error}</p>}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button variant="glass" size="lg" onClick={() => go(-1)} disabled={step === 0} className="px-6">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step < STEP_TITLES.length - 1 ? (
            <Button variant="candy" size="xl" onClick={() => go(1)}>
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="candy" size="xl" onClick={addToSack} disabled={isLoading || !products}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Sparkles className="h-4 w-4" /> Add to sack · {money(total, storeCode)}</>}
            </Button>
          )}
        </div>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <ParchmentPreview s={s} />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-snow/80">{label}</span>
      {children}
    </label>
  );
}
