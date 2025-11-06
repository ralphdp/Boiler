import { AuthGuard } from '@/components/core/auth/auth-guard';
import { ThemeToggle } from '@/components/core/theme-toggle/theme-toggle';
import { LanguageSelector } from '@/components/core/language-selector/language-selector';
import { AIChatClient } from './chat-client';

export default function AIChatPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">AI Chat</h1>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>

          <AIChatClient />
        </div>
      </div>
    </AuthGuard>
  );
}
