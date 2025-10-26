"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Github } from "lucide-react";
import { getGitHubUrl } from "@/lib/github";

// Lazy load non-critical components
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: () => (
    <div className="h-32 bg-gray-100 dark:bg-gray-800 animate-pulse" />
  ),
});

const TechnologyShowcase = dynamic(
  () => import("@/components/TechnologyShowcase"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-8 left-8 w-80 h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
    ),
  }
);

const QuickStart = dynamic(() => import("@/components/QuickStart"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
  ),
});

export default function Home() {
  const { t } = useLanguage();

  return (
    <div
      className="min-h-screen bg-zinc-50 font-sans dark:bg-black relative overflow-hidden"
      role="main"
    >
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 z-0 opacity-20 dark:opacity-30 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
          animate={{
            background: [
              "linear-gradient(45deg, #8b5cf6, #ec4899, #3b82f6)",
              "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
              "linear-gradient(225deg, #ec4899, #3b82f6, #8b5cf6)",
              "linear-gradient(315deg, #8b5cf6, #ec4899, #3b82f6)",
            ],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-blue-400 via-green-400 to-purple-400"
          animate={{
            background: [
              "linear-gradient(225deg, #3b82f6, #10b981, #8b5cf6)",
              "linear-gradient(315deg, #8b5cf6, #3b82f6, #10b981)",
              "linear-gradient(45deg, #10b981, #8b5cf6, #3b82f6)",
              "linear-gradient(135deg, #3b82f6, #10b981, #8b5cf6)",
            ],
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <Navigation />
      <main
        id="main-content"
        className="flex min-h-screen w-full max-w-2xl mx-auto flex-col items-center justify-center py-16 px-4 sm:py-32 sm:px-8 md:px-16 lg:items-start relative z-10"
        role="main"
        aria-label="Main content"
      >
        <motion.div
          className="text-2xl font-bold text-black dark:text-zinc-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              aria-hidden="true"
            >
              <Flame className="w-8 h-8 text-purple-500 dark:text-purple-400" />
            </motion.div>
            <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
              {(() => {
                const title = t("navigation.title") as string;
                const parts = title.split(".");
                return (
                  <>
                    {parts[0]}
                    <span className="text-lg">.{parts[1] || ""}</span>
                  </>
                );
              })()}
            </h1>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col w-full items-center text-center sm:items-start sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold leading-8 sm:leading-10 tracking-tight text-black dark:text-zinc-50">
            {t("homepage.subtitle")}
          </h2>

          <p
            className="w-full text-base sm:text-lg leading-6 sm:leading-8 text-zinc-600 dark:text-zinc-400 mb-4"
            role="text"
          >
            {t("homepage.description")}
          </p>

          {/* Quick Start Section 
          <div className="w-full mb-4">
            <QuickStart />
          </div> */}

          {/* Coming soon section */}
          <div className="w-full mb-4">
            <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <Badge
                variant="outline"
                className="bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-400 px-4 py-2 text-sm"
              >
                {t("homepage.comingSoon")}
              </Badge>
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 w-full"
            role="group"
            aria-label="Action buttons"
          >
            <Button asChild className="w-full sm:w-auto">
              <Link href="/about" aria-label="Learn more about Boiler.click">
                {t("homepage.aboutButton")}
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <a
                href={getGitHubUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Boiler.click on GitHub (opens in new tab)"
              >
                <Github className="h-4 w-4" />
                {t("homepage.githubButton")}
              </a>
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
      <TechnologyShowcase />
    </div>
  );
}
