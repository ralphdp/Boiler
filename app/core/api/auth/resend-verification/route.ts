import { NextRequest } from 'next/server';
import { resendVerificationSchema } from '@/lib/core/validation/schemas';
import { createVerificationToken } from '@/lib/core/auth/tokens';
import { sendEmail } from '@/lib/core/email/client';
import {
  getVerificationEmailTemplate,
  getVerificationEmailSubject,
} from '@/lib/core/email/templates/verification';
import { rateLimiter } from '@/lib/core/rate-limit/rate-limit';
import prisma from '@/lib/core/prisma';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  rateLimitResponse,
} from '@/lib/core/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = await rateLimiter.check(`resend-verification:${ip}`, {
      interval: 60 * 15, // 15 minutes
      maxRequests: 3,
    });

    if (!rateLimit.success) {
      return rateLimitResponse('Too many verification requests. Please try again later.');
    }

    const body = await request.json();
    const validation = resendVerificationSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(
        Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, v?.[0] || '']))
      );
    }

    const { email } = validation.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return successResponse({
        message:
          'If an account exists with this email and is unverified, a verification email has been sent.',
      });
    }

    // Check if already verified
    if (user.isVerified) {
      return errorResponse('Email is already verified', 400);
    }

    // Delete existing verification tokens
    await prisma.verificationToken.deleteMany({
      where: { userId: user.id },
    });

    // Generate new verification token
    const token = await createVerificationToken(user.id);
    const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

    // Send verification email
    await sendEmail({
      to: email,
      subject: getVerificationEmailSubject('en'),
      html: getVerificationEmailTemplate({
        name: user.name || undefined,
        verificationUrl,
        locale: 'en',
      }),
    });

    return successResponse({
      message:
        'If an account exists with this email and is unverified, a verification email has been sent.',
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return errorResponse('Failed to resend verification email. Please try again.', 500);
  }
}
