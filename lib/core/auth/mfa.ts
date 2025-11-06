import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { randomBytes } from 'crypto';

export async function generateTOTPSecret(
  email: string
): Promise<{ secret: string; otpauthUrl: string; qrCode: string }> {
  const secret = speakeasy.generateSecret({
    name: `Boilerplate (${email})`,
    length: 32,
  });

  const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url!,
    qrCode,
  };
}

export function verifyTOTPCode(secret: string, code: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: code,
    window: 2, // Allow 2 time steps before/after for clock skew
  });
}

export function generateBackupCodes(count: number = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = randomBytes(4).toString('hex').toUpperCase();
    codes.push(code);
  }
  return codes;
}

export function generateMFACode(): string {
  // Generate 6-digit code
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function hashBackupCodes(codes: string[]): string {
  // In production, you should hash these codes individually
  // For simplicity, we're storing them as JSON
  return JSON.stringify(codes);
}

export function parseBackupCodes(hashedCodes: string): string[] {
  try {
    return JSON.parse(hashedCodes);
  } catch {
    return [];
  }
}

export function verifyBackupCode(
  hashedCodes: string,
  code: string
): { valid: boolean; remainingCodes?: string } {
  const codes = parseBackupCodes(hashedCodes);
  const index = codes.findIndex((c) => c === code.toUpperCase());

  if (index === -1) {
    return { valid: false };
  }

  // Remove used code
  codes.splice(index, 1);

  return {
    valid: true,
    remainingCodes: JSON.stringify(codes),
  };
}
