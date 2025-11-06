'use client';

import { useState } from 'react';
import Link from 'next/link';
import { resetPasswordSchema } from '@/lib/core/validation/schemas';

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      // Validate form data
      const validation = resetPasswordSchema.safeParse({
        token,
        password: formData.password,
      });

      if (!validation.success) {
        const fieldErrors = validation.error.flatten().fieldErrors;
        setErrors(
          Object.fromEntries(Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0] || '']))
        );
        setLoading(false);
        return;
      }

      // Call reset password API
      const response = await fetch('/core/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setErrors({ general: data.error || 'Password reset failed' });
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
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Password Reset Successful!
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Your password has been reset. You can now log in with your new password.
          </p>
        </div>
        <Link
          href="/login"
          className="block w-full px-4 py-2 bg-primary text-primary-foreground text-center rounded-md hover:bg-primary/90 transition-colors"
        >
          Go to Login
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
        <label htmlFor="password" className="text-sm font-medium">
          New Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-3 py-2 border rounded-md bg-background"
          required
          disabled={loading}
        />
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters with uppercase, lowercase, and numbers
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className="w-full px-3 py-2 border rounded-md bg-background"
          required
          disabled={loading}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Resetting password...' : 'Reset Password'}
      </button>
    </form>
  );
}
