import { Link } from "@tanstack/react-router";
import { BRAND_NAME, CONTACT_EMAIL, TAGLINE } from "@/config/brand";
import { Logo } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="relative bg-midnight pb-28 pt-12 md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-snow/60">{TAGLINE}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">
          <Link to="/" className="text-snow/70 hover:text-gold">Home</Link>
          <Link to="/privacy" className="text-snow/70 hover:text-gold">Privacy</Link>
          <Link to="/shop" className="text-snow/70 hover:text-gold">Holiday Shop</Link>
          <Link to="/terms" className="text-snow/70 hover:text-gold">Terms</Link>
          <Link to="/quiz" className="text-snow/70 hover:text-gold">Nice List Quiz</Link>
          <Link to="/refunds" className="text-snow/70 hover:text-gold">Refund policy</Link>
          <Link to="/faq" className="text-snow/70 hover:text-gold">FAQ</Link>
        </nav>
        <div className="space-y-2 text-sm">
          <p className="text-snow/60">Questions for the elves?</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold hover:underline">{CONTACT_EMAIL}</a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl px-6 text-xs text-snow/40">
        © {new Date().getFullYear()} {BRAND_NAME}. Not affiliated with any brand. Purchasers must be 18 or older.
      </p>
    </footer>
  );
}
