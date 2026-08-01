import { stats } from "@/lib/data";

export default function StatsBand() {
  return (
    <section
      className="bg-wine-deeper text-cream py-16"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(184,146,63,0.12), transparent 60%)",
      }}
    >
      <div className="container-page grid grid-cols-2 lg:grid-cols-4 text-center gap-y-8">
        {stats.map((stat, i) => (
          <div key={stat.label} className="relative px-5">
            {i !== stats.length - 1 && (
              <span className="hidden lg:block absolute right-0 top-[10%] bottom-[10%] w-px bg-gold-bright/20" />
            )}
            <div className="font-display text-[2.6rem] font-semibold text-gold-bright leading-none">
              {stat.value}
            </div>
            <div className="font-sans text-[0.76rem] tracking-[0.1em] uppercase text-cream/70 mt-2.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
