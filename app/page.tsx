import { ThemeToggle } from '@/components/core/theme-toggle/theme-toggle';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Boilerplate
          </h1>
          <p className="text-xl text-muted-foreground">
            Next.js 16 · TypeScript · Prisma · Redis · Stripe · AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Core/Theme Architecture"
            description="WordPress-like separation between core and custom code"
          />
          <FeatureCard
            title="Authentication"
            description="Passport.js with MFA support (Email, TOTP, SMS)"
          />
          <FeatureCard
            title="Dark Mode"
            description="Built-in dark/light theme toggle with system detection"
          />
          <FeatureCard
            title="Internationalization"
            description="Multi-language support with RTL capabilities"
          />
          <FeatureCard
            title="Payments"
            description="Stripe integration with webhook support"
          />
          <FeatureCard
            title="AI Ready"
            description="AI chat API with caching and rate limiting"
          />
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Visit <code className="px-2 py-1 bg-muted rounded">/api/health</code> to check system status</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 border rounded-lg hover:border-primary/50 transition-colors">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
