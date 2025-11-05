"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BotId from "@/components/BotId";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BotIdExample() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setResult(null);

    try {
      // Test BotID verification (no token needed with official implementation)
      const response = await fetch("/api/botid/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setResult(
          `✅ BotID verification successful! Score: ${data.score}, Risk: ${data.riskLevel}`
        );
      } else {
        setError(`❌ BotID verification failed: ${data.error}`);
      }
    } catch (err) {
      setError(
        `❌ Error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {t("botid.example.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <BotId>
          <div className="space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>{t("botid.example.description")}</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>{t("botid.example.features.invisible")}</li>
                <li>{t("botid.example.features.noInteraction")}</li>
                <li>{t("botid.example.features.mlProtection")}</li>
                <li>{t("botid.example.features.riskScoring")}</li>
                <li>{t("botid.example.features.automatic")}</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <strong>{t("botid.example.status.label")}</strong>{" "}
                <span className="text-green-600">
                  {t("botid.example.status.active")}
                </span>
              </div>

              <div className="text-xs text-gray-500 font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                {t("botid.example.status.message")}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting
                ? t("botid.example.button.verifying")
                : t("botid.example.button.test")}
            </Button>

            {result && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <p className="text-sm text-green-800 dark:text-green-200">
                  {result}
                </p>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            )}

            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p>
                <strong>{t("botid.example.modes.development.label")}</strong>{" "}
                {t("botid.example.modes.development.description")}
              </p>
              <p>
                <strong>{t("botid.example.modes.production.label")}</strong>{" "}
                {t("botid.example.modes.production.description")}
              </p>
              <p>
                <strong>{t("botid.example.modes.noConfig.label")}</strong>{" "}
                {t("botid.example.modes.noConfig.description")}
              </p>
            </div>
          </div>
        </BotId>
      </CardContent>
    </Card>
  );
}
