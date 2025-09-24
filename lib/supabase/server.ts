import { createClient } from '@supabase/supabase-js';

/** Админ-клиент для серверного кода (роуты, крон и т.п.). */
export function getAdminSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // ← секретный, только на сервере

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY on the server');
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
