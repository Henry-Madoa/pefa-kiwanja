import Link from "next/link";
import { pastor, churchInfo } from "@/lib/data";

// Landing-page introduction to the cathedral's presiding bishop, linking
// through to the full profile at /pastor.
export default function BishopSpotlight() {
  return (
    <section className="section pt-0">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 lg:gap-14 items-center">
          {/* Landscape studio portrait — kept whole rather than cropped into
              the tall arch frame used elsewhere. */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-[420px]">
            <div className="rounded-lg overflow-hidden border border-gold/25 bg-white">
              {pastor.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={pastor.photo}
                  alt={pastor.photoAlt || pastor.name}
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="aspect-[3/2] bg-wine-deeper flex items-center justify-center">
                  <svg width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="#E4C874" strokeWidth="1.1">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21v-1a8 8 0 0116 0v1" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="eyebrow">Our Shepherd</span>
            </div>
            <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mb-1.5">{pastor.name}</h2>
            <p className="eyebrow mb-6">{pastor.title}</p>

            <p className="text-ink-soft leading-relaxed mb-5 max-w-[62ch]">{pastor.bio}</p>

            <blockquote className="border-l-2 border-gold/50 pl-4 mb-7 font-display italic text-ink leading-relaxed max-w-[58ch]">
              &ldquo;{pastor.visionForChurch}&rdquo;
            </blockquote>

            <div className="flex flex-wrap gap-3.5">
              <Link href="/pastor" className="btn btn-primary">
                Read Full Profile
              </Link>
              <Link href="/leadership" className="btn btn-outline">
                Meet Our Leadership
              </Link>
              <a
                href={churchInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Watch on PEFA Kiwanja TV &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
