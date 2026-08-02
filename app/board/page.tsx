import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { pageImages } from "@/lib/images";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import BoardMemberModel from "@/models/BoardMember";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Board of Directors | PEFA Branch Kiwanja Cathedral",
  description:
    "Meet the Board of Directors who provide oversight, direction, and stewardship for PEFA Branch Kiwanja Cathedral.",
};

async function getBoardMembers() {
  try {
    await dbConnect();
    const members = await BoardMemberModel.find().sort({ order: 1, name: 1 }).lean();
    return serialize(members);
  } catch {
    return [];
  }
}

export default async function BoardPage() {
  const boardMembers = await getBoardMembers();

  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="Board of Directors"
        description="The men and women who provide oversight, direction, and stewardship for our church family."
        image={pageImages.about}
      />
      <section className="section">
        {boardMembers.length === 0 ? (
          <div className="container-page">
            <p className="text-ink-soft text-center py-10">
              Our Board of Directors will be listed here soon.
            </p>
          </div>
        ) : (
          <div className="container-page grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#E4C874" strokeWidth="1.4">
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
        )}
      </section>
    </>
  );
}
