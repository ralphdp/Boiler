import { NextRequest } from 'next/server';
import { z } from 'zod';
import { chatCompletion, ChatMessage } from '@/lib/core/ai/client';
import { rateLimiter } from '@/lib/core/rate-limit/rate-limit';
import { cache } from '@/lib/core/cache/cache';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  rateLimitResponse,
} from '@/lib/core/utils/api-response';

const chatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  conversationId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = await rateLimiter.check(`ai-chat:${ip}`, {
      interval: 60, // 1 minute
      maxRequests: 10,
    });

    if (!rateLimit.success) {
      return rateLimitResponse('Too many AI chat requests. Please try again later.');
    }

    const body = await request.json();
    const validation = chatRequestSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(
        Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, v?.[0] || '']))
      );
    }

    const { message } = validation.data;

    // Check cache for similar messages
    const cacheKey = `ai-chat:${message.toLowerCase().trim()}`;
    const cachedResponse = await cache.get<string>(cacheKey);

    if (cachedResponse) {
      return successResponse({
        message: cachedResponse,
        cached: true,
      });
    }

    // Build conversation context
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. Provide concise and accurate responses.',
      },
      {
        role: 'user',
        content: message,
      },
    ];

    // Get AI response
    const aiResponse = await chatCompletion(messages);

    // Cache response for 1 hour
    await cache.set(cacheKey, aiResponse, 3600);

    return successResponse({
      message: aiResponse,
      cached: false,
    });
  } catch (error) {
    console.error('AI chat error:', error);
    return errorResponse('AI chat request failed. Please try again.', 500);
  }
}
