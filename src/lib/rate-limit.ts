import { NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  limit: number;
  windowMs: number;
  message?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (development/fallback)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  },
  5 * 60 * 1000
);

// Get client IP address (handles Vercel and other proxies)
function getClientIP(request: NextRequest): string {
  // Vercel sets this header
  const vercelIP = request.headers.get("x-vercel-forwarded-for");
  if (vercelIP) {
    return vercelIP.split(",")[0].trim();
  }

  // Standard proxy headers (use first IP in chain)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    // Return the first IP (original client), but validate it
    const firstIP = ips[0];
    if (firstIP && /^[\d.]+$/.test(firstIP)) {
      return firstIP;
    }
  }

  // Fallback headers
  const realIP = request.headers.get("x-real-ip");
  if (realIP && /^[\d.]+$/.test(realIP)) {
    return realIP;
  }

  // Last resort
  return "127.0.0.1";
}

// Redis/KV rate limiting (production)
async function getRedisRateLimit(
  key: string,
  config: RateLimitConfig
): Promise<{ count: number; resetTime: number } | null> {
  try {
    // Check if KV store is available (Vercel KV or Redis)
    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    if (kvUrl && kvToken && process.env.NODE_ENV === "production") {
      // Use Vercel KV or Upstash Redis
      const response = await fetch(`${kvUrl}/get/${key}`, {
        headers: {
          Authorization: `Bearer ${kvToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          return JSON.parse(data.result);
        }
      }
    }
  } catch (error) {
    // Fall back to in-memory if Redis fails
    console.warn("Redis rate limit check failed, using in-memory:", error);
  }

  return null;
}

async function setRedisRateLimit(
  key: string,
  entry: RateLimitEntry,
  config: RateLimitConfig
): Promise<void> {
  try {
    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    if (kvUrl && kvToken && process.env.NODE_ENV === "production") {
      const ttl = Math.ceil(config.windowMs / 1000); // Convert to seconds

      await fetch(`${kvUrl}/set/${key}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: JSON.stringify(entry),
          ex: ttl, // Set expiration
        }),
      });
    }
  } catch (error) {
    console.warn("Redis rate limit set failed, using in-memory:", error);
  }
}

export function createRateLimit(config: RateLimitConfig) {
  return async function rateLimitMiddleware(
    request: NextRequest
  ): Promise<NextResponse> {
    const ip = getClientIP(request);
    const key = `${ip}:${request.nextUrl.pathname}`;

    const now = Date.now();
    let entry: RateLimitEntry | null = null;

    // Try Redis first (production), fall back to in-memory
    if (process.env.NODE_ENV === "production") {
      entry = await getRedisRateLimit(key, config);
    }

    // Fall back to in-memory store
    if (!entry) {
      entry = rateLimitStore.get(key) || null;
    }

    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired one
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + config.windowMs,
      };

      if (process.env.NODE_ENV === "production") {
        await setRedisRateLimit(key, newEntry, config);
      } else {
        rateLimitStore.set(key, newEntry);
      }

      return NextResponse.next();
    }

    if (entry.count >= config.limit) {
      return new NextResponse(
        JSON.stringify({
          error: config.message || "Too many requests",
          retryAfter: Math.ceil((entry.resetTime - now) / 1000),
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": Math.ceil((entry.resetTime - now) / 1000).toString(),
            "X-RateLimit-Limit": config.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": entry.resetTime.toString(),
          },
        }
      );
    }

    // Increment count
    entry.count++;
    const updatedEntry: RateLimitEntry = {
      count: entry.count,
      resetTime: entry.resetTime,
    };

    if (process.env.NODE_ENV === "production") {
      await setRedisRateLimit(key, updatedEntry, config);
    } else {
      rateLimitStore.set(key, updatedEntry);
    }

    return NextResponse.next();
  };
}

// Predefined rate limiters
export const apiRateLimit = createRateLimit({
  limit: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: "API rate limit exceeded",
});

export const authRateLimit = createRateLimit({
  limit: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: "Authentication rate limit exceeded",
});

export const contactRateLimit = createRateLimit({
  limit: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Contact form rate limit exceeded",
});

export const newsletterRateLimit = createRateLimit({
  limit: 1,
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  message: "Newsletter subscription rate limit exceeded",
});

// IP-based blocking for suspicious activity
const blockedIPs = new Set<string>();
const suspiciousActivity = new Map<
  string,
  { count: number; lastSeen: number }
>();

export function checkBlockedIP(ip: string): boolean {
  return blockedIPs.has(ip);
}

export function recordSuspiciousActivity(ip: string): void {
  const now = Date.now();
  const activity = suspiciousActivity.get(ip);

  if (!activity) {
    suspiciousActivity.set(ip, { count: 1, lastSeen: now });
    return;
  }

  // Reset if more than 1 hour has passed
  if (now - activity.lastSeen > 60 * 60 * 1000) {
    activity.count = 1;
    activity.lastSeen = now;
    return;
  }

  activity.count++;
  activity.lastSeen = now;

  // Block IP if too many suspicious activities
  if (activity.count > 10) {
    blockedIPs.add(ip);
    suspiciousActivity.delete(ip);
  }
}

// Clean up old suspicious activity records
setInterval(
  () => {
    const now = Date.now();
    for (const [ip, activity] of suspiciousActivity.entries()) {
      if (now - activity.lastSeen > 24 * 60 * 60 * 1000) {
        // 24 hours
        suspiciousActivity.delete(ip);
      }
    }
  },
  60 * 60 * 1000
); // Check every hour
