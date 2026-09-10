import { createSupabaseAdminClient } from "@/lib/supabase/server";

export type SiteSettings = {
  comments_enabled: boolean;
};

const DEFAULT_SETTINGS: SiteSettings = {
  comments_enabled: true,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("comments_enabled")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      console.error("Failed to load site settings:", error.message);
      return DEFAULT_SETTINGS;
    }

    if (!data) return DEFAULT_SETTINGS;

    return {
      comments_enabled: Boolean(data.comments_enabled),
    };
  } catch (error) {
    console.error("Failed to load site settings:", error);
    return DEFAULT_SETTINGS;
  }
}
