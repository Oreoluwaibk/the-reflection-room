import Image from "next/image";
import Link from "next/link";
import {
  IconBookOpen,
  IconBooks,
  IconMail,
  IconMic,
} from "@/components/icons";
import { ReflectingRoomTrigger } from "@/components/ReflectingRoomTrigger";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid md:grid-cols-2">
        <div className="leaf-pattern bg-cream" />
        <div className="hidden bg-gradient-to-br from-sage-soft via-sage to-sage-deep md:block" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-8 md:px-8 md:py-0 md:min-h-[78vh]">
        <div className="max-w-xl">
          <h1 className="animate-fade-up font-serif text-4xl leading-tight text-forest sm:text-5xl md:text-[3.2rem]">
            Welcome to my corner of the world.
          </h1>
          <p className="animate-fade-up-delay-1 mt-5 text-lg leading-relaxed text-forest/75">
            Here, thoughts become words, words become stories, and stories
            become something worth carrying with you.
          </p>
          <p className="animate-fade-up-delay-1 mt-4 text-lg leading-relaxed text-forest/75">
            There are reflections to read, books to discover, and ideas still
            taking shape.
          </p>
          <p className="animate-fade-up-delay-2 mt-6 font-serif text-2xl italic text-forest md:text-3xl">
            {site.heroClose}
          </p>
          <p className="animate-fade-up-delay-2 mt-4 font-serif text-xl text-forest">
            {site.firstName}
          </p>

          <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap gap-3">
            <Link
              href="/reflections"
              className="inline-flex items-center gap-2 rounded-md bg-sage px-4 py-2.5 text-sm font-medium text-cream transition hover:bg-sage-deep"
            >
              <IconBookOpen className="h-4 w-4" />
              Read My Reflections
            </Link>
            <ReflectingRoomTrigger className="inline-flex items-center gap-2 rounded-md border border-terracotta/50 bg-cream px-4 py-2.5 text-sm font-medium text-terracotta transition hover:border-terracotta hover:bg-cream-deep">
              <IconMic className="h-4 w-4" />
              Listen to {site.reflectingRoom}
            </ReflectingRoomTrigger>
            <Link
              href="/bookshelf"
              className="inline-flex items-center gap-2 rounded-md border border-terracotta/50 bg-cream px-4 py-2.5 text-sm font-medium text-terracotta transition hover:border-terracotta hover:bg-cream-deep"
            >
              <IconBooks className="h-4 w-4" />
              Explore My Books
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-terracotta px-4 py-2.5 text-sm font-medium text-cream transition hover:bg-terracotta-deep"
            >
              <IconMail className="h-4 w-4" />
              Contact Me
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center py-6 md:min-h-[78vh] md:py-16">
          <div className="animate-soft-float relative w-full max-w-md">
            <div className="absolute -inset-6 rounded-[2rem] bg-cream/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.4rem] border border-cream/30 bg-gradient-to-b from-cream to-cream-deep shadow-[0_30px_60px_-28px_rgba(44,58,43,0.45)]">
              <div className="flex flex-col items-center px-8 pb-10 pt-12">
                <div className="relative mb-8 flex h-36 w-28 items-center justify-center rounded-sm bg-sage shadow-inner">
                  <div className="absolute inset-x-3 top-3 bottom-3 rounded-[2px] border border-cream/25" />
                  <Image
                    src="/brand/logo-ia.png"
                    alt="IA writing logo"
                    width={72}
                    height={72}
                    className="relative z-10 brightness-0 invert"
                    priority
                  />
                </div>
                <Image
                  src="/brand/signature.png"
                  alt={site.name}
                  width={220}
                  height={70}
                  className="mb-3 h-auto w-auto object-contain"
                  style={{ width: "auto", height: "auto", maxWidth: 220 }}
                />
                <p className="text-center text-[0.7rem] font-medium tracking-[0.32em] text-sage-deep uppercase">
                  Pause Think Grow
                </p>
                <div className="mt-8 flex w-full items-end justify-between gap-4 border-t border-sage-soft/70 pt-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#6f4e37] to-[#3d2918] shadow-md" />
                  <div className="mb-2 h-2 w-24 rounded-full bg-sage/50" />
                  <div className="h-10 w-3 rounded-full bg-sage-deep" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
