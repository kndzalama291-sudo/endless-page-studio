import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { BRAND_NAME, CHAPTERS } from "@/config/brand";
import { StringLights } from "./StringLights";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { CartDrawer } from "./CartDrawer";
import { MusicToggle } from "./MusicToggle";

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2" aria-label={`${BRAND_NAME} home`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 text-gold drop-shadow-[0_0_10px_var(--gold)] transition group-hover:rotate-12" aria-hidden>
        <path fill="currentColor" d="M16 1 L19 12 L31 16 L19 20 L16 31 L13 20 L1 16 L13 12 Z" />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight text-snow">{BRAND_NAME}</span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const nav = CHAPTERS.slice(1);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative mx-auto mt-2 max-w-7xl px-3 sm:px-6">
        <div className="relative flex h-16 items-center justify-between gap-3 rounded-full glass px-4 pt-1 sm:px-6">
          <StringLights />
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-snow/75 transition hover:text-snow"
                activeProps={{ className: "bg-snow/10 text-gold" }}
              >
                {c.short}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <CurrencySwitcher className="hidden sm:block" />
            <MusicToggle />
            <CartDrawer />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full glass lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <nav aria-label="Mobile" className="mt-2 rounded-3xl glass-gold p-4 lg:hidden" style={{ animation: "page-in .4s ease both" }}>
            <ul className="grid gap-1">
              {CHAPTERS.map((c, i) => (
                <li key={c.to}>
                  <Link
                    to={c.to}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-3 rounded-2xl px-4 py-3 font-display text-2xl text-snow"
                    activeProps={{ className: "text-gold" }}
                  >
                    <span className="text-xs font-sans text-mint">0{i + 1}</span>
                    {c.short}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 px-4">
              <CurrencySwitcher />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
