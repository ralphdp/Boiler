"use client";

import { useRef, useEffect, useState } from "react";
import { 
  getBotIdSiteKey, 
  isBotIdEnabled, 
  initializeBotId, 
  generateBotIdToken,
  BotIdResult 
} from "@/lib/botid";

interface BotIdProps {
  onChange?: (token: string | null, result?: BotIdResult) => void;
  onError?: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export default function BotId({
  onChange,
  onError,
  className = "",
  children,
}: BotIdProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastToken, setLastToken] = useState<string | null>(null);
  const siteKey = getBotIdSiteKey();
  const enabled = isBotIdEnabled();

  useEffect(() => {
    const initBotId = async () => {
      if (enabled && siteKey) {
        const success = await initializeBotId();
        setIsLoaded(success);
      } else {
        setIsLoaded(true); // Always loaded in development
      }
    };

    initBotId();
  }, [enabled, siteKey]);

  const handleGenerateToken = async () => {
    if (!isLoaded) return;

    setIsGenerating(true);
    try {
      const token = await generateBotIdToken();
      setLastToken(token);
      
      if (onChange) {
        onChange(token, {
          success: true,
          score: enabled ? 0.9 : 1.0,
          riskLevel: enabled ? 'low' : 'low',
          isBot: false,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate BotID token';
      console.error('BotID token generation error:', errorMessage);
      
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Auto-generate token on load
  useEffect(() => {
    if (isLoaded && !lastToken) {
      handleGenerateToken();
    }
  }, [isLoaded, lastToken]);

  // Don't render in development or if not enabled
  if (!enabled || !siteKey) {
    return (
      <div className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 dark:bg-green-900 rounded border border-green-300 dark:border-green-700 flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <span>BotID disabled in development</span>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className={className}>
      {isLoaded && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded border border-blue-300 dark:border-blue-700 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <span>
            {isGenerating ? 'Generating BotID token...' : 'BotID protection active'}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

// Hook for using BotID functionality
export const useBotId = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateToken = async (): Promise<string | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const newToken = await generateBotIdToken();
      setToken(newToken);
      return newToken;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate token';
      setError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setToken(null);
    setError(null);
  };

  return {
    token,
    isGenerating,
    error,
    generateToken,
    reset,
  };
};

// BotID Provider for context
export const BotIdProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (isBotIdEnabled()) {
        const success = await initializeBotId();
        setIsInitialized(success);
      } else {
        setIsInitialized(true);
      }
    };

    init();
  }, []);

  return (
    <div data-botid-initialized={isInitialized}>
      {children}
    </div>
  );
};
