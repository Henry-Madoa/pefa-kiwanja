import Link from "next/link";

export default function CtaBand() {
  return (
    <section className="bg-forest text-cream py-16" id="giving">
      <div className="container-page flex flex-wrap items-center justify-between gap-8">
        <div>
          <h2 className="text-gold-bright text-[1.8rem]">Give with a grateful heart</h2>
          <p className="text-cream/75 mt-2 max-w-[46ch]">
            Tithes, offerings, and gifts toward our missions and building fund &mdash; secure,
            simple, and instant.
          </p>
        </div>
        <Link href="/give" className="btn" style={{ background: "#E3C077", color: "#2E070E" }}>
          Give Online &rarr;
        </Link>
      </div>
    </section>
  );
}
