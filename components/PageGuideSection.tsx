import Link from "next/link";
import { IconCheck, IconLeaf, pageIcons } from "@/components/icons";
import { pageGuides, site } from "@/lib/site";

export function PageGuideSection() {
  return (
    <section className="relative overflow-hidden bg-cream px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-sage-soft/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-terracotta/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 flex justify-center text-sage">
            <IconLeaf className="h-7 w-7" />
          </div>
          <h2 className="font-serif text-3xl text-forest md:text-4xl">
            Website Pages &amp; Descriptions
          </h2>
          <p className="mt-3 text-base leading-relaxed text-forest/70">
            Everything you need to explore my work, my story, and the projects
            I&apos;m building.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageGuides.map((page, index) => {
            const Icon = pageIcons[page.icon as keyof typeof pageIcons];
            return (
              <Link
                key={page.href}
                href={page.href}
                className="group flex flex-col rounded-xl border border-sage-soft/80 bg-cream-deep/40 p-5 transition duration-300 hover:-translate-y-1 hover:border-sage hover:bg-cream"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-medium tracking-[0.2em] text-terracotta uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sage-mist text-sage-deep transition group-hover:bg-sage group-hover:text-cream">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="font-serif text-xl text-forest">{page.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-forest/70">
                  {page.description}
                </p>
                <span className="mt-4 text-xs font-medium tracking-wide text-terracotta">
                  Explore →
                </span>
              </Link>
            );
          })}

          <aside className="rounded-xl bg-sage px-6 py-7 text-cream sm:col-span-2 lg:col-span-1 xl:col-span-1">
            <h3 className="font-serif text-2xl">Why This Website?</h3>
            <ul className="mt-5 space-y-3.5 text-sm leading-relaxed text-cream/95">
              {[
                "A central home for everything I create and share.",
                "Easy to explore and navigate.",
                "Designed to grow with me over time.",
                "Mobile-friendly & user-friendly.",
                "Elegant, clean & purposeful.",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-cream" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-serif text-lg italic text-cream/90">
              {site.taglineSpoken}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
