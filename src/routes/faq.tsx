import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero } from "@/components/kp/PageHero";
import { MagicPromise } from "@/components/kp/MagicPromise";
import { ChapterPortal } from "@/components/kp/ChapterPortal";
import { BRAND_NAME, CONTACT_EMAIL, DATA_RETENTION_DAYS } from "@/config/brand";
import { LANGUAGES } from "@/config/catalog";

const FAQS = [
  {
    q: "How and when is it delivered?",
    a: "Digital gifts arrive by email. Choose instant delivery, Christmas Eve evening, Christmas morning, or any moment you like. Physical keepsakes are posted — check the arrival checker in the Gift Shop for last order dates.",
  },
  {
    q: "Which languages does Santa speak?",
    a: `Right now: ${LANGUAGES.filter((l) => l.available).map((l) => l.label).join(", ")}. He's practising more every evening.`,
  },
  {
    q: "What do you do with my child's details?",
    a: `We only use their name and the details you share to make their gift. We never sell data, and we delete personalization details ${DATA_RETENTION_DAYS} days after delivery. Purchasers must be adults (18+).`,
  },
  {
    q: "What if you get a name or detail wrong?",
    a: "The Magic Promise: tell us within 24 hours of delivery and we'll fix it, free. Santa takes typos very personally.",
  },
  {
    q: "Can I get a refund?",
    a: "Because every gift is made by hand just for one child, we can't refund once it's been crafted. If something's wrong, we'll fix it. If we can't, you'll get your money back. See the refund policy for the details.",
  },
  {
    q: "How does the personalization actually work?",
    a: "You tell us their name (and how to say it), what they love, a proud moment and their wish. Our elves weave every detail into the script so it feels unmistakably written for them.",
  },
  {
    q: "What about timezones?",
    a: "Scheduled messages go out in the recipient's timezone, not yours. So Christmas morning in Cape Town is Christmas morning in Cape Town, even if you're ordering from Toronto.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: `FAQ: delivery, languages, privacy & refunds — ${BRAND_NAME}` },
      { name: "description", content: "Everything you'd like to ask the elves: delivery times, languages, privacy, refunds, personalization and timezones." },
      { property: "og:title", content: `Questions for the Elves — ${BRAND_NAME}` },
      { property: "og:description", content: "Delivery, languages, privacy, refunds and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Chapter 06 · The Back Page" title={<>Questions for <span className="text-aurora">the elves.</span></>} sub="Short answers, warm cocoa, zero fine print surprises." />
      <section className="mx-auto max-w-3xl px-4 sm:px-6">
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="rounded-3xl glass px-6 data-[state=open]:border-gold/40">
              <AccordionTrigger className="py-5 text-left font-display text-xl font-semibold text-snow hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base text-snow/75">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-10 text-center text-snow/60">
          Still curious? Email <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold underline">{CONTACT_EMAIL}</a> or read our{" "}
          <Link to="/privacy" className="text-gold underline">privacy notice</Link>.
        </p>
      </section>
      <MagicPromise />
      <ChapterPortal />
    </>
  );
}
