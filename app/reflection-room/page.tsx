import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Reflecting Room",
  description:
    "A space to pause, think, and grow — thoughtful conversations and honest reflections with Isioma Anis.",
};

export default function ReflectingRoomPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-cream">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-glow absolute right-[18%] top-16 h-40 w-40 rounded-full bg-lamp/40 blur-3xl" />
          <div className="absolute left-10 bottom-10 h-32 w-32 rounded-full bg-sage/20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div className="animate-fade-up">
            <p className="text-sm font-medium tracking-[0.22em] text-lamp uppercase">
              Welcome to
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
              {site.reflectingRoom}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/75">
              A space to pause, think, and grow in a world that rarely slows
              down.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-cream/70">
              The door is always open for thoughtful conversations, honest
              reflections, and meaningful growth.
            </p>
            <p className="mt-4 font-serif text-xl italic text-cream/90">
              Take a seat. Let&apos;s reflect.
            </p>
            <a
              href={site.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-terracotta px-6 py-3 text-sm font-medium text-cream transition hover:bg-terracotta-deep"
            >
              Watch on YouTube →
            </a>
          </div>

          <div className="animate-fade-up-delay-1 flex justify-center">
            <div className="relative rounded-2xl bg-cream p-10 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.55)]">
              <Image
                src="/brand/logo-tr.png"
                alt={`${site.reflectingRoom} logo — TR with hanging lamp`}
                width={280}
                height={280}
                className="h-auto w-full max-w-[260px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
