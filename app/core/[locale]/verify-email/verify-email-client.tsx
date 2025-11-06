'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface VerifyEmailClientProps {
  token: string;
}

export function VerifyEmailClient({ token }: VerifyEmailClientProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch('/core/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage(data.data.message);
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed');
        }
      } catch (_error) {
        setStatus('error');
        setMessage('An unexpected error occurred');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="w-full max-w-md space-y-6">
      {status === 'loading' && (
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
          <p className="text-muted-foreground">Verifying your email...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-4">
          <div className="p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Email Verified!
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">{message}</p>
          </div>
          <Link
            href="/login"
            className="block w-full px-4 py-2 bg-primary text-primary-foreground text-center rounded-md hover:bg-primary/90 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-4">
          <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
            <h3 className="font-semibold text-destructive mb-2">Verification Failed</h3>
            <p className="text-sm text-destructive/80">{message}</p>
          </div>
          <Link
            href="/resend-verification"
            className="block w-full px-4 py-2 bg-primary text-primary-foreground text-center rounded-md hover:bg-primary/90 transition-colors"
          >
            Resend Verification Email
          </Link>
        </div>
      )}
    </div>
  );
}
