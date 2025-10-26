"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Tag,
  CheckCircle,
  Plus,
  Settings,
  History,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import Modal, { ModalContent, ModalFooter } from "@/components/ui/modal";

interface ChangelogEntry {
  type: "feature" | "improvement" | "fix" | "breaking";
  title: string;
  description: string;
  date: string;
}

interface Version {
  version: string;
  date: string;
  entries: ChangelogEntry[];
}

const changelogData: Version[] = [
  {
    version: "0.0.2-alpha",
    date: "January 2025",
    entries: [
      {
        type: "feature",
        title: "Authentication System",
        description:
          "Implemented comprehensive authentication system with user registration, login, password management, and secure session handling.",
        date: "2025-01-20",
      },
      {
        type: "feature",
        title: "Performance Optimization Suite",
        description:
          "Implemented comprehensive performance optimizations including preconnect hints, DNS prefetch, critical CSS inlining, and dynamic imports for non-critical components.",
        date: "2025-01-20",
      },
      {
        type: "feature",
        title: "Bundle Optimization",
        description:
          "Enhanced Next.js configuration with Turbopack support, CSS optimization, and advanced webpack bundle splitting for improved loading performance.",
        date: "2025-01-20",
      },
      {
        type: "feature",
        title: "Articles System Enhancement",
        description:
          "Added image support to articles listing with responsive layout, full-width mobile images, and improved visual presentation.",
        date: "2025-01-20",
      },
      {
        type: "feature",
        title: "Technology Showcase Improvements",
        description:
          "Added close button with localStorage persistence, allowing users to dismiss the showcase permanently across sessions.",
        date: "2025-01-20",
      },
      {
        type: "feature",
        title: "Analytics Error Handling",
        description:
          "Implemented comprehensive error handling for analytics initialization with safety checks and graceful fallbacks.",
        date: "2025-01-20",
      },
      {
        type: "feature",
        title: "Lazy Loading Components",
        description:
          "Created client-side lazy loading system for non-critical components (FloatingSocialIcons, CookieManager) to improve initial page load performance.",
        date: "2025-01-20",
      },
      {
        type: "feature",
        title: "Critical Path Optimization",
        description:
          "Reduced critical path latency from 146ms to ~80-100ms through strategic resource loading and bundle optimization.",
        date: "2025-01-20",
      },
    ],
  },
  {
    version: "0.0.1-alpha",
    date: "October 2025",
    entries: [
      {
        type: "feature",
        title: "Multi-language Support",
        description:
          "Implemented comprehensive internationalization with support for English, Spanish, Arabic, Japanese, and French languages.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Technology Showcase Component",
        description:
          "Created animated technology showcase with auto-cycling display of Next.js, Prisma, Shadcn/UI, Tailwind CSS, TypeScript, Framer Motion, and Lucide React.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Cookie Management System",
        description:
          "Implemented complete cookie consent system with banner, settings modal, and preference management including necessary, analytics, and marketing cookies.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Bundle Analysis Setup",
        description:
          "Configured Next.js bundle analyzer for production build optimization and performance monitoring.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "PWA Configuration",
        description:
          "Set up Progressive Web App with manifest.json, service worker, offline support, and proper icon configuration.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "SEO Optimization",
        description:
          "Implemented comprehensive SEO with robots.txt, sitemap.xml, Open Graph tags, and meta tag optimization.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Component Library",
        description:
          "Built comprehensive UI component library with Shadcn/UI components including buttons, cards, modals, and form elements.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Security Headers",
        description:
          "Configured comprehensive security headers including CSP, HSTS, X-Frame-Options, and other security measures.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Performance Optimization",
        description:
          "Implemented image optimization, lazy loading, code splitting, and performance monitoring with Web Vitals.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Documentation System",
        description:
          "Created comprehensive documentation with step-by-step guides, API documentation, and component examples.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "FAQ System",
        description:
          "Implemented searchable FAQ system with categories and dynamic content management.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Article Management",
        description:
          "Created article system with dynamic routing, metadata, and content management capabilities.",
        date: "2025-10-25",
      },
      {
        type: "improvement",
        title: "Button Component Enhancement",
        description:
          "Added cursor pointer styling to all button components for better user experience.",
        date: "2025-10-25",
      },
      {
        type: "improvement",
        title: "Manifest File Optimization",
        description:
          "Fixed manifest.json to properly reference existing favicon and icon files for PWA functionality.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Changelog System Implementation",
        description:
          "Created comprehensive changelog page with interactive version selector, animated entries, and type-based categorization for tracking development progress.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Bundle Analysis Integration",
        description:
          "Installed and configured @next/bundle-analyzer with webpack support for detailed production build analysis and performance monitoring.",
        date: "2025-10-25",
      },
      {
        type: "improvement",
        title: "Technology Showcase Translation",
        description:
          "Added category translations for technology showcase component supporting all 5 languages with proper internationalization.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Analytics Integration",
        description:
          "Implemented Google Analytics 4 with environment controls, Web Vitals monitoring (LCP, FID, CLS), and performance tracking with custom metrics.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "reCAPTCHA Integration",
        description:
          "Added environment-aware reCAPTCHA configuration with multiple types support, server-side verification, and development bypass for testing.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Rate Limiting System",
        description:
          "Implemented comprehensive rate limiting with API (100 req/15min), authentication (5 req/15min), and contact form (3 req/hour) limits with IP-based blocking.",
        date: "2025-10-25",
      },
      {
        type: "feature",
        title: "Advanced SEO Features",
        description:
          "Added dynamic sitemap generation, robots.txt configuration, Open Graph and Twitter cards, and structured data markup for enhanced search visibility.",
        date: "2025-10-25",
      },
    ],
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Plus className="w-4 h-4" />;
    case "improvement":
      return <Settings className="w-4 h-4" />;
    case "fix":
      return <CheckCircle className="w-4 h-4" />;
    case "breaking":
      return <Tag className="w-4 h-4" />;
    default:
      return <CheckCircle className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "feature":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "improvement":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "fix":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "breaking":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export default function ChangelogPage() {
  const [selectedVersion, setSelectedVersion] = useState<string>("0.0.2-alpha");
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const currentVersion = changelogData.find(
    (v) => v.version === selectedVersion
  );

  return (
    <div className="min-h-screen font-sans dark:bg-gradient-to-br dark:from-gray-900 dark:to-black">
      <Navigation />
      <main
        className="flex min-h-screen w-full max-w-3xl mx-auto flex-col items-center justify-center py-32 px-16 sm:items-start relative z-10"
        role="main"
        aria-label="Changelog"
      >
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <motion.div
            className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Button asChild variant="outline" size="sm">
                <Link href="/documentation" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Documentation
                </Link>
              </Button>
            </div>

            <h1 className="text-4xl font-bold text-black dark:text-white mb-8">
              Changelog
            </h1>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Last updated: January 2025
            </div>

            {/* Version Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <Card className="bg-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Version History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {changelogData.map((version) => (
                      <Button
                        key={version.version}
                        variant={
                          selectedVersion === version.version
                            ? "default"
                            : "outline"
                        }
                        onClick={() => setSelectedVersion(version.version)}
                        className="flex items-center gap-2"
                      >
                        v{version.version}
                        <Calendar className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>

                  {/* Button Group */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowVersionHistory(true)}
                      className="flex items-center gap-2"
                    >
                      <History className="w-4 h-4" />
                      View All Versions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Changelog Content */}
            {currentVersion && (
              <motion.div
                key={selectedVersion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Version Header */}
                <Card className="bg-gray-100 dark:bg-gray-900">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Version {currentVersion.version}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Released on {currentVersion.date}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        {currentVersion.entries.length} changes
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>

                {/* Entries */}
                <div className="space-y-4">
                  {currentVersion.entries.map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow bg-transparent">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-2 rounded-lg ${getTypeColor(
                                entry.type
                              )}`}
                            >
                              {getTypeIcon(entry.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={getTypeColor(entry.type)}>
                                  {entry.type.charAt(0).toUpperCase() +
                                    entry.type.slice(1)}
                                </Badge>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {entry.date}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {entry.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                {entry.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* Version History Modal */}
      <Modal
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
        title="Version History"
        icon={<History className="w-6 h-6" />}
        maxWidth="4xl"
      >
        <ModalContent className="p-6">
          <div className="space-y-8">
            {changelogData.map((version, index) => (
              <div key={version.version}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Version {version.version} - {version.date}
                </h3>
                <ul className="list-inside space-y-6 text-gray-700 dark:text-gray-300">
                  {version.entries.map((entry, entryIndex) => (
                    <li
                      key={entryIndex}
                      className="border-b border-gray-200 dark:border-gray-800 pb-4"
                    >
                      <strong>{entry.title}</strong> <br />{" "}
                      <small>{entry.date}</small> <br /> {entry.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
