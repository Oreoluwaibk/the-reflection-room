import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${site.name} — writer, podcaster, and creative entrepreneur.`,
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-sage-soft/60 bg-sage-mist/40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-20">
          <div className="animate-fade-up">
            <p className="text-sm font-medium tracking-[0.2em] text-terracotta uppercase">
              About
            </p>
            <h1 className="mt-3 font-serif text-4xl text-forest md:text-5xl">
              My story, journey, and mission
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-forest/75">
              I write, host conversations, and build creative work that helps
              people pause, think, and grow — with honesty, clarity, and heart.
            </p>
          </div>
          <div className="animate-fade-up-delay-1 flex justify-center md:justify-end">
            <div className="relative rounded-2xl bg-cream p-8 shadow-[0_20px_50px_-30px_rgba(44,58,43,0.4)]">
              <Image
                src="/brand/logo-ia.png"
                alt="IA personal logo"
                width={120}
                height={120}
                className="mx-auto"
              />
              <Image
                src="/brand/signature.png"
                alt={site.name}
                width={200}
                height={64}
                className="mx-auto mt-4"
              />
              <p className="mt-3 text-center text-xs tracking-[0.28em] text-sage-deep uppercase">
                {site.tagline.replaceAll("|", " ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <div className="space-y-6 text-base leading-relaxed text-forest/80 md:text-lg">
          <p>
            {site.name} is a writer, podcaster, creative entrepreneur, and
            storyteller. This website is a living home for reflections on life
            and growth, conversations from The Reflection Room, published books,
            and the projects I&apos;m building.
          </p>
          <p>
            The IA logo — a pen formed into the letter{" "}
            <span className="font-medium text-forest">i</span> — is a reminder
            that writing is at the center of everything I create. The signature
            you see throughout the site is personal, intentional, and part of
            the brand I&apos;m building.
          </p>
          <p className="font-serif text-2xl italic text-forest">
            {site.taglineSpoken}
          </p>
          <p>
            Whether you arrive through an article, a podcast episode, or a book,
            my hope is that you leave with something to carry — a clearer
            thought, a softer pause, or a renewed sense of purpose.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/reflections"
            className="rounded-md bg-sage px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-sage-deep"
          >
            Read My Reflections
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-terracotta/50 px-5 py-2.5 text-sm font-medium text-terracotta transition hover:bg-cream-deep"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
