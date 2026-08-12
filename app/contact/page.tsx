import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} for collaborations, speaking, and inquiries.`,
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-sage-soft/60 bg-sage-mist/40">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="animate-fade-up text-sm font-medium tracking-[0.2em] text-terracotta uppercase">
            Contact
          </p>
          <h1 className="animate-fade-up-delay-1 mt-3 max-w-2xl font-serif text-4xl text-forest md:text-5xl">
            Let&apos;s connect
          </h1>
          <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-lg text-forest/70">
            Collaborations, speaking invitations, press, or a thoughtful note —
            I&apos;d be glad to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1fr_0.85fr] md:px-8">
        <form
          className="rounded-2xl border border-sage-soft bg-cream p-6 md:p-8"
          action={`mailto:${site.email}`}
          method="post"
          encType="text/plain"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-forest"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-forest"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="subject"
              className="mb-1.5 block text-sm font-medium text-forest"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              className="w-full rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-forest"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full resize-y rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage"
            />
          </div>

          <button
            type="submit"
            className="mt-6 rounded-md bg-terracotta px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-terracotta-deep"
          >
            Send Message
          </button>
        </form>

        <aside className="flex flex-col justify-between rounded-2xl bg-forest px-7 py-8 text-cream">
          <div>
            <h2 className="font-serif text-2xl">Directly</h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/75">
              Prefer email? Reach out at:
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-block text-lamp hover:underline"
            >
              {site.email}
            </a>
            <p className="mt-8 text-sm leading-relaxed text-cream/75">
              For podcast episodes and video conversations, visit{" "}
              <a
                href={site.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lamp hover:underline"
              >
                {site.reflectingRoom} on YouTube
              </a>
              .
            </p>
          </div>
          <p className="mt-10 font-serif text-xl italic text-cream/85">
            {site.taglineSpoken}
          </p>
        </aside>
      </section>
    </div>
  );
}
