import redis from '../redis/client';

export interface RateLimitConfig {
  interval: number; // in seconds
  maxRequests: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export class RateLimiter {
  private prefix: string;

  constructor(prefix: string = 'ratelimit') {
    this.prefix = prefix;
  }

  async check(
    identifier: string,
    config: RateLimitConfig
  ): Promise<RateLimitResult> {
    const key = `${this.prefix}:${identifier}`;
    const now = Date.now();
    const windowStart = now - config.interval * 1000;

    try {
      // Remove old entries
      await redis.zremrangebyscore(key, 0, windowStart);

      // Count current requests
      const count = await redis.zcard(key);

      if (count >= config.maxRequests) {
        const oldestEntry = await redis.zrange(key, 0, 0, 'WITHSCORES');
        const reset = oldestEntry[1] ? parseInt(oldestEntry[1]) + config.interval * 1000 : now + config.interval * 1000;

        return {
          success: false,
          limit: config.maxRequests,
          remaining: 0,
          reset: Math.ceil(reset / 1000),
        };
      }

      // Add new entry
      await redis.zadd(key, now, `${now}-${Math.random()}`);
      await redis.expire(key, config.interval);

      return {
        success: true,
        limit: config.maxRequests,
        remaining: config.maxRequests - count - 1,
        reset: Math.ceil((now + config.interval * 1000) / 1000),
      };
    } catch (error) {
      console.error('Rate limit error:', error);
      // On error, allow the request
      return {
        success: true,
        limit: config.maxRequests,
        remaining: config.maxRequests - 1,
        reset: Math.ceil((now + config.interval * 1000) / 1000),
      };
    }
  }
}

export const rateLimiter = new RateLimiter();
export default rateLimiter;

