"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Shield,
  Database,
  Palette,
  Globe,
  Smartphone,
  Accessibility,
  Lock,
  Search,
  Code,
  CheckCircle2,
  Rocket,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featureIcons: Record<string, React.ReactNode> = {
  authentication: <Shield className="h-6 w-6" />,
  database: <Database className="h-6 w-6" />,
  ui: <Palette className="h-6 w-6" />,
  i18n: <Globe className="h-6 w-6" />,
  responsive: <Smartphone className="h-6 w-6" />,
  accessibility: <Accessibility className="h-6 w-6" />,
  security: <Lock className="h-6 w-6" />,
  seo: <Search className="h-6 w-6" />,
  typescript: <Code className="h-6 w-6" />,
  eslint: <CheckCircle2 className="h-6 w-6" />,
  vercel: <Rocket className="h-6 w-6" />,
  analytics: <BarChart3 className="h-6 w-6" />,
};

const featureCategories = {
  core: ["authentication", "database", "ui", "i18n", "responsive", "accessibility"],
  development: ["typescript", "eslint"],
  production: ["security", "seo", "vercel", "analytics"],
};

export default function FeaturesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen font-sans dark:bg-gradient-to-br dark:from-gray-900 dark:to-black">
      <Navigation />
      <main
        className="flex min-h-screen w-full max-w-7xl mx-auto flex-col items-center py-32 px-4 sm:px-8 relative z-10"
        role="main"
        aria-label="Features page main content"
      >
        <motion.div
          className="w-full text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            {t("features.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            {t("features.subtitle")}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
            {t("features.description")}
          </p>
        </motion.div>

        {/* Core Features Section */}
        <motion.section
          className="w-full mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              {t("features.sections.core.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("features.sections.core.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCategories.core.map((featureKey) => (
              <motion.div
                key={featureKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                        {featureIcons[featureKey]}
                      </div>
                      <CardTitle className="text-xl">
                        {t(`features.items.${featureKey}.title`)}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {t(`features.items.${featureKey}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Developer Experience Section */}
        <motion.section
          className="w-full mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              {t("features.sections.development.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("features.sections.development.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureCategories.development.map((featureKey) => (
              <motion.div
                key={featureKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                        {featureIcons[featureKey]}
                      </div>
                      <CardTitle className="text-xl">
                        {t(`features.items.${featureKey}.title`)}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {t(`features.items.${featureKey}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Production Ready Section */}
        <motion.section
          className="w-full mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              {t("features.sections.production.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("features.sections.production.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCategories.production.map((featureKey) => (
              <motion.div
                key={featureKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                        {featureIcons[featureKey]}
                      </div>
                      <CardTitle className="text-lg">
                        {t(`features.items.${featureKey}.title`)}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {t(`features.items.${featureKey}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
