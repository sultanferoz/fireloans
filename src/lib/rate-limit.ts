/**
 * Best-effort in-memory sliding-window rate limiter, keyed by IP.
 *
 * This protects a single running server process. On serverless platforms
 * (Vercel functions) each instance/region has its own memory, so under real
 * concurrent load or a distributed attempt this alone won't fully hold —
 * for production-grade protection, put this behind a shared store (Upstash
 * Redis is the standard pairing for Vercel) or the platform's own edge rate
 * limiting / WAF. This is still a genuine guard against a single spammy
 * client hammering the endpoint, and costs nothing to run.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

// Periodically forget stale buckets so this doesn't grow unbounded on a long-lived process.
setInterval(
  () => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now > bucket.resetAt) buckets.delete(key);
    }
  },
  5 * 60 * 1000
).unref?.();
