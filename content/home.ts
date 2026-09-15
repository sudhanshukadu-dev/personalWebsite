// All home page copy lives here. Source: portfolio-copy.md.

export const site = {
  name: "Sudhanshu Kadu",
  role: "Product Designer",
  // Logo used by the intro loader and the nav. Set in Unbounded Bold.
  logo: "SK",
  email: "sudhanshu.ux@gmail.com",
};

export const hero = {
  nameLine: "Designs. Codes. Ships",
  headline: "I design products people actually run their work on.",
  // Not shown in the hero; used as the page's meta description.
  subtext:
    "An expense platform live across 500+ enterprises. A tool built in two weeks that replaced my team's spreadsheet.",
  primaryCta: { label: "See the work", href: "#work" },
  secondaryCta: { label: "Say hello", href: "#contact" },
  // Record deck tucked into the headline after "I"; tapping it plays this track.
  track: { src: "/audio/headline-track.mp3", label: "Play music" },
  // Draggable stickers scattered over the hero; slot positions live in globals.css.
  stickers: [
    { src: "/images/stickers/brain.png" },
    { src: "/images/stickers/camera.png" },
    { src: "/images/stickers/keyboard.png" },
    { src: "/images/stickers/pencil.png" },
  ],
};

// Intro loader deck: Sudhanshu's own phone photos, back card first.
// The last one sits on top of the stack and is the first to drop.
export const introCards = [
  "/images/intro/trees-and-moon.jpg",
  "/images/intro/beach-waves.jpg",
  "/images/intro/hilltop-fog.jpg",
  "/images/intro/mirror-portrait.jpg",
  "/images/intro/beach-sunset.jpg",
];

// Bottom nav: main links, then the smaller groups under the divider.
// Rooted at "/" so they reach the home page sections from case study pages too.
export const navLinks = [
  { href: "/#top", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#photos", label: "Photos" },
  { href: "/#contact", label: "Say hello", cta: true },
];

export const navSecondary = [
  {
    label: "Socials",
    links: [
      { href: "https://www.linkedin.com/in/sudhanshu-kadu/", label: "LinkedIn" },
      { href: "https://www.instagram.com/sudhanshu.kadu/", label: "Instagram" },
    ],
  },
  {
    label: "Contact",
    links: [{ href: `mailto:${site.email}`, label: site.email }],
  },
];

export const about = {
  // Portrait chip; it replaces {photo} in the copy below. The sketch shows first,
  // and the real photo pixelates in on hover (tap on touch screens).
  photo: {
    sketch: "/images/about/me-sketch.png",
    src: "/images/about/me.jpg",
    alt: "Sudhanshu, as a sketch that turns into a photo",
  },
  paragraphs: [
    // [[...]] marks a highlighted phrase.
    "{photo} I'm Sudhanshu, a [[computer engineer turned product designer]]. The engineer never fully left the building. I take the stuff nobody wants to design, expense claims, insurance forms, the unglamorous middle of a business, and make it make sense. Built one system solo that's still running across [[500+ enterprise clients]] today, took a [[4 step workflow down to 1]], and taught a room full of students Figma. Now I chase the same kind of work wherever I can find it, even inside an agency that mostly does UI.",
    "When I'm not designing, I'm [[vibe coding and shipping small live products]] just to see an idea come alive, or out with my phone, chasing light.",
  ],
};

export const experience = {
  heading: "Where I've Been Building",
  roles: [
    {
      title: "Schbang",
      meta: "UI/UX Designer",
      summary: "Mostly UI work, but I go looking for product problems.",
      polaroid: {
        src: "/images/experience/schbang.jpg",
        alt: "A moment from Sudhanshu's time at Schbang",
        caption: "Schbang",
        width: 1040,
        height: 780,
        tilt: 3 as const,
      },
    },
    {
      title: "Quest2Travel by MakeMyTrip",
      meta: "Product Designer, 1.5 yrs",
      summary:
        "Solo designer on a corporate expense system used by 500+ enterprise clients, including Adani and Toyota. Employee of the Quarter, twice.",
      polaroid: {
        src: "/images/experience/employee-of-the-quarter.jpg",
        alt: "Sudhanshu receiving the Employee of the Quarter certificate at Quest2Travel",
        caption: "Employee of the Quarter",
        width: 3120,
        height: 4160,
        tilt: 1 as const,
      },
    },
    {
      title: "MET College",
      meta: "Guest Lecturer",
      summary: "Taught one Figma session, loved it.",
      polaroid: {
        src: "/images/experience/teaching-figma-met.jpg",
        alt: "Sudhanshu teaching a Figma session to a class at MET College",
        caption: "Teaching Figma at MET",
        width: 1280,
        height: 960,
        tilt: 2 as const,
      },
    },
    {
      title: "Google UX Design Certificate",
      meta: "Coursera",
      summary: "Made it official.",
      polaroid: {
        src: "/images/experience/google-ux-certificate.jpg",
        alt: "Sudhanshu's Google UX Design Certificate from Coursera",
        caption: "Google UX Design Certificate",
        width: 1650,
        height: 1275,
        tilt: 4 as const,
      },
    },
  ],
};

export const featuredWork = {
  linkLabel: "Read the case study",
  // TODO: real project images (about 4:5 portrait) and the case study pages behind href.
  projects: [
    {
      tag: "01",
      title: "Expense Management System",
      summary:
        "One designer. Four kinds of users. 500+ enterprise clients running on it, from Adani to Toyota. Took a 4-step process down to 1, built for a sub-30-second capture. Won Employee of the Quarter twice for it.",
      href: "/work/expense-management-system",
      image: {
        src: "https://picsum.photos/seed/sk-expense-system/1200/1560",
        alt: "Placeholder image for the Expense Management System project",
      },
    },
    {
      tag: "02",
      title: "Shriram Life Insurance",
      summary:
        "Built the design system from scratch, then the payment and verification flows people actually had to trust.",
      href: "/work/shriram-life-insurance",
      image: {
        src: "https://picsum.photos/seed/sk-shriram-life/1200/1560",
        alt: "Placeholder image for the Shriram Life Insurance project",
      },
    },
    {
      tag: "03",
      title: "Knode",
      summary:
        "Built solo in two weeks for my own team. It replaced our spreadsheet, and 12 people still use it every day.",
      href: "/work/knode",
      image: {
        src: "https://picsum.photos/seed/sk-knode/1200/1560",
        alt: "Placeholder image for the Knode project",
      },
    },
    {
      tag: "04",
      title: "Personal Expense Tracker",
      summary: "My money, my rules, no bank login required.",
      href: "/work/personal-expense-tracker",
      image: {
        src: "https://picsum.photos/seed/sk-expense-tracker/1200/1560",
        alt: "Placeholder image for the Personal Expense Tracker project",
      },
    },
  ],
};

// Collage slots, in order: 1, 3, 6, 7 are landscape (4:3), 4 is portrait (3:4), 2, 5, 8 are square.
export const beyondTheScreen = {
  heading: "Beyond the screen",
  line: "Phone in hand, not a fancy camera. A beach run, a gym day, a moment too good to skip.",
  photos: [
    {
      src: "/images/intro/beach-waves.jpg",
      alt: "Waves rolling onto a dark sand beach under a long bank of clouds",
      shape: "landscape" as const,
    },
    {
      src: "/images/intro/mirror-portrait.jpg",
      alt: "Mirror selfie behind a potted plant, against a colourful abstract painting",
      shape: "square" as const,
    },
    {
      src: "/images/intro/trees-and-moon.jpg",
      alt: "Wind-blown trees in golden light with the moon in a blue sky",
      shape: "landscape" as const,
    },
    {
      src: "/images/intro/hilltop-fog.jpg",
      alt: "Standing on a rock at a hilltop, looking over a forested valley in fog",
      shape: "portrait" as const,
    },
    {
      src: "/images/intro/beach-sunset.jpg",
      alt: "Sun setting over the sea, its reflection running across wet sand and footprints",
      shape: "square" as const,
    },
    // TODO: replace the three placeholders below with more of Sudhanshu's phone photos.
    {
      src: "https://picsum.photos/seed/sk-photo-slot-6/1600/1200",
      alt: "Placeholder photo",
      shape: "landscape" as const,
    },
    {
      src: "https://picsum.photos/seed/sk-photo-slot-7/1600/1200",
      alt: "Placeholder photo",
      shape: "landscape" as const,
    },
    {
      src: "https://picsum.photos/seed/sk-photo-slot-8/1200/1200",
      alt: "Placeholder photo",
      shape: "square" as const,
    },
  ],
};

export const contact = {
  question: "Designing something interesting? Building something weird?",
  cta: "Let's talk.",
  // Followed by site.email as a mailto link.
  emailPrompt: "Not a form person? Email me at",
  form: {
    fields: {
      name: { label: "Name", placeholder: "Your name", error: "Add your name" },
      email: { label: "Email address", placeholder: "you@company.com", error: "Check this email" },
      message: { label: "Message", placeholder: "Hi Sudhanshu, ", error: "Add a message" },
    },
    submit: "Send message",
    sending: "Sending...",
    success: "Message sent. I'll get back to you soon.",
    sendAnother: "Send another message",
    failure: "Something went wrong while sending. Try again, or email me instead.",
    tooQuick: "That was quick. Give it a few seconds and send again.",
  },
};

export const footer = {
  pagesLabel: "Pages",
  credit: "Designed and vibe coded by Sudhanshu.",
  backToTop: "Back to top",
};
