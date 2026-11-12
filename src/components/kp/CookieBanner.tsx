import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { usePrefs } from "@/stores/prefsStore";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const choice = usePrefs((s) => s.cookieChoice);
  const setChoice = usePrefs((s) => s.setCookieChoice);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready || choice) return null;
  return (
    <div role="dialog" aria-label="Cookie preferences" className="fixed inset-x-3 bottom-24 z-[60] mx-auto max-w-xl rounded-3xl glass-gold p-5 md:bottom-6">
      <p className="text-sm text-snow/85">
        🍪 We use a few cookies to keep your sack full and remember your choices. Analytics only if you say yes.{" "}
        <Link to="/privacy" className="text-gold underline">Privacy notice</Link>
      </p>
      <div className="mt-4 flex gap-2">
        <Button variant="candy" size="sm" className="px-5" onClick={() => setChoice("all")}>Accept all</Button>
        <Button variant="glass" size="sm" className="px-5" onClick={() => setChoice("essential")}>Essential only</Button>
      </div>
    </div>
  );
}
