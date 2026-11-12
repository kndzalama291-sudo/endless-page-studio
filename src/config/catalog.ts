// Prices live in Shopify. This file only maps Shopify product handles to their role on the site.
export const HANDLES = {
  video: "personalized-santa-video-message",
  letter: "letter-from-santa-pdf",
  bundle: "the-magic-bundle",
  family: "family-pack-3-children",
  certificate: "nice-list-certificate",
  reportCard: "reindeer-report-card",
  rush: "rush-delivery",
} as const;

export type PackageKey = "video" | "letter" | "bundle" | "family";

export const PACKAGES: { key: PackageKey; label: string; blurb: string; children: number }[] = [
  { key: "video", label: "Santa Video", blurb: "Santa says their name, on camera.", children: 1 },
  { key: "bundle", label: "Magic Bundle", blurb: "Video + Letter + Nice List Certificate.", children: 1 },
  { key: "family", label: "Family Pack", blurb: "Three videos, three names.", children: 3 },
  { key: "letter", label: "Letter only", blurb: "A signed PDF letter from Santa.", children: 1 },
];

export const ADDONS: { key: "letter" | "certificate" | "reportCard" | "rush"; label: string }[] = [
  { key: "letter", label: "PDF Letter from Santa" },
  { key: "certificate", label: "Nice List Certificate" },
  { key: "reportCard", label: "Reindeer Report Card" },
  { key: "rush", label: "Rush delivery" },
];

// Which parts a bundle contains, so savings are calculated from real prices.
export const BUNDLE_PARTS: Partial<Record<PackageKey, { handle: string; qty: number }[]>> = {
  bundle: [
    { handle: HANDLES.video, qty: 1 },
    { handle: HANDLES.letter, qty: 1 },
    { handle: HANDLES.certificate, qty: 1 },
  ],
  family: [{ handle: HANDLES.video, qty: 3 }],
};

/** Returns the saving (> 0) or null when the bundle isn't actually cheaper. */
export function bundleSaving(bundlePrice: number, parts: { price: number; qty: number }[]) {
  const sum = parts.reduce((s, p) => s + p.price * p.qty, 0);
  const saving = Math.round((sum - bundlePrice) * 100) / 100;
  return saving > 0.005 ? saving : null;
}

export const LOVES = [
  "Dinosaurs", "Football", "Unicorns", "Space", "Dogs", "Cats", "Art", "Music",
  "Ballet", "Gaming", "Reading", "Lego", "Trains", "Mermaids", "Science", "Baking",
];

export const TONES = [
  { key: "gentle", label: "Gentle & Sweet", emoji: "🕯️" },
  { key: "funny", label: "Funny & Playful", emoji: "🤭" },
  { key: "epic", label: "Epic & Dramatic", emoji: "⚡" },
] as const;

// Toggle `available` to control which languages customers can pick.
export const LANGUAGES = [
  { code: "en", label: "English", available: true },
  { code: "es", label: "Español", available: true },
  { code: "fr", label: "Français", available: true },
  { code: "de", label: "Deutsch", available: true },
  { code: "pt", label: "Português", available: true },
  { code: "af", label: "Afrikaans", available: true },
  { code: "zu", label: "isiZulu", available: true },
];
