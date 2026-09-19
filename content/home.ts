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
  // TODO: add Sudhanshu's resume at public/resume.pdf; until then this link opens a "Page not found".
  { href: "/resume.pdf", label: "Resume", newTab: true },
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
      summary: "Taught 4 to 5 Figma sessions as a one time guest lecturer, loved it.",
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
  linkLabel: "Open project",
  // TODO: real project images (about 4:5 portrait) and the case study pages behind href
  // (only the Expense Management System page exists so far).
  // `color` is the project's theme; it tints the CTA's hover circle.
  projects: [
    {
      tag: "01",
      title: "Expense Management System",
      summary: "A corporate expense platform built solo, end to end.",
      chips: [
        "Solo designer",
        "500+ enterprise clients",
        "4 steps to 1",
        "Shipped production Recharts code",
        "Employee of the Quarter × 2",
      ],
      color: "blue" as const,
      href: "/work/expense-management-system",
      image: {
        src: "https://picsum.photos/seed/sk-expense-system/1200/1560",
        alt: "Placeholder image for the Expense Management System project",
      },
    },
    {
      tag: "02",
      title: "Shriram Life Insurance",
      summary: "Payment and verification flows people had to trust.",
      chips: ["Design system from scratch", "Payment & KYC flows", "Client work"],
      color: "yellow" as const,
      href: "/work/shriram-life-insurance",
      image: {
        src: "https://picsum.photos/seed/sk-shriram-life/1200/1560",
        alt: "Placeholder image for the Shriram Life Insurance project",
      },
    },
    {
      tag: "03",
      title: "Knode",
      summary: "A team availability tool I built for my own team.",
      chips: ["Built in 2 weeks", "Live, 12 daily users", "Solo build"],
      color: "purple" as const,
      href: "/work/knode",
      image: {
        src: "https://picsum.photos/seed/sk-knode/1200/1560",
        alt: "Placeholder image for the Knode project",
      },
    },
    {
      tag: "04",
      title: "Networth",
      summary: "My own expense log, built exactly how I wanted it.",
      chips: ["Side project", "No bank linking", "Vibe coded"],
      color: "green" as const,
      href: "/work/networth",
      image: {
        src: "https://picsum.photos/seed/sk-expense-tracker/1200/1560",
        alt: "Placeholder image for the Networth project",
      },
    },
  ],
};

// Bento grid of square cells. Desktop: 6 columns by 4 rows; the rowing clip (2 x 2, centre)
// and the gym photo (1 x 2) are placed with `col` / `row` (CSS grid values), and every
// other photo fills the remaining cells in this order. Phones: 2 columns in this order,
// with `mobileCol` / `mobileRow` spans (default 1). `focus` sets the crop's
// object-position; `mono` shows the photo in black and white.
export const beyondTheScreen = {
  heading: "Beyond the screen",
  items: [
    {
      type: "video" as const,
      src: "/video/clip.mp4",
      alt: "Sudhanshu rowing on an indoor rowing machine",
      col: "3 / span 2",
      row: "2 / span 2",
      mobileCol: 2,
    },
    {
      type: "image" as const,
      src: "/images/photos/gym-mirror.jpg",
      alt: "Mirror selfie in a white vest after a workout, in black and white",
      col: "1",
      row: "2 / span 2",
      mobileRow: 2,
      focus: "50% 25%",
      mono: true,
    },
    {
      type: "image" as const,
      src: "/images/photos/trees-backlit.jpg",
      alt: "Sun breaking through a row of tall trees, their long shadows across the grass",
      focus: "50% 40%",
    },
    {
      type: "image" as const,
      src: "/images/photos/odd-eyed-cat.jpg",
      alt: "A white cat with one amber eye and one blue eye, being petted",
      focus: "50% 45%",
    },
    {
      type: "image" as const,
      src: "/images/intro/hilltop-fog.jpg",
      alt: "Standing on a rock at a hilltop, looking over a forested valley in fog",
      focus: "50% 45%",
    },
    {
      type: "image" as const,
      src: "/images/photos/carpenter-bee.jpg",
      alt: "A carpenter bee in a lilac flower wet with rain",
      focus: "50% 55%",
    },
    {
      type: "image" as const,
      src: "/images/photos/kids-at-sunset.jpg",
      alt: "Two kids playing in the shallows at sunset, a footprint in the sand up close",
      focus: "50% 45%",
    },
    {
      type: "image" as const,
      src: "/images/photos/windmill-at-night.jpg",
      alt: "A wind turbine lit up against a starry night sky above the trees",
      focus: "50% 55%",
    },
    {
      type: "image" as const,
      src: "/images/photos/sea-foam.jpg",
      alt: "A wave's foam sliding up dark sand",
    },
    {
      type: "image" as const,
      src: "/images/photos/stormy-beach.jpg",
      alt: "Storm clouds rolling over a wide, empty beach lined with trees",
    },
    {
      type: "image" as const,
      src: "/images/photos/palm-trees.jpg",
      alt: "Coconut palms under a clear blue sky",
      focus: "50% 85%",
    },
    {
      type: "image" as const,
      src: "/images/photos/rowing-monitor.jpg",
      alt: "A rowing machine display after a 30-minute, 7,762-metre row",
      focus: "50% 35%",
    },
    {
      type: "image" as const,
      src: "/images/photos/wispy-clouds.jpg",
      alt: "Wispy clouds streaking across a deep blue sky at golden hour",
    },
    {
      type: "image" as const,
      src: "/images/photos/laptop-palettes.jpg",
      alt: "A laptop showing colour palettes on a bed in a sunlit room",
      focus: "50% 60%",
    },
    {
      type: "image" as const,
      src: "/images/photos/dog-in-sand.jpg",
      alt: "A black dog resting its head in the sand",
      focus: "50% 55%",
    },
    {
      type: "image" as const,
      src: "/images/photos/museum-sculpture.jpg",
      alt: "A yellow stone sculpture on a wooden plinth against a brick and stone wall",
      focus: "50% 60%",
    },
    {
      type: "image" as const,
      src: "/images/intro/beach-sunset.jpg",
      alt: "Sun setting over the sea, its reflection running across wet sand",
      focus: "50% 55%",
    },
    {
      type: "image" as const,
      src: "/images/photos/dog-on-beach.jpg",
      alt: "A dog sitting alone on a wide, grey beach",
      focus: "50% 55%",
    },
    {
      type: "image" as const,
      src: "/images/intro/trees-and-moon.jpg",
      alt: "Wind-blown trees in golden light with the moon in a blue sky",
    },
    {
      type: "image" as const,
      src: "/images/intro/mirror-portrait.jpg",
      alt: "Mirror selfie behind a potted plant, against a colourful abstract painting",
      focus: "50% 40%",
    },
  ],
};

export const contact = {
  question: "Designing something interesting? Building something weird?",
  cta: "Let's talk.",
  // Under the form: the prompt, then a mailto link reading "Email me at <site.email>".
  // Hovering the link shows the cursor bubble with emailCursor.
  emailPrompt: "Not a form person?",
  emailLink: "Email me at",
  emailCursor: "Open mail",
  // Draggable stickers either side of the form, like the hero's.
  stickers: [{ src: "/images/stickers/cloud.png" }, { src: "/images/stickers/heart.png" }],
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

// One-line intros shown in the arc transition panel before each section, each with a
// sticker below it.
export const sectionIntros = {
  about: { text: "A little about the engineer who became a designer", sticker: "/images/stickers/brain.png" },
  experience: { text: "Where I've actually shown up and done the work", sticker: "/images/stickers/heart.png" },
  work: { text: "A few things I've actually built and shipped", sticker: "/images/stickers/keyboard.png" },
  photos: { text: "What I get up to when I step away from the screen", sticker: "/images/stickers/camera.png" },
  contact: { text: `${contact.question} ${contact.cta}`, sticker: "/images/stickers/mailbox.png" },
  end: { text: "The end of the scroll, but not the conversation", sticker: "/images/stickers/pencil.png" },
};

export const footer = {
  // Followed by " · <current year>", which the footer fills in from the visitor's clock.
  credit: "Designed and built by Sudhanshu Kadu · Mumbai",
  // TODO: add Sudhanshu's resume at public/resume.pdf; until then this opens a "Page not found".
  resume: { label: "Resume", href: "/resume.pdf" },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sudhanshu-kadu/", icon: "linkedin" as const },
    { label: "GitHub", href: "https://github.com/sudhanshukadu-dev", icon: "github" as const },
    { label: "Email", href: `mailto:${site.email}`, icon: "email" as const },
  ],
  // Falling stickers: each section transition's sticker, leading back to that section.
  // Hovering one shows its label in the cursor bubble. `width`/`height` are the PNG's
  // pixel size, used to scale it onto its physics body.
  stickers: [
    { src: sectionIntros.about.sticker, label: "About", id: "about", width: 260, height: 214 },
    { src: sectionIntros.experience.sticker, label: "Experience", id: "experience", width: 408, height: 385 },
    { src: sectionIntros.work.sticker, label: "Work", id: "work", width: 322, height: 280 },
    { src: sectionIntros.photos.sticker, label: "Photos", id: "photos", width: 246, height: 213 },
    { src: sectionIntros.contact.sticker, label: "Contact", id: "contact", width: 251, height: 272 },
    { src: sectionIntros.end.sticker, label: "Back to top", id: "top", width: 242, height: 242 },
  ],
};
