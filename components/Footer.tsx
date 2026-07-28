import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { site } from "@/lib/site";

function SocialIcon({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-deep text-cream transition-transform duration-300 hover:-translate-y-0.5 hover:bg-forest"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-sage-soft/70 bg-sage-mist/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.1fr_0.9fr_1.1fr] md:px-8">
        <div>
          <BrandMark size="md" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-forest/75">
            A home for reflections, conversations, stories, and purpose-driven
            work.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-forest">
            Let&apos;s Stay Connected
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <SocialIcon label="Facebook" href={site.social.facebook}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Instagram" href={site.social.instagram}>
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
              </svg>
            </SocialIcon>
            <SocialIcon label="LinkedIn" href={site.social.linkedin}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M7.5 9.5H4.8V19h2.7V9.5ZM6.15 5A1.55 1.55 0 1 0 6.2 8.1 1.55 1.55 0 0 0 6.15 5ZM19.2 19h-2.7v-5.1c0-1.4-.5-2.3-1.7-2.3-.9 0-1.4.6-1.65 1.2-.1.2-.1.5-.1.8V19H10.4s.05-8.4 0-9.5h2.7v1.35c.35-.55 1-1.5 2.5-1.5 1.85 0 3.6 1.2 3.6 4.35V19Z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="YouTube" href={site.social.youtube}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M21.5 8.2a2.7 2.7 0 0 0-1.9-1.9C17.8 5.9 12 5.9 12 5.9s-5.8 0-7.6.4A2.7 2.7 0 0 0 2.5 8.2 28 28 0 0 0 2.1 12a28 28 0 0 0 .4 3.8 2.7 2.7 0 0 0 1.9 1.9c1.8.4 7.6.4 7.6.4s5.8 0 7.6-.4a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .4-3.8 28 28 0 0 0-.4-3.8ZM10.2 14.8V9.2L15.5 12l-5.3 2.8Z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl text-forest">
            Join my mailing list
          </h2>
          <p className="mt-2 text-sm text-forest/70">
            Reflections, episodes, and new work — delivered with care.
          </p>
          <form className="mt-4 flex flex-col gap-2 sm:flex-row" action="#">
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              placeholder="Your email"
              className="min-w-0 flex-1 rounded-md border border-sage/40 bg-cream px-3.5 py-2.5 text-sm text-forest outline-none transition focus:border-sage"
            />
            <button
              type="submit"
              className="rounded-md bg-terracotta px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-terracotta-deep"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-sage/25 bg-forest text-cream/90">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-3.5 text-center text-xs tracking-wide sm:flex-row sm:text-left md:px-8">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All Rights Reserved.
          </p>
          <Link href="/" className="hover:text-cream">
            {site.domain}
          </Link>
          <div className="flex items-center gap-2">
            <Image
              src="/brand/signature.png"
              alt=""
              width={90}
              height={28}
              className="brightness-0 invert opacity-80"
              style={{ width: "auto", height: "auto", maxHeight: 28 }}
              aria-hidden
            />
            <span className="text-cream/70">{site.taglineSpoken}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
