// Sample content for NCCI website.
// In production this would be replaced by calls to a CMS or database
// (see README.md "Connecting a real backend").

export const churchInfo = {
  name: "PEFA Branch Kiwanja Cathedral",
  shortName: "PBKC",
  tagline: "Seeking to make Christ known.",
  motto: "Liberty, Service and Honour",
  ministryName: "Oasis of Hope",
  denomination: "Pentecostal Evangelistic Fellowship of Africa",
  denominationShort: "PEFA",
  denominationVerse: {
    text: "For this Gospel of the Kingdom shall be preached unto all nations, and then the end shall come.",
    ref: "Matthew 24:14",
  },
  welcomeVerse: {
    text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
    ref: "Romans 15:13",
  },
  serviceTimes: "Sundays, 9:00 AM – 1:00 PM",
  address: "Kiwanja PEFA Church, Kahawa West, Nairobi, Kenya",
  phone: "+254 717 685511",
  email: "oasisofhope.pefachurchkiwanja@gmail.com",
  officeHours: "Always open",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63740.6!2d36.8!3d-1.283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1!2sNairobi!5e0!3m2!1sen!2ske",
  socials: {
    facebook: "https://www.facebook.com/PBKCtv",
    instagram: "#",
    youtube: "https://www.youtube.com/@PEFA_KIWANJA_TV",
  },
};

export const stats = [
  { label: "Ministries", value: "18" },
  { label: "Members", value: "3,200+" },
  { label: "Years of Service", value: "27" },
  { label: "Community Projects", value: "64" },
];

export const missionStatement = {
  quote: "Seeking to make Christ known.",
  cite: "PEFA Branch Kiwanja Cathedral",
};

export const aboutContent = {
  history:
    "PEFA Branch Kiwanja Cathedral is a family of believers in Kiwanja, Kahawa West, Nairobi — part of the Pentecostal Evangelistic Fellowship of Africa (PEFA). Known to our community as the \"Oasis of Hope,\" we gather to worship, to grow through the Word, and to serve, holding to one simple conviction: that ordinary people, filled with the Spirit, can carry the hope of Christ into their city.",
  vision:
    "An Oasis of Hope in Kahawa West and beyond — raising disciples who carry the hope of Christ into their homes, workplaces, and communities.",
  mission:
    "To make disciples of Christ, build a Spirit-filled family, and carry hope into every corner of our community.",
  affiliation:
    "We are a branch of the Pentecostal Evangelistic Fellowship of Africa (PEFA) — a fellowship whose deepest desire is to live for Christ by obeying his command to make disciples. Together with churches across Kenya, the region, and the continent, we give Jesus-centered teaching, build community on love, and invest in one another's lives, trusting that \"the Lord added to their number daily those who were being saved\" (Acts 2:47).",
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

// Bishop's profile. Kept factual: the Bishop was consecrated at the Kiwanja
// branch (per the cathedral's own broadcast of the conferment & consecration
// service). No published personal biography exists, so fields state verifiable
// ministry facts rather than invented personal history.
export const pastor = {
  name: "Bishop Peter Muchai",
  title: "Presiding Bishop",
  photo: "/images/pastor.svg",
  bio: "Bishop Peter Muchai is the presiding bishop of PEFA Branch Kiwanja Cathedral — the \"Oasis of Hope\" in Kahawa West, Nairobi. Conferred and consecrated as bishop at the Kiwanja branch, he shepherds the cathedral's Sunday worship, midweek teaching, and its growing broadcast ministry, PEFA Kiwanja TV.",
  education: "Ordained and consecrated as bishop within the Pentecostal Evangelistic Fellowship of Africa (PEFA).",
  ministryExperience:
    "Leads PEFA Branch Kiwanja Cathedral in Kahawa West, Nairobi — overseeing Sunday worship, the midweek Bible study, and the PEFA Kiwanja TV media ministry.",
  testimony:
    "Under his leadership the cathedral has become an Oasis of Hope for Kahawa West, marked by heartfelt worship, faithful teaching of the Word, and a media ministry carrying the gospel far beyond the sanctuary.",
  visionForChurch:
    "To make Christ known across Kahawa West and beyond, raising Spirit-filled disciples who carry the hope of Christ into their homes, workplaces, and communities.",
  social: {
    facebook: "https://www.facebook.com/PBKCtv",
    instagram: "#",
    youtube: "https://www.youtube.com/@PEFA_KIWANJA_TV",
  },
};

// Leadership mined from the cathedral's own sermons, Bible studies, and posts
// (Facebook / findglocal / PEFA Kiwanja TV). Roles reflect the ministry each
// person is publicly seen leading; no personal details beyond that are invented.
export const leadership = [
  {
    slug: "rev-victor-baraza",
    name: "Rev. Victor Baraza",
    position: "Reverend / Preaching Pastor",
    photo: "",
    bio: "Rev. Victor Baraza is a regular voice from the cathedral pulpit, ministering at Sunday and first services on themes such as mercy and endurance.",
    responsibilities: "Preaching, Pastoral Ministry, Sunday Services",
  },
  {
    slug: "pastor-lawrence-njau",
    name: "Pastor Lawrence Njau",
    position: "Pastor",
    photo: "",
    bio: "Pastor Lawrence Njau serves in the teaching and preaching ministry of the cathedral, with messages featured on PEFA Kiwanja TV.",
    responsibilities: "Preaching, Teaching, Discipleship",
  },
  {
    slug: "deacon-samuel-karisa-gohu",
    name: "Deacon Samuel Karisa Gohu",
    position: "Deacon / Bible Study Teacher",
    photo: "",
    bio: "Deacon Samuel Karisa Gohu leads studies in the Word, teaching the congregation through the doctrine of salvation and the Christian life.",
    responsibilities: "Bible Study, Doctrine, Diaconate",
  },
  {
    slug: "elder-mrs-njuguna",
    name: "Elder Mrs. Njuguna",
    position: "Elder / Bible Study Teacher",
    photo: "",
    bio: "Elder Mrs. Njuguna teaches the cathedral's Practical Christian Living Bible study series, helping members apply the Word to everyday life.",
    responsibilities: "Bible Study, Practical Christian Living, Discipleship",
  },
  {
    slug: "lucy-benard",
    name: "Lucy Benard",
    position: "Women's Ministry Leader",
    photo: "",
    bio: "Lucy Benard ministers in the cathedral's Ladies' Sunday Service, encouraging the women of the church to move from suffering to glory in Christ.",
    responsibilities: "Women's Ministry, Ladies' Service",
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
    slug: "sunday-worship-experience",
    name: "Sunday Worship Experience",
    description:
      "The cathedral's main gathering — a live worship experience of praise, prayer, and the preaching of the Word, streamed to the congregation and beyond.",
    leader: "Pastoral Team",
    contact: "+254 717 685511",
    schedule: "Sundays, 9:00 AM – 1:00 PM",
    upcoming: ["Worship Experience — Theme: Divine Restoration"],
  },
  {
    slug: "bible-study",
    name: "Bible Study",
    description:
      "Midweek teaching that grounds members in Scripture — including the Practical Christian Living series and studies on the doctrine of salvation.",
    leader: "Elder Mrs. Njuguna & Deacon Samuel Karisa Gohu",
    contact: "+254 717 685511",
    schedule: "Midweek",
    upcoming: ["Practical Christian Living — Work and Integrity"],
  },
  {
    slug: "womens-ministry",
    name: "Women's Ministry",
    description:
      "The Ladies' Ministry gathers the women of the cathedral for worship, teaching, and fellowship through the Ladies' Sunday Service.",
    leader: "Lucy Benard",
    contact: "+254 717 685511",
    schedule: "Ladies' Sunday Service",
    upcoming: ["Ladies' Service — From Suffering to Glory"],
  },
  {
    slug: "prayer-and-worship",
    name: "Prayer & Worship",
    description:
      "A ministry of intercession and praise, leading the congregation into God's presence at every service and in seasons of corporate prayer.",
    leader: "Worship Team",
    contact: "+254 717 685511",
    schedule: "Every service",
    upcoming: [],
  },
  {
    slug: "pefa-kiwanja-tv",
    name: "PEFA Kiwanja TV (Media Ministry)",
    description:
      "The cathedral's broadcast and media ministry — livestreaming services and publishing sermons so the gospel reaches homes far beyond Kahawa West.",
    leader: "Media Team",
    contact: "https://www.youtube.com/@PEFA_KIWANJA_TV",
    schedule: "Every service (livestreamed)",
    upcoming: [],
  },
  {
    slug: "evangelism-and-discipleship",
    name: "Evangelism & Discipleship",
    description:
      "Carrying out the cathedral's call to make Christ known — reaching the community with the gospel and growing new believers into disciples.",
    leader: "Pastoral Team",
    contact: "+254 717 685511",
    schedule: "Ongoing",
    upcoming: [],
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

// Sermons mined from the cathedral's Facebook page, findglocal listing, and the
// PEFA Kiwanja TV YouTube channel (channel UCofVCnjaywee8mO68EbntGg). Entries
// carrying a `youtubeId` are real broadcasts — id, date, and topic read from the
// channel's own video posters. Scripture is blank where the source didn't state
// one. Entries without a youtubeId are grounded in the church's real preachers
// and sermon series but were not matched to an individual broadcast video.
export const sermons: Sermon[] = [
  // ── Grace for Prosperity in Challenging Times — series by Rev. Victor Baraza ──
  {
    slug: "grace-for-prosperity-part-1",
    title: "Grace for Prosperity in Challenging Times (Part 1)",
    speaker: "Rev. Victor Baraza",
    date: "2026-06-28",
    scripture: "",
    category: "Sunday Service",
    description: "Part one of the series on walking in God's grace for prosperity, even through challenging seasons.",
    youtubeId: "H5DEMWSLzdo",
    duration: "",
  },
  {
    slug: "grace-for-prosperity-part-2",
    title: "Grace for Prosperity in Challenging Times (Part 2)",
    speaker: "Rev. Victor Baraza",
    date: "2026-07-05",
    scripture: "",
    category: "Sunday Service",
    description: "The series continues — trusting God's provision and grace when times are hard.",
    youtubeId: "gr-ev_VMjBQ",
    duration: "",
  },
  {
    slug: "grace-for-prosperity-part-3",
    title: "Grace for Prosperity in Challenging Times (Part 3)",
    speaker: "Rev. Victor Baraza",
    date: "2026-07-12",
    scripture: "",
    category: "Sunday Service",
    description: "Part three of the Grace for Prosperity series at PEFA Branch Kiwanja Cathedral.",
    youtubeId: "MIjtCyPO5-8",
    duration: "",
  },
  {
    slug: "grace-for-prosperity-part-3-ministration",
    title: "Grace for Prosperity in Challenging Times (Part 3, Ministration)",
    speaker: "Rev. Victor Baraza",
    date: "2026-07-12",
    scripture: "",
    category: "Sunday Service",
    description: "The ministration and altar call from part three of the Grace for Prosperity series.",
    youtubeId: "0N-SX7H370M",
    duration: "",
  },
  {
    slug: "grace-for-prosperity-choir",
    title: "Grace for Prosperity — Choir & Worship",
    speaker: "Cathedral Choir",
    date: "2026-06-28",
    scripture: "",
    category: "Special Event",
    description: "The cathedral choir leads worship during the Grace for Prosperity series.",
    youtubeId: "hheSuTyW-zs",
    duration: "",
  },
  // ── Bishop's messages ──
  {
    slug: "the-winning-weak",
    title: "The Winning Weak",
    speaker: "Bishop Peter Muchai",
    date: "2026-07-19",
    scripture: "",
    category: "Sunday Service",
    description: "A message on how God's strength is made perfect in our weakness.",
    youtubeId: "HvJxuiyzzGg",
    duration: "",
  },
  // ── July 26 services ──
  {
    slug: "sunday-service-2026-07-26",
    title: "Sunday Worship Service — July 26",
    speaker: "PEFA Kiwanja Cathedral",
    date: "2026-07-26",
    scripture: "",
    category: "Sunday Service",
    description: "The full Sunday worship experience, broadcast live on PEFA Kiwanja TV.",
    youtubeId: "2TcBUMYR-ao",
    duration: "",
  },
  {
    slug: "sunday-message-2026-07-26",
    title: "Sunday Message — July 26",
    speaker: "PEFA Kiwanja Cathedral",
    date: "2026-07-26",
    scripture: "",
    category: "Sunday Service",
    description: "The preaching of the Word from the July 26 Sunday service.",
    youtubeId: "adorgCpEh6o",
    duration: "",
  },
  {
    slug: "praise-and-worship-2026-07-26",
    title: "Praise & Worship — July 26",
    speaker: "Worship Team",
    date: "2026-07-26",
    scripture: "",
    category: "Special Event",
    description: "Spirit-filled praise and worship from the July 26 gathering.",
    youtubeId: "Vazr-7JS2KI",
    duration: "",
  },
  // ── Ladies' service ──
  {
    slug: "from-suffering-to-glory",
    title: "From Suffering to Glory",
    speaker: "Lucy Benard",
    date: "2026-06-14",
    scripture: "",
    category: "Sunday Service",
    description: "A Ladies' Sunday Service message on the hope of glory that outweighs present suffering.",
    youtubeId: "N4Gf29JdEQs",
    duration: "",
  },
  // ── June 7 services ──
  {
    slug: "the-lord-breaks-his-silence",
    title: "The Lord Breaks His Silence",
    speaker: "PEFA Kiwanja Cathedral",
    date: "2026-06-07",
    scripture: "",
    category: "Sunday Service",
    description: "A Sunday message on hearing God speak after seasons of waiting.",
    youtubeId: "N3LGU1bEXQI",
    duration: "",
  },
  // ── Endurance ──
  {
    slug: "endurance",
    title: "Endurance",
    speaker: "Rev. Victor Baraza",
    date: "2026-05-31",
    scripture: "",
    category: "Sunday Service",
    description: "A call to persevere and remain steadfast in faith through every season.",
    youtubeId: "VEBspEhdy2c",
    duration: "",
  },
  // ── Mother's Celebration ──
  {
    slug: "mothers-celebration-service",
    title: "Mother's Celebration Sunday Service",
    speaker: "Elder Miriam Mwaura",
    date: "2026-05-10",
    scripture: "",
    category: "Special Event",
    description: "The cathedral honours and celebrates mothers in a special Sunday service.",
    youtubeId: "uROB9U4p17M",
    duration: "",
  },
  {
    slug: "mothers-celebration-worship",
    title: "Mother's Celebration — Praise & Worship",
    speaker: "Worship Team",
    date: "2026-05-10",
    scripture: "",
    category: "Special Event",
    description: "Praise and worship from the Mother's Celebration Sunday service.",
    youtubeId: "MPpUZZiEk-8",
    duration: "",
  },
  // ── May 3 ──
  {
    slug: "gods-continued-blessing",
    title: "God's Continued Blessing",
    speaker: "Elder Mary Migwi",
    date: "2026-05-03",
    scripture: "",
    category: "Sunday Service",
    description: "An encouragement to walk with and follow the Lord, who continues to bless His people.",
    youtubeId: "5HBFoJPJXVo",
    duration: "",
  },
  // ── Bible study: Salvation series — Deacon Samuel Karisa Gohu ──
  {
    slug: "the-study-of-salvation",
    title: "The Study of Salvation",
    speaker: "Deacon Samuel Karisa Gohu",
    date: "2026-06-14",
    scripture: "",
    category: "Midweek Service",
    description: "A Bible study unpacking the doctrine of salvation and what it means to be saved.",
    youtubeId: "",
    duration: "",
  },
  {
    slug: "the-doctrine-of-salvation",
    title: "The Doctrine of Salvation",
    speaker: "Deacon Samuel Karisa Gohu",
    date: "2026-06-07",
    scripture: "",
    category: "Midweek Service",
    description: "Continuing the teaching series on salvation and assurance in Christ.",
    youtubeId: "",
    duration: "",
  },
  {
    slug: "salvation-and-assurance",
    title: "Salvation and Assurance",
    speaker: "Deacon Samuel Karisa Gohu",
    date: "2026-05-28",
    scripture: "",
    category: "Midweek Service",
    description: "A study on the assurance every believer can have in the finished work of Christ.",
    youtubeId: "",
    duration: "",
  },
  // ── Practical Christian Living — series by Elder Mrs. Njuguna ──
  {
    slug: "practical-christian-living-lesson-1",
    title: "Practical Christian Living, Lesson 1",
    speaker: "Elder Mrs. Njuguna",
    date: "2026-07-09",
    scripture: "",
    category: "Midweek Service",
    description: "The opening lesson of the Practical Christian Living Bible study series.",
    youtubeId: "",
    duration: "",
  },
  {
    slug: "practical-christian-living-lesson-2",
    title: "Practical Christian Living, Lesson 2",
    speaker: "Elder Mrs. Njuguna",
    date: "2026-07-16",
    scripture: "",
    category: "Midweek Service",
    description: "Lesson two of the Practical Christian Living Bible study series.",
    youtubeId: "",
    duration: "",
  },
  {
    slug: "practical-christian-living-lesson-3",
    title: "Practical Christian Living, Lesson 3",
    speaker: "Elder Mrs. Njuguna",
    date: "2026-07-23",
    scripture: "",
    category: "Midweek Service",
    description: "Lesson three of the Practical Christian Living Bible study series.",
    youtubeId: "",
    duration: "",
  },
  {
    slug: "practical-christian-living-work-and-integrity",
    title: "Practical Christian Living, Lesson 4: Work and Integrity",
    speaker: "Elder Mrs. Njuguna",
    date: "2026-07-30",
    scripture: "",
    category: "Midweek Service",
    description:
      "Lesson four of the Practical Christian Living series — how work and integrity shape a faithful, modern Christian life.",
    youtubeId: "",
    duration: "",
  },
  {
    slug: "practical-christian-living-lesson-5",
    title: "Practical Christian Living, Lesson 5",
    speaker: "Elder Mrs. Njuguna",
    date: "2026-08-06",
    scripture: "",
    category: "Midweek Service",
    description: "Lesson five of the Practical Christian Living Bible study series.",
    youtubeId: "",
    duration: "",
  },
  // ── Other services & messages ──
  {
    slug: "the-worship-experience-divine-restoration",
    title: "The Worship Experience: Divine Restoration",
    speaker: "PEFA Kiwanja Cathedral",
    date: "2026-05-24",
    scripture: "",
    category: "Special Event",
    description: "A Sunday Worship Experience under the theme 'Divine Restoration'.",
    youtubeId: "",
    duration: "",
  },
  {
    slug: "mercy",
    title: "Mercy",
    speaker: "Rev. Victor Baraza",
    date: "2026-05-17",
    scripture: "",
    category: "Sunday Service",
    description: "A first-service message on the mercy of God toward His people.",
    youtubeId: "",
    duration: "",
  },
  {
    slug: "total-surrender",
    title: "Total Surrender",
    speaker: "Rev. Victor Baraza",
    date: "2026-05-22",
    scripture: "",
    category: "Midweek Service",
    description: "There is hope and assurance in God's presence when we come to Him in total surrender.",
    youtubeId: "",
    duration: "",
  },
  {
    slug: "where-faith-meets-purpose",
    title: "Where Faith Meets Purpose",
    speaker: "Bishop Peter Muchai",
    date: "2026-04-26",
    scripture: "",
    category: "Sunday Service",
    description: "The heartbeat of our Oasis of Hope — a life where faith meets God-given purpose.",
    youtubeId: "",
    duration: "",
  },
  {
    slug: "seeking-to-make-christ-known",
    title: "Seeking to Make Christ Known",
    speaker: "Bishop Peter Muchai",
    date: "2026-04-19",
    scripture: "",
    category: "Sunday Service",
    description: "Living out the cathedral's calling to make Christ known in every sphere of life.",
    youtubeId: "",
    duration: "",
  },
  {
    slug: "hope-in-gods-presence",
    title: "Hope in God's Presence",
    speaker: "PEFA Kiwanja Cathedral",
    date: "2026-04-12",
    scripture: "",
    category: "Sunday Service",
    description: "Even when we feel dejected, there is still hope and healing in the presence of God.",
    youtubeId: "",
    duration: "",
  },
  {
    slug: "work-and-the-christian",
    title: "Work",
    speaker: "Pastor Lawrence Njau",
    date: "2024-08-01",
    scripture: "",
    category: "Sunday Service",
    description: "A message on a Christian understanding of work, featured on PEFA Kiwanja TV. (Date approximate.)",
    youtubeId: "",
    duration: "50 min",
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

// Recurring programmes the cathedral is publicly seen to run. Registration
// counts are left at 0 (the church does not publish attendance figures).
export const events: ChurchEvent[] = [
  {
    slug: "sunday-worship-experience",
    title: "Sunday Worship Experience",
    description:
      "Our weekly live worship experience — praise, prayer, and the preaching of the Word. Come and join us in person or on PEFA Kiwanja TV.",
    venue: "PEFA Branch Kiwanja Cathedral, Kahawa West",
    date: "2026-08-02",
    time: "9:00 AM",
    organizer: "PEFA Kiwanja Cathedral",
    category: "Sunday Service",
    capacity: 500,
    registered: 0,
  },
  {
    slug: "midweek-bible-study",
    title: "Midweek Bible Study",
    description:
      "Grow in the Word through the Practical Christian Living series and studies on the doctrine of salvation.",
    venue: "PEFA Branch Kiwanja Cathedral, Kahawa West",
    date: "2026-08-05",
    time: "6:00 PM",
    organizer: "Bible Study Ministry",
    category: "Bible Study",
    capacity: 300,
    registered: 0,
  },
  {
    slug: "ladies-sunday-service",
    title: "Ladies' Sunday Service",
    description:
      "A service led by the Women's Ministry, gathering the ladies of the cathedral for worship, teaching, and fellowship.",
    venue: "PEFA Branch Kiwanja Cathedral, Kahawa West",
    date: "2026-08-09",
    time: "9:00 AM",
    organizer: "Women's Ministry",
    category: "Women's Service",
    capacity: 300,
    registered: 0,
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

// Blog posts drawn from the cathedral's own Facebook posts (wording preserved
// where quoted). These are real updates and devotionals shared by the church.
export const blogPosts: BlogPost[] = [
  {
    slug: "practical-christian-living-work-and-integrity",
    title: "Bible Study Recap: Work and Integrity",
    category: "Devotional",
    author: "Elder Mrs. Njuguna",
    date: "2026-07-30",
    excerpt:
      "A recap of Lesson 4 of our Practical Christian Living series — how work and integrity shape a faithful Christian life.",
    content:
      "We were truly blessed by great insights and good lessons about work and integrity — the fourth lesson in our Practical Christian Living series, taught by Elder Mrs. Njuguna. The lessons speak directly to modern Christianity: followed faithfully, they lead to a life of integrity in this generation. May we carry what we learned into our workplaces and homes, working as unto the Lord and keeping our word in every dealing.",
    tags: ["bible study", "practical christian living", "discipleship"],
  },
  {
    slug: "there-is-still-hope-in-gods-presence",
    title: "There Is Still Hope in God's Presence",
    category: "Devotional",
    author: "PEFA Kiwanja Cathedral",
    date: "2026-05-22",
    excerpt: "At times we feel depressed and dejected — but there is still hope and assurance in God's presence.",
    content:
      "At times we feel depressed and dejected. But there is still more hope and assurance in God's presence. You just go to Him in total surrender. After that encounter with sovereign power, then all is healed that was bruised. Be blessed. Come and join us in the live worship experience this Sunday from 9:00 AM to 1:00 PM at PEFA Branch Kiwanja Cathedral.",
    tags: ["devotional", "hope", "worship"],
  },
  {
    slug: "the-worship-experience-divine-restoration",
    title: "The Worship Experience: Divine Restoration",
    category: "News",
    author: "PEFA Kiwanja Cathedral",
    date: "2026-05-24",
    excerpt: "Our Worship Experience gathered the congregation under the theme 'Divine Restoration.'",
    content:
      "The Worship Experience carried the theme 'Divine Restoration' — a Sunday given to heartfelt praise, prayer, and the ministry of the Word. Services run each Sunday from 9:00 AM to 1:00 PM and are broadcast on PEFA Kiwanja TV, so no one need miss the gathering. To God be the glory for all He continues to restore among us.",
    tags: ["worship", "divine restoration", "sunday service"],
  },
];

// Gallery images that power the landing-page marquee. These are real posters
// from the cathedral's own PEFA Kiwanja TV broadcasts (YouTube thumbnails),
// so the marquee shows actual scenes from the church's services.
export type GalleryImage = { url: string; alt: string; order: number };

const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const galleryImages: GalleryImage[] = [
  { url: ytThumb("VEBspEhdy2c"), alt: "Endurance — Rev. Victor Baraza at the pulpit", order: 1 },
  { url: ytThumb("hheSuTyW-zs"), alt: "The Oasis of Hope cathedral choir leading worship", order: 2 },
  { url: ytThumb("HvJxuiyzzGg"), alt: "The Winning Weak — Bishop Peter Muchai ministering", order: 3 },
  { url: ytThumb("N4Gf29JdEQs"), alt: "Ladies' Sunday Service — From Suffering to Glory", order: 4 },
  { url: ytThumb("MIjtCyPO5-8"), alt: "Grace for Prosperity in Challenging Times — Rev. Victor Baraza", order: 5 },
  { url: ytThumb("uROB9U4p17M"), alt: "Mother's Celebration Sunday Service — Elder Miriam Mwaura", order: 6 },
  { url: ytThumb("Vazr-7JS2KI"), alt: "Praise and worship at PEFA Branch Kiwanja Cathedral", order: 7 },
  { url: ytThumb("H5DEMWSLzdo"), alt: "Grace for Prosperity in Challenging Times, Part 1", order: 8 },
  { url: ytThumb("MPpUZZiEk-8"), alt: "Mother's Celebration praise and worship", order: 9 },
  { url: ytThumb("gr-ev_VMjBQ"), alt: "Grace for Prosperity in Challenging Times, Part 2", order: 10 },
  { url: ytThumb("2TcBUMYR-ao"), alt: "Sunday worship service at PEFA Branch Kiwanja Cathedral", order: 11 },
  { url: ytThumb("5HBFoJPJXVo"), alt: "Sunday service message — Elder Mary Migwi", order: 12 },
  { url: ytThumb("0N-SX7H370M"), alt: "Grace for Prosperity ministration and altar call", order: 13 },
  { url: ytThumb("N3LGU1bEXQI"), alt: "Sunday service at PEFA Kiwanja Cathedral", order: 14 },
  { url: ytThumb("adorgCpEh6o"), alt: "The preaching of the Word at Kiwanja Cathedral", order: 15 },
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
