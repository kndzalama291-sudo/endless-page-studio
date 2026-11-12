export type DeliveryMode = "instant" | "eve" | "morning" | "custom";

export interface BuilderState {
  name: string;
  pronunciation: string;
  age: string;
  loves: string[];
  lovesOther: string;
  proud: string;
  wish: string;
  tone: "gentle" | "funny" | "epic";
  language: string;
  delivery: DeliveryMode;
  customAt: string; // yyyy-MM-ddTHH:mm
  timezone: string;
  buyerEmail: string;
  recipientEmail: string;
  extraNames: [string, string];
}

export const initialState = (): BuilderState => ({
  name: "",
  pronunciation: "",
  age: "",
  loves: [],
  lovesOther: "",
  proud: "",
  wish: "",
  tone: "gentle",
  language: "en",
  delivery: "instant",
  customAt: "",
  timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
  buyerEmail: "",
  recipientEmail: "",
  extraNames: ["", ""],
});

export function deliveryLabel(s: BuilderState) {
  const y = new Date().getFullYear();
  switch (s.delivery) {
    case "instant":
      return "Instantly";
    case "eve":
      return `${y}-12-24 18:00 (${s.timezone})`;
    case "morning":
      return `${y}-12-25 07:00 (${s.timezone})`;
    case "custom":
      return s.customAt ? `${s.customAt.replace("T", " ")} (${s.timezone})` : "Not chosen";
  }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns an error message for the step, or null when it's complete. */
export function validateStep(step: number, s: BuilderState, children = 1): string | null {
  if (step === 0) {
    if (!s.name.trim()) return "Santa needs a name to work with!";
    const age = Number(s.age);
    if (!s.age || !Number.isFinite(age) || age < 0 || age > 120) return "Please add their age.";
  }
  if (step === 1 && s.loves.length === 0 && !s.lovesOther.trim()) return "Pick at least one thing they love.";
  if (step === 6) {
    if (s.delivery === "custom" && !s.customAt) return "Choose a delivery date and time.";
    if (!EMAIL.test(s.buyerEmail.trim())) return "We need your email to send the magic.";
    if (s.recipientEmail.trim() && !EMAIL.test(s.recipientEmail.trim())) return "That recipient email looks a bit wonky.";
  }
  if (step === 7 && children > 1 && s.extraNames.some((n) => !n.trim())) return "Add a name for every child in the Family Pack.";
  return null;
}
