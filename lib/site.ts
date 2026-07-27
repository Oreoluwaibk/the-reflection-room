export const site = {
  name: "Isioma Anis",
  domain: "isiomaanis.com",
  tagline: "Pause | Think | Grow",
  taglineSpoken: "Pause. Think. Grow.",
  roles: "Writer. Podcaster. Creative Entrepreneur. Storyteller. Purpose-Driven.",
  description:
    "A space for reflections, conversations, stories, and purpose.",
  youtubeUrl: "https://www.youtube.com/@TheReflectionRoom",
  email: "hello@isiomaanis.com",
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "https://www.youtube.com/@TheReflectionRoom",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/reflections", label: "My Reflections" },
  { href: "/reflection-room", label: "The Reflection Room" },
  { href: "/bookshelf", label: "The Book Shelf" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export const pageGuides = [
  {
    href: "/",
    title: "Home",
    description: "Welcome message and a clear overview of everything you'll find here.",
    icon: "home",
  },
  {
    href: "/about",
    title: "About",
    description: "My story, journey, and the mission behind the work I create.",
    icon: "about",
  },
  {
    href: "/reflections",
    title: "My Reflections",
    description: "Article-based writings on life, growth, and purposeful living.",
    icon: "reflections",
  },
  {
    href: "/reflection-room",
    title: "The Reflection Room",
    description: "Podcast conversations that invite you to pause, think, and grow.",
    icon: "podcast",
  },
  {
    href: "/bookshelf",
    title: "The Book Shelf",
    description: "Published books with sample chapters and where to find them.",
    icon: "books",
  },
  {
    href: "/projects",
    title: "Projects",
    description: "Initiatives and creative work I'm building beyond the page.",
    icon: "projects",
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Reach out for collaborations, speaking, or thoughtful inquiries.",
    icon: "contact",
  },
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
