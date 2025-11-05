"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Database,
  Palette,
  Rocket,
  Code,
  Globe,
  Zap,
  Settings,
  Lock,
  FileText,
  BarChart,
  Languages,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Database,
  Palette,
  Rocket,
  Code,
  Globe,
  Zap,
  Settings,
  Lock,
  FileText,
  BarChart,
  Languages,
};

export function FeaturesClient() {
  const { t } = useLanguage();

  const coreFeatures = [
    "authentication",
    "database",
    "uiComponents",
    "styling",
    "routing",
    "ssr",
  ];

  const devFeatures = [
    "typescript",
    "codeQuality",
    "testing",
    "documentation",
    "gitWorkflow",
  ];

  const productionFeatures = [
    "performance",
    "security",
    "seo",
    "analytics",
    "monitoring",
    "internationalization",
  ];

  const renderFeatureCard = (featureKey: string, section: string) => {
    const feature = t(`features.items.${featureKey}`);
    if (typeof feature !== "object" || !feature) return null;

    const IconComponent = iconMap[feature.icon as string] || Code;
    const title = feature.title || featureKey;
    const description = feature.description || "";

    return (
      <Card key={featureKey} className="h-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <IconComponent className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {description && (
            <CardDescription className="mt-2">{description}</CardDescription>
          )}
        </CardHeader>
      </Card>
    );
  };

  return (
    <main
      id="main-content"
      className="flex min-h-screen w-full max-w-6xl mx-auto flex-col pt-32 pb-16 px-4 sm:px-8 md:px-16"
      role="main"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t("features.title")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          {t("features.subtitle")}
        </p>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {t("features.description")}
        </p>
      </div>

      {/* Core Features Section */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("features.sections.core.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("features.sections.core.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feature) => renderFeatureCard(feature, "core"))}
        </div>
      </section>

      {/* Developer Experience Section */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("features.sections.development.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("features.sections.development.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devFeatures.map((feature) =>
            renderFeatureCard(feature, "development")
          )}
        </div>
      </section>

      {/* Production Ready Section */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("features.sections.production.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("features.sections.production.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productionFeatures.map((feature) =>
            renderFeatureCard(feature, "production")
          )}
        </div>
      </section>
    </main>
  );
}
