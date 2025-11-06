import { NextRequest } from 'next/server';
import { loginSchema } from '@/lib/core/validation/schemas';
import { verifyPassword } from '@/lib/core/auth/password';
import { rateLimiter } from '@/lib/core/rate-limit/rate-limit';
import prisma from '@/lib/core/prisma';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  rateLimitResponse,
  unauthorizedResponse,
} from '@/lib/core/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = await rateLimiter.check(`login:${ip}`, {
      interval: 60 * 15, // 15 minutes
      maxRequests: 5,
    });

    if (!rateLimit.success) {
      return rateLimitResponse('Too many login attempts. Please try again later.');
    }

    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(
        Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, v?.[0] || '']))
      );
    }

    const { email, password } = validation.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return unauthorizedResponse('Invalid email or password');
    }

    // Check if email is verified
    if (!user.isVerified) {
      return errorResponse('Please verify your email before logging in', 403);
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return unauthorizedResponse('Invalid email or password');
    }

    // Check if MFA is enabled
    if (user.mfaEnabled) {
      // TODO: In a full implementation, create temporary session and redirect to MFA page
      // For now, return a flag indicating MFA is required
      return successResponse({
        mfaRequired: true,
        userId: user.id,
        message: 'MFA verification required',
      });
    }

    // TODO: Create session with Passport.js
    // For now, return success with user data
    return successResponse({
      mfaRequired: false,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('Login failed. Please try again.', 500);
  }
}
