import { randomBytes } from 'crypto';
import prisma from '../prisma';

export function generateToken(): string {
  return randomBytes(32).toString('hex');
}

export async function createVerificationToken(userId: string): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await prisma.verificationToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return token;
}

export async function verifyVerificationToken(
  token: string
): Promise<{ valid: boolean; userId?: string }> {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    return { valid: false };
  }

  if (verificationToken.expiresAt < new Date()) {
    // Token expired, delete it
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });
    return { valid: false };
  }

  // Delete token after successful verification
  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  });

  return { valid: true, userId: verificationToken.userId };
}

export async function createPasswordResetToken(userId: string): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Delete any existing password reset tokens for this user
  await prisma.passwordResetToken.deleteMany({
    where: { userId },
  });

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return token;
}

export async function verifyPasswordResetToken(
  token: string
): Promise<{ valid: boolean; userId?: string }> {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken) {
    return { valid: false };
  }

  if (resetToken.expiresAt < new Date()) {
    // Token expired, delete it
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });
    return { valid: false };
  }

  // Delete token after successful verification
  await prisma.passwordResetToken.delete({
    where: { id: resetToken.id },
  });

  return { valid: true, userId: resetToken.userId };
}
