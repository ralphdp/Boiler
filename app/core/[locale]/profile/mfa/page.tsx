import { AuthGuard } from '@/components/core/auth/auth-guard';
import { ThemeToggle } from '@/components/core/theme-toggle/theme-toggle';
import { LanguageSelector } from '@/components/core/language-selector/language-selector';
import { MFASetupForm } from '@/components/core/auth/mfa/mfa-setup-form';
import Link from 'next/link';

export default function MFAPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/profile" className="text-primary hover:underline">
              ← Back to Profile
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Multi-Factor Authentication</h1>
              <p className="text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <MFASetupForm />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
