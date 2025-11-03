"use client";

import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function MissionPage() {
  return (
    <div
      className="min-h-screen font-sans dark:bg-gradient-to-br dark:from-gray-900 dark:to-black"
      role="main"
    >
      <Navigation />
      <main
        className="flex min-h-screen w-full max-w-4xl mx-auto flex-col items-center justify-center py-32 px-8 sm:px-16 relative z-10"
        role="main"
        aria-label="Mission page content"
      >
        <div className="prose prose-lg dark:prose-invert max-w-none w-full">
          <motion.div
            className="flex flex-col gap-8 text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-4">
              Our Mission
            </h1>

            <div className="space-y-6">
              <motion.p
                className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-200 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                At Boiler.click, we believe that every developer should have
                access to high-quality, production-ready tools that accelerate
                their development process. Our mission is to eliminate the
                repetitive setup work that often delays the launch of innovative
                SaaS applications.
              </motion.p>

              <motion.p
                className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-200 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                We provide a comprehensive, modern boilerplate that includes
                everything you need to build and deploy a full-stack SaaS
                application. From authentication and database management to
                beautiful UI components and deployment configurations, we've got
                you covered.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
