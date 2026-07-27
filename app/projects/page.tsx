import type { Metadata } from "next";
import Link from "next/link";
import { projects, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Creative initiatives and purpose-led projects by ${site.name}.`,
};

export default function ProjectsPage() {
  return (
    <div>
      <section className="border-b border-sage-soft/60 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="animate-fade-up text-sm font-medium tracking-[0.2em] text-terracotta uppercase">
            Projects
          </p>
          <h1 className="animate-fade-up-delay-1 mt-3 max-w-2xl font-serif text-4xl text-forest md:text-5xl">
            Work beyond the page
          </h1>
          <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-lg text-forest/70">
            Initiatives, collaborations, and creative work that extend the
            spirit of {site.taglineSpoken}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="relative overflow-hidden rounded-2xl border border-sage-soft bg-sage-mist/30 p-7 transition hover:border-sage"
            >
              <span className="text-xs font-medium tracking-[0.2em] text-terracotta uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 font-serif text-2xl text-forest">
                {project.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-forest/70">
                {project.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-sage px-7 py-9 text-cream md:px-10">
          <h2 className="font-serif text-3xl">Building with purpose</h2>
          <p className="mt-3 max-w-2xl text-cream/90">
            Have an idea, partnership, or community project in mind? I&apos;d
            love to hear how we might create something meaningful together.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-md bg-cream px-5 py-2.5 text-sm font-medium text-forest transition hover:bg-cream-deep"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
