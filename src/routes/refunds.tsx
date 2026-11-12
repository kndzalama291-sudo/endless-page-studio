import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/kp/LegalPage";
import { BRAND_NAME, CONTACT_EMAIL } from "@/config/brand";

export const Route = createFileRoute("/refunds")({
  head: () => ({
    meta: [
      { title: `Refund policy & Magic Promise — ${BRAND_NAME}` },
      { name: "description", content: "Free fixes within 24 hours, and refunds when we can't make it right." },
      { property: "og:title", content: `Refund policy — ${BRAND_NAME}` },
      { property: "og:description", content: "Free fixes within 24 hours if we get anything wrong." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Refund policy" updated="November 2026">
      <h2>The Magic Promise</h2>
      <p>If we get a name or detail wrong, tell us within 24 hours of delivery and we'll fix it free.</p>
      <h2>Digital gifts</h2>
      <p>Each gift is crafted for one child, so we can't refund once it's been made. If we can't fix a mistake that's ours, you'll get a full refund.</p>
      <h2>Physical gifts</h2>
      <p>Personalized items can't be returned unless they arrive damaged or with our error. Send a photo within 7 days of delivery and we'll replace or refund.</p>
      <h2>How to ask</h2>
      <p>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your order number. A real human elf replies.</p>
    </LegalPage>
  ),
});
