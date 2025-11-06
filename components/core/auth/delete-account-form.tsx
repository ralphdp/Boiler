'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteAccountSchema, type DeleteAccountInput } from '@/lib/core/validation/schemas';

export function DeleteAccountForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<DeleteAccountInput>({
    password: '',
    confirmation: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validation = deleteAccountSchema.safeParse(formData);
      if (!validation.success) {
        const fieldErrors = validation.error.flatten().fieldErrors;
        setErrors(
          Object.fromEntries(Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0] || '']))
        );
        setLoading(false);
        return;
      }

      const response = await fetch('/core/api/auth/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: formData.password }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to homepage
        router.push('/');
      } else {
        setErrors({ general: data.error || 'Account deletion failed' });
      }
    } catch (error) {
      console.error('Delete account error:', error);
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  if (!showConfirm) {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-destructive/10 border border-destructive/30 rounded-lg">
          <h3 className="font-semibold text-destructive mb-2">⚠️ Warning</h3>
          <p className="text-sm text-destructive/80 mb-4">
            Deleting your account is permanent and cannot be undone. All your data will be
            permanently removed from our system.
          </p>
          <ul className="text-sm text-destructive/80 space-y-2 list-disc list-inside">
            <li>Your profile and account information</li>
            <li>All verification tokens</li>
            <li>MFA settings and backup codes</li>
            <li>Order history (if any)</li>
            <li>All associated data</li>
          </ul>
        </div>

        <button
          onClick={() => setShowConfirm(true)}
          className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
        >
          I Understand, Continue with Deletion
        </button>
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
          Confirm your password
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
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmation" className="text-sm font-medium">
          Type DELETE to confirm
        </label>
        <input
          id="confirmation"
          type="text"
          value={formData.confirmation}
          onChange={(e) => setFormData({ ...formData, confirmation: e.target.value })}
          className="w-full px-3 py-2 border rounded-md bg-background"
          required
          disabled={loading}
          placeholder="DELETE"
        />
        {errors.confirmation && <p className="text-sm text-destructive">{errors.confirmation}</p>}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setShowConfirm(false)}
          className="flex-1 px-4 py-2 border rounded-md hover:bg-accent transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </form>
  );
}
