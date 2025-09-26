// lib/supabase/browser.ts
"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _supa: SupabaseClient | null = null;

/**
 * Возвращает singleton Supabase-клиента для БРАУЗЕРА.
 * - Использует ТОЛЬКО публичные переменные NEXT_PUBLIC_*
 * - Не создаётся на верхнем уровне (чтобы не рушить билд/SSR)
 * - Если env не заданы — бросаем ошибку в браузере (а не при билде)
 */
export function getSupabaseBrowser(): SupabaseClient {
  if (_supa) return _supa;

  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    // в браузере покажем понятную ошибку
    if (typeof window !== "undefined") {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    }
    // если внезапно импортнули на сервере — пусть не валит билд
    throw new Error("Client supabase imported on server without NEXT_PUBLIC_* env");
  }

  _supa = createClient(url, anon, { auth: { persistSession: true } });
  return _supa;
}
