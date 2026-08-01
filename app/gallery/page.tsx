import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { galleryAlbums } from "@/lib/data";
import GalleryGrid from "@/components/GalleryGrid";
import { pageImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Photo Gallery | NCCI",
  description: "Browse photos from services, conferences, weddings, and community events at NCCI.",
};

const albumGradients = [
  "linear-gradient(160deg, #6E1423, #2E070E)",
  "linear-gradient(160deg, #B8923F, #8a6c2d)",
  "linear-gradient(160deg, #1F3A2B, #0f2018)",
  "linear-gradient(160deg, #430B15, #6E1423)",
  "linear-gradient(160deg, #55483D, #2A211C)",
  "linear-gradient(160deg, #8a6c2d, #B8923F)",
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Photo Gallery"
        description="A look back at services, conferences, weddings, and community outreach."
        image={pageImages.gallery}
      />
      <section className="section">
        <div className="container-page">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryAlbums.map((album, i) => (
              <div key={album.slug} className="rounded-lg overflow-hidden border border-[color:var(--line)]">
                <div
                  className="h-[180px]"
                  style={{ background: albumGradients[i % albumGradients.length] }}
                />
                <div className="p-5 bg-white flex justify-between items-center">
                  <h3 className="text-[1rem]">{album.title}</h3>
                  <span className="font-sans text-[0.78rem] text-gold font-semibold">
                    {album.count} photos
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-[1.3rem] mb-6">Recent Photos</h2>
            <GalleryGrid />
          </div>
        </div>
      </section>
    </>
  );
}
