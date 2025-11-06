'use client';

import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check consent status on mount
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        setShowBanner(true);
      }
    };

    checkConsent();
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
      })
    );
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
      })
    );
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          <p>
            We use cookies to enhance your browsing experience, serve personalized content, and
            analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of
            cookies.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={acceptNecessary}
            className="px-4 py-2 text-sm border rounded-md hover:bg-accent transition-colors"
          >
            Necessary Only
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
