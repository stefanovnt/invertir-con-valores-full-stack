// Basic fixed-window rate limiter kept in memory.
// Good enough to stop casual abuse; on serverless each instance has its own
// window, so swap for Upstash/Redis if the forms ever get hammered.

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, now = Date.now()): { allowed: boolean; retryAfter: number } {
  // Opportunistic cleanup so the map can't grow forever.
  if (hits.size > 5_000) {
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  }

  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }
  entry.count += 1;
  return {
    allowed: entry.count <= MAX_REQUESTS,
    retryAfter: Math.ceil((entry.resetAt - now) / 1000),
  };
}
