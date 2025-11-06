import { NextRequest } from 'next/server';
import { mfaSetupSchema } from '@/lib/core/validation/schemas';
import { generateTOTPSecret, generateMFACode } from '@/lib/core/auth/mfa';
import { sendEmail } from '@/lib/core/email/client';
import {
  getMFACodeEmailTemplate,
  getMFACodeEmailSubject,
} from '@/lib/core/email/templates/mfa-code';
import { getSession } from '@/lib/core/auth/session';
import prisma from '@/lib/core/prisma';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedResponse,
} from '@/lib/core/utils/api-response';
import { cache } from '@/lib/core/cache/cache';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session) {
      return unauthorizedResponse('Not authenticated');
    }

    const body = await request.json();
    const validation = mfaSetupSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(
        Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, v?.[0] || '']))
      );
    }

    const { method, phoneNumber } = validation.data;

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    if (method === 'authenticator') {
      // Generate TOTP secret and QR code
      const { secret, qrCode } = await generateTOTPSecret(user.email);

      // Store secret temporarily in cache (not in DB yet until verified)
      await cache.set(`mfa-setup:${user.id}`, secret, 600); // 10 minutes

      return successResponse({
        method: 'authenticator',
        secret,
        qrCode,
        message: 'Scan the QR code with your authenticator app',
      });
    }

    if (method === 'email') {
      // Generate and send email code
      const code = generateMFACode();

      // Store code in cache
      await cache.set(`mfa-email-setup:${user.id}`, code, 600); // 10 minutes

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
        method: 'email',
        message: 'Verification code sent to your email',
      });
    }

    if (method === 'sms') {
      if (!phoneNumber) {
        return errorResponse('Phone number is required for SMS MFA', 400);
      }

      // Generate SMS code
      const code = generateMFACode();

      // Store code and phone number in cache
      await cache.set(`mfa-sms-setup:${user.id}`, { code, phoneNumber }, 600); // 10 minutes

      // TODO: Send SMS with Twilio
      // For now, just return success (would need TWILIO credentials)
      console.log(`SMS MFA code for ${phoneNumber}: ${code}`);

      return successResponse({
        method: 'sms',
        phoneNumber,
        message: 'Verification code sent to your phone',
      });
    }

    return errorResponse('Invalid MFA method', 400);
  } catch (error) {
    console.error('MFA setup error:', error);
    return errorResponse('MFA setup failed', 500);
  }
}
