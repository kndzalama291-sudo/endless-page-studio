import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/kp/LegalPage";
import { BRAND_NAME, CONTACT_EMAIL } from "@/config/brand";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Terms of service — ${BRAND_NAME}` },
      { name: "description", content: `The terms for ordering personalized Santa messages and keepsakes from ${BRAND_NAME}.` },
      { property: "og:title", content: `Terms of service — ${BRAND_NAME}` },
      { property: "og:description", content: "The friendly small print." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Terms of service" updated="November 2026">
      <p>By ordering from {BRAND_NAME} you agree to these terms. We've kept them short and human.</p>
      <h2>Orders</h2>
      <p>You must be 18 or older to order. You're responsible for the accuracy of the details you provide. Prices are charged in the store currency shown at checkout; other currencies on the site are estimates.</p>
      <h2>Digital gifts</h2>
      <p>Digital gifts are delivered by email at the time you choose. Please make sure the email address is correct and check spam folders.</p>
      <h2>Physical gifts</h2>
      <p>Last order dates are our best estimate based on carrier timelines and aren't guaranteed. We won't let you check out physical items after a region's cutoff.</p>
      <h2>Content</h2>
      <p>Our illustrations and characters are original. {BRAND_NAME} is not affiliated with any brand.</p>
      <h2>Contact</h2>
      <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
    </LegalPage>
  ),
});
