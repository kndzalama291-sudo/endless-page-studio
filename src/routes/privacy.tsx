import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/kp/LegalPage";
import { BRAND_NAME, CONTACT_EMAIL, DATA_RETENTION_DAYS } from "@/config/brand";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy notice — ${BRAND_NAME}` },
      { name: "description", content: `How ${BRAND_NAME} handles children's names and details, who can order, and when we delete data.` },
      { property: "og:title", content: `Privacy notice — ${BRAND_NAME}` },
      { property: "og:description", content: "What we collect, why, and when we delete it." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Privacy notice" updated="November 2026">
      <p>{BRAND_NAME} makes personalized Christmas gifts. To do that, we need a few details. Here's exactly what, why, and for how long.</p>
      <h2>What we collect</h2>
      <ul>
        <li>About the child: first name, how to pronounce it, age, interests, a proud moment and their Christmas wish.</li>
        <li>About you: your email address, an optional recipient email, and delivery preferences (date, time and timezone).</li>
        <li>Payment is handled by our checkout provider. We never see or store your card details.</li>
      </ul>
      <h2>Purchasers must be adults</h2>
      <p>Only adults (18+) may place an order. Children should not use this site to submit their own details.</p>
      <h2>Why we use it</h2>
      <p>Solely to create and deliver the gift you ordered and to contact you about that order. We never sell or share children's details for marketing.</p>
      <h2>How long we keep it</h2>
      <p>Personalization details are deleted {DATA_RETENTION_DAYS} days after delivery. Order records required for accounting are kept as the law requires, without the child's details.</p>
      <h2>Cookies</h2>
      <p>Essential cookies keep your basket and preferences. Analytics cookies are only used if you accept them.</p>
      <h2>Your rights</h2>
      <p>Ask us to see, correct or delete your data any time: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </LegalPage>
  ),
});
