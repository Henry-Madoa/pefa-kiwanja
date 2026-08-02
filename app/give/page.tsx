import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GivingForm from "@/components/GivingForm";
import { pageImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Give Online | PEFA Branch Kiwanja Cathedral",
  description: "Give tithes, offerings, and gifts to PEFA Branch Kiwanja Cathedral securely online.",
};

export default function GivePage() {
  return (
    <>
      <PageHero
        eyebrow="Generosity"
        title="Give with a Grateful Heart"
        description="Every gift helps carry hope into our church and city — tithes, offerings, missions, and building fund."
        image={pageImages.give}
      />
      <section className="section">
        <div className="container-page max-w-[560px]">
          <GivingForm />
        </div>
      </section>
    </>
  );
}
