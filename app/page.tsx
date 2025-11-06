import { ThemeToggle } from '@/components/core/theme-toggle/theme-toggle';
import { LanguageSelector } from '@/components/core/language-selector/language-selector';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Boilerplate</div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>

        <div className="text-center space-y-6 py-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Next.js 16 Boilerplate
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade boilerplate with authentication, payments, AI, and more
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/core/en/register"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/core/en/login"
              className="px-6 py-3 border rounded-lg hover:bg-accent transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="🏗️ Core/Theme Architecture"
            description="WordPress-like separation between core and custom code"
            link="/PLAN.md"
          />
          <FeatureCard
            title="🔐 Authentication"
            description="Complete auth flow with email verification and password reset"
            link="/core/en/login"
          />
          <FeatureCard
            title="🌓 Dark Mode"
            description="Built-in dark/light theme toggle with system detection"
          />
          <FeatureCard
            title="🌍 Internationalization"
            description="Multi-language support (en, es, ar) with RTL capabilities"
          />
          <FeatureCard title="💳 Payments" description="Stripe integration with webhook support" />
          <FeatureCard
            title="🤖 AI Ready"
            description="AI chat API with caching and rate limiting"
            link="/core/en/ai/chat"
          />
          <FeatureCard title="⚡ Redis" description="Caching and session storage for performance" />
          <FeatureCard
            title="🗄️ Prisma + PostgreSQL"
            description="Type-safe database access with migrations"
          />
          <FeatureCard
            title="🔒 Security"
            description="Rate limiting, CSRF protection, secure headers"
          />
        </div>

        <div className="bg-card p-6 rounded-lg border space-y-4">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Link href="/core/api/health" className="text-primary hover:underline">
              Health Check
            </Link>
            <Link href="/core/en/register" className="text-primary hover:underline">
              Register
            </Link>
            <Link href="/core/en/login" className="text-primary hover:underline">
              Login
            </Link>
            <Link href="/core/en/profile" className="text-primary hover:underline">
              Profile
            </Link>
            <Link href="/core/en/ai/chat" className="text-primary hover:underline">
              AI Chat
            </Link>
            <Link href="/core/robots.txt" className="text-primary hover:underline">
              robots.txt
            </Link>
            <Link href="/core/sitemap.xml" className="text-primary hover:underline">
              sitemap.xml
            </Link>
            <Link href="/PLAN.md" target="_blank" className="text-primary hover:underline">
              Implementation Plan
            </Link>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p className="font-mono">npm run dev</p>
          <p>Check STATUS.md for implementation progress</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link?: string;
}) {
  const content = (
    <div className="p-6 border rounded-lg hover:border-primary/50 transition-colors h-full">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
