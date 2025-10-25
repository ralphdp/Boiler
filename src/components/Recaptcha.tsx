"use client";

import { useRef, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaSiteKey, isRecaptchaEnabled } from "@/lib/recaptcha";

interface RecaptchaProps {
  onChange?: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
  size?: "compact" | "normal" | "invisible";
  theme?: "light" | "dark";
  className?: string;
}

export default function Recaptcha({
  onChange,
  onExpired,
  onError,
  size = "normal",
  theme = "light",
  className = "",
}: RecaptchaProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const siteKey = getRecaptchaSiteKey();
  const enabled = isRecaptchaEnabled();

  useEffect(() => {
    if (enabled && siteKey) {
      setIsLoaded(true);
    }
  }, [enabled, siteKey]);

  const handleChange = (token: string | null) => {
    if (onChange) {
      onChange(token);
    }
  };

  const handleExpired = () => {
    if (onExpired) {
      onExpired();
    }
  };

  const handleError = () => {
    if (onError) {
      onError();
    }
  };

  // Reset reCAPTCHA
  const reset = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  // Execute reCAPTCHA (for invisible)
  const execute = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.execute();
    }
  };

  // Don't render in development or if not enabled
  if (!enabled || !siteKey) {
    return (
      <div className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 dark:bg-green-900 rounded border border-green-300 dark:border-green-700 flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <span>reCAPTCHA disabled in development</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={handleChange}
        onExpired={handleExpired}
        onError={handleError}
        size={size}
        theme={theme}
        hl="en" // Language
      />
    </div>
  );
}

// Export utility functions for external use
export const useRecaptcha = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const reset = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const execute = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.execute();
    }
  };

  return { recaptchaRef, reset, execute };
};
