import Link from "next/link";
import { pageImages } from "@/lib/images";

export default function Hero() {
  return (
    <section className="relative pt-16 pb-12 md:pt-20 overflow-hidden">
      <div className="container-page grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-gold" />
            <span className="eyebrow">Oasis of Hope · Kiwanja, Nairobi</span>
          </div>
          <h1 className="text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.05] mb-5">
            Seeking to make <em className="not-italic font-medium text-gold">Christ</em>
            <br />
            known.
          </h1>
          <p className="text-[1.1rem] text-ink-soft max-w-[46ch] mb-8">
            PEFA Branch Kiwanja Cathedral is a family of believers in Kahawa West, Nairobi —
            an Oasis of Hope gathering to worship, grow in the Word, and serve our community
            together.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link href="/about" className="btn btn-primary">
              Join Us Sunday
            </Link>
            <Link href="/sermons" className="btn btn-outline">
              Watch Live
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Plan Your Visit &rarr;
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center order-first lg:order-last">
          <svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[300px] lg:max-w-[460px] h-auto">
            <defs>
              <radialGradient id="glow" cx="50%" cy="38%" r="60%">
                <stop offset="0%" stopColor="#E4C874" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#C9A44A" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3B1B72" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="archfill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B1B72" />
                <stop offset="100%" stopColor="#2C1457" />
              </linearGradient>
              <clipPath id="archclip">
                <path d="M200 6C110 6 40 76 40 166V462H360V166C360 76 290 6 200 6Z" />
              </clipPath>
            </defs>
            <path d="M200 6C110 6 40 76 40 166V462H360V166C360 76 290 6 200 6Z" fill="url(#archfill)" />
            <g clipPath="url(#archclip)">
              <image
                href={pageImages.hero}
                x="0"
                y="0"
                width="400"
                height="480"
                preserveAspectRatio="xMidYMid slice"
              />
              <rect x="0" y="0" width="400" height="480" fill="url(#archfill)" fillOpacity="0.55" />
              <circle cx="200" cy="150" r="180" fill="url(#glow)" />
              <g stroke="#E3C077" strokeOpacity="0.55" strokeWidth="1.4">
                <line x1="200" y1="6" x2="200" y2="462" />
                <line x1="40" y1="230" x2="360" y2="230" />
                <line x1="40" y1="320" x2="360" y2="320" />
                <path d="M40 166C40 76 110 6 200 6C290 6 360 76 360 166" fill="none" />
                <path d="M75 462V180C75 110 130 55 200 55C270 55 325 110 325 180V462" fill="none" />
              </g>
              <g fill="#E3C077" fillOpacity="0.9">
                <circle cx="200" cy="95" r="5" />
                <circle cx="150" cy="140" r="3" />
                <circle cx="250" cy="140" r="3" />
              </g>
            </g>
            <path
              d="M200 6C110 6 40 76 40 166V462H360V166C360 76 290 6 200 6Z"
              fill="none"
              stroke="#E3C077"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
