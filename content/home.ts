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

// Intro loader: the greetings it counts through, in order. The first one is also
// what the page ships with, so the word is never blank before the script runs.
export const introWords = ["Hello", "Bonjour", "स्वागत हे", "Ciao", "Olá", "おい", "Hallå", "Guten tag", "Hallo"];

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
      { href: "https://github.com/sudhanshukadu-dev", label: "GitHub" },
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
  // Each project is a full-screen card in its colour (the same as its case study), stacked
  // over the one before it. Add a product mockup (an image in public/images/work/) as
  // mockup: { src, alt, width, height } and it fills the card's middle; without one that slot
  // carries the case study's headline and stat. `kicker` is the quiet line above the title.
  projects: [
    {
      tag: "01",
      title: "Expense Management System",
      kicker: "corporate spend",
      summary: "A corporate expense platform built solo, end to end.",
      chips: ["Solo designer", "500+ enterprise clients", "Shipped production Recharts code"],
      color: "blue" as const,
      href: "/work/expense-management-system",
      poster: {
        headline: "Logging expenses shouldn't wait for a desk.",
        figure: "500+",
        caption: "enterprise clients on the platform",
      },
      mockup: {
        src: "/images/work/expense-management-system.png",
        alt: "Two people at a monitor showing the Add Expense screen: the receipt on the left, the expense details on the right",
        width: 1448,
        height: 1086,
      },
    },
    {
      tag: "02",
      title: "Shriram Life Insurance",
      kicker: "payments and KYC",
      summary: "Payment and verification flows people had to trust.",
      chips: ["Design system from scratch", "Payment & KYC flows", "Client work"],
      color: "yellow" as const,
      href: "/work/shriram-life-insurance",
      poster: {
        headline: "Insurance is a promise. The interface has to keep it.",
        figure: "83%",
        caption: "of organic traffic lands on the template I shipped",
      },
    },
    {
      tag: "03",
      title: "Knode",
      kicker: "team availability",
      summary: "A team availability tool I built for my own team.",
      chips: ["Built in 2 weeks", "Live, 12 daily users", "Solo build"],
      color: "purple" as const,
      href: "/work/knode",
      poster: {
        headline: "Who can take the next piece of work?",
        figure: "12",
        caption: "people use it daily, spreadsheet retired",
      },
    },
    {
      tag: "04",
      title: "Networth",
      kicker: "personal finance",
      summary: "My own expense log, built exactly how I wanted it.",
      chips: ["Side project", "No bank linking", "Vibe coded"],
      color: "green" as const,
      href: "/work/networth",
      poster: {
        headline: "One clear view of money spread across accounts.",
        figure: "0",
        caption: "bank passwords asked for",
      },
    },
  ],
};

// The cards on the Beyond the Screen carousel, in the order they come round.
// `label` is the caption under the picture, `focus` sets the square crop's
// object-position, and `mono` shows the photo in black and white.
export const beyondTheScreen = {
  heading: "Beyond the screen",
  items: [
    {
      type: "video" as const,
      src: "/video/clip.mp4",
      alt: "Sudhanshu rowing on an indoor rowing machine",
      label: "On the rower",
    },
    {
      type: "image" as const,
      src: "/images/photos/gym-mirror.jpg",
      alt: "Mirror selfie in a white vest after a workout, in black and white",
      label: "After the workout",
      focus: "50% 25%",
      mono: true,
    },
    {
      type: "image" as const,
      src: "/images/photos/trees-backlit.jpg",
      alt: "Sun breaking through a row of tall trees, their long shadows across the grass",
      label: "Backlit trees",
      focus: "50% 40%",
    },
    {
      type: "image" as const,
      src: "/images/photos/odd-eyed-cat.jpg",
      alt: "A white cat with one amber eye and one blue eye, being petted",
      label: "Odd eyes",
      focus: "50% 45%",
    },
    {
      type: "image" as const,
      src: "/images/intro/hilltop-fog.jpg",
      alt: "Standing on a rock at a hilltop, looking over a forested valley in fog",
      label: "Hilltop fog",
      focus: "50% 45%",
    },
    {
      type: "image" as const,
      src: "/images/photos/carpenter-bee.jpg",
      alt: "A carpenter bee in a lilac flower wet with rain",
      label: "Carpenter bee",
      focus: "50% 55%",
    },
    {
      type: "image" as const,
      src: "/images/photos/kids-at-sunset.jpg",
      alt: "Two kids playing in the shallows at sunset, a footprint in the sand up close",
      label: "Kids at sunset",
      focus: "50% 45%",
    },
    {
      type: "image" as const,
      src: "/images/photos/windmill-at-night.jpg",
      alt: "A wind turbine lit up against a starry night sky above the trees",
      label: "Windmill at night",
      focus: "50% 55%",
    },
    {
      type: "image" as const,
      src: "/images/photos/sea-foam.jpg",
      alt: "A wave's foam sliding up dark sand",
      label: "Sea foam",
    },
    {
      type: "image" as const,
      src: "/images/photos/stormy-beach.jpg",
      alt: "Storm clouds rolling over a wide, empty beach lined with trees",
      label: "Storm coming in",
    },
    {
      type: "image" as const,
      src: "/images/photos/palm-trees.jpg",
      alt: "Coconut palms under a clear blue sky",
      label: "Palms",
      focus: "50% 85%",
    },
    {
      type: "image" as const,
      src: "/images/photos/rowing-monitor.jpg",
      alt: "A rowing machine display after a 30-minute, 7,762-metre row",
      label: "7,762 metres",
      focus: "50% 35%",
    },
    {
      type: "image" as const,
      src: "/images/photos/wispy-clouds.jpg",
      alt: "Wispy clouds streaking across a deep blue sky at golden hour",
      label: "Wispy clouds",
    },
    {
      type: "image" as const,
      src: "/images/photos/laptop-palettes.jpg",
      alt: "A laptop showing colour palettes on a bed in a sunlit room",
      label: "Palettes in bed",
      focus: "50% 60%",
    },
    {
      type: "image" as const,
      src: "/images/photos/dog-in-sand.jpg",
      alt: "A black dog resting its head in the sand",
      label: "Head in the sand",
      focus: "50% 55%",
    },
    {
      type: "image" as const,
      src: "/images/photos/museum-sculpture.jpg",
      alt: "A yellow stone sculpture on a wooden plinth against a brick and stone wall",
      label: "Museum stone",
      focus: "50% 60%",
    },
    {
      type: "image" as const,
      src: "/images/intro/beach-sunset.jpg",
      alt: "Sun setting over the sea, its reflection running across wet sand",
      label: "Beach sunset",
      focus: "50% 55%",
    },
    {
      type: "image" as const,
      src: "/images/photos/dog-on-beach.jpg",
      alt: "A dog sitting alone on a wide, grey beach",
      label: "Alone on the beach",
      focus: "50% 55%",
    },
    {
      type: "image" as const,
      src: "/images/intro/trees-and-moon.jpg",
      alt: "Wind-blown trees in golden light with the moon in a blue sky",
      label: "Trees and moon",
    },
    {
      type: "image" as const,
      src: "/images/intro/mirror-portrait.jpg",
      alt: "Mirror selfie behind a potted plant, against a colourful abstract painting",
      label: "Mirror portrait",
      focus: "50% 40%",
    },
  ],
};

export const contact = {
  question: "Making something interesting or weird?",
  cta: "Let’s talk.",
  // Under the form: the prompt, then a mailto link reading "Email me at <site.email>".
  // Hovering the link shows the cursor bubble with emailCursor.
  emailPrompt: "Not a form person?",
  emailLink: "Email me at",
  emailCursor: "Open mail",
  // Draggable stickers either side of the form, like the hero's.
  stickers: [{ src: "/images/stickers/keyboard.png" }, { src: "/images/stickers/heart.png" }],
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
