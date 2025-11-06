import { NextRequest } from 'next/server';
import { registerSchema } from '@/lib/core/validation/schemas';
import { hashPassword } from '@/lib/core/auth/password';
import { createVerificationToken } from '@/lib/core/auth/tokens';
import { sendEmail } from '@/lib/core/email/client';
import {
  getVerificationEmailTemplate,
  getVerificationEmailSubject,
} from '@/lib/core/email/templates/verification';
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
    const rateLimit = await rateLimiter.check(`register:${ip}`, {
      interval: 60 * 60, // 1 hour
      maxRequests: 5,
    });

    if (!rateLimit.success) {
      return rateLimitResponse('Too many registration attempts. Please try again later.');
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return validationErrorResponse(
        Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, v?.[0] || '']))
      );
    }

    const { email, password, name } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse('User with this email already exists', 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        isVerified: false,
      },
    });

    // Generate verification token
    const token = await createVerificationToken(user.id);
    const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

    // Send verification email
    await sendEmail({
      to: email,
      subject: getVerificationEmailSubject('en'),
      html: getVerificationEmailTemplate({
        name: name || undefined,
        verificationUrl,
        locale: 'en',
      }),
    });

    return successResponse(
      {
        message: 'Registration successful. Please check your email to verify your account.',
        userId: user.id,
      },
      201
    );
  } catch (error) {
    console.error('Registration error:', error);
    return errorResponse('Registration failed. Please try again.', 500);
  }
}
