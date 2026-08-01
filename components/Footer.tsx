import Link from "next/link";
import { churchInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-wine-deeper text-cream/70 pt-16 pb-7">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-11 border-b border-gold-bright/15">
          <div>
            <div className="font-display text-cream text-[1.05rem] font-bold">
              {churchInfo.name}
            </div>
            <p className="text-[0.86rem] mt-3.5 max-w-[34ch] text-cream/60">
              An Oasis of Hope in Kiwanja, Kahawa West — seeking to make Christ known through
              worship, the Word, and service.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <span className="w-11 h-11 rounded-full bg-cream flex items-center justify-center shrink-0">
                <img
                  src="/pefa-logo.png"
                  alt="Pentecostal Evangelistic Fellowship of Africa logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </span>
              <span className="text-[0.72rem] leading-snug text-cream/55 max-w-[24ch]">
                A branch of the{" "}
                <span className="text-gold-bright/90">{churchInfo.denomination}</span>
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-sans text-[0.76rem] font-semibold tracking-[0.1em] uppercase text-gold-bright mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 font-sans text-[0.86rem]">
              <li><Link href="/about" className="hover:text-gold-bright">About Us</Link></li>
              <li><Link href="/leadership" className="hover:text-gold-bright">Leadership</Link></li>
              <li><Link href="/ministries" className="hover:text-gold-bright">Ministries</Link></li>
              <li><Link href="/sermons" className="hover:text-gold-bright">Sermons</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-[0.76rem] font-semibold tracking-[0.1em] uppercase text-gold-bright mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 font-sans text-[0.86rem]">
              <li><Link href="/events" className="hover:text-gold-bright">Events Calendar</Link></li>
              <li><Link href="/prayer" className="hover:text-gold-bright">Prayer Requests</Link></li>
              <li><Link href="/newsletter" className="hover:text-gold-bright">Newsletter</Link></li>
              <li><Link href="/contact" className="hover:text-gold-bright">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-[0.76rem] font-semibold tracking-[0.1em] uppercase text-gold-bright mb-4">
              Visit
            </h4>
            <ul className="space-y-2.5 font-sans text-[0.86rem]">
              <li>{churchInfo.address}</li>
              <li>{churchInfo.phone}</li>
              <li>{churchInfo.email}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-3 pt-6 font-sans text-[0.76rem]">
          <div>
            &copy; {new Date().getFullYear()} {churchInfo.name}. All rights reserved.
            <span className="text-cream/45">
              {" · "}Powered by{" "}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-bright underline underline-offset-2"
              >
                Calbytes Technologies Limited
              </a>
            </span>
          </div>
          <div className="flex gap-3.5">
            <a
              href={churchInfo.socials.facebook}
              aria-label="Facebook"
              className="w-[34px] h-[34px] rounded-full border border-gold-bright/30 flex items-center justify-center hover:bg-gold-bright/15"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#E3C077">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H17V3.6c-.28-.04-1.25-.1-2.37-.1-2.35 0-3.96 1.43-3.96 4.06V10H8v3.1h2.67V21h2.83z" />
              </svg>
            </a>
            <a
              href={churchInfo.socials.instagram}
              aria-label="Instagram"
              className="w-[34px] h-[34px] rounded-full border border-gold-bright/30 flex items-center justify-center hover:bg-gold-bright/15"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E3C077" strokeWidth="1.7">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>
            <a
              href={churchInfo.socials.youtube}
              aria-label="YouTube"
              className="w-[34px] h-[34px] rounded-full border border-gold-bright/30 flex items-center justify-center hover:bg-gold-bright/15"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#E3C077">
                <path d="M23 12s0-3.4-.4-5a3 3 0 00-2.1-2.1C18.9 4.5 12 4.5 12 4.5s-6.9 0-8.5.4A3 3 0 001.4 7 31 31 0 001 12s0 3.4.4 5a3 3 0 002.1 2.1c1.6.4 8.5.4 8.5.4s6.9 0 8.5-.4A3 3 0 0022.6 17c.4-1.6.4-5 .4-5zM9.8 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
