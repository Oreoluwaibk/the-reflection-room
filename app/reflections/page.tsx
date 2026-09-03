import type { Metadata } from "next";
import Link from "next/link";
import { reflections } from "@/lib/site";

export const metadata: Metadata = {
  title: "My Reflections",
  description:
    "Inspired by thoughts, observations, and the everyday moments in between.",
};

export default function ReflectionsPage() {
  return (
    <div>
      <section className="border-b border-sage-soft/60 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <h1 className="animate-fade-up max-w-2xl font-serif text-4xl text-forest md:text-5xl">
            My Reflections
          </h1>
          <p className="animate-fade-up-delay-1 mt-4 max-w-xl text-lg text-forest/70">
            Inspired by thoughts, observations, and the everyday moments in
            between.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reflections.map((post, index) => (
            <article
              key={post.slug}
              className="group flex flex-col border-b border-sage-soft pb-6 transition hover:border-sage"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-center gap-3 text-xs tracking-wide text-sage-deep uppercase">
                <span>{post.category}</span>
                <span className="h-1 w-1 rounded-full bg-terracotta/70" />
                <time>{post.date}</time>
              </div>
              <h2 className="mt-3 font-serif text-2xl leading-snug text-forest group-hover:text-sage-deep">
                <Link href={`/reflections/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-forest/70">
                {post.excerpt}
              </p>
              <Link
                href={`/reflections/${post.slug}`}
                className="mt-5 text-sm font-medium text-terracotta"
              >
                Continue reading →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
