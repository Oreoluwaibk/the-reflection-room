import Link from "next/link";
import {
  deleteComment,
  updateCommentStatus,
} from "@/app/actions/admin";
import type { Comment, CommentStatus } from "@/lib/comments/types";

type Props = {
  comments: Comment[];
  titleMap?: Record<string, string>;
};

function targetLabel(
  comment: Comment,
  titleMap: Record<string, string> = {},
) {
  if (comment.target_type === "reflection") {
    return {
      kind: "Reflection",
      title:
        titleMap[`reflection:${comment.target_slug}`] ?? comment.target_slug,
      href: `/reflections/${comment.target_slug}`,
    };
  }

  return {
    kind: "Book",
    title: titleMap[`book:${comment.target_slug}`] ?? comment.target_slug,
    href: `/bookshelf/${comment.target_slug}`,
  };
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function statusClass(status: CommentStatus) {
  if (status === "approved") return "text-sage-deep bg-sage-mist";
  if (status === "rejected") return "text-terracotta-deep bg-terracotta/10";
  return "text-forest/70 bg-cream-deep";
}

export function AdminCommentsPanel({ comments, titleMap = {} }: Props) {
  const pending = comments.filter((c) => c.status === "pending").length;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-forest/65">
          {comments.length} comment{comments.length === 1 ? "" : "s"}
          {pending > 0 ? ` · ${pending} pending review` : ""}
        </p>
      </div>

      {comments.length === 0 ? (
        <p className="mt-10 text-sm italic text-forest/55">
          No comments yet.
        </p>
      ) : (
        <ul className="mt-8 space-y-5">
          {comments.map((comment) => {
            const target = targetLabel(comment, titleMap);
            return (
              <li
                key={comment.id}
                className="rounded-xl border border-sage-soft/80 bg-cream px-5 py-5"
              >
                <div className="flex flex-wrap items-center gap-2 gap-y-1">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[0.7rem] font-medium tracking-wide uppercase ${statusClass(comment.status)}`}
                  >
                    {comment.status}
                  </span>
                  <span className="text-xs tracking-wide text-forest/45 uppercase">
                    {target.kind}
                  </span>
                  <Link
                    href={target.href}
                    className="text-sm font-medium text-sage-deep hover:text-forest"
                  >
                    {target.title}
                  </Link>
                </div>

                <p className="mt-3 font-serif text-lg text-forest">
                  {comment.author_name}
                </p>
                {comment.author_email ? (
                  <p className="text-xs text-forest/50">{comment.author_email}</p>
                ) : null}
                <p className="mt-0.5 text-xs text-forest/45">
                  {formatDate(comment.created_at)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-forest/80 whitespace-pre-wrap">
                  {comment.body}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {comment.status !== "approved" ? (
                    <form action={updateCommentStatus}>
                      <input type="hidden" name="id" value={comment.id} />
                      <input type="hidden" name="status" value="approved" />
                      <input
                        type="hidden"
                        name="targetType"
                        value={comment.target_type}
                      />
                      <input
                        type="hidden"
                        name="targetSlug"
                        value={comment.target_slug}
                      />
                      <button
                        type="submit"
                        className="rounded-md bg-sage-deep px-3.5 py-1.5 text-xs font-medium text-cream transition hover:bg-forest"
                      >
                        Approve
                      </button>
                    </form>
                  ) : null}
                  {comment.status !== "rejected" ? (
                    <form action={updateCommentStatus}>
                      <input type="hidden" name="id" value={comment.id} />
                      <input type="hidden" name="status" value="rejected" />
                      <input
                        type="hidden"
                        name="targetType"
                        value={comment.target_type}
                      />
                      <input
                        type="hidden"
                        name="targetSlug"
                        value={comment.target_slug}
                      />
                      <button
                        type="submit"
                        className="rounded-md border border-sage/40 px-3.5 py-1.5 text-xs font-medium text-forest transition hover:bg-sage-mist/50"
                      >
                        Reject
                      </button>
                    </form>
                  ) : null}
                  {comment.status !== "pending" ? (
                    <form action={updateCommentStatus}>
                      <input type="hidden" name="id" value={comment.id} />
                      <input type="hidden" name="status" value="pending" />
                      <input
                        type="hidden"
                        name="targetType"
                        value={comment.target_type}
                      />
                      <input
                        type="hidden"
                        name="targetSlug"
                        value={comment.target_slug}
                      />
                      <button
                        type="submit"
                        className="rounded-md border border-sage/40 px-3.5 py-1.5 text-xs font-medium text-forest transition hover:bg-sage-mist/50"
                      >
                        Mark pending
                      </button>
                    </form>
                  ) : null}
                  <form action={deleteComment}>
                    <input type="hidden" name="id" value={comment.id} />
                    <input
                      type="hidden"
                      name="targetType"
                      value={comment.target_type}
                    />
                    <input
                      type="hidden"
                      name="targetSlug"
                      value={comment.target_slug}
                    />
                    <button
                      type="submit"
                      className="rounded-md px-3.5 py-1.5 text-xs font-medium text-terracotta-deep transition hover:bg-terracotta/10"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
