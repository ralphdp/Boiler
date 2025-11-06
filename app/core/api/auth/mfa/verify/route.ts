import { NextRequest } from 'next/server';
import { mfaVerifySchema } from '@/lib/core/validation/schemas';
import { verifyTOTPCode, verifyBackupCode } from '@/lib/core/auth/mfa';
import { cache } from '@/lib/core/cache/cache';
import prisma from '@/lib/core/prisma';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from '@/lib/core/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, code, useBackupCode } = body;

    if (!userId || !code) {
      return errorResponse('Missing required fields', 400);
    }

    const validation = mfaVerifySchema.safeParse({ code });

    if (!validation.success && !useBackupCode) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(
        Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, v?.[0] || '']))
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.mfaEnabled) {
      return errorResponse('MFA not enabled for this user', 400);
    }

    let isValid = false;

    if (useBackupCode) {
      // Verify backup code
      if (!user.mfaBackupCodes) {
        return errorResponse('No backup codes available', 400);
      }

      const result = verifyBackupCode(user.mfaBackupCodes, code);
      if (result.valid && result.remainingCodes) {
        // Update backup codes (remove used one)
        await prisma.user.update({
          where: { id: userId },
          data: { mfaBackupCodes: result.remainingCodes },
        });
        isValid = true;
      }
    } else {
      // Verify based on MFA method
      if (user.mfaMethod === 'authenticator' && user.mfaSecret) {
        isValid = verifyTOTPCode(user.mfaSecret, code);
      } else if (user.mfaMethod === 'email') {
        const cachedCode = await cache.get<string>(`mfa-email:${userId}`);
        isValid = cachedCode === code;
        if (isValid) {
          await cache.delete(`mfa-email:${userId}`);
        }
      } else if (user.mfaMethod === 'sms') {
        const cachedCode = await cache.get<string>(`mfa-sms:${userId}`);
        isValid = cachedCode === code;
        if (isValid) {
          await cache.delete(`mfa-sms:${userId}`);
        }
      }
    }

    if (!isValid) {
      return errorResponse('Invalid verification code', 400);
    }

    // TODO: Complete session creation with Passport.js
    return successResponse({
      message: 'MFA verification successful',
      verified: true,
    });
  } catch (error) {
    console.error('MFA verification error:', error);
    return errorResponse('MFA verification failed', 500);
  }
}
