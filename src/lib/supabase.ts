import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "[Supabase] Missing env vars. Copy .env.example → .env.local and fill in your project URL and anon key."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ── Waitlist API ──────────────────────────────────────────────────────────────

export interface WaitlistEntry {
  full_name:       string;
  email:           string;
  phone:           string;
  city:            string;
  preferred_lang:  "pt" | "en";
}

export type WaitlistResult =
  | { ok: true }
  | { ok: false; duplicate: boolean; message: string };

export async function joinWaitlist(entry: WaitlistEntry): Promise<WaitlistResult> {
  // Check for duplicate email first
  const { data: existing } = await supabase
    .from("waitlist")
    .select("id")
    .eq("email", entry.email.toLowerCase().trim())
    .maybeSingle();

  if (existing) {
    return { ok: false, duplicate: true, message: "duplicate" };
  }

  const { error } = await supabase.from("waitlist").insert({
    full_name:      entry.full_name.trim(),
    email:          entry.email.toLowerCase().trim(),
    phone:          entry.phone.trim(),
    city:           entry.city.trim(),
    preferred_lang: entry.preferred_lang,
  });

  if (error) {
    return { ok: false, duplicate: false, message: error.message };
  }

  return { ok: true };
}
