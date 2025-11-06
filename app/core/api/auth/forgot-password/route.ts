import { NextRequest } from 'next/server';
import { forgotPasswordSchema } from '@/lib/core/validation/schemas';
import { createPasswordResetToken } from '@/lib/core/auth/tokens';
import { sendEmail } from '@/lib/core/email/client';
import {
  getPasswordResetEmailTemplate,
  getPasswordResetEmailSubject,
} from '@/lib/core/email/templates/password-reset';
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
    const rateLimit = await rateLimiter.check(`forgot-password:${ip}`, {
      interval: 60 * 60, // 1 hour
      maxRequests: 3,
    });

    if (!rateLimit.success) {
      return rateLimitResponse('Too many password reset attempts. Please try again later.');
    }

    const body = await request.json();
    const validation = forgotPasswordSchema.safeParse(body);

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
        message: 'If an account exists with this email, a password reset link has been sent.',
      });
    }

    // Generate reset token
    const token = await createPasswordResetToken(user.id);
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;

    // Send password reset email
    await sendEmail({
      to: email,
      subject: getPasswordResetEmailSubject('en'),
      html: getPasswordResetEmailTemplate({
        name: user.name || undefined,
        resetUrl,
        locale: 'en',
      }),
    });

    return successResponse({
      message: 'If an account exists with this email, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return errorResponse('Password reset request failed. Please try again.', 500);
  }
}
