import { ForgotPasswordForm } from '@/components/core/auth/forgot-password-form';
import Link from 'next/link';
import { ThemeToggle } from '@/components/core/theme-toggle/theme-toggle';
import { LanguageSelector } from '@/components/core/language-selector/language-selector';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Forgot password?</h1>
          <p className="text-muted-foreground">Enter your email to receive a password reset link</p>
        </div>

        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <ForgotPasswordForm />
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
