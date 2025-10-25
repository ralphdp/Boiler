"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What is Boiler.click?",
    answer:
      "Boiler.click is a next-generation full-stack SaaS boilerplate built with modern technologies like Next.js, Prisma, Shadcn/UI, TypeScript, and AI. It provides a complete foundation for building SaaS applications with authentication, database integration, and modern UI components.",
    category: "general",
  },
  {
    id: "2",
    question: "What technologies are included?",
    answer:
      "The boilerplate includes Next.js 16, React 19, TypeScript, Prisma ORM, Shadcn/UI components, Tailwind CSS, Framer Motion for animations, NextAuth.js for authentication, and many other modern tools for building production-ready SaaS applications.",
    category: "technical",
  },
  {
    id: "3",
    question: "How do I get started?",
    answer:
      "1. Clone the repository from GitHub\n2. Install dependencies with npm install\n3. Set up your environment variables\n4. Configure your database\n5. Run npm run dev to start development",
    category: "getting-started",
  },
  {
    id: "4",
    question: "Is this boilerplate free?",
    answer:
      "Yes, Boiler.click is completely free and open-source. You can use it for personal and commercial projects without any restrictions.",
    category: "general",
  },
  {
    id: "5",
    question: "How do I customize the theme?",
    answer:
      "The boilerplate uses Tailwind CSS with a custom design system. You can customize colors, fonts, and components by modifying the CSS variables in globals.css and the Tailwind configuration.",
    category: "customization",
  },
  {
    id: "6",
    question: "Can I use this for production?",
    answer:
      "Absolutely! Boiler.click is designed for production use with proper error handling, performance optimizations, security headers, and best practices built-in.",
    category: "production",
  },
  {
    id: "7",
    question: "How do I add new features?",
    answer:
      "The boilerplate is modular and extensible. You can add new pages, components, API routes, and database models following the established patterns and conventions.",
    category: "development",
  },
  {
    id: "8",
    question: "What databases are supported?",
    answer:
      "Boiler.click uses Prisma ORM which supports PostgreSQL, MySQL, SQLite, MongoDB, and other databases. The default configuration is set up for PostgreSQL.",
    category: "technical",
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
        aria-expanded={isOpen}
        aria-controls={`faq-${item.id}`}
      >
        <span className="font-medium text-gray-900 dark:text-white">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-${item.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2, ease: "easeInOut" },
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pt-2 pb-4">
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const { t } = useLanguage();
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    "general",
    "technical",
    "getting-started",
    "customization",
    "production",
    "development",
  ];
  const filteredFAQs =
    selectedCategory === "all"
      ? faqData
      : faqData.filter((item) => item.category === selectedCategory);

  return (
    <div
      className="min-h-screen font-sans dark:bg-gradient-to-br dark:from-gray-900 dark:to-black"
      role="main"
    >
      <Navigation />
      <main
        className="flex min-h-screen w-full max-w-3xl mx-auto flex-col items-center justify-center py-32 px-16 sm:items-start relative z-10"
        role="main"
        aria-label="FAQ page content"
      >
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <motion.div
            className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-black dark:text-white mb-8">
              Frequently Asked Questions
            </h1>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <p className="text-lg text-zinc-600 dark:text-zinc-200 leading-relaxed">
              Find answers to common questions about Boiler.click and get help
              with setup, customization, and development.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-2 justify-center sm:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {category === "all"
                    ? "All"
                    : category.charAt(0).toUpperCase() +
                      category.slice(1).replace("-", " ")}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="w-full space-y-4">
              {filteredFAQs.map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isOpen={openFAQ === item.id}
                  onToggle={() =>
                    setOpenFAQ(openFAQ === item.id ? null : item.id)
                  }
                />
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
