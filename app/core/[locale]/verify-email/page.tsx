import Link from 'next/link';
import { ThemeToggle } from '@/components/core/theme-toggle/theme-toggle';
import { LanguageSelector } from '@/components/core/language-selector/language-selector';
import { VerifyEmailClient } from './verify-email-client';

interface VerifyEmailPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 right-4 flex items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
            <h3 className="font-semibold text-destructive mb-2">Invalid Link</h3>
            <p className="text-sm text-destructive/80">
              This verification link is invalid or has expired.
            </p>
          </div>
          <Link
            href="/resend-verification"
            className="block w-full px-4 py-2 bg-primary text-primary-foreground text-center rounded-md hover:bg-primary/90 transition-colors"
          >
            Resend Verification Email
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <VerifyEmailClient token={token} />
    </div>
  );
}
