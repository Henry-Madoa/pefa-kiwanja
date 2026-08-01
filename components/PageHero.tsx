import Image from "next/image";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
}) {
  return (
    <section className="relative bg-wine-deeper text-cream py-16 md:py-20 overflow-hidden">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wine-deeper via-wine-deeper/85 to-wine-deeper/55" />
        </>
      )}
      <div className="container-page relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-gold" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h1 className="font-display text-cream text-[clamp(2rem,3.6vw,2.9rem)] font-semibold">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-[60ch] text-cream/70 font-serif text-[1.05rem]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
