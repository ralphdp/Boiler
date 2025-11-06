import { ResendVerificationForm } from '@/components/core/auth/resend-verification-form';
import Link from 'next/link';
import { ThemeToggle } from '@/components/core/theme-toggle/theme-toggle';
import { LanguageSelector } from '@/components/core/language-selector/language-selector';

export default function ResendVerificationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Resend verification email</h1>
          <p className="text-muted-foreground">
            Enter your email to receive a new verification link
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <ResendVerificationForm />
        </div>

        <p className="text-center text-sm text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
