import { NextRequest } from 'next/server';
import { mfaVerifySchema } from '@/lib/core/validation/schemas';
import { verifyTOTPCode, generateBackupCodes, hashBackupCodes } from '@/lib/core/auth/mfa';
import { getSession } from '@/lib/core/auth/session';
import { cache } from '@/lib/core/cache/cache';
import prisma from '@/lib/core/prisma';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedResponse,
} from '@/lib/core/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return unauthorizedResponse('Not authenticated');
    }

    const body = await request.json();
    const validation = mfaVerifySchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(
        Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, v?.[0] || '']))
      );
    }

    const { code } = validation.data;

    // Get setup data from cache
    const totpSecret = await cache.get<string>(`mfa-setup:${session.userId}`);
    const emailSetup = await cache.get<string>(`mfa-email-setup:${session.userId}`);
    const smsSetup = await cache.get<{ code: string; phoneNumber: string }>(
      `mfa-sms-setup:${session.userId}`
    );

    let method: string | null = null;
    let isValid = false;
    let phoneNumber: string | null = null;
    let secret: string | null = null;

    // Verify TOTP code
    if (totpSecret) {
      isValid = verifyTOTPCode(totpSecret, code);
      if (isValid) {
        method = 'authenticator';
        secret = totpSecret;
      }
    }

    // Verify email code
    if (!isValid && emailSetup && emailSetup === code) {
      isValid = true;
      method = 'email';
    }

    // Verify SMS code
    if (!isValid && smsSetup && smsSetup.code === code) {
      isValid = true;
      method = 'sms';
      phoneNumber = smsSetup.phoneNumber;
    }

    if (!isValid || !method) {
      return errorResponse('Invalid verification code', 400);
    }

    // Generate backup codes
    const backupCodes = generateBackupCodes();
    const hashedBackupCodes = hashBackupCodes(backupCodes);

    // Update user with MFA settings
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        mfaEnabled: true,
        mfaMethod: method,
        mfaSecret: secret,
        mfaPhoneNumber: phoneNumber,
        mfaBackupCodes: hashedBackupCodes,
        mfaVerified: true,
      },
    });

    // Clear cache
    await cache.delete(`mfa-setup:${session.userId}`);
    await cache.delete(`mfa-email-setup:${session.userId}`);
    await cache.delete(`mfa-sms-setup:${session.userId}`);

    return successResponse({
      message: 'MFA enabled successfully',
      backupCodes,
      method,
    });
  } catch (error) {
    console.error('MFA verify setup error:', error);
    return errorResponse('MFA verification failed', 500);
  }
}
