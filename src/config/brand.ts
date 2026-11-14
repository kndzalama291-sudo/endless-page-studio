// Wonderpost Global Brand Configuration
export const BRAND_NAME = "Wonderpost";
export const TAGLINE = "Instant holiday wonder delivered to families worldwide.";
export const CONTACT_EMAIL = "hello@wonderpost.com";
export const WHATSAPP_NUMBER = "+1234567890"; // Customizable WhatsApp Business number
export const DATA_RETENTION_DAYS = 90;
export const AMBIENT_AUDIO_SRC = "/audio/ambient.mp3";
export const DIGITAL_ONLY = true;
export const SHOP_ENABLED = true;
export const EASTER_EGG_CODE = "STARLIGHT10";

// Mascots
export const MASCOTS = {
  primary: {
    name: "Barnaby",
    title: "Chief Starlight Scribe",
    species: "Snowy Owl",
    catchphrase: "Every star has your name on it!",
    avatar: "🦉",
  },
  secondary: {
    name: "Pippin",
    title: "Spirit of Holiday Play",
    species: "Arctic Fox Cub",
    catchphrase: "Let's make some holiday noise!",
    avatar: "🦊",
  },
} as const;

// Global Greetings
export const GLOBAL_GREETINGS = [
  "Welcome!",
  "Sawubona!",
  "Welkom!",
  "¡Bienvenidos!",
  "Bienvenue!",
  "Willkommen!",
  "Namaste!",
  "Konnichiwa!",
];

// Main navigation
export const CHAPTERS = [
  { to: "/", label: "The Wonderpost", short: "Home" },
  { to: "/shop", label: "The Digital Shop", short: "Shop" },
  { to: "/wish-wings", label: "Wish Wings", short: "Wish Wings 🪽" },
  { to: "/quiz", label: "The Wonder Quiz", short: "Quiz ⭐" },
  { to: "/about", label: "Why For Kids", short: "Why For Kids ❤️" },
  { to: "/faq", label: "Questions & Answers", short: "FAQ" },
] as const;

export type ChapterPath = (typeof CHAPTERS)[number]["to"];

export function nextChapter(current: string) {
  const i = CHAPTERS.findIndex((c) => c.to === current);
  return CHAPTERS[(i + 1) % CHAPTERS.length] ?? CHAPTERS[0];
}
