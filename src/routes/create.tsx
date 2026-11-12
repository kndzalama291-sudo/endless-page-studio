import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/kp/PageHero";
import { SantaBuilder } from "@/components/kp/builder/SantaBuilder";
import { TrustRow } from "@/components/kp/TrustRow";
import { MagicPromise } from "@/components/kp/MagicPromise";
import { ChapterPortal } from "@/components/kp/ChapterPortal";
import { BRAND_NAME } from "@/config/brand";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: `Create a personalized Santa message — ${BRAND_NAME}` },
      { name: "description", content: "Tell Santa their name, what they love and their Christmas wish. Watch the letter write itself, then choose when the magic arrives." },
      { property: "og:title", content: `Santa's Message Workshop — ${BRAND_NAME}` },
      { property: "og:description", content: "Build a one-of-a-kind Santa video and letter in minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreatePage,
});

function CreatePage() {
  return (
    <>
      <PageHero eyebrow="Chapter 02 · The Workshop" title={<>Write to Santa. <span className="text-aurora">He'll write back.</span></>} sub="Every detail you add is woven into their message. Watch the scroll fill in as you go.">
        <div className="mt-8 flex justify-center">
          <TrustRow />
        </div>
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <SantaBuilder />
      </section>
      <MagicPromise />
      <ChapterPortal />
    </>
  );
}
