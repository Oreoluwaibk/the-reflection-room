import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Reflection Room",
  description:
    "Podcast conversations with Isioma Anis — pause, think, and grow on YouTube.",
};

export default function ReflectionRoomPage() {
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
              The Podcast
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
              The Reflection Room
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/75">
              A space for conversations that invite stillness, clarity, and
              growth. Listen on YouTube — light on, seat ready, mind open.
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
                alt="The Reflection Room logo — TR with hanging lamp"
                width={280}
                height={280}
                className="h-auto w-full max-w-[260px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <h2 className="font-serif text-3xl text-forest">What you&apos;ll find</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "Conversations",
              body: "Thoughtful talks on life, purpose, and becoming.",
            },
            {
              title: "Stories",
              body: "Moments that linger — shared with honesty and care.",
            },
            {
              title: "Growth",
              body: "Ideas that help you pause, think, and grow.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-sage-soft bg-sage-mist/40 p-5"
            >
              <h3 className="font-serif text-xl text-forest">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-base leading-relaxed text-forest/75">
          The TR mark — a hanging lamp beside the initials — captures the spirit
          of the show: a room lit for reflection. Update the YouTube link in the
          site settings when your channel URL is ready.
        </p>
      </section>
    </div>
  );
}
