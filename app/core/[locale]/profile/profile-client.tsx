'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function ProfileClient() {
  const [user, setUser] = useState<{
    email: string;
    name: string | null;
    isVerified: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/core/api/auth/profile');
        const data = await response.json();

        if (data.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <p className="text-lg">{user?.email || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Name</label>
            <p className="text-lg">{user?.name || 'Not set'}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Email Verified</label>
            <p className="text-lg">
              <span className={user?.isVerified ? 'text-green-600' : 'text-destructive'}>
                {user?.isVerified ? 'Verified' : 'Not verified'}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        <div className="space-y-3">
          <Link
            href="/profile/mfa"
            className="block p-3 border rounded-md hover:bg-accent transition-colors"
          >
            <div className="font-medium">Multi-Factor Authentication</div>
            <div className="text-sm text-muted-foreground">
              Secure your account with an additional layer of security
            </div>
          </Link>
          <Link
            href="/profile/change-password"
            className="block p-3 border rounded-md hover:bg-accent transition-colors"
          >
            <div className="font-medium">Change Password</div>
            <div className="text-sm text-muted-foreground">Update your account password</div>
          </Link>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border shadow-sm border-destructive/50">
        <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>
        <Link
          href="/profile/delete-account"
          className="block p-3 border border-destructive/50 rounded-md hover:bg-destructive/10 transition-colors"
        >
          <div className="font-medium text-destructive">Delete Account</div>
          <div className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data
          </div>
        </Link>
      </div>
    </div>
  );
}
