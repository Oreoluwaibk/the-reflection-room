export const site = {
  name: "Isioma Anis",
  fullName: "Isioma Aniugbo",
  domain: "isiomaanis.com",
  reflectingRoom: "The Reflecting Room",
  tagline: "Pause | Think | Grow",
  taglineSpoken: "Pause. Think. Grow.",
  heroClose: "Take a Pause. Think deeply. Grow gently.",
  roles: "Writer. Speaker. Creative Entrepreneur.",
  description:
    "Welcome to my corner of the world. Thoughts become words, words become stories, and stories become something worth carrying with you.",
  aboutIntro:
    "Hi, I'm Isioma Aniugbo. I write, speak, and create under the name Isioma Anis.",
  firstName: "Isioma",
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
  {
    href: "/reflection-room",
    label: "The Reflecting Room",
    comingSoon: true,
  },
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
    comingSoon: true,
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
    description: "Let's connect. I'd be glad to hear from you.",
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
    slug: "blank-cheque",
    title: "Blank Cheque",
    excerpt:
      "What would you create if you knew you had all the resources you needed — a blank page, and a blank cheque?",
    category: "Growth",
    date: "September 3, 2026",
    author: "Isioma Anis",
    body: [
      "As children, we were given some blank sheets, pencils, and erasers. We made mistakes. We cleaned them. It became blank again, though a bit blurred to prove it had once been written on.",
      "But we didn't mind.",
      "As long as we could draw again on what looked almost new, we were fine.",
      "Recently,",
      "I watched a child write on her digital board. She wrote whatever she wanted.",
      "Most times, she was simply scribbling what I would have called rubbish.",
      "But to her, she was a genius.",
      "She was creating something worth the while, and every few seconds, after scribbling her imagined best-selling design, she erased it with one touch of a button.",
      "Everything went blank again.",
      "As though she had been given a fresh blank page to rewrite her story. And with utmost delight, she drew again, cleaned it with a swipe, and drew again without thinking twice.",
      "And I thought:",
      "What if we had a blank page to ideate",
      "And what if that blank page came with a blank cheque?",
      "What would you create?",
      "What would you build?",
      "What would you attempt",
      "if you knew you had all the resources you needed?",
      "What would you dare to put on the pages of life if all you had was 24 hours and a blank cheque from an unlimited account?",
      "Would you still think small?",
      'Would you still ask, "Can I afford it?"',
      "Would you still calculate the cost before you allowed yourself to imagine even when you know imagination doesn't cost a penny?",
      "But what if, for once, you simply allowed yourself to imagine your life's vision without first counting the cost?",
      "What if",
      "you have a fresh start today... and all you need is your imagination.",
      "What if you pick up the pen...",
      "Write on the blank page, fill the cheque, and access an unlimited funded account...",
      "Today is a day of release,",
      "and the only thing missing may be your signature, an amount in words, and figure on the cheque",
      "Your Father has an unlimited funded account",
      "and He has given you a blank cheque that can't bounce.",
      "Will you go for it?",
    ],
  },
] as const;

export const books = [
  {
    title: "Released",
    subtitle: "A Chosen Vessel Set Apart For God's Purpose",
    description:
      "A journey through the lives of key Bible characters — simple yet deep, revealing God's unseen mighty hands and unlocking lessons that define purpose.",
    status: "Published",
    author: "Isioma Aniugbo",
    purchaseUrl: "https://selar.com/released1",
    images: [
      "/brand/books/released1.jpeg",
      "/brand/books/released2.jpeg",
      "/brand/books/released3.jpeg",
    ],
  },
  {
    title: "More books are on the way",
    subtitle: "Words still being written",
    description:
      "Released is the first book on this shelf — and it won't be the last. New titles will find their place here as they are published.",
    status: "Coming Soon",
    author: "Isioma Aniugbo",
    purchaseUrl: null,
    images: [],
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
