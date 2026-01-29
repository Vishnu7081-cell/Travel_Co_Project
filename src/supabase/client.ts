import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nnjovkzsomtxccsswhwl.supabase.co";
const supabaseAnonKey =
  "sb_publishable_ODW1j47yl63r1CCUpkTrcw_8BY8LIWn";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
);