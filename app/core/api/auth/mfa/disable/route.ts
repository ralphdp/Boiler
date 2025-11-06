import { NextRequest } from 'next/server';
import { getSession } from '@/lib/core/auth/session';
import { verifyPassword } from '@/lib/core/auth/password';
import prisma from '@/lib/core/prisma';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from '@/lib/core/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return unauthorizedResponse('Not authenticated');
    }

    const body = await request.json();
    const { password } = body;

    if (!password) {
      return errorResponse('Password is required to disable MFA', 400);
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return errorResponse('Invalid password', 401);
    }

    // Disable MFA
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        mfaEnabled: false,
        mfaMethod: null,
        mfaSecret: null,
        mfaPhoneNumber: null,
        mfaBackupCodes: null,
        mfaVerified: false,
      },
    });

    return successResponse({
      message: 'MFA disabled successfully',
    });
  } catch (error) {
    console.error('MFA disable error:', error);
    return errorResponse('Failed to disable MFA', 500);
  }
}
