'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  resendVerificationSchema,
  type ResendVerificationInput,
} from '@/lib/core/validation/schemas';

export function ResendVerificationForm() {
  const [formData, setFormData] = useState<ResendVerificationInput>({
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate form data
      const validation = resendVerificationSchema.safeParse(formData);
      if (!validation.success) {
        const fieldErrors = validation.error.flatten().fieldErrors;
        setErrors(
          Object.fromEntries(Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0] || '']))
        );
        setLoading(false);
        return;
      }

      // Call resend verification API
      const response = await fetch('/core/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ email: '' });
      } else {
        setErrors({ general: data.error || 'Request failed' });
      }
    } catch (_error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Email Sent!</h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            If an account exists with this email and is unverified, we&apos;ve sent a new
            verification link.
          </p>
        </div>
        <Link href="/login" className="block text-center text-sm text-primary hover:underline">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
          {errors.general}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ email: e.target.value })}
          className="w-full px-3 py-2 border rounded-md bg-background"
          required
          disabled={loading}
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Resend Verification Email'}
      </button>
    </form>
  );
}
