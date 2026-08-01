import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import NewsletterForm from "@/components/NewsletterForm";
import { pageImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Newsletter | NCCI",
  description: "Subscribe to the NCCI newsletter for updates and announcements.",
};

export default function NewsletterPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay in the Loop"
        title="Newsletter"
        description="Get church news, event updates, and encouragement delivered to your inbox."
        image={pageImages.newsletter}
      />
      <section className="section">
        <div className="container-page max-w-[520px]">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
