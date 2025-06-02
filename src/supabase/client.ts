import { createClient } from "@supabase/supabase-js";

// Centralized Supabase client instance for server-side usage
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;
