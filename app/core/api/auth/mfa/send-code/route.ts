import { NextRequest } from 'next/server';
import { generateMFACode } from '@/lib/core/auth/mfa';
import { sendEmail } from '@/lib/core/email/client';
import {
  getMFACodeEmailTemplate,
  getMFACodeEmailSubject,
} from '@/lib/core/email/templates/mfa-code';
import { rateLimiter } from '@/lib/core/rate-limit/rate-limit';
import { cache } from '@/lib/core/cache/cache';
import prisma from '@/lib/core/prisma';
import { successResponse, errorResponse, rateLimitResponse } from '@/lib/core/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, method } = body;

    if (!userId || !method) {
      return errorResponse('Missing required fields', 400);
    }

    // Rate limiting
    const rateLimit = await rateLimiter.check(`mfa-send:${userId}`, {
      interval: 60, // 1 minute
      maxRequests: 3,
    });

    if (!rateLimit.success) {
      return rateLimitResponse('Too many MFA code requests. Please try again later.');
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    const code = generateMFACode();

    if (method === 'email') {
      // Store code in cache (10 minutes)
      await cache.set(`mfa-email:${userId}`, code, 600);

      // Send email
      await sendEmail({
        to: user.email,
        subject: getMFACodeEmailSubject('en'),
        html: getMFACodeEmailTemplate({
          name: user.name || undefined,
          code,
          locale: 'en',
        }),
      });

      return successResponse({
        message: 'Verification code sent to your email',
      });
    }

    if (method === 'sms') {
      // Store code in cache (10 minutes)
      await cache.set(`mfa-sms:${userId}`, code, 600);

      // TODO: Send SMS with Twilio
      console.log(`SMS code for ${user.mfaPhoneNumber}: ${code}`);

      return successResponse({
        message: 'Verification code sent to your phone',
      });
    }

    return errorResponse('Invalid MFA method', 400);
  } catch (error) {
    console.error('MFA send code error:', error);
    return errorResponse('Failed to send verification code', 500);
  }
}
