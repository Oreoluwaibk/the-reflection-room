"use server";

import { revalidatePath } from "next/cache";
import {
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
  verifyAdminLogin,
} from "@/lib/admin/auth";
import type { Comment, CommentStatus } from "@/lib/comments/types";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export type AdminActionResult =
  | { ok: true; message?: string }
  | { ok: false; message: string };

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function revalidateCommentTarget(
  targetType: string,
  targetSlug: string,
) {
  if (targetType === "reflection") {
    revalidatePath(`/reflections/${targetSlug}`);
  } else if (targetType === "book") {
    revalidatePath(`/bookshelf/${targetSlug}`);
  }
  revalidatePath("/admin");
  revalidatePath("/admin/comments");
}

export async function adminLogin(
  formData: FormData,
): Promise<AdminActionResult> {
  const username = clean(formData.get("username"));
  const password =
    typeof formData.get("password") === "string"
      ? (formData.get("password") as string)
      : "";

  const result = verifyAdminLogin(username, password);
  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  await setAdminSession(result.token);
  return { ok: true };
}

export async function adminLogout() {
  await clearAdminSession();
  revalidatePath("/admin");
  revalidatePath("/admin/comments");
}

export async function getAllCommentsForAdmin(): Promise<Comment[]> {
  if (!(await isAdminAuthenticated())) return [];

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("comments")
    .select(
      "id, target_type, target_slug, author_name, author_email, body, status, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load admin comments:", error.message);
    return [];
  }

  return (data ?? []) as Comment[];
}

export async function updateCommentStatus(
  formData: FormData,
): Promise<void> {
  if (!(await isAdminAuthenticated())) return;

  const id = clean(formData.get("id"));
  const status = clean(formData.get("status")) as CommentStatus;
  const targetType = clean(formData.get("targetType"));
  const targetSlug = clean(formData.get("targetSlug"));

  if (!id || !["pending", "approved", "rejected"].includes(status)) return;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("comments")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Failed to update comment:", error.message);
    return;
  }

  revalidateCommentTarget(targetType, targetSlug);
}

export async function deleteComment(formData: FormData): Promise<void> {
  if (!(await isAdminAuthenticated())) return;

  const id = clean(formData.get("id"));
  const targetType = clean(formData.get("targetType"));
  const targetSlug = clean(formData.get("targetSlug"));

  if (!id) return;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("comments").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete comment:", error.message);
    return;
  }

  revalidateCommentTarget(targetType, targetSlug);
}
