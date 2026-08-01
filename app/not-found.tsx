import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section text-center">
      <div className="container-page">
        <span className="eyebrow block mb-3">404</span>
        <h1 className="text-[2rem] mb-4">Page Not Found</h1>
        <p className="text-ink-soft mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
