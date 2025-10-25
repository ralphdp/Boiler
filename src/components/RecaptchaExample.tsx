"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Recaptcha from "@/components/Recaptcha";
import { useRecaptcha } from "@/components/Recaptcha";

// Example component showing how to use reCAPTCHA
export default function RecaptchaExample() {
  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const { recaptchaRef, reset, execute } = useRecaptcha();

  const handleRecaptchaChange = (newToken: string | null) => {
    setToken(newToken);
    setMessage(newToken ? "reCAPTCHA completed!" : "reCAPTCHA reset");
  };

  const handleSubmit = async () => {
    if (!token) {
      setMessage("Please complete the reCAPTCHA first");
      return;
    }

    setIsSubmitting(true);
    setMessage("Submitting...");

    try {
      const response = await fetch("/api/recaptcha/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Form submitted successfully!");
        reset();
        setToken(null);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Network error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setToken(null);
    setMessage("reCAPTCHA reset");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">reCAPTCHA Example</h2>

      <div className="space-y-4">
        <Recaptcha
          onChange={handleRecaptchaChange}
          onExpired={() => setMessage("reCAPTCHA expired, please try again")}
          onError={() => setMessage("reCAPTCHA error occurred")}
          theme="light"
          size="normal"
        />

        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            disabled={!token || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            disabled={isSubmitting}
          >
            Reset
          </Button>
        </div>

        {message && (
          <div
            className={`p-3 rounded text-sm ${
              message.includes("Error") || message.includes("error")
                ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
            }`}
          >
            {message}
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>
            <strong>Development:</strong> reCAPTCHA is disabled
          </p>
          <p>
            <strong>Production:</strong> reCAPTCHA will be active
          </p>
        </div>
      </div>
    </div>
  );
}
