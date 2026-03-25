import { supabaseAdmin } from '@/src/lib/supabase';

declare global {
  // Throttle in-memory to avoid hammering Supabase with frequent visitors.
  // Works best with a warm Node process; harmless if the runtime is recycled.
  // eslint-disable-next-line no-var
  var __LCI_SUPABASE_KEEPALIVE_LAST_TS__: number | undefined;
}

const KEEPALIVE_MIN_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

export async function keepSupabaseAlive(): Promise<void> {
  const now = Date.now();
  const last = globalThis.__LCI_SUPABASE_KEEPALIVE_LAST_TS__;

  if (typeof last === 'number' && now - last < KEEPALIVE_MIN_INTERVAL_MS) {
    return;
  }

  globalThis.__LCI_SUPABASE_KEEPALIVE_LAST_TS__ = now;

  // Lightweight query: just to keep DB connection / activity alive.
  // Service-role key bypasses RLS.
  try {
    const { error } = await supabaseAdmin
      .from('routes')
      .select('id')
      .limit(1);

    // No logging on purpose: avoid console noise and user-visible output.
    if (error) return;
  } catch {
    // Swallow errors to keep the homepage stable.
  }
}

