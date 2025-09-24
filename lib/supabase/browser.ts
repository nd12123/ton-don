'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _supa: SupabaseClient | null = null;

/**
 * Возвращает singleton Supabase-клиента для браузера.
 * – Используем только публичные переменные.
 * – НИЧЕГО не делаем на верхнем уровне, чтобы не ронять билд/SSR.
 * – Бросаем ошибку только в браузере, если env не заданы.
 */
export function getSupabase(): SupabaseClient {
  if (_supa) return _supa;

  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // ← ПУБЛИЧНЫЙ, не service!

  if (!url || !anon) {
    // В браузере покажем понятную ошибку
    if (typeof window !== 'undefined') {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    // На сервере (во время билда/SSR) просто кидаем "мягкую" ошибку:
    // это защищает от случайного импорта client-модуля в серверный код.
    throw new Error('Client Supabase imported on the server without NEXT_PUBLIC_* env set');
  }

  _supa = createClient(url, anon, { auth: { persistSession: true } });
  return _supa;
}
