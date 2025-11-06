import { NextRequest } from 'next/server';
import { deleteAccountSchema } from '@/lib/core/validation/schemas';
import { verifyPassword } from '@/lib/core/auth/password';
import { getSession } from '@/lib/core/auth/session';
import { sendEmail } from '@/lib/core/email/client';
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
    const validation = deleteAccountSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(
        Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, v?.[0] || '']))
      );
    }

    const { password } = validation.data;

    // Get user
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

    // Delete all related data in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete verification tokens
      await tx.verificationToken.deleteMany({
        where: { userId: user.id },
      });

      // Delete password reset tokens
      await tx.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });

      // TODO: Delete Stripe customer if exists
      // TODO: Delete other related records (orders, sessions, etc.)

      // Finally, delete the user
      await tx.user.delete({
        where: { id: user.id },
      });
    });

    // Send deletion confirmation email
    try {
      await sendEmail({
        to: user.email,
        subject: 'Account Deleted',
        html: `
          <h1>Account Deleted</h1>
          <p>Your account has been permanently deleted as requested.</p>
          <p>All your data has been removed from our system in compliance with GDPR.</p>
          <p>If you did not request this, please contact support immediately.</p>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send deletion email:', emailError);
      // Don't fail the deletion if email fails
    }

    // TODO: Destroy session

    return successResponse({
      message: 'Account deleted successfully',
    });
  } catch (error) {
    console.error('Account deletion error:', error);
    return errorResponse('Failed to delete account', 500);
  }
}
