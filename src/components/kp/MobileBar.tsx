import { Link } from "@tanstack/react-router";
import { MiniCountdown } from "./Countdown";

/** Sticky bottom CTA bar with a mini countdown, mobile only. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 md:hidden">
      <div className="flex items-center justify-between gap-3 rounded-full glass-gold p-2 pl-5">
        <div className="text-xs leading-tight">
          <div className="text-snow/60">Christmas in</div>
          <div className="font-semibold text-gold">
            <MiniCountdown />
          </div>
        </div>
        <Link to="/shop" className="rounded-full bg-candy-gradient px-5 py-3 text-sm font-semibold text-snow shadow-candy">
          Explore the shop
        </Link>
      </div>
    </div>
  );
}
