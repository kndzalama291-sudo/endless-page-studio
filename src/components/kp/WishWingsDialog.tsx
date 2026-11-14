import { useState } from "react";
import {
  Sparkles,
  Heart,
  Send,
  Share2,
  CheckCircle2,
  Gift,
  ArrowRight,
  Flame,
  MessageCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { burstConfetti } from "@/components/kp/confetti";
import { MASCOTS } from "@/config/brand";

const CARD_THEMES = [
  { id: "starlight", name: "Starlight Sky", bg: "from-indigo-950 via-midnight to-blue-950", border: "border-gold/40", icon: "⭐" },
  { id: "workshop", name: "Santa's Workshop", bg: "from-amber-950/80 via-midnight to-red-950/80", border: "border-amber-400/40", icon: "🎁" },
  { id: "aurora", name: "Aurora Mint", bg: "from-emerald-950 via-midnight to-teal-950", border: "border-mint/40", icon: "❄️" },
  { id: "cozy", name: "Cozy Hearth", bg: "from-red-950 via-midnight to-orange-950", border: "border-candy/40", icon: "🔥" },
];

const PRESET_REASONS = [
  "I've been practicing so hard this week!",
  "I was super kind to my brother / sister!",
  "To share with my best friends!",
  "My #1 biggest holiday dream!",
  "I helped clean up without being asked!",
];

export function WishWingsDialog({
  itemTitle = "Personalized Holiday Starlight Video & Letter",
  triggerButton,
}: {
  itemTitle?: string;
  triggerButton?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(CARD_THEMES[0]!);
  const [childName, setChildName] = useState("");
  const [customReason, setCustomReason] = useState(PRESET_REASONS[0]!);
  const [step, setStep] = useState<"craft" | "share" | "parent_view">("craft");
  const [parentReply, setParentReply] = useState<string | null>(null);

  const handleCreateWish = (e: React.MouseEvent) => {
    burstConfetti(e.clientX, e.clientY, 80);
    setStep("share");
  };

  const getShareText = () => {
    return `🪽 Wish Wings from ${childName.trim() || "Your Child"}!\n\n"I made a holiday wish for: ${itemTitle}!"\nWhy: "${customReason}"\n\nClick to view and choose your reply: ${typeof window !== "undefined" ? window.location.href : "https://wonderpost.com"}`;
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(getShareText());
    alert("Wish Wings link copied! Send it in your family chat or WhatsApp!");
  };

  const handleSimulateParentReply = (reply: string, e: React.MouseEvent) => {
    setParentReply(reply);
    burstConfetti(e.clientX, e.clientY, 100);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="gold" size="lg" className="rounded-full shadow-lg">
            <Sparkles className="h-4 w-4 mr-2" /> Make a Wish Wing 🪽
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl border-gold/30 bg-midnight/95 text-snow backdrop-blur-2xl p-6 sm:p-10 rounded-[2.5rem]">
        <DialogHeader className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold/20 text-gold mb-2 text-2xl shadow-inner">
            🪽
          </div>
          <DialogTitle className="font-display text-3xl sm:text-4xl font-bold text-snow">
            Wish Wings Card Builder
          </DialogTitle>
          <DialogDescription className="text-snow/75 text-sm sm:text-base">
            Not a boring shopping cart! Pick a magical card, tell your family why you want it, and send it as a joyful gift request.
          </DialogDescription>
        </DialogHeader>

        {step === "craft" && (
          <div className="space-y-6 mt-4">
            {/* 1. Theme picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-2">
                1. Choose Your Card Style:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CARD_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-sm font-semibold transition ${
                      selectedTheme.id === theme.id
                        ? `${theme.border} bg-gold/20 text-gold shadow-md`
                        : "border-snow/10 bg-midnight/40 text-snow/70 hover:text-snow"
                    }`}
                  >
                    <span>{theme.icon}</span>
                    <span>{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Child Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-2">
                2. Your Name or Nickname:
              </label>
              <Input
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="e.g. Leo the Star Explorer"
                className="h-12 rounded-2xl border-gold/30 bg-midnight/60 text-snow"
              />
            </div>

            {/* 3. Reason */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-2">
                3. Why do you wish for this item?
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {PRESET_REASONS.map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => setCustomReason(reason)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition ${
                      customReason === reason
                        ? "border-mint bg-mint/20 text-mint font-bold"
                        : "border-snow/15 text-snow/60 hover:text-snow"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
              <Input
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Write your own special reason..."
                className="h-12 rounded-2xl border-gold/30 bg-midnight/60 text-snow text-sm"
              />
            </div>

            {/* Live Preview Card */}
            <div
              className={`rounded-3xl p-6 bg-gradient-to-br ${selectedTheme.bg} border ${selectedTheme.border} shadow-xl relative overflow-hidden`}
            >
              <div className="flex justify-between items-start">
                <span className="text-3xl">{selectedTheme.icon}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-gold bg-midnight/60 px-3 py-1 rounded-full border border-gold/30">
                  Wish Wing
                </span>
              </div>
              <div className="mt-4">
                <h4 className="font-display text-2xl font-bold text-snow">
                  {childName.trim() || "A Special Child"}'s Holiday Wish
                </h4>
                <p className="mt-1 text-sm text-gold font-semibold">
                  🎁 Item: {itemTitle}
                </p>
                <p className="mt-3 text-sm text-snow/90 italic bg-midnight/40 p-3 rounded-xl border border-snow/10">
                  "{customReason}"
                </p>
              </div>
            </div>

            <Button
              variant="candy"
              size="xl"
              onClick={handleCreateWish}
              className="w-full h-14 rounded-full text-lg shadow-candy"
            >
              Ready to Send to Parent / Family! 🪽
            </Button>
          </div>
        )}

        {step === "share" && (
          <div className="space-y-6 mt-4 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mint/20 text-mint text-3xl">
              ✓
            </div>
            <h3 className="font-display text-3xl font-bold text-snow">
              Your Wish Wings are Ready!
            </h3>
            <p className="text-sm text-snow/75 max-w-md mx-auto">
              Share your special card with Mom, Dad, Grandparents, or Aunts. They can each view it and reply with one tap!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="gold"
                size="lg"
                onClick={handleShareWhatsApp}
                className="rounded-full shadow-lg h-12 px-6"
              >
                <MessageCircle className="h-5 w-5 mr-2 text-green-700" /> Share via WhatsApp
              </Button>
              <Button
                variant="glass"
                size="lg"
                onClick={handleCopyLink}
                className="rounded-full h-12 px-6"
              >
                <Share2 className="h-4 w-4 mr-2" /> Copy Card Link
              </Button>
            </div>

            <div className="pt-6 border-t border-snow/10">
              <p className="text-xs text-snow/50 uppercase tracking-widest mb-3">
                Preview What Parents See:
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep("parent_view")}
                className="text-gold text-xs underline"
              >
                Open Interactive Parent View Simulator →
              </Button>
            </div>
          </div>
        )}

        {step === "parent_view" && (
          <div className="space-y-6 mt-4">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-mint bg-mint/10 px-3 py-1 rounded-full border border-mint/30">
                👨‍👩‍👧 Family Approval Screen
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-snow">
                {childName.trim() || "Leo"} shared a Wish Wing with you!
              </h3>
              <p className="text-xs text-snow/70 mt-1">
                Choose a warm mascot response to send back to their screen:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "1. Yes, approved! It's flying your way! 🎉", value: "approved", color: "hover:border-mint hover:bg-mint/10" },
                { label: "2. Saved for your Birthday! 🎂", value: "birthday", color: "hover:border-gold hover:bg-gold/10" },
                { label: "3. Let's swap for another surprise! 🔄", value: "swap", color: "hover:border-candy hover:bg-candy/10" },
                { label: "4. Let's chat together at bedtime! 💬", value: "chat", color: "hover:border-blue-400 hover:bg-blue-400/10" },
              ].map((choice) => (
                <button
                  key={choice.value}
                  type="button"
                  onClick={(e) => handleSimulateParentReply(choice.label, e)}
                  className={`p-4 rounded-2xl border border-snow/15 bg-midnight/50 text-left text-sm font-semibold transition ${choice.color}`}
                >
                  {choice.label}
                </button>
              ))}
            </div>

            {parentReply && (
              <div className="rounded-3xl p-6 bg-gradient-to-r from-mint/20 via-gold/15 to-transparent border border-mint/40 text-center animate-pulse">
                <div className="text-3xl mb-1">{MASCOTS.primary.avatar}</div>
                <p className="text-xs font-bold uppercase tracking-widest text-mint">
                  {MASCOTS.primary.name} the Mascot delivered your answer:
                </p>
                <p className="font-display text-xl font-bold text-snow mt-1">
                  "{parentReply}"
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-snow/10">
              <button
                type="button"
                onClick={() => setStep("craft")}
                className="text-xs text-snow/50 hover:text-snow"
              >
                ← Back to Card Builder
              </button>
              <Button
                variant="candy"
                size="sm"
                onClick={() => setOpen(false)}
                className="rounded-full"
              >
                Close & Enjoy
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
