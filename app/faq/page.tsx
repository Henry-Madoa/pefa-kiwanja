import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import { pageImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "FAQs | PEFA Branch Kiwanja Cathedral",
  description: "Frequently asked questions about PEFA Branch Kiwanja Cathedral.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="Frequently Asked Questions"
        image={pageImages.faq}
      />
      <section className="section">
        <div className="container-page max-w-[720px]">
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
