import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PrayerRequestForm from "@/components/PrayerRequestForm";
import { pageImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Prayer Requests | NCCI",
  description: "Submit a prayer request to the NCCI prayer team.",
};

export default function PrayerPage() {
  return (
    <>
      <PageHero
        eyebrow="We're Praying With You"
        title="Prayer Requests"
        description="Our prayer team stands ready to intercede for you. Share what's on your heart below."
        image={pageImages.prayer}
      />
      <section className="section">
        <div className="container-page max-w-[680px]">
          <PrayerRequestForm />
        </div>
      </section>
    </>
  );
}
