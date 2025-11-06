import { NextRequest } from 'next/server';
import { getSession } from '@/lib/core/auth/session';
import prisma from '@/lib/core/prisma';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from '@/lib/core/utils/api-response';

export async function GET() {
  try {
    // Get session (placeholder - will be implemented with Passport.js)
    const session = await getSession();

    if (!session) {
      return unauthorizedResponse('Not authenticated');
    }

    // Get user profile
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        name: true,
        isVerified: true,
        mfaEnabled: true,
        mfaMethod: true,
        createdAt: true,
      },
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    return successResponse(user);
  } catch (error) {
    console.error('Get profile error:', error);
    return errorResponse('Failed to get profile', 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Get session
    const session = await getSession();

    if (!session) {
      return unauthorizedResponse('Not authenticated');
    }

    const body = await request.json();

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...(body.name && { name: body.name }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        isVerified: true,
        mfaEnabled: true,
        mfaMethod: true,
      },
    });

    return successResponse(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    return errorResponse('Failed to update profile', 500);
  }
}
