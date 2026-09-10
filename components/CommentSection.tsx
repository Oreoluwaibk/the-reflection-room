"use client";

import { useState, useTransition } from "react";
import {
  submitComment,
  type CommentActionResult,
} from "@/app/actions/comments";
import type {
  CommentTargetType,
  PublicComment,
} from "@/lib/comments/types";

type Props = {
  targetType: CommentTargetType;
  targetSlug: string;
  initialComments: PublicComment[];
  title?: string;
  description?: string;
};

function formatCommentDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function CommentSection({
  targetType,
  targetSlug,
  initialComments,
  title = "Reflections from readers",
  description = "Leave a thought, a question, or a quiet amen. Comments appear after a brief review.",
}: Props) {
  const [comments] = useState(initialComments);
  const [feedback, setFeedback] = useState<CommentActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setFeedback(null);
    startTransition(async () => {
      const result = await submitComment(formData);
      setFeedback(result);
      if (result.ok) {
        const form = document.getElementById(
          "comment-form",
        ) as HTMLFormElement | null;
        form?.reset();
      }
    });
  }

  return (
    <section className="mt-14 border-t border-sage-soft pt-10">
      <h2 className="font-serif text-2xl text-forest md:text-3xl">{title}</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-forest/65 md:text-base">
        {description}
      </p>

      {comments.length > 0 ? (
        <ul className="mt-8 space-y-6">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="border-b border-sage-soft/70 pb-6 last:border-b-0 last:pb-0"
            >
              <p className="font-serif text-lg text-forest">
                {comment.author_name}
              </p>
              <p className="mt-0.5 text-xs tracking-wide text-forest/45 uppercase">
                {formatCommentDate(comment.created_at)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-forest/80 md:text-base">
                {comment.body}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-sm italic text-forest/55">
          No comments yet — be the first to leave one.
        </p>
      )}

      <form
        id="comment-form"
        action={handleSubmit}
        className="mt-10 space-y-5"
      >
        <input type="hidden" name="targetType" value={targetType} />
        <input type="hidden" name="targetSlug" value={targetSlug} />
        {/* Honeypot for basic bot filtering */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="authorName"
              className="mb-1.5 block text-sm font-medium text-forest"
            >
              Name
            </label>
            <input
              id="authorName"
              name="authorName"
              required
              maxLength={80}
              disabled={isPending}
              className="w-full rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage disabled:opacity-60"
            />
          </div>
          <div>
            <label
              htmlFor="authorEmail"
              className="mb-1.5 block text-sm font-medium text-forest"
            >
              Email{" "}
              <span className="font-normal text-forest/45">(optional)</span>
            </label>
            <input
              id="authorEmail"
              name="authorEmail"
              type="email"
              disabled={isPending}
              className="w-full rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="body"
            className="mb-1.5 block text-sm font-medium text-forest"
          >
            Comment
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={5}
            maxLength={2000}
            disabled={isPending}
            placeholder="Share what this stirred in you…"
            className="w-full resize-y rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage disabled:opacity-60"
          />
        </div>

        {feedback ? (
          <p
            className={
              feedback.ok
                ? "text-sm text-sage-deep"
                : "text-sm text-terracotta-deep"
            }
            role="status"
          >
            {feedback.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-terracotta px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-terracotta-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Sending…" : "Post comment"}
        </button>
      </form>
    </section>
  );
}
