# Nahum Christian Church International — Website

A Next.js 14 (App Router) + TypeScript + Tailwind CSS implementation of the church
website, built from `Church_Website_Requirements_Specification.docx` and the
provided `homepage.html` design (colors, fonts, and the "arch" visual motif carry
through every page).

## Getting started

```bash
npm install
```

Then create your environment file (see [`.env.local.example`](.env.local.example)):

```bash
cp .env.local.example .env.local
```

Fill in `DATABASE_URL` (MongoDB Atlas or a local `mongod`), a `NEXTAUTH_SECRET`
(`openssl rand -base64 32`), and the `ADMIN_EMAIL` / `ADMIN_PASSWORD` used to
create your first admin login. Then seed the database and start the app:

```bash
npm run seed
npm run dev
```

Visit `http://localhost:3000` for the site, and `http://localhost:3000/admin`
for the admin portal (log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set).

To build for production:

```bash
npm run build
npm run start
```

## Backend & Admin Portal

- **Database**: MongoDB via Mongoose. Connection is a cached singleton in
  [`lib/mongodb.ts`](lib/mongodb.ts); schemas live in [`models/`](models).
- **Auth**: NextAuth (credentials provider) with JWT sessions
  ([`lib/auth.ts`](lib/auth.ts)). [`middleware.ts`](middleware.ts) protects every
  `/admin/*` route except the login page.
- **Seeding**: [`scripts/seed.ts`](scripts/seed.ts) (`npm run seed`) creates the
  admin user from your env vars and seeds Sermons, Events, and Blog posts from
  the sample content in [`lib/data.ts`](lib/data.ts).
- **Admin portal** (`/admin`): dashboard with content counts, full CRUD for
  Sermons / Events / Blog, and management views for the Prayer Request, Contact,
  Newsletter, and Event RSVP submissions.
- **Public pages read from MongoDB**: the Sermons, Events, and Blog list/detail
  pages (and the homepage highlights + search) now query the database, and the
  Prayer Request, Contact, Newsletter, and RSVP forms persist submissions via
  server actions. Static content (Leadership, Ministries, Pastor, About, Gallery,
  FAQs) still comes from `lib/data.ts`.
- **Images**: hero and page-header backgrounds, plus the landing-page marquee,
  use free Unsplash photos ([`lib/images.ts`](lib/images.ts)). The
  `images.unsplash.com` host is whitelisted in
  [`next.config.mjs`](next.config.mjs).

## What's implemented

Every section is built as a real Next.js route with static generation
(`generateStaticParams`) for detail pages, using sample content in `lib/data.ts`
that mirrors the shape a real CMS/database would return.

| Requirement (spec §2) | Route(s) |
|---|---|
| Home Page (hero, quick info, featured, stats, updates) | `/` |
| About the Church | `/about` |
| Pastor's Profile | `/pastor` |
| Leadership Team | `/leadership` |
| Ministries | `/ministries`, `/ministries/[slug]` |
| Sermons (search + filter) | `/sermons`, `/sermons/[slug]` |
| Events Calendar (+ RSVP form) | `/events`, `/events/[slug]` |
| Blog & News | `/blog`, `/blog/[slug]` |
| Prayer Requests | `/prayer` |
| Contact Page (+ map embed) | `/contact` |
| Photo Gallery (+ lightbox) | `/gallery` |
| Online Giving | `/give` |
| FAQs (accordion) | `/faq` |
| Newsletter signup | `/newsletter` |
| Global Search | `/search` |

## What's intentionally out of scope (and why)

The spec also calls for **Live Streaming**, **Member Login**, an **Admin
Dashboard**, real **Online Giving payment processing**, and persistent storage for
**Prayer Requests / Contact / Newsletter / RSVP** submissions. These all require
decisions only you can make — a database, an auth provider, and a payment
processor — so building them now would mean guessing at infrastructure you'd have
to rip out later. Instead:

- All forms (Prayer Request, Contact, RSVP, Give, Newsletter) are fully built,
  validated, and interactive on the frontend — they just resolve to a local
  "success" state instead of calling an API, so you can see and adjust the exact
  UX before wiring a backend.
- The data layer (`lib/data.ts`) is shaped so it's a drop-in replacement job:
  swap the exported arrays for `fetch()`/Prisma/CMS calls without touching any
  page or component.

### Suggested next steps
1. **Database + CMS**: Postgres + Prisma, or a headless CMS (Sanity/Contentful),
   for Sermons, Events, Blog, Ministries, Leadership, Testimonials.
2. **Auth**: NextAuth.js (or Clerk/Auth.js) for Member Login and the Admin
   Dashboard's role-based access.
3. **Payments**: Stripe, Paystack, or a mobile-money gateway (e.g. M-Pesa
   Daraja API) behind a Next.js Route Handler (`app/api/give/route.ts`).
4. **Live Streaming**: embed YouTube Live / Facebook Live / Zoom via iframe,
   the same pattern already used for sermon videos.
5. **Forms → email/DB**: wire each form's `onSubmit` to a Route Handler that
   saves to your database and/or sends email (e.g. Resend, SendGrid).
6. **Admin Dashboard**: a protected `/admin` route tree with CRUD screens for
   each content type, once the CMS/DB is in place.

## Project structure

```
app/                 Routes (App Router)
  layout.tsx          Root layout, fonts, Header/Footer
  page.tsx             Homepage
  about/, pastor/, leadership/, ministries/, sermons/,
  events/, blog/, prayer/, contact/, gallery/, give/,
  faq/, newsletter/, search/
components/          Reusable UI (Header, Footer, PageHero, form widgets, etc.)
lib/data.ts          Sample content — replace with real data source
tailwind.config.ts   Design tokens (wine/gold/cream/forest palette, fonts)
```

## Design system

Colors, typography (Fraunces, Source Serif 4, Inter), and the signature "arch"
shape from the original homepage are centralized in `tailwind.config.ts` and
`app/globals.css`, so any new page automatically matches the brand.
