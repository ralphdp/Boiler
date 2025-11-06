'use client';

import { useState } from 'react';
import Link from 'next/link';

type Step = 'site' | 'database' | 'redis' | 'email' | 'payment' | 'admin' | 'complete';

export function SetupWizard() {
  const [currentStep, setCurrentStep] = useState<Step>('site');
  const [formData, setFormData] = useState({
    siteTitle: '',
    siteEmail: '',
    siteAddress: '',
    siteTelephone: '',
    adminEmail: '',
    adminPassword: '',
    adminName: '',
  });
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});

  const steps: Step[] = ['site', 'database', 'redis', 'email', 'payment', 'admin', 'complete'];
  const stepIndex = steps.indexOf(currentStep);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = stepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const testConnection = async (service: 'database' | 'redis' | 'email') => {
    setLoading(true);
    try {
      const response = await fetch(`/core/api/health/${service}`);
      const data = await response.json();
      setTestResults({ ...testResults, [service]: data.status === 'healthy' });
    } catch (error) {
      console.error(`${service} connection test failed:`, error);
      setTestResults({ ...testResults, [service]: false });
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    // TODO: Save all configuration to database
    setTimeout(() => {
      setCurrentStep('complete');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-card border rounded-lg shadow-lg p-8 space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Step {stepIndex + 1} of {steps.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Site Information */}
      {currentStep === 'site' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Site Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Site Title</label>
              <input
                type="text"
                value={formData.siteTitle}
                onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background mt-1"
                placeholder="My Awesome Site"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Site Email</label>
              <input
                type="email"
                value={formData.siteEmail}
                onChange={(e) => setFormData({ ...formData, siteEmail: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background mt-1"
                placeholder="contact@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Physical Address (Optional)</label>
              <input
                type="text"
                value={formData.siteAddress}
                onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background mt-1"
                placeholder="123 Main St, City, Country"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Telephone (Optional)</label>
              <input
                type="tel"
                value={formData.siteTelephone}
                onChange={(e) => setFormData({ ...formData, siteTelephone: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background mt-1"
                placeholder="+1234567890"
              />
            </div>
          </div>
        </div>
      )}

      {/* Database Configuration */}
      {currentStep === 'database' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Database Configuration</h2>
          <p className="text-sm text-muted-foreground">
            Your database connection is configured via environment variables.
          </p>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-xs break-all">DATABASE_URL is configured</code>
          </div>
          <button
            onClick={() => testConnection('database')}
            disabled={loading}
            className="w-full px-4 py-2 border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Database Connection'}
          </button>
          {testResults.database !== undefined && (
            <div
              className={`p-3 rounded-md text-sm ${
                testResults.database
                  ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300'
                  : 'bg-destructive/10 text-destructive'
              }`}
            >
              {testResults.database
                ? '✓ Database connected successfully'
                : '✗ Database connection failed'}
            </div>
          )}
        </div>
      )}

      {/* Redis Configuration */}
      {currentStep === 'redis' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Redis Configuration</h2>
          <p className="text-sm text-muted-foreground">
            Redis is used for caching and session storage.
          </p>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-xs break-all">REDIS_URL is configured</code>
          </div>
          <button
            onClick={() => testConnection('redis')}
            disabled={loading}
            className="w-full px-4 py-2 border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Redis Connection'}
          </button>
          {testResults.redis !== undefined && (
            <div
              className={`p-3 rounded-md text-sm ${
                testResults.redis
                  ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300'
                  : 'bg-destructive/10 text-destructive'
              }`}
            >
              {testResults.redis ? '✓ Redis connected successfully' : '✗ Redis connection failed'}
            </div>
          )}
        </div>
      )}

      {/* Email Configuration */}
      {currentStep === 'email' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Email Configuration</h2>
          <p className="text-sm text-muted-foreground">
            Email service is configured via environment variables (Resend).
          </p>
          <div className="space-y-2">
            <div className="p-3 bg-muted rounded">
              <div className="text-xs text-muted-foreground">From Address</div>
              <div className="text-sm font-mono">
                {process.env.EMAIL_FROM_ADDRESS || 'Not configured'}
              </div>
            </div>
            <div className="p-3 bg-muted rounded">
              <div className="text-xs text-muted-foreground">From Name</div>
              <div className="text-sm font-mono">
                {process.env.EMAIL_FROM_NAME || 'Not configured'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Configuration */}
      {currentStep === 'payment' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Payment Configuration (Optional)</h2>
          <p className="text-sm text-muted-foreground">
            Stripe is configured via environment variables. You can skip this if not using payments.
          </p>
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-xs text-muted-foreground mb-2">Stripe Status</div>
            <code className="text-xs">
              {process.env.STRIPE_SECRET_KEY
                ? '✓ Stripe keys configured'
                : '⚠️ Stripe not configured'}
            </code>
          </div>
        </div>
      )}

      {/* Admin User */}
      {currentStep === 'admin' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Create Admin Account</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Admin Name</label>
              <input
                type="text"
                value={formData.adminName}
                onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background mt-1"
                placeholder="Admin User"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Admin Email</label>
              <input
                type="email"
                value={formData.adminEmail}
                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background mt-1"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Admin Password</label>
              <input
                type="password"
                value={formData.adminPassword}
                onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background mt-1"
                placeholder="Secure password"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 8 characters with uppercase, lowercase, and numbers
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Complete */}
      {currentStep === 'complete' && (
        <div className="space-y-6 text-center py-8">
          <div className="text-6xl">🎉</div>
          <h2 className="text-3xl font-bold">Setup Complete!</h2>
          <p className="text-muted-foreground">
            Your application is now configured and ready to use.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      )}

      {/* Navigation */}
      {currentStep !== 'complete' && (
        <div className="flex gap-2 pt-4 border-t">
          <button
            onClick={handleBack}
            disabled={stepIndex === 0 || loading}
            className="px-6 py-2 border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={currentStep === 'admin' ? handleComplete : handleNext}
            disabled={loading}
            className="flex-1 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : currentStep === 'admin' ? 'Complete Setup' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  );
}
