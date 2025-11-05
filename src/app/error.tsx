"use client";

import { useEffect } from "react";
import { ErrorDisplay } from "@/components/ErrorDisplay";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    if (process.env.NODE_ENV === "production") {
      // In production, only log generic error to console
      // Send detailed error to monitoring service (Sentry, etc.)
      console.error("An error occurred");
      // Example: Sentry.captureException(error);
    } else {
      // Development: log full error details
      console.error("Error:", error);
    }
  }, [error]);

  return (
    <ErrorDisplay statusCode={error.statusCode} showRetry onRetry={reset} />
  );
}
