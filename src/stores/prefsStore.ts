import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CurrencyCode } from "@/config/currency";

interface Prefs {
  currency: CurrencyCode | null; // null = show prices in the store's own currency
  country: string | null; // for the "Will it arrive by Christmas?" checker
  musicOn: boolean;
  cookieChoice: "all" | "essential" | null;
  setCurrency: (c: CurrencyCode | null) => void;
  setCountry: (c: string | null) => void;
  setMusicOn: (v: boolean) => void;
  setCookieChoice: (v: "all" | "essential") => void;
}

export const usePrefs = create<Prefs>()(
  persist(
    (set) => ({
      currency: null,
      country: null,
      musicOn: false,
      cookieChoice: null,
      setCurrency: (currency) => set({ currency }),
      setCountry: (country) => set({ country }),
      setMusicOn: (musicOn) => set({ musicOn }),
      setCookieChoice: (cookieChoice) => set({ cookieChoice }),
    }),
    { name: "kp-prefs", storage: createJSONStorage(() => localStorage) },
  ),
);
