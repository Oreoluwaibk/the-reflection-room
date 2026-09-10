import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApprovedComments } from "@/app/actions/comments";
import { CommentSection } from "@/components/CommentSection";
import {
  getPublishedReflections,
  getReflectionBySlug,
} from "@/lib/content/queries";
import { getSiteSettings } from "@/lib/content/settings";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 30;

export async function generateStaticParams() {
  const reflections = await getPublishedReflections();
  return reflections.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getReflectionBySlug(slug);
  if (!post) return { title: "Reflection" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function ReflectionArticlePage({ params }: Props) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getReflectionBySlug(slug),
    getSiteSettings(),
  ]);
  if (!post) notFound();

  const showComments = settings.comments_enabled && post.comments_enabled;
  const comments = showComments
    ? await getApprovedComments("reflection", slug)
    : [];

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
      <Link
        href="/reflections"
        className="text-sm font-medium text-sage-deep hover:text-forest"
      >
        ← Back to My Reflections
      </Link>
      <p className="mt-8 text-xs tracking-[0.2em] text-terracotta uppercase">
        {post.category} · {post.date}
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-forest md:text-5xl">
        {post.title}
      </h1>
      <div className="mt-10 space-y-5 text-base leading-relaxed text-forest/80 md:text-lg">
        {post.body.map((paragraph, index) => (
          <p
            key={index}
            className={
              paragraph.length < 48
                ? "font-serif text-xl leading-snug text-forest md:text-2xl"
                : undefined
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
      <footer className="mt-12 border-t border-sage-soft pt-8">
        <Image
          src="/brand/signature.png"
          alt={post.author}
          width={160}
          height={50}
          className="h-auto w-auto object-contain object-left"
          style={{ width: "auto", height: "auto", maxWidth: 160 }}
        />
        <p className="mt-2 font-serif text-lg text-forest">
          {post.author ?? site.name}
        </p>
      </footer>

      {showComments ? (
        <CommentSection
          targetType="reflection"
          targetSlug={slug}
          initialComments={comments}
        />
      ) : null}
    </article>
  );
}
