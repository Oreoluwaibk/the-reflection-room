import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import ws from "ws";
import {
  getSupabaseAnonKey,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from "./env";

type RealtimeTransport = NonNullable<
  NonNullable<Parameters<typeof createClient>[2]>["realtime"]
>["transport"];

function createBaseClient(key: string): SupabaseClient {
  return createClient(getSupabaseUrl(), key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    realtime: {
      // Node 20 needs the `ws` package; cast for supabase-js typing.
      transport: ws as unknown as RealtimeTransport,
    },
  });
}

export function createSupabaseServerClient() {
  return createBaseClient(getSupabaseAnonKey());
}

/** Server-only client that bypasses RLS. Never import from client components. */
export function createSupabaseAdminClient() {
  const serviceKey = getSupabaseServiceRoleKey();
  if (!serviceKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY (or SERVICE_ROLE_KEY) for comment writes.",
    );
  }

  return createBaseClient(serviceKey);
}
