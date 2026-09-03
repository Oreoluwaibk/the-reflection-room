import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet the woman behind the words — ${site.fullName}, writing as ${site.name}.`,
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
              Welcome to my corner of the world.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-forest/75">
              I&apos;m a writer, speaker, and creative entrepreneur.
            </p>
          </div>
          <div className="animate-fade-up-delay-1 flex justify-center md:justify-end">
            <div className="w-full max-w-sm">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-cream shadow-[0_20px_50px_-30px_rgba(44,58,43,0.45)] ring-1 ring-forest/5">
                <Image
                  src="/brand/isioma-about.jpeg"
                  alt={`${site.fullName}, writing as ${site.name}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 24rem"
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-4 text-center">
                <Image
                  src="/brand/signature.png"
                  alt={site.name}
                  width={180}
                  height={56}
                  className="mx-auto h-auto w-auto object-contain"
                  style={{ width: "auto", height: "auto", maxWidth: 180 }}
                />
                <p className="mt-2 text-xs tracking-[0.28em] text-sage-deep uppercase">
                  {site.tagline.replaceAll("|", " ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <div className="space-y-6 text-base leading-relaxed text-forest/80 md:text-lg">
          <p>
            This is a home for my thoughts, written in ink, where experiences,
            questions, observations, and the lessons life keeps teaching me
            become words, stories, reflections, conversations, books, and
            projects.
          </p>
          <p>
            My journey has taken me through different spaces and seasons, each
            shaping how I see, create, and connect with the world.
          </p>
          <p>
            From My Reflections to the books I write and ideas still ideating,
            everything here is part of that journey. A journey of creating,
            learning, and growing.
          </p>
          <p>
            Whether you arrive through a reflection, a conversation, or a book,
            I hope you find something that makes you take a pause, think deeply,
            and perhaps see life a little differently.
          </p>
          <p className="font-serif text-xl italic text-forest">Take a seat.</p>
          <p>Let&apos;s take the journey together.</p>
          <p className="font-serif text-2xl text-forest">{site.name}</p>
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
