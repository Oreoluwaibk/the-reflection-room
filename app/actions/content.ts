"use server";

import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import {
  listFromLines,
  paragraphsFromText,
  slugify,
} from "@/lib/content/form";
import type { BookStatus } from "@/lib/content/types";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export type ContentActionResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function boolFromForm(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function revalidateContent(paths: string[]) {
  for (const path of paths) {
    revalidatePath(path);
  }
  revalidatePath("/admin");
  revalidatePath("/admin/comments");
}

async function requireAdmin(): Promise<ContentActionResult | null> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, message: "Not signed in." };
  }
  return null;
}

export async function saveReflection(
  formData: FormData,
): Promise<ContentActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = clean(formData.get("id"));
  const title = clean(formData.get("title"));
  const slugInput = clean(formData.get("slug"));
  const slug = slugify(slugInput || title);
  const excerpt = clean(formData.get("excerpt"));
  const category = clean(formData.get("category")) || "Growth";
  const date = clean(formData.get("date"));
  const author = clean(formData.get("author")) || "Isioma Anis";
  const body = paragraphsFromText(clean(formData.get("body")));
  const commentsEnabled = boolFromForm(formData, "commentsEnabled");
  const published = boolFromForm(formData, "published");

  if (!title || !slug) {
    return { ok: false, message: "Title is required." };
  }
  if (body.length === 0) {
    return {
      ok: false,
      message: "Add the reflection body (separate paragraphs with a blank line).",
    };
  }

  const payload = {
    slug,
    title,
    excerpt,
    category,
    date,
    author,
    body,
    comments_enabled: commentsEnabled,
    published,
    updated_at: new Date().toISOString(),
  };

  const supabase = createSupabaseAdminClient();
  const { error } = id
    ? await supabase.from("reflections").update(payload).eq("id", id)
    : await supabase.from("reflections").insert(payload);

  if (error) {
    console.error("Failed to save reflection:", error.message);
    if (error.code === "23505") {
      return { ok: false, message: "That slug is already in use." };
    }
    return { ok: false, message: "Could not save reflection." };
  }

  revalidateContent(["/reflections", `/reflections/${slug}`]);
  return {
    ok: true,
    message: id ? "Reflection updated." : "Reflection created.",
  };
}

export async function deleteReflection(
  formData: FormData,
): Promise<ContentActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = clean(formData.get("id"));
  const slug = clean(formData.get("slug"));
  if (!id) return { ok: false, message: "Missing reflection." };

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("reflections").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete reflection:", error.message);
    return { ok: false, message: "Could not delete reflection." };
  }

  revalidateContent(["/reflections", slug ? `/reflections/${slug}` : "/reflections"]);
  return { ok: true, message: "Reflection deleted." };
}

export async function saveBook(
  formData: FormData,
): Promise<ContentActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = clean(formData.get("id"));
  const title = clean(formData.get("title"));
  const slugInput = clean(formData.get("slug"));
  const slug = slugify(slugInput || title);
  const subtitle = clean(formData.get("subtitle"));
  const description = clean(formData.get("description"));
  const status = (clean(formData.get("status")) || "Published") as BookStatus;
  const author = clean(formData.get("author")) || "Isioma Aniugbo";
  const purchaseUrl = clean(formData.get("purchaseUrl")) || null;
  const images = listFromLines(clean(formData.get("images")));
  const about = paragraphsFromText(clean(formData.get("about")));
  const sortOrder = Number(clean(formData.get("sortOrder")) || "0");
  const commentsEnabled = boolFromForm(formData, "commentsEnabled");
  const published = boolFromForm(formData, "published");

  if (!title || !slug) {
    return { ok: false, message: "Title is required." };
  }
  if (!["Published", "Coming Soon"].includes(status)) {
    return { ok: false, message: "Invalid book status." };
  }
  if (about.length === 0) {
    return {
      ok: false,
      message: "Add book details (separate paragraphs with a blank line).",
    };
  }

  const payload = {
    slug,
    title,
    subtitle,
    description,
    status,
    author,
    purchase_url: purchaseUrl,
    images,
    about,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    comments_enabled: commentsEnabled,
    published,
    updated_at: new Date().toISOString(),
  };

  const supabase = createSupabaseAdminClient();
  const { error } = id
    ? await supabase.from("books").update(payload).eq("id", id)
    : await supabase.from("books").insert(payload);

  if (error) {
    console.error("Failed to save book:", error.message);
    if (error.code === "23505") {
      return { ok: false, message: "That slug is already in use." };
    }
    return { ok: false, message: "Could not save book." };
  }

  revalidateContent(["/bookshelf", `/bookshelf/${slug}`]);
  return { ok: true, message: id ? "Book updated." : "Book created." };
}

export async function deleteBook(
  formData: FormData,
): Promise<ContentActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = clean(formData.get("id"));
  const slug = clean(formData.get("slug"));
  if (!id) return { ok: false, message: "Missing book." };

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("books").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete book:", error.message);
    return { ok: false, message: "Could not delete book." };
  }

  revalidateContent(["/bookshelf", slug ? `/bookshelf/${slug}` : "/bookshelf"]);
  return { ok: true, message: "Book deleted." };
}

export async function toggleCommentsEnabled(
  formData: FormData,
): Promise<ContentActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const kind = clean(formData.get("kind"));
  const id = clean(formData.get("id"));
  const slug = clean(formData.get("slug"));
  const enabled = boolFromForm(formData, "enabled");

  if (!id || (kind !== "reflection" && kind !== "book")) {
    return { ok: false, message: "Invalid toggle." };
  }

  const table = kind === "reflection" ? "reflections" : "books";
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from(table)
    .update({
      comments_enabled: enabled,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to toggle comments:", error.message);
    return { ok: false, message: "Could not update comments setting." };
  }

  const path =
    kind === "reflection" ? `/reflections/${slug}` : `/bookshelf/${slug}`;
  revalidateContent([
    path,
    kind === "reflection" ? "/reflections" : "/bookshelf",
  ]);

  return {
    ok: true,
    message: enabled ? "Comments shown on page." : "Comments hidden on page.",
  };
}

export async function setSiteCommentsEnabled(
  formData: FormData,
): Promise<ContentActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const enabled = boolFromForm(formData, "enabled");
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("site_settings").upsert({
    id: 1,
    comments_enabled: enabled,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Failed to update site comments setting:", error.message);
    return {
      ok: false,
      message:
        "Could not update site comments. Run supabase/migrations/003_site_settings.sql first.",
    };
  }

  revalidatePath("/reflections", "layout");
  revalidatePath("/bookshelf", "layout");
  revalidatePath("/admin");
  revalidatePath("/admin/comments");
  return {
    ok: true,
    message: enabled
      ? "Comments are now visible on the website."
      : "Comments are now hidden on the website.",
  };
}
