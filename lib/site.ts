export const site = {
  name: "Isioma Anis",
  fullName: "Isioma Aniugbo",
  domain: "isiomaanis.com",
  reflectingRoom: "The Reflecting Room",
  tagline: "Pause | Think | Grow",
  taglineSpoken: "Pause. Think. Grow.",
  heroLead: "A Space to",
  roles: "Writer. Speaker. Creative Entrepreneur.",
  description: "A Space to Pause. Think. Grow.",
  siteIntro:
    "Welcome to my thoughts, written in ink. Here, everyday experiences, ideas, and observations become reflections, stories, books, and projects.",
  aboutIntro:
    "Hi, I'm Isioma Aniugbo. I write, speak, and create under the name Isioma Anis.",
  youtubeUrl: "https://youtube.com/@reflectingroom",
  email: "hello@isiomaanis.com",
  social: {
    facebook: "https://www.facebook.com/isioma.aniugbo",
    instagram: "https://www.instagram.com/isiomaaniugbo/",
    linkedin: "https://www.linkedin.com/in/isioma-aniugbo/",
    youtube: "https://youtube.com/@reflectingroom",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/reflections", label: "My Reflections" },
  { href: "/reflection-room", label: "The Reflecting Room" },
  { href: "/bookshelf", label: "The Book Shelf" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export const pageGuides = [
  {
    href: "/",
    title: "Home",
    description:
      "Welcome to the space where thoughts, written in ink, find a home. There's room for you.",
    icon: "home",
  },
  {
    href: "/about",
    title: "About",
    description:
      "Meet the woman behind the words — her story, journey, values, and the experiences that shape who she is and what she creates.",
    icon: "about",
  },
  {
    href: "/reflections",
    title: "My Reflections",
    description: "Inspired by thoughts and observations.",
    icon: "reflections",
  },
  {
    href: "/reflection-room",
    title: "The Reflecting Room",
    description:
      "A space to pause, think, and grow in a world that rarely slows down. Take a seat — let's reflect.",
    icon: "podcast",
  },
  {
    href: "/bookshelf",
    title: "The Book Shelf",
    description:
      "Compiled words, carved into books, created to inspire a lasting impact.",
    icon: "books",
  },
  {
    href: "/projects",
    title: "Projects",
    description:
      "Ideas, initiatives, and creative work I'm building beyond the page.",
    icon: "projects",
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Reach out for collaborations, speaking, or thoughtful inquiries.",
    icon: "contact",
  },
] as const;

export const whyThisWebsite = [
  "A home for my thoughts, written in ink.",
  "Where thoughts become words, stories, reflections, and conversations.",
  "A place for what I've created, what I'm building, and what's yet to come.",
] as const;

export const reflections = [
  {
    slug: "learning-to-pause",
    title: "Learning to Pause in a World That Won't Stop",
    excerpt:
      "Growth rarely begins in the rush. It begins in the quiet moment you choose to notice yourself again.",
    category: "Growth",
    date: "March 12, 2026",
  },
  {
    slug: "stories-that-shape-us",
    title: "The Stories That Quietly Shape Us",
    excerpt:
      "The narratives we inherit and the ones we rewrite become the architecture of who we are becoming.",
    category: "Life",
    date: "February 28, 2026",
  },
  {
    slug: "purpose-in-practice",
    title: "Purpose in Practice, Not Just Theory",
    excerpt:
      "Purpose is less a destination and more a daily decision to live aligned with what matters.",
    category: "Purpose",
    date: "January 19, 2026",
  },
] as const;

export const books = [
  {
    title: "Coming Soon",
    subtitle: "A story of becoming",
    description:
      "Details for published titles will live here — covers, sample chapters, and purchase links.",
    status: "Featured",
  },
  {
    title: "On the Shelf",
    subtitle: "Reflections in print",
    description:
      "A home for every book written and published — ready for readers to explore and own.",
    status: "Published",
  },
] as const;

export const projects = [
  {
    title: "Creative Conversations",
    description:
      "Spaces where storytelling meets community — workshops, talks, and shared reflection.",
  },
  {
    title: "Purpose-Led Initiatives",
    description:
      "Projects rooted in growth, sustainability, and creating room for meaningful change.",
  },
  {
    title: "Storytelling Collaborations",
    description:
      "Partnerships with brands and creators who care about depth, clarity, and heart.",
  },
] as const;
