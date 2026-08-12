import type { Metadata } from "next";
import Link from "next/link";
import { books, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Book Shelf",
  description: `Published books by ${site.name} — sample chapters and purchase links.`,
};

export default function BookshelfPage() {
  return (
    <div>
      <section className="border-b border-sage-soft/60 bg-sage-mist/35">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="animate-fade-up text-sm font-medium tracking-[0.2em] text-terracotta uppercase">
            The Book Shelf
          </p>
          <h1 className="animate-fade-up-delay-1 mt-3 max-w-2xl font-serif text-4xl text-forest md:text-5xl">
            Compiled words, carved into books
          </h1>
          <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-lg text-forest/70">
            Compiled words, carved into books, created to inspire a lasting
            impact. Explore the books and discover something that stays with you
            long after you turn the page.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {books.map((book, index) => (
            <article
              key={book.title}
              className="grid gap-6 rounded-2xl border border-sage-soft bg-cream p-6 sm:grid-cols-[140px_1fr] md:p-8"
            >
              <div
                className={`flex aspect-[3/4] items-end justify-center rounded-md p-4 text-center shadow-md ${
                  index % 2 === 0
                    ? "bg-gradient-to-b from-sage to-sage-deep text-cream"
                    : "bg-gradient-to-b from-forest to-ink text-cream"
                }`}
              >
                <span className="font-serif text-lg leading-snug">
                  {book.title}
                </span>
              </div>
              <div>
                <span className="text-xs font-medium tracking-[0.18em] text-terracotta uppercase">
                  {book.status}
                </span>
                <h2 className="mt-2 font-serif text-2xl text-forest">
                  {book.title}
                </h2>
                <p className="mt-1 text-sm italic text-forest/60">
                  {book.subtitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-forest/75">
                  {book.description}
                </p>
                <button
                  type="button"
                  disabled
                  className="mt-6 rounded-md border border-sage/40 px-4 py-2 text-sm text-forest/50"
                >
                  Purchase link coming soon
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-forest/65">
          Ready to add real titles? Share cover images, blurbs, and store links
          and we&apos;ll place them here. Until then, this shelf is prepared for
          your published work.
        </p>

        <Link
          href="/contact"
          className="mt-6 inline-flex text-sm font-medium text-terracotta hover:text-terracotta-deep"
        >
          Ask about a book →
        </Link>
      </section>
    </div>
  );
}
