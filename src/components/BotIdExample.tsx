"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BotId, { useBotId } from "@/components/BotId";

export default function BotIdExample() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token, isGenerating, generateToken } = useBotId();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setResult(null);

    try {
      // Generate a new token if needed
      const currentToken = token || await generateToken();
      
      if (!currentToken) {
        throw new Error("Failed to generate BotID token");
      }

      // Submit form with BotID token
      const response = await fetch("/api/botid/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: currentToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(`✅ BotID verification successful! Score: ${data.score}, Risk: ${data.riskLevel}`);
      } else {
        setError(`❌ BotID verification failed: ${data.error}`);
      }
    } catch (err) {
      setError(`❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">BotID Example</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <BotId>
          <div className="space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>This example demonstrates BotID integration:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Invisible bot detection</li>
                <li>No user interaction required</li>
                <li>Advanced ML-based protection</li>
                <li>Risk scoring and analysis</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <strong>Token Status:</strong>{" "}
                {isGenerating ? (
                  <span className="text-blue-600">Generating...</span>
                ) : token ? (
                  <span className="text-green-600">Ready</span>
                ) : (
                  <span className="text-gray-500">Not generated</span>
                )}
              </div>
              
              {token && (
                <div className="text-xs text-gray-500 font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  Token: {token.substring(0, 20)}...
                </div>
              )}
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || isGenerating}
              className="w-full"
            >
              {isSubmitting ? "Verifying..." : "Test BotID Verification"}
            </Button>

            {result && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <p className="text-sm text-green-800 dark:text-green-200">{result}</p>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p><strong>Development Mode:</strong> BotID is disabled in development and will always return success.</p>
              <p><strong>Production Mode:</strong> BotID will perform real bot detection and risk analysis.</p>
            </div>
          </div>
        </BotId>
      </CardContent>
    </Card>
  );
}
