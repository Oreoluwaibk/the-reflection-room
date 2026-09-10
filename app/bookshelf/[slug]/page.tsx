import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApprovedComments } from "@/app/actions/comments";
import { CommentSection } from "@/components/CommentSection";
import { getBookBySlug, getPublishedBooks } from "@/lib/content/queries";
import { getSiteSettings } from "@/lib/content/settings";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 30;

export async function generateStaticParams() {
  const books = await getPublishedBooks();
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return { title: "Book" };
  return {
    title: book.title,
    description: book.description,
  };
}

export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params;
  const [book, settings] = await Promise.all([
    getBookBySlug(slug),
    getSiteSettings(),
  ]);
  if (!book) notFound();

  const showComments = settings.comments_enabled && book.comments_enabled;
  const comments = showComments
    ? await getApprovedComments("book", slug)
    : [];
  const cover = book.images[0];
  const extras = book.images.slice(1);
  const hasPurchase = Boolean(book.purchase_url);

  return (
    <article className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <Link
        href="/bookshelf"
        className="text-sm font-medium text-sage-deep hover:text-forest"
      >
        ← Back to The Book Shelf
      </Link>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-14">
        <div>
          {cover ? (
            <div className="mx-auto grid max-w-[17rem] gap-2 lg:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-cream shadow-[0_16px_30px_-18px_rgba(26,39,68,0.45)] ring-1 ring-forest/5">
                <Image
                  src={cover}
                  alt={`${book.title} cover`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 70vw, 17rem"
                  className="object-cover"
                />
              </div>
              {extras.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
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
            <div className="mx-auto flex aspect-[3/4] max-w-[17rem] flex-col items-center justify-center rounded-lg border border-dashed border-sage/45 bg-sage-mist/40 px-6 text-center lg:mx-0">
              <span className="font-serif text-2xl text-sage-deep">
                Coming soon
              </span>
              <span className="mt-2 text-xs tracking-[0.2em] text-forest/45 uppercase">
                New titles ahead
              </span>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] text-terracotta uppercase">
            {book.status}
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-forest md:text-5xl">
            {book.title}
          </h1>
          <p className="mt-3 text-lg italic leading-relaxed text-forest/65">
            {book.subtitle}
          </p>
          {book.author ? (
            <p className="mt-3 text-sm text-forest/70">by {book.author}</p>
          ) : null}

          <div className="mt-8 space-y-5 text-base leading-relaxed text-forest/80 md:text-lg">
            {book.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {hasPurchase ? (
              <a
                href={book.purchase_url!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md bg-terracotta px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-terracotta-deep"
              >
                Get on Selar →
              </a>
            ) : (
              <p className="text-sm font-medium text-sage-deep">
                This title is still being written.
              </p>
            )}
          </div>
        </div>
      </div>

      {showComments ? (
        <div className="mx-auto max-w-3xl">
          <CommentSection
            targetType="book"
            targetSlug={slug}
            initialComments={comments}
            title="Thoughts from readers"
            description="Share what this book meant to you, a favourite line, or a quiet amen. Comments appear after a brief review."
          />
        </div>
      ) : null}
    </article>
  );
}
