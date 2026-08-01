// Sample content for NCCI website.
// In production this would be replaced by calls to a CMS or database
// (see README.md "Connecting a real backend").

export const churchInfo = {
  name: "Nahum Christian Church International",
  shortName: "NCCI",
  serviceTimes: "Sun 8:00 & 10:30 AM",
  address: "14 Cathedral Road, Nairobi",
  phone: "+254 700 123 456",
  email: "hello@ncci.church",
  officeHours: "Mon–Fri, 9:00 AM – 5:00 PM",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63740.6!2d36.8!3d-1.283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1!2sNairobi!5e0!3m2!1sen!2ske",
  socials: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
};

export const stats = [
  { label: "Ministries", value: "18" },
  { label: "Members", value: "3,200+" },
  { label: "Years of Service", value: "27" },
  { label: "Community Projects", value: "64" },
];

export const missionStatement = {
  quote:
    "To make disciples of Christ, build a Spirit-filled family, and carry hope into every corner of our community.",
  cite: "NCCI Mission Statement",
};

export const aboutContent = {
  history:
    "Founded in 1999 by a small group of families meeting in a living room, Nahum Christian Church International has grown into a citywide congregation of thousands, while holding onto the same conviction that brought it to life: that ordinary people, filled with the Spirit, can carry extraordinary hope into their city.",
  vision:
    "A Spirit-filled church in every neighborhood, raising disciples who carry the hope of Christ into their homes, workplaces, and communities.",
  mission:
    "To make disciples of Christ, build a Spirit-filled family, and carry hope into every corner of our community.",
  coreValues: [
    { title: "Worship", description: "We exist first to glorify God, in spirit and in truth." },
    { title: "Family", description: "We do life together — no one grows in isolation." },
    { title: "Word", description: "Scripture shapes what we believe and how we live." },
    { title: "Service", description: "We serve our city as an expression of Christ's love." },
    { title: "Generosity", description: "We give freely, as we have freely received." },
  ],
  statementOfFaith: [
    "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.",
    "We believe the Bible is the inspired, authoritative Word of God.",
    "We believe in salvation by grace through faith in Jesus Christ.",
    "We believe in the present ministry of the Holy Spirit.",
    "We believe in the Church as the body of Christ, called to worship and mission.",
  ],
  serviceSchedule: [
    { day: "Sunday", time: "8:00 AM", label: "First Service" },
    { day: "Sunday", time: "10:30 AM", label: "Second Service" },
    { day: "Wednesday", time: "6:00 PM", label: "Midweek Bible Study" },
    { day: "Friday", time: "6:30 PM", label: "Prayer Meeting" },
  ],
};

export const pastor = {
  name: "Pastor James Odhiambo",
  title: "Senior Pastor",
  photo: "/images/pastor.svg",
  bio: "Pastor James has led NCCI for over 20 years, shepherding the church from a home fellowship into a citywide congregation devoted to worship, discipleship, and community transformation.",
  education: "M.Div, Nairobi Theological Seminary",
  ministryExperience: "27 years in pastoral ministry, church planting, and community development.",
  testimony:
    "Pastor James came to faith as a university student after a season of searching, and has devoted his life since to helping others find the same hope he found.",
  visionForChurch:
    "To see a Spirit-filled family in every corner of the city, marked by generous love and unwavering hope.",
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
};

export const leadership = [
  {
    slug: "assistant-pastor-grace",
    name: "Pastor Grace Wanjiru",
    position: "Assistant Pastor",
    photo: "/images/leader-1.svg",
    bio: "Pastor Grace oversees pastoral care and discipleship, walking alongside members through every season of life.",
    responsibilities: "Pastoral Care, Discipleship, Counseling",
  },
  {
    slug: "elder-samuel",
    name: "Elder Samuel Kiptoo",
    position: "Elder",
    photo: "/images/leader-2.svg",
    bio: "Elder Samuel has served on the leadership board for 15 years, providing governance and spiritual oversight.",
    responsibilities: "Governance, Spiritual Oversight",
  },
  {
    slug: "deacon-esther",
    name: "Deacon Esther Njoki",
    position: "Deacon",
    photo: "/images/leader-3.svg",
    bio: "Deacon Esther leads the church's benevolence ministry, coordinating care for members in need.",
    responsibilities: "Benevolence, Member Care",
  },
  {
    slug: "worship-leader-daniel",
    name: "Daniel Mwangi",
    position: "Worship Ministry Leader",
    photo: "/images/leader-4.svg",
    bio: "Daniel leads the praise and worship team, cultivating a culture of heartfelt worship across all services.",
    responsibilities: "Worship, Choir, Media",
  },
  {
    slug: "admin-lead-faith",
    name: "Faith Achieng",
    position: "Administrative Lead",
    photo: "/images/leader-5.svg",
    bio: "Faith manages the day-to-day operations of the church office and coordinates volunteer teams.",
    responsibilities: "Operations, Volunteer Coordination",
  },
];

export type Ministry = {
  slug: string;
  name: string;
  description: string;
  leader: string;
  contact: string;
  schedule: string;
  upcoming: string[];
};

export const ministries: Ministry[] = [
  {
    slug: "childrens-ministry",
    name: "Children's Ministry",
    description:
      "A safe, joyful space where kids from nursery through grade 6 learn the Bible through story, song, and play.",
    leader: "Pastor Grace Wanjiru",
    contact: "children@ncci.church",
    schedule: "Sundays, 8:00 & 10:30 AM (during service)",
    upcoming: ["Vacation Bible School — Aug 2026", "Kids Christmas Pageant Rehearsals"],
  },
  {
    slug: "youth-ministry",
    name: "Youth Ministry",
    description:
      "For teens navigating faith, identity, and friendship — weekly gatherings full of worship, teaching, and games.",
    leader: "Brian Otieno",
    contact: "youth@ncci.church",
    schedule: "Fridays, 5:00 PM",
    upcoming: ["Youth Camp — Sept 2026", "Friday Night Bonfire"],
  },
  {
    slug: "womens-ministry",
    name: "Women's Ministry",
    description:
      "Building a sisterhood of women growing together in faith, friendship, and purpose.",
    leader: "Mary Kamau",
    contact: "women@ncci.church",
    schedule: "2nd Saturday of the month, 9:00 AM",
    upcoming: ["Women's Brunch & Bible Study"],
  },
  {
    slug: "mens-ministry",
    name: "Men's Ministry",
    description:
      "A brotherhood committed to becoming godly leaders at home, at work, and in the church.",
    leader: "Peter Kimani",
    contact: "men@ncci.church",
    schedule: "3rd Saturday of the month, 7:00 AM",
    upcoming: ["Men's Breakfast & Fellowship"],
  },
  {
    slug: "praise-and-worship",
    name: "Praise & Worship",
    description: "Leading the congregation into heartfelt worship through music every service.",
    leader: "Daniel Mwangi",
    contact: "worship@ncci.church",
    schedule: "Rehearsals Saturdays, 4:00 PM",
    upcoming: ["Worship Night — Last Friday of the month"],
  },
  {
    slug: "evangelism",
    name: "Evangelism",
    description: "Carrying the gospel into neighborhoods, schools, and marketplaces around the city.",
    leader: "John Mutua",
    contact: "outreach@ncci.church",
    schedule: "Saturdays, 9:00 AM",
    upcoming: ["Street Evangelism — City Center"],
  },
  {
    slug: "choir",
    name: "Choir",
    description: "A ministry of voices leading the church in traditional and contemporary hymns.",
    leader: "Ruth Achieng",
    contact: "choir@ncci.church",
    schedule: "Rehearsals Thursdays, 6:00 PM",
    upcoming: ["Christmas Cantata Rehearsals"],
  },
  {
    slug: "media",
    name: "Media Ministry",
    description: "Serving behind the scenes with sound, lighting, livestream, and photography.",
    leader: "Daniel Mwangi",
    contact: "media@ncci.church",
    schedule: "Every service",
    upcoming: [],
  },
  {
    slug: "ushering",
    name: "Ushering",
    description: "Welcoming every guest with warmth and helping services run smoothly.",
    leader: "Faith Achieng",
    contact: "ushering@ncci.church",
    schedule: "Every service",
    upcoming: [],
  },
  {
    slug: "prayer",
    name: "Prayer Ministry",
    description: "Interceding for the church, the city, and the nations.",
    leader: "Elder Samuel Kiptoo",
    contact: "prayer@ncci.church",
    schedule: "Fridays, 6:30 PM",
    upcoming: ["All-Night Prayer — First Friday"],
  },
];

export type Sermon = {
  slug: string;
  title: string;
  speaker: string;
  date: string;
  scripture: string;
  category: "Sunday Service" | "Midweek Service" | "Conference" | "Special Event";
  description: string;
  youtubeId: string;
  duration: string;
};

export const sermons: Sermon[] = [
  {
    slug: "rebuilding-after-the-storm",
    title: "Rebuilding After the Storm",
    speaker: "Pastor James Odhiambo",
    date: "2026-07-26",
    scripture: "Nehemiah 2:17–18",
    category: "Sunday Service",
    description:
      "A message on resilience, faith, and what it takes to rebuild what has been broken.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "42 min",
  },
  {
    slug: "a-stronghold-in-trouble",
    title: "A Stronghold in the Day of Trouble",
    speaker: "Pastor James Odhiambo",
    date: "2026-07-19",
    scripture: "Nahum 1:7",
    category: "Sunday Service",
    description: "Exploring God's faithfulness in seasons of difficulty.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "38 min",
  },
  {
    slug: "the-posture-of-prayer",
    title: "The Posture of Prayer",
    speaker: "Elder Samuel Kiptoo",
    date: "2026-07-16",
    scripture: "Luke 18:1–8",
    category: "Midweek Service",
    description: "A teaching on persistence and humility in prayer.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "31 min",
  },
  {
    slug: "generous-hearts",
    title: "Generous Hearts",
    speaker: "Pastor Grace Wanjiru",
    date: "2026-07-12",
    scripture: "2 Corinthians 9:6–8",
    category: "Sunday Service",
    description: "On the joy and freedom found in generous living.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "40 min",
  },
  {
    slug: "fire-and-fellowship",
    title: "Fire and Fellowship",
    speaker: "Pastor James Odhiambo",
    date: "2026-06-28",
    scripture: "Acts 2:42–47",
    category: "Conference",
    description: "A message from our Annual Leaders' Conference on Spirit-filled community.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "55 min",
  },
];

export type ChurchEvent = {
  slug: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  time: string;
  organizer: string;
  category: string;
  capacity: number;
  registered: number;
};

export const events: ChurchEvent[] = [
  {
    slug: "youth-camp-2026",
    title: "Youth Camp 2026",
    description: "Three days of worship, teaching, and adventure for teens.",
    venue: "Naivasha Retreat Center",
    date: "2026-09-04",
    time: "9:00 AM",
    organizer: "Youth Ministry",
    category: "Youth Camp",
    capacity: 150,
    registered: 96,
  },
  {
    slug: "sunday-communion",
    title: "Sunday Communion",
    description: "A special communion service, open to all members and visitors.",
    venue: "Main Sanctuary",
    date: "2026-08-03",
    time: "10:30 AM",
    organizer: "Pastoral Team",
    category: "Prayer Meeting",
    capacity: 800,
    registered: 0,
  },
  {
    slug: "annual-thanksgiving-service",
    title: "Annual Thanksgiving Service",
    description: "A citywide gathering of gratitude, worship, and celebration.",
    venue: "NCCI Main Auditorium",
    date: "2026-11-22",
    time: "9:00 AM",
    organizer: "Church Leadership",
    category: "Conference",
    capacity: 2000,
    registered: 430,
  },
  {
    slug: "community-outreach-day",
    title: "Community Outreach Day",
    description: "Serving neighboring communities through food drives and free medical camps.",
    venue: "Kibera Community Grounds",
    date: "2026-08-22",
    time: "8:00 AM",
    organizer: "Evangelism Ministry",
    category: "Community Outreach",
    capacity: 300,
    registered: 140,
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  category: "News" | "Devotional" | "Testimony" | "Mission Update" | "Pastor's Message";
  author: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "building-fund-reaches-70-percent",
    title: "Building Fund Reaches 70% of Goal",
    category: "News",
    author: "Church Office",
    date: "2026-07-24",
    excerpt:
      "Thanks to your generosity, the new Fellowship Hall is closer than ever. Here's what's next for our building project.",
    content:
      "Thanks to your generosity, the new Fellowship Hall is closer than ever. Over the past year, members and friends of NCCI have given faithfully toward this vision, and we are thrilled to announce that we've reached 70% of our goal. Construction on the foundation begins next month, with completion expected by mid-2027. Thank you for partnering with us in this journey.",
    tags: ["building fund", "announcement"],
  },
  {
    slug: "five-ways-to-pray-for-your-city",
    title: "Five Ways to Pray for Your City",
    category: "Devotional",
    author: "Pastor Grace Wanjiru",
    date: "2026-07-18",
    excerpt: "Practical, Scripture-rooted ways to intercede for the place God has planted you.",
    content:
      "Praying for our city is one of the most tangible ways we can love our neighbors. Here are five simple starting points: pray for civic leaders, pray for peace in every neighborhood, pray for the vulnerable, pray for the Church to be light, and pray with your feet — let intercession lead you into action.",
    tags: ["prayer", "community"],
  },
  {
    slug: "photos-from-the-youth-retreat",
    title: "Photos from the Youth Retreat",
    category: "News",
    author: "Youth Ministry",
    date: "2026-07-12",
    excerpt: "A weekend of worship, laughter, and deep conversations under the stars.",
    content:
      "Our teens spent the weekend at Lake Naivasha for our annual youth retreat. From late-night worship sessions to daytime games, it was a weekend marked by real breakthroughs and new friendships. Browse the gallery for a glimpse into the weekend.",
    tags: ["youth", "gallery"],
  },
];

export const faqs = [
  {
    category: "Service Times",
    question: "What time are your Sunday services?",
    answer: "We hold two services every Sunday: 8:00 AM and 10:30 AM, both in the Main Sanctuary.",
  },
  {
    category: "Membership",
    question: "How do I become a member?",
    answer:
      "We invite you to attend our New Members' Class, held on the first Saturday of every month. Sign up at the Welcome Desk or through the Contact page.",
  },
  {
    category: "Baptism",
    question: "When are baptisms held?",
    answer: "Baptisms are held quarterly. Speak with a pastor after any service to be added to the next class.",
  },
  {
    category: "Giving",
    question: "What giving options are available?",
    answer: "You can give via mobile money, bank transfer, card, or PayPal through our secure Give Online page.",
  },
  {
    category: "Children's Ministry",
    question: "Is there a program for young children during service?",
    answer: "Yes — our Children's Ministry runs during both Sunday services for nursery through grade 6.",
  },
  {
    category: "Volunteer Opportunities",
    question: "How can I get involved?",
    answer: "Visit any Ministry page to find contact details, or reach out through the Contact page and we'll connect you with a team.",
  },
];

export const galleryAlbums = [
  { slug: "sunday-services", title: "Sunday Services", count: 42 },
  { slug: "conferences", title: "Conferences", count: 28 },
  { slug: "weddings", title: "Weddings", count: 16 },
  { slug: "baptisms", title: "Baptisms", count: 12 },
  { slug: "youth-events", title: "Youth Events", count: 35 },
  { slug: "community-outreach", title: "Community Outreach", count: 21 },
];

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
