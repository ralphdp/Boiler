import { NextRequest } from 'next/server';
import { verifyEmailSchema } from '@/lib/core/validation/schemas';
import { verifyVerificationToken } from '@/lib/core/auth/tokens';
import prisma from '@/lib/core/prisma';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from '@/lib/core/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = verifyEmailSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(
        Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, v?.[0] || '']))
      );
    }

    const { token } = validation.data;

    // Verify token
    const result = await verifyVerificationToken(token);

    if (!result.valid || !result.userId) {
      return errorResponse('Invalid or expired verification token', 400);
    }

    // Update user as verified
    await prisma.user.update({
      where: { id: result.userId },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });

    return successResponse({
      message: 'Email verified successfully. You can now log in.',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return errorResponse('Email verification failed. Please try again.', 500);
  }
}
