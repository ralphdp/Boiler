/**
 * reCAPTCHA utility functions with development environment controls
 */

// Check if reCAPTCHA should be enabled
export const isRecaptchaEnabled = (): boolean => {
  return (
    process.env.NODE_ENV === "production" &&
    !!process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY
  );
};

// Get the reCAPTCHA site key
export const getRecaptchaSiteKey = (): string | null => {
  if (!isRecaptchaEnabled()) {
    return null;
  }
  return process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY || null;
};

// Get the reCAPTCHA secret key (server-side only)
export const getRecaptchaSecretKey = (): string | null => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  return process.env.GOOGLE_RECAPTCHA_SECRET_KEY || null;
};

// Verify reCAPTCHA token on server-side
export const verifyRecaptchaToken = async (token: string): Promise<boolean> => {
  const secretKey = getRecaptchaSecretKey();

  if (!secretKey) {
    console.warn("reCAPTCHA secret key not found, skipping verification");
    return true; // Allow in development
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error);
    return false;
  }
};

// Get reCAPTCHA score (for v3)
export const getRecaptchaScore = (token: string): Promise<number> => {
  return new Promise((resolve) => {
    if (!isRecaptchaEnabled()) {
      resolve(1.0); // Perfect score in development
      return;
    }

    // This would typically be done server-side
    // For now, we'll return a default score
    resolve(0.9);
  });
};
