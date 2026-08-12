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
              Meet the Woman Behind the Words
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-forest/75">
              {site.aboutIntro}
            </p>
            <p className="mt-3 text-sm tracking-wide text-forest/65">
              {site.roles}
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
            I&apos;m a writer, speaker, and creative entrepreneur. This is a
            home for my thoughts, written in ink — where they become words,
            stories, reflections, conversations, books, and projects.
          </p>
          <p>
            My experiences, questions, observations, and the lessons life keeps
            teaching me often find their way into what I create. Through it all,
            I&apos;m interested in the things that make us pause, think, grow,
            and see life a little differently.
          </p>
          <p>
            My journey has taken me through different spaces, experiences, and
            seasons, each shaping how I see, create, and connect with the world.
          </p>
          <p>
            From My Reflections to {site.reflectingRoom}, the books I&apos;ve
            written to the ideas I&apos;m building, everything here is part of a
            journey of creating, learning, and growing.
          </p>
          <p>
            The signature throughout this space is personal, intentional, and
            part of the story I&apos;m building.
          </p>
          <p className="font-serif text-2xl italic text-forest">
            {site.taglineSpoken}
          </p>
          <p>
            Whether you arrive through a reflection, a conversation, or a book,
            I hope you find something to pause over, think about, and carry with
            you.
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
