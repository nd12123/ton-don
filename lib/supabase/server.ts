// lib/supabase/server.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

/**
 * Возвращает singleton Supabase-клиента.
 * Инициализируем только при первом вызове (в рантайме), а не на уровне модуля.
 */
export function getSupabaseServer(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // На сервере предпочтительно SERVICE_ROLE (если он реально нужен),
  // иначе можно падать обратно на ANON.
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    // ВАЖНО: не бросаем это при импорте модуля.
    // Бросаем только когда реально вызвали в рантайме (запрос пришёл).
    throw new Error('Supabase env vars missing at runtime');
  }

  _client = createClient(url, key, {
    auth: { persistSession: false },
  });
  return _client;
}
