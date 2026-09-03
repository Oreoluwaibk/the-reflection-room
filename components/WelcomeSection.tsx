import Image from "next/image";
import { site } from "@/lib/site";

export function WelcomeSection() {
  return (
    <section className="border-b border-sage-soft/60 bg-sage-mist/30 px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        {/* <h2 className="animate-fade-up font-serif text-3xl text-forest md:text-4xl">
          Welcome to my corner of the world.
        </h2> */}
        <div className="animate-fade-up-delay-1 mt-8 space-y-5 text-base leading-relaxed text-forest/80 md:text-lg">
          <p>I&apos;m a writer, speaker, and creative entrepreneur.</p>
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
        </div>
        <div className="animate-fade-up-delay-2 mt-8 flex flex-col items-center">
          <Image
            src="/brand/signature.png"
            alt={site.name}
            width={180}
            height={56}
            className="h-auto w-auto object-contain object-left"
            style={{ width: "auto", height: "auto", maxWidth: 180 }}
          />
          <p className="mt-2 font-serif text-lg text-forest">{site.name}</p>
        </div>
      </div>
    </section>
  );
}
