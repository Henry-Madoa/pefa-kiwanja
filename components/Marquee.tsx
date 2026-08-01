import Image from "next/image";
import { marqueeImages } from "@/lib/images";
import { dbConnect } from "@/lib/mongodb";
import GalleryImageModel from "@/models/GalleryImage";

// Admin-managed gallery images power the marquee; fall back to the built-in
// set when the gallery is empty or the database is unreachable.
async function getMarqueeImages(): Promise<{ src: string; alt: string }[]> {
  try {
    await dbConnect();
    const images = await GalleryImageModel.find()
      .sort({ order: 1, createdAt: -1 })
      .lean<{ url: string; alt?: string }[]>();
    if (images.length > 0) {
      return images.map((img) => ({ src: img.url, alt: img.alt || "Church gallery photo" }));
    }
  } catch {
    // fall through to the static set
  }
  return marqueeImages;
}

function MarqueeRow({
  images,
  direction,
}: {
  images: { src: string; alt: string }[];
  direction: "left" | "right";
}) {
  // Duplicate the set so the -50% translate loops seamlessly.
  const items = [...images, ...images];
  return (
    <div className="marquee-row overflow-hidden">
      <div className={`marquee-track gap-5 ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
        {items.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative h-40 w-64 sm:h-48 sm:w-72 shrink-0 rounded-lg overflow-hidden border border-gold/20"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="288px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-wine-deeper/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Marquee() {
  const images = await getMarqueeImages();
  const half = Math.ceil(images.length / 2);
  const rowOne = images.slice(0, half);
  const rowTwo = images.slice(half);

  return (
    <section className="relative bg-wine-deeper py-16 md:py-20 overflow-hidden">
      <div className="container-page relative z-10">
        <div className="section-head mb-10">
          <span className="eyebrow block mb-3">Where Faith Meets Purpose</span>
          <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] text-cream">Moments From Our Cathedral</h2>
          <p className="text-cream/60 mt-3.5 font-serif">
            Worship, the Word, and celebration — scenes from PEFA Kiwanja TV broadcasts of our services.
          </p>
        </div>
      </div>

      <div className="relative z-10 space-y-5">
        <MarqueeRow images={rowOne} direction="left" />
        <MarqueeRow images={rowTwo} direction="right" />
      </div>

      {/* Fade edges so cards scroll in and out gracefully */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-wine-deeper to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-wine-deeper to-transparent z-20" />
    </section>
  );
}
