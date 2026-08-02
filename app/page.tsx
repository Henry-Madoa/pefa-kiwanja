import Hero from "@/components/Hero";
import InfoStrip from "@/components/InfoStrip";
import FeaturedGrid from "@/components/FeaturedGrid";
import StatsBand from "@/components/StatsBand";
import Mission from "@/components/Mission";
import BishopSpotlight from "@/components/BishopSpotlight";
import Marquee from "@/components/Marquee";
import UpdatesGrid from "@/components/UpdatesGrid";
import CtaBand from "@/components/CtaBand";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InfoStrip />
      <FeaturedGrid />
      <StatsBand />
      <Mission />
      <BishopSpotlight />
      <Marquee />
      <UpdatesGrid />
      <CtaBand />
    </>
  );
}
