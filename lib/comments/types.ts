export type CommentTargetType = "reflection" | "book";

export type CommentStatus = "pending" | "approved" | "rejected";

export type Comment = {
  id: string;
  target_type: CommentTargetType;
  target_slug: string;
  author_name: string;
  author_email: string | null;
  body: string;
  status: CommentStatus;
  created_at: string;
};

export type PublicComment = Pick<
  Comment,
  "id" | "author_name" | "body" | "created_at"
>;
