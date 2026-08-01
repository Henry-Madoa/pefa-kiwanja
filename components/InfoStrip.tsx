import { churchInfo } from "@/lib/data";

const items = [
  {
    label: "Service Times",
    value: churchInfo.serviceTimes,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E3C077" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: churchInfo.address,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E3C077" strokeWidth="1.8">
        <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Call Us",
    value: churchInfo.phone,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E3C077" strokeWidth="1.8">
        <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .3 2 .7 3a2 2 0 01-.4 2.1L8 10.1a16 16 0 006 6l1.3-1.4a2 2 0 012.1-.4c1 .4 2 .6 3 .7a2 2 0 011.6 2z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: churchInfo.email,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E3C077" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
];

export default function InfoStrip() {
  return (
    <section className="bg-wine text-cream">
      <div className="container-page grid grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`py-6 px-2 sm:px-7 flex gap-3.5 items-start ${
              i !== items.length - 1 ? "lg:border-r lg:border-gold-bright/25" : ""
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
            <div>
              <div className="font-sans text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-gold-bright mb-0.5">
                {item.label}
              </div>
              <div className="font-sans text-[0.92rem] font-medium">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
