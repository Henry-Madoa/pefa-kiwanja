import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { churchInfo } from "@/lib/data";
import { pageImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact Us | PEFA Branch Kiwanja Cathedral",
  description: "Get in touch with PEFA Branch Kiwanja Cathedral.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We'd Love to Hear From You"
        title="Contact Us"
        description="Whether you have a question, need prayer, or just want to say hello — reach out any time."
        image={pageImages.contact}
      />
      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">
          <div>
            <h2 className="text-[1.3rem] mb-5">Send a Message</h2>
            <ContactForm />
          </div>

          <aside className="space-y-8">
            <div className="bg-cream-dim rounded-lg p-7">
              <h3 className="text-[1rem] mb-4">Get in Touch</h3>
              <dl className="space-y-4 text-[0.9rem]">
                <div>
                  <dt className="eyebrow mb-1">Address</dt>
                  <dd className="text-ink">{churchInfo.address}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">Phone</dt>
                  <dd className="text-ink">{churchInfo.phone}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">Email</dt>
                  <dd className="text-ink">{churchInfo.email}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">Office Hours</dt>
                  <dd className="text-ink">{churchInfo.officeHours}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1">WhatsApp</dt>
                  <dd className="text-ink">{churchInfo.phone}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg overflow-hidden border border-[color:var(--line)] h-[220px]">
              <iframe
                className="w-full h-full"
                src={churchInfo.mapEmbedUrl}
                loading="lazy"
                title="Church location map"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
