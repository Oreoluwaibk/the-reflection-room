import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex flex-1 flex-col justify-center overflow-hidden border-b border-sage-soft/60 bg-sage-mist/35">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,212,188,0.45),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(196,92,62,0.08),_transparent_45%)]"
      />
      <div className="relative mx-auto max-w-2xl px-5 py-24 text-center md:px-8 md:py-32">
        <p className="text-xs tracking-[0.2em] text-terracotta uppercase">
          404
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-forest md:text-5xl">
          This page isn&apos;t here
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-forest/70 md:text-lg">
          The path you followed has gone quiet. Take a pause, then find your way
          back into the room.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-md bg-terracotta px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-terracotta-deep"
          >
            Home
          </Link>
          <Link
            href="/reflections"
            className="rounded-md border border-sage/40 bg-cream px-5 py-2.5 text-sm font-medium text-forest transition hover:border-sage hover:bg-sage-mist/50"
          >
            My Reflections
          </Link>
          <Link
            href="/bookshelf"
            className="rounded-md border border-sage/40 bg-cream px-5 py-2.5 text-sm font-medium text-forest transition hover:border-sage hover:bg-sage-mist/50"
          >
            The Book Shelf
          </Link>
        </div>
      </div>
    </section>
  );
}
