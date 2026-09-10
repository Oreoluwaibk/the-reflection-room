import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Book, Reflection } from "./types";

const REFLECTION_FIELDS =
  "id, slug, title, excerpt, category, date, author, body, comments_enabled, published, created_at, updated_at";

const BOOK_FIELDS =
  "id, slug, title, subtitle, description, status, author, purchase_url, images, about, comments_enabled, published, sort_order, created_at, updated_at";

export async function getPublishedReflections(): Promise<Reflection[]> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("reflections")
      .select(REFLECTION_FIELDS)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load reflections:", error.message);
      return [];
    }

    return (data ?? []) as Reflection[];
  } catch (error) {
    console.error("Failed to load reflections:", error);
    return [];
  }
}

export async function getReflectionBySlug(
  slug: string,
  options?: { includeUnpublished?: boolean },
): Promise<Reflection | null> {
  try {
    const supabase = createSupabaseAdminClient();
    let query = supabase
      .from("reflections")
      .select(REFLECTION_FIELDS)
      .eq("slug", slug);

    if (!options?.includeUnpublished) {
      query = query.eq("published", true);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("Failed to load reflection:", error.message);
      return null;
    }

    return data as Reflection | null;
  } catch (error) {
    console.error("Failed to load reflection:", error);
    return null;
  }
}

export async function getAllReflectionsForAdmin(): Promise<Reflection[]> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("reflections")
      .select(REFLECTION_FIELDS)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load admin reflections:", error.message);
      return [];
    }

    return (data ?? []) as Reflection[];
  } catch (error) {
    console.error("Failed to load admin reflections:", error);
    return [];
  }
}

export async function getPublishedBooks(): Promise<Book[]> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("books")
      .select(BOOK_FIELDS)
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to load books:", error.message);
      return [];
    }

    return (data ?? []) as Book[];
  } catch (error) {
    console.error("Failed to load books:", error);
    return [];
  }
}

export async function getBookBySlug(
  slug: string,
  options?: { includeUnpublished?: boolean },
): Promise<Book | null> {
  try {
    const supabase = createSupabaseAdminClient();
    let query = supabase.from("books").select(BOOK_FIELDS).eq("slug", slug);

    if (!options?.includeUnpublished) {
      query = query.eq("published", true);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("Failed to load book:", error.message);
      return null;
    }

    return data as Book | null;
  } catch (error) {
    console.error("Failed to load book:", error);
    return null;
  }
}

export async function getAllBooksForAdmin(): Promise<Book[]> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("books")
      .select(BOOK_FIELDS)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to load admin books:", error.message);
      return [];
    }

    return (data ?? []) as Book[];
  } catch (error) {
    console.error("Failed to load admin books:", error);
    return [];
  }
}

export async function getContentTitleMap(): Promise<Record<string, string>> {
  const [reflections, books] = await Promise.all([
    getAllReflectionsForAdmin(),
    getAllBooksForAdmin(),
  ]);

  const map: Record<string, string> = {};
  for (const post of reflections) {
    map[`reflection:${post.slug}`] = post.title;
  }
  for (const book of books) {
    map[`book:${book.slug}`] = book.title;
  }
  return map;
}
