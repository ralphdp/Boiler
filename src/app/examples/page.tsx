"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function ExamplesPage() {
  const { t } = useLanguage();
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleButtonClick = (variant: string) => {
    setClickedButton(variant);
    setTimeout(() => setClickedButton(null), 1000);
  };

  return (
    <div className="min-h-screen font-sans dark:bg-gradient-to-br dark:from-gray-900 dark:to-black">
      <Navigation />
      <main
        className="flex min-h-screen w-full max-w-7xl mx-auto flex-col items-center py-32 px-4 sm:px-8 relative z-10"
        role="main"
        aria-label="Examples page main content"
      >
        <motion.div
          className="w-full text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            {t("examples.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            {t("examples.subtitle")}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
            {t("examples.description")}
          </p>
        </motion.div>

        {/* UI Components Section */}
        <motion.section
          className="w-full mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              {t("examples.sections.components.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("examples.sections.components.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Button Examples */}
            <Card>
              <CardHeader>
                <CardTitle>{t("examples.components.button.title")}</CardTitle>
                <CardDescription>
                  {t("examples.components.button.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="default"
                      onClick={() => handleButtonClick("default")}
                    >
                      {clickedButton === "default" ? "✓ Clicked!" : t("examples.components.button.variants.default")}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleButtonClick("destructive")}
                    >
                      {clickedButton === "destructive" ? "✓ Clicked!" : t("examples.components.button.variants.destructive")}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleButtonClick("outline")}
                    >
                      {clickedButton === "outline" ? "✓ Clicked!" : t("examples.components.button.variants.outline")}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleButtonClick("secondary")}
                    >
                      {clickedButton === "secondary" ? "✓ Clicked!" : t("examples.components.button.variants.secondary")}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleButtonClick("ghost")}
                    >
                      {clickedButton === "ghost" ? "✓ Clicked!" : t("examples.components.button.variants.ghost")}
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleButtonClick("link")}
                    >
                      {clickedButton === "link" ? "✓ Clicked!" : t("examples.components.button.variants.link")}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badge Examples */}
            <Card>
              <CardHeader>
                <CardTitle>{t("examples.components.badge.title")}</CardTitle>
                <CardDescription>
                  {t("examples.components.badge.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">
                    {t("examples.components.badge.variants.default")}
                  </Badge>
                  <Badge variant="secondary">
                    {t("examples.components.badge.variants.secondary")}
                  </Badge>
                  <Badge variant="destructive">
                    {t("examples.components.badge.variants.destructive")}
                  </Badge>
                  <Badge variant="outline">
                    {t("examples.components.badge.variants.outline")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Card Example */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{t("examples.components.card.title")}</CardTitle>
                <CardDescription>
                  {t("examples.components.card.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {t("examples.components.card.exampleTitle")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("examples.components.card.exampleContent")}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm">Action</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {t("examples.components.card.exampleTitle")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("examples.components.card.exampleContent")}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm">Action</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {t("examples.components.card.exampleTitle")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("examples.components.card.exampleContent")}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm">Action</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Layout Examples Section */}
        <motion.section
          className="w-full mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              {t("examples.sections.layouts.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("examples.sections.layouts.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hero Section Example */}
            <Card>
              <CardHeader>
                <CardTitle>{t("examples.layouts.hero.title")}</CardTitle>
                <CardDescription>
                  {t("examples.layouts.hero.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 px-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                    Hero Section
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Eye-catching hero sections with call-to-action buttons
                  </p>
                  <Button>Get Started</Button>
                </div>
              </CardContent>
            </Card>

            {/* Features Grid Example */}
            <Card>
              <CardHeader>
                <CardTitle>{t("examples.layouts.features.title")}</CardTitle>
                <CardDescription>
                  {t("examples.layouts.features.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center">
                    <div className="text-sm font-medium">Feature 1</div>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center">
                    <div className="text-sm font-medium">Feature 2</div>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center">
                    <div className="text-sm font-medium">Feature 3</div>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center">
                    <div className="text-sm font-medium">Feature 4</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Cards Example */}
            <Card>
              <CardHeader>
                <CardTitle>{t("examples.layouts.pricing.title")}</CardTitle>
                <CardDescription>
                  {t("examples.layouts.pricing.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 border rounded text-center">
                    <div className="text-xs font-medium mb-1">Basic</div>
                    <div className="text-lg font-bold">$9</div>
                  </div>
                  <div className="p-3 border-2 border-purple-500 rounded text-center bg-purple-50 dark:bg-purple-900/20">
                    <div className="text-xs font-medium mb-1">Pro</div>
                    <div className="text-lg font-bold">$29</div>
                  </div>
                  <div className="p-3 border rounded text-center">
                    <div className="text-xs font-medium mb-1">Enterprise</div>
                    <div className="text-lg font-bold">$99</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials Example */}
            <Card>
              <CardHeader>
                <CardTitle>{t("examples.layouts.testimonials.title")}</CardTitle>
                <CardDescription>
                  {t("examples.layouts.testimonials.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-2">
                      "Great boilerplate for SaaS apps!"
                    </p>
                    <div className="text-xs text-gray-500">- Customer Name</div>
                  </div>
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-2">
                      "Saves so much development time."
                    </p>
                    <div className="text-xs text-gray-500">- Another Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
