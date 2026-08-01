import { missionStatement } from "@/lib/data";

export default function Mission() {
  return (
    <section className="py-20 md:py-24 text-center">
      <div className="container-page">
        <blockquote className="font-display italic font-medium text-[clamp(1.4rem,2.6vw,2.1rem)] max-w-[800px] mx-auto mb-5 text-wine-dark leading-[1.35]">
          &ldquo;{missionStatement.quote}&rdquo;
        </blockquote>
        <cite className="not-italic font-sans text-[0.82rem] font-semibold tracking-[0.06em] text-gold">
          &mdash; {missionStatement.cite}
        </cite>
      </div>
    </section>
  );
}
