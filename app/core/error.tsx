'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold">500</h1>
          <h2 className="text-2xl font-semibold">Something went wrong!</h2>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Please try again.
          </p>
        </div>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
        {error.digest && <p className="text-xs text-muted-foreground">Error ID: {error.digest}</p>}
      </div>
    </div>
  );
}
