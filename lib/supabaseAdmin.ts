// lib/supabaseAdmin.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Клиент "на любые схемы", а не только "public"
type AnySupa = SupabaseClient<any, any, any>;

export function getSupabaseAdmin(schema?: string): AnySupa | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  // Не создаём клиента на уровне модуля — только здесь (лениво)
  return createClient(url, key, schema ? { db: { schema } } : undefined) as AnySupa;
}
