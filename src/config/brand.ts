// Rename the whole site by changing BRAND_NAME.
export const BRAND_NAME = "Kringle Post";
export const TAGLINE = "Santa knows their name.";
export const CONTACT_EMAIL = "hello@kringlepost.com";
export const DATA_RETENTION_DAYS = 90;
export const AMBIENT_AUDIO_SRC = "/audio/ambient.mp3"; // replace with your own track
export const SHOP_ENABLED = true; // physical gift shop feature flag
export const EASTER_EGG_CODE = "STARLIGHT10";

// Chapters: each page ends with a portal to the next; the last loops back to the first.
export const CHAPTERS = [
  { to: "/", label: "The North Pole", short: "Home" },
  { to: "/create", label: "Santa's Message Workshop", short: "Santa Messages" },
  { to: "/bundles", label: "The Bundle Vault", short: "Bundles" },
  { to: "/quiz", label: "The Nice List Quiz", short: "Quiz" },
  { to: "/shop", label: "The Gift Shop", short: "Gift Shop" },
  { to: "/faq", label: "Questions for the Elves", short: "FAQ" },
] as const;

export type ChapterPath = (typeof CHAPTERS)[number]["to"];

export function nextChapter(current: string) {
  const i = CHAPTERS.findIndex((c) => c.to === current);
  return CHAPTERS[(i + 1) % CHAPTERS.length];
}
