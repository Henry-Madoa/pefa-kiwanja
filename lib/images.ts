// Free-to-use photos from Unsplash (unsplash.com/license) — no attribution
// required, safe for commercial and personal use. Delivered through Cloudinary
// (fetch) for optimization + CDN caching.
import { cloudinaryFetch } from "./cloudinary";

function unsplash(id: string, w = 1600) {
  const source = `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;
  return cloudinaryFetch(source, `f_auto,q_auto,c_limit,w_${w}`);
}

export const pageImages = {
  hero: unsplash("photo-1507692049790-de58290a4334"),
  about: unsplash("photo-1511527661048-7fe73d85e9a4"),
  pastor: unsplash("photo-1520642413789-2bd6770d59e3"),
  leadership: unsplash("photo-1600880292089-90a7e086ee0c"),
  ministries: unsplash("photo-1544928938-6852c1925194"),
  sermons: unsplash("photo-1509021436665-8f07dbf5bf1d"),
  events: unsplash("photo-1517456793572-1d8efd6dc135"),
  blog: unsplash("photo-1497621122273-f5cfb6065c56"),
  prayer: unsplash("photo-1543702404-38c2035462ad"),
  contact: unsplash("photo-1548625149-fc4a29cf7092"),
  gallery: unsplash("photo-1554048612-b6a482bc67e5"),
  give: unsplash("photo-1579208575657-c595a05383b7"),
  faq: unsplash("photo-1484069560501-87d72b0c3669"),
  newsletter: unsplash("photo-1526554850534-7c78330d5f90"),
};

// Scrolling marquee on the landing page — worship, community, and church life.
export const marqueeImages: { src: string; alt: string }[] = [
  { src: unsplash("photo-1507692049790-de58290a4334", 800), alt: "Worship band leading a service" },
  { src: unsplash("photo-1438232992991-995b7058bbb3", 800), alt: "Congregation with hands raised in worship" },
  { src: unsplash("photo-1511527661048-7fe73d85e9a4", 800), alt: "Cathedral interior" },
  { src: unsplash("photo-1543702404-38c2035462ad", 800), alt: "Prayer gathering" },
  { src: unsplash("photo-1517456793572-1d8efd6dc135", 800), alt: "Community gathered together" },
  { src: unsplash("photo-1544928938-6852c1925194", 800), alt: "Volunteers serving the community" },
  { src: unsplash("photo-1477281765962-ef34e8bb0967", 800), alt: "Hands lifted during worship" },
  { src: unsplash("photo-1515162305285-0293e4767cc2", 800), alt: "Church building at golden hour" },
  { src: unsplash("photo-1509021436665-8f07dbf5bf1d", 800), alt: "Open Bible on a table" },
  { src: unsplash("photo-1600880292089-90a7e086ee0c", 800), alt: "Team joined together in unity" },
];
