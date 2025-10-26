/**
 * BotID utility functions with development environment controls
 */

// BotID configuration interface
export interface BotIdConfig {
  siteKey: string;
  enabled: boolean;
  environment: 'development' | 'production';
}

// Check if BotID should be enabled
export const isBotIdEnabled = (): boolean => {
  return (
    process.env.NODE_ENV === "production" &&
    !!process.env.NEXT_PUBLIC_BOTID_SITE_KEY
  );
};

// Get the BotID site key
export const getBotIdSiteKey = (): string | null => {
  if (!isBotIdEnabled()) {
    return null;
  }
  return process.env.NEXT_PUBLIC_BOTID_SITE_KEY || null;
};

// Get the BotID secret key (server-side only)
export const getBotIdSecretKey = (): string | null => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  return process.env.BOTID_SECRET_KEY || null;
};

// BotID verification result interface
export interface BotIdResult {
  success: boolean;
  score?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  isBot?: boolean;
  error?: string;
}

// Verify BotID token on server-side
export const verifyBotIdToken = async (token: string): Promise<BotIdResult> => {
  const secretKey = getBotIdSecretKey();

  if (!secretKey) {
    console.warn("BotID secret key not found, skipping verification");
    return { 
      success: true, 
      score: 1.0, 
      riskLevel: 'low', 
      isBot: false 
    }; // Allow in development
  }

  try {
    const response = await fetch("https://api.botid.io/v1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        token: token,
        siteKey: getBotIdSiteKey(),
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'BotID verification failed');
    }

    return {
      success: data.success,
      score: data.score,
      riskLevel: data.riskLevel,
      isBot: data.isBot,
    };
  } catch (error) {
    console.error("BotID verification failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Get BotID risk level based on score
export const getRiskLevel = (score: number): 'low' | 'medium' | 'high' => {
  if (score >= 0.8) return 'low';
  if (score >= 0.5) return 'medium';
  return 'high';
};

// BotID configuration
export const getBotIdConfig = (): BotIdConfig => {
  return {
    siteKey: getBotIdSiteKey() || '',
    enabled: isBotIdEnabled(),
    environment: process.env.NODE_ENV as 'development' | 'production',
  };
};

// Initialize BotID script
export const initializeBotId = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if (!isBotIdEnabled()) {
      console.log('BotID disabled in development');
      resolve(true);
      return;
    }

    // Check if BotID script is already loaded
    if ((window as any).botid) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.botid.io/v1/botid.js';
    script.async = true;
    script.onload = () => {
      console.log('BotID script loaded');
      resolve(true);
    };
    script.onerror = () => {
      console.error('Failed to load BotID script');
      resolve(false);
    };

    document.head.appendChild(script);
  });
};

// Generate BotID token
export const generateBotIdToken = (): Promise<string | null> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }

    if (!isBotIdEnabled()) {
      // Return mock token in development
      resolve('dev-botid-token');
      return;
    }

    if (!(window as any).botid) {
      console.error('BotID not initialized');
      resolve(null);
      return;
    }

    try {
      const token = (window as any).botid.generateToken();
      resolve(token);
    } catch (error) {
      console.error('Failed to generate BotID token:', error);
      resolve(null);
    }
  });
};
