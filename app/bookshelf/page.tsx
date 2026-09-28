import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { bookPurchaseLabel } from "@/lib/content/bookLabels";
import { getPublishedBooks } from "@/lib/content/queries";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Book Shelf",
  description: `Books by ${site.name} — including Released and the pre-order for In DEPENDENCE.`,
};

export const revalidate = 30;

export default async function BookshelfPage() {
  const books = await getPublishedBooks();

  return (
    <div>
      <section className="border-b border-sage-soft/60 bg-sage-mist/35">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <h1 className="animate-fade-up max-w-2xl font-serif text-4xl text-forest md:text-5xl">
            The Book Shelf
          </h1>
          <p className="animate-fade-up-delay-1 mt-4 max-w-xl text-lg text-forest/70">
            Compiled words, carved into books, created to inspire a lasting
            impact.
          </p>
          <p className="animate-fade-up-delay-2 mt-3 max-w-xl text-base text-forest/65">
            Explore the books and discover something that stays with you long
            after you turn the page.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        {books.length === 0 ? (
          <p className="text-sm italic text-forest/55">
            Books will appear here once published.
          </p>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {books.map((book) => {
              const cover = book.images[0];
              const extras = book.images.slice(1);
              const purchaseLabel = bookPurchaseLabel(
                book.status,
                book.purchase_url,
              );

              return (
                <article
                  key={book.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sage-soft/80 bg-cream shadow-[0_12px_32px_-24px_rgba(44,58,43,0.35)] transition duration-300 hover:-translate-y-1 hover:border-sage hover:shadow-[0_20px_40px_-24px_rgba(44,58,43,0.4)]"
                >
                  <Link
                    href={`/bookshelf/${book.slug}`}
                    className="relative block bg-sage-mist/40 px-5 pt-5 sm:px-6 sm:pt-6"
                  >
                    {cover ? (
                      <div className="mx-auto grid max-w-[17rem] gap-2">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-cream shadow-[0_16px_30px_-18px_rgba(26,39,68,0.45)] ring-1 ring-forest/5">
                          <Image
                            src={cover}
                            alt={`${book.title} cover`}
                            fill
                            priority
                            sizes="(max-width: 768px) 70vw, 17rem"
                            className="object-cover transition duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                        {extras.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2 pb-1">
                            {extras.map((src) => (
                              <div
                                key={src}
                                className="relative aspect-[4/3] overflow-hidden rounded-md bg-cream ring-1 ring-forest/5"
                              >
                                <Image
                                  src={src}
                                  alt={`${book.title} preview`}
                                  fill
                                  sizes="140px"
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="mx-auto flex aspect-[3/4] max-w-[17rem] flex-col items-center justify-center rounded-lg border border-dashed border-sage/45 bg-cream/70 px-6 text-center">
                        <span className="font-serif text-2xl text-sage-deep">
                          Coming soon
                        </span>
                        <span className="mt-2 text-xs tracking-[0.2em] text-forest/45 uppercase">
                          New titles ahead
                        </span>
                      </div>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col px-5 py-6 sm:px-6">
                    <span className="text-[0.7rem] font-medium tracking-[0.2em] text-terracotta uppercase">
                      {book.status}
                    </span>
                    <h2 className="mt-2 font-serif text-2xl leading-snug text-forest md:text-[1.7rem]">
                      <Link
                        href={`/bookshelf/${book.slug}`}
                        className="transition hover:text-sage-deep"
                      >
                        {book.title}
                      </Link>
                    </h2>
                    <p className="mt-1.5 text-sm italic leading-relaxed text-forest/60">
                      {book.subtitle}
                    </p>
                    {book.author ? (
                      <p className="mt-2 text-sm text-forest/70">
                        by {book.author}
                      </p>
                    ) : null}
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-forest/75">
                      {book.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/bookshelf/${book.slug}`}
                        className="inline-flex w-fit items-center rounded-md border border-sage/40 bg-cream px-5 py-2.5 text-sm font-medium text-forest transition hover:border-sage hover:bg-sage-mist/50"
                      >
                        Read more
                      </Link>
                      {purchaseLabel && book.purchase_url ? (
                        <a
                          href={book.purchase_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-fit items-center rounded-md bg-terracotta px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-terracotta-deep"
                        >
                          {purchaseLabel}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
