import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { reflections } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return reflections.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = reflections.find((item) => item.slug === slug);
  if (!post) return { title: "Reflection" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function ReflectionArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = reflections.find((item) => item.slug === slug);
  if (!post) notFound();

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
      <p className="mt-6 text-lg leading-relaxed text-forest/75">{post.excerpt}</p>
      <div className="mt-10 space-y-5 text-base leading-relaxed text-forest/80">
        <p>
          This reflection is a placeholder for your published writing. When
          you&apos;re ready, replace this page with the full article — your
          voice, your pacing, your truth.
        </p>
        <p>
          The archive is designed to feel calm and readable: one thought at a
          time, room to breathe, and a clear path back to the rest of your work.
        </p>
      </div>
    </article>
  );
}
