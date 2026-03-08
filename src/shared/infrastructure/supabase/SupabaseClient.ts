import { createClient, SupabaseClient } from '@supabase/supabase-js';

export function createSupabaseClient(): SupabaseClient {
  const url = import.meta.env.VITE_SUPABASE_URL as string;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
  return createClient(url, key);
}
