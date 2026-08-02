import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { pastor } from "@/lib/data";
import { pageImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Bishop's Profile | PEFA Branch Kiwanja Cathedral",
  description: "Meet the presiding bishop of PEFA Branch Kiwanja Cathedral.",
};

export default function PastorPage() {
  return (
    <>
      <PageHero eyebrow="Meet Our Shepherd" title="Bishop's Profile" image={pageImages.bishop} />
      <section className="section">
        {/* Wider media column so the landscape portrait scales up to fill the
            available space instead of sitting small beside the tall bio. */}
        <div className="container-page grid grid-cols-1 md:grid-cols-[360px_1fr] lg:grid-cols-[460px_1fr] gap-12 items-start">
          <div>
            {/* Studio portrait is landscape (couple), so it sits in a wide
                frame rather than the tall arch, which would crop faces. */}
            <div className="rounded-lg border border-[color:var(--line)] bg-white overflow-hidden">
              {pastor.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={pastor.photo}
                  alt={pastor.photoAlt || pastor.name}
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="aspect-[3/2] bg-wine-deeper flex items-center justify-center">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#E4C874" strokeWidth="1.2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21v-1a8 8 0 0116 0v1" />
                  </svg>
                </div>
              )}
            </div>
            <p className="text-center text-[0.78rem] text-ink-soft mt-3 font-sans">
              {pastor.photoAlt}
            </p>
            <div className="flex gap-3 mt-5 justify-center">
              <a href={pastor.social.facebook_bishop} className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-wine text-xs">FB</a>
              <a href={pastor.social.instagram} className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-wine text-xs">IG</a>
              <a href={pastor.social.youtube} className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-wine text-xs">YT</a>
            </div>
          </div>
          <div>
            <h2 className="text-[1.9rem] mb-1">{pastor.name}</h2>
            <p className="eyebrow mb-6">{pastor.title}</p>
            <p className="text-ink-soft leading-relaxed mb-6">{pastor.bio}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-[1rem] mb-1.5">Ordination</h3>
                <p className="text-ink-soft text-[0.94rem]">{pastor.education}</p>
              </div>
              <div>
                <h3 className="text-[1rem] mb-1.5">Ministry &amp; Oversight</h3>
                <p className="text-ink-soft text-[0.94rem]">{pastor.ministryExperience}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-[1rem] mb-1.5">Ministry &amp; Impact</h3>
              <p className="text-ink-soft text-[0.94rem] leading-relaxed">{pastor.testimony}</p>
            </div>

            <div>
              <h3 className="text-[1rem] mb-1.5">Vision for the Church</h3>
              <p className="text-ink-soft text-[0.94rem] leading-relaxed">{pastor.visionForChurch}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
