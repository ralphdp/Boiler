import { SetupWizard } from './setup-wizard';

export default function SetupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-4xl font-bold">Welcome to Boilerplate</h1>
          <p className="text-muted-foreground">
            Let&apos;s set up your application. This will only take a few minutes.
          </p>
        </div>

        <SetupWizard />
      </div>
    </div>
  );
}
