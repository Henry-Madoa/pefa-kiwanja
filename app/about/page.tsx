import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { aboutContent, churchInfo } from "@/lib/data";
import { pageImages } from "@/lib/images";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import BoardMemberModel from "@/models/BoardMember";

export const dynamic = "force-dynamic";

async function getBoardMembers() {
  try {
    await dbConnect();
    const members = await BoardMemberModel.find().sort({ order: 1, name: 1 }).lean();
    return serialize(members);
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "About Us | PEFA Branch Kiwanja Cathedral",
  description:
    "Learn about the history, vision, mission, and values of PEFA Branch Kiwanja Cathedral — an Oasis of Hope in Kahawa West, Nairobi, and a branch of the Pentecostal Evangelistic Fellowship of Africa.",
};

export default async function AboutPage() {
  const boardMembers = await getBoardMembers();

  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="About Our Church"
        description="A family of believers with a shared history, a clear vision, and a heart to grow together."
        image={pageImages.about}
      />

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <span className="eyebrow block mb-3">Our History</span>
            <h2 className="text-[1.7rem] mb-4">Where We Come From</h2>
            <blockquote className="border-l-2 border-gold/50 pl-4 mb-5 font-display italic text-ink leading-relaxed">
              &ldquo;{churchInfo.welcomeVerse.text}&rdquo;
              <cite className="not-italic block mt-2 font-sans text-[0.75rem] font-semibold tracking-[0.06em] text-gold">
                &mdash; {churchInfo.welcomeVerse.ref}
              </cite>
            </blockquote>
            <p className="text-ink-soft leading-relaxed">{aboutContent.history}</p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <span className="eyebrow block mb-2">Vision</span>
              <p className="text-ink-soft leading-relaxed">{aboutContent.vision}</p>
            </div>
            <div>
              <span className="eyebrow block mb-2">Mission</span>
              <p className="text-ink-soft leading-relaxed">{aboutContent.mission}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <div className="rounded-2xl bg-wine text-cream px-8 py-12 md:px-14 md:py-14 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="w-24 h-24 rounded-full bg-cream flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pefa-logo.png"
                  alt="Pentecostal Evangelistic Fellowship of Africa logo"
                  width={72}
                  height={72}
                  className="w-[72px] h-[72px] object-contain"
                />
              </span>
              <span className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-gold-bright">
                {churchInfo.denominationShort}
              </span>
            </div>
            <div>
              <span className="eyebrow block mb-3 text-gold-bright">Part of a Wider Family</span>
              <p className="text-cream/85 leading-relaxed text-[1.02rem]">{aboutContent.affiliation}</p>
              <blockquote className="mt-6 border-l-2 border-gold-bright/60 pl-4 font-display italic text-cream/90">
                &ldquo;{churchInfo.denominationVerse.text}&rdquo;
                <cite className="not-italic block mt-2 font-sans text-[0.78rem] font-semibold tracking-[0.06em] text-gold-bright">
                  &mdash; {churchInfo.denominationVerse.ref}
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0 bg-cream-dim/50">
        <div className="container-page">
          <div className="section-head">
            <span className="eyebrow block mb-3">What We Stand On</span>
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)]">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {aboutContent.coreValues.map((value) => (
              <div key={value.title} className="arch-card">
                <h3 className="text-[1.05rem] mb-2">{value.title}</h3>
                <p className="text-[0.9rem] text-ink-soft">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <span className="eyebrow block mb-3">What We Believe</span>
            <h2 className="text-[1.7rem] mb-5">Statement of Faith</h2>
            <ul className="space-y-3">
              {aboutContent.statementOfFaith.map((item) => (
                <li key={item} className="flex gap-3 text-ink-soft leading-relaxed">
                  <span className="text-gold mt-1">&#10022;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow block mb-3">When We Gather</span>
            <h2 className="text-[1.7rem] mb-5">Service Schedule</h2>
            <div className="border border-[color:var(--line)] rounded-lg divide-y divide-[color:var(--line)] bg-white">
              {aboutContent.serviceSchedule.map((s) => (
                <div key={s.label} className="flex justify-between items-center px-6 py-4">
                  <div>
                    <div className="font-medium text-ink">{s.label}</div>
                    <div className="text-[0.85rem] text-ink-soft">{s.day}</div>
                  </div>
                  <div className="font-sans font-semibold text-wine">{s.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {boardMembers.length > 0 && (
        <section className="section pt-0">
          <div className="container-page">
            <div className="section-head">
              <span className="eyebrow block mb-3">Governance</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.4rem)]">Church Board</h2>
              <p className="text-ink-soft mt-3.5">
                The men and women who provide oversight, direction, and stewardship for our church
                family.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {boardMembers.map((member) => (
                <div
                  key={String(member._id)}
                  className="bg-white border border-[color:var(--line)] rounded-lg overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-wine-deeper flex items-center justify-center overflow-hidden p-1">
                    {member.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-full aspect-square object-cover rounded-full"
                      />
                    ) : (
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#E3C077" strokeWidth="1.4">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21v-1a8 8 0 0116 0v1" />
                      </svg>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-[1.1rem] mb-1">
                      {member.title} {member.name}
                    </h3>
                    <p className="eyebrow mb-3">{member.position}</p>
                    {member.note && (
                      <p className="text-[0.9rem] text-ink-soft leading-relaxed">{member.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
