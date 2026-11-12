import { Lock, Mail, Sparkles } from "lucide-react";

export function TrustRow() {
  const items = [
    { icon: Lock, text: "Secure checkout" },
    { icon: Mail, text: "Delivered by email" },
    { icon: Sparkles, text: "Free fix within 24h if we get anything wrong" },
  ];
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-snow/70">
      {items.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-mint" /> {text}
        </li>
      ))}
    </ul>
  );
}
