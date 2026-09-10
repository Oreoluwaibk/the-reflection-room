"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type {
  CommentTargetType,
  PublicComment,
} from "@/lib/comments/types";

const NAME_MAX = 80;
const BODY_MAX = 2000;

export type CommentActionResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function getApprovedComments(
  targetType: CommentTargetType,
  targetSlug: string,
): Promise<PublicComment[]> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("comments")
      .select("id, author_name, body, created_at")
      .eq("target_type", targetType)
      .eq("target_slug", targetSlug)
      .eq("status", "approved")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to load comments:", error.message);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Failed to load comments:", error);
    return [];
  }
}

export async function submitComment(
  formData: FormData,
): Promise<CommentActionResult> {
  const targetType = clean(formData.get("targetType")) as CommentTargetType;
  const targetSlug = clean(formData.get("targetSlug"));
  const authorName = clean(formData.get("authorName"));
  const authorEmail = clean(formData.get("authorEmail"));
  const body = clean(formData.get("body"));
  const honeypot = clean(formData.get("website"));

  if (honeypot) {
    return { ok: true, message: "Thank you — your comment was received." };
  }

  if (targetType !== "reflection" && targetType !== "book") {
    return { ok: false, message: "Invalid comment target." };
  }

  if (!targetSlug) {
    return { ok: false, message: "Missing page reference." };
  }

  if (!authorName || authorName.length > NAME_MAX) {
    return {
      ok: false,
      message: `Please enter your name (up to ${NAME_MAX} characters).`,
    };
  }

  if (!body || body.length > BODY_MAX) {
    return {
      ok: false,
      message: `Please write a comment (up to ${BODY_MAX} characters).`,
    };
  }

  if (authorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
    return {
      ok: false,
      message: "Please enter a valid email, or leave it blank.",
    };
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("comments").insert({
      target_type: targetType,
      target_slug: targetSlug,
      author_name: authorName,
      author_email: authorEmail || null,
      body,
      status: "pending",
    });

    if (error) {
      console.error("Failed to submit comment:", error.message);
      return {
        ok: false,
        message:
          "Could not save your comment. Please try again in a moment.",
      };
    }
  } catch (error) {
    console.error("Failed to submit comment:", error);
    return {
      ok: false,
      message: "Could not save your comment. Please try again in a moment.",
    };
  }

  if (targetType === "reflection") {
    revalidatePath(`/reflections/${targetSlug}`);
  } else {
    revalidatePath(`/bookshelf/${targetSlug}`);
  }

  return {
    ok: true,
    message:
      "Thank you — your comment was received and will appear after review.",
  };
}
