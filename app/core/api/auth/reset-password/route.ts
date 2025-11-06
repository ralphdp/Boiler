import { NextRequest } from 'next/server';
import { resetPasswordSchema } from '@/lib/core/validation/schemas';
import { verifyPasswordResetToken } from '@/lib/core/auth/tokens';
import { hashPassword } from '@/lib/core/auth/password';
import prisma from '@/lib/core/prisma';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from '@/lib/core/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = resetPasswordSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(
        Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, v?.[0] || '']))
      );
    }

    const { token, password } = validation.data;

    // Verify token
    const result = await verifyPasswordResetToken(token);

    if (!result.valid || !result.userId) {
      return errorResponse('Invalid or expired password reset token', 400);
    }

    // Hash new password
    const hashedPassword = await hashPassword(password);

    // Update user password
    await prisma.user.update({
      where: { id: result.userId },
      data: {
        password: hashedPassword,
      },
    });

    return successResponse({
      message: 'Password reset successfully. You can now log in with your new password.',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return errorResponse('Password reset failed. Please try again.', 500);
  }
}
