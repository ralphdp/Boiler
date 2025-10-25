"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuickStart from "@/components/QuickStart";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { getGitHubUrl } from "@/lib/github";

export default function DocumentationPage() {
  const { t } = useLanguage();

  return (
    <div
      className="min-h-screen font-sans dark:bg-gradient-to-br dark:from-gray-900 dark:to-black"
      role="main"
    >
      <Navigation />
      <main
        className="flex min-h-screen w-full max-w-3xl mx-auto flex-col items-center justify-center py-32 px-16 sm:items-start relative z-10"
        role="main"
        aria-label="Documentation"
      >
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <motion.div
            className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-black dark:text-white mb-8">
              {t("documentation.title")}
            </h1>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {t("documentation.lastUpdated")}
            </div>

            <div
              className="space-y-12"
              role="contentinfo"
              aria-label="Documentation sections"
            >
              {/* Quick Start Section
              <section aria-labelledby="quick-start">
                <h2
                  id="quick-start"
                  className="text-3xl font-bold text-black dark:text-white mb-6"
                >
                  {t("documentation.quickStart.title")}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {t("documentation.quickStart.description")}
                </p>
                <QuickStart />
              </section> */}

              {/* Getting Started */}
              <section aria-labelledby="getting-started">
                <h2
                  id="getting-started"
                  className="text-3xl font-bold text-black dark:text-white mb-6"
                >
                  {t("documentation.gettingStarted.title")}
                </h2>

                <div className="space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t("documentation.gettingStarted.description")}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {t("documentation.gettingStarted.prerequisites.title")}
                    </h3>
                    <ul className="space-y-2">
                      <li className="text-gray-600 dark:text-gray-400">
                        •{" "}
                        {t("documentation.gettingStarted.prerequisites.nodejs")}
                      </li>
                      <li className="text-gray-600 dark:text-gray-400">
                        • {t("documentation.gettingStarted.prerequisites.npm")}
                      </li>
                      <li className="text-gray-600 dark:text-gray-400">
                        • {t("documentation.gettingStarted.prerequisites.git")}
                      </li>
                      <li className="text-gray-600 dark:text-gray-400">
                        •{" "}
                        {t(
                          "documentation.gettingStarted.prerequisites.database"
                        )}
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {t("documentation.gettingStarted.installation.title")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t(
                        "documentation.gettingStarted.installation.description"
                      )}
                    </p>
                  </div>
                </div>
              </section>

              {/* Configuration */}
              <section aria-labelledby="configuration">
                <h2
                  id="configuration"
                  className="text-3xl font-bold text-black dark:text-white mb-6"
                >
                  {t("documentation.configuration.title")}
                </h2>

                <div className="space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t("documentation.configuration.description")}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {t("documentation.configuration.environment.title")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t("documentation.configuration.environment.description")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {t("documentation.configuration.database.title")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t("documentation.configuration.database.description")}
                    </p>
                  </div>
                </div>
              </section>

              {/* Development */}
              <section aria-labelledby="development">
                <h2
                  id="development"
                  className="text-3xl font-bold text-black dark:text-white mb-6"
                >
                  {t("documentation.development.title")}
                </h2>

                <div className="space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t("documentation.development.description")}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {t("documentation.development.scripts.title")}
                    </h3>
                    <ul className="space-y-2">
                      <li className="text-gray-600 dark:text-gray-400">
                        •{" "}
                        <strong className="text-black dark:text-white">
                          npm run dev:
                        </strong>{" "}
                        {t("documentation.development.scripts.dev")}
                      </li>
                      <li className="text-gray-600 dark:text-gray-400">
                        •{" "}
                        <strong className="text-black dark:text-white">
                          npm run build:
                        </strong>{" "}
                        {t("documentation.development.scripts.build")}
                      </li>
                      <li className="text-gray-600 dark:text-gray-400">
                        •{" "}
                        <strong className="text-black dark:text-white">
                          npm run start:
                        </strong>{" "}
                        {t("documentation.development.scripts.start")}
                      </li>
                      <li className="text-gray-600 dark:text-gray-400">
                        •{" "}
                        <strong className="text-black dark:text-white">
                          npm run lint:
                        </strong>{" "}
                        {t("documentation.development.scripts.lint")}
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Shadcn/UI Components */}
              <section aria-labelledby="shadcn-components">
                <h2
                  id="shadcn-components"
                  className="text-3xl font-bold text-black dark:text-white mb-6"
                >
                  {t("documentation.shadcnComponents.title")}
                </h2>

                <div className="space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t("documentation.shadcnComponents.description")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("documentation.shadcnComponents.visitWebsite")}{" "}
                    <a
                      href="https://ui.shadcn.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-500 hover:text-purple-400 underline hover:underline-offset-2 transition-all duration-300 hover:shadow-purple-500/25"
                      aria-label="Visit shadcn/ui website (opens in new tab)"
                    >
                      ui.shadcn.com
                    </a>
                  </p>

                  {/* Button Component */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {t("documentation.shadcnComponents.button.title")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t("documentation.shadcnComponents.button.description")}
                    </p>
                    <div className="bg-zinc-900 dark:bg-zinc-500/10 p-6 rounded-lg">
                      <pre className="text-sm text-left">
                        <code className="block">
                          <span className="text-zinc-100">import</span>{" "}
                          <span className="text-zinc-300">{"{ Button }"}</span>{" "}
                          <span className="text-zinc-100">from</span>{" "}
                          <span className="text-zinc-300">
                            &quot;@/components/ui/button&quot;
                          </span>
                          <br />
                          <br />
                          <span className="text-zinc-100">&lt;Button</span>{" "}
                          <span className="text-zinc-300">variant=</span>
                          <span className="text-zinc-300">
                            &quot;default&quot;
                          </span>
                          <span className="text-zinc-100">&gt;</span>
                          <span className="text-zinc-300">
                            {t("documentation.codeExamples.button.clickMe")}
                          </span>
                          <span className="text-zinc-100">&lt;/Button&gt;</span>
                          <br />
                          <span className="text-zinc-100">&lt;Button</span>{" "}
                          <span className="text-zinc-300">variant=</span>
                          <span className="text-zinc-300">
                            &quot;outline&quot;
                          </span>
                          <span className="text-zinc-100">&gt;</span>
                          <span className="text-zinc-300">
                            {t("documentation.codeExamples.button.outline")}
                          </span>
                          <span className="text-zinc-100">&lt;/Button&gt;</span>
                          <br />
                          <span className="text-zinc-100">&lt;Button</span>{" "}
                          <span className="text-zinc-300">variant=</span>
                          <span className="text-zinc-300">
                            &quot;ghost&quot;
                          </span>
                          <span className="text-zinc-100">&gt;</span>
                          <span className="text-zinc-300">
                            {t("documentation.codeExamples.button.ghost")}
                          </span>
                          <span className="text-zinc-100">&lt;/Button&gt;</span>
                          <br />
                          <span className="text-zinc-100">&lt;Button</span>{" "}
                          <span className="text-zinc-300">variant=</span>
                          <span className="text-zinc-300">
                            &quot;destructive&quot;
                          </span>
                          <span className="text-zinc-100">&gt;</span>
                          <span className="text-zinc-300">
                            {t("documentation.codeExamples.button.delete")}
                          </span>
                          <span className="text-zinc-100">&lt;/Button&gt;</span>
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Card Component */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {t("documentation.shadcnComponents.card.title")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t("documentation.shadcnComponents.card.description")}
                    </p>
                    <div className="bg-zinc-900 dark:bg-zinc-500/10 p-6 rounded-lg">
                      <pre className="text-sm text-left">
                        <code className="block">
                          <span className="text-zinc-100">import</span>{" "}
                          <span className="text-zinc-300">
                            {"{ Card, CardContent, CardHeader, CardTitle }"}
                          </span>{" "}
                          <span className="text-zinc-100">from</span>{" "}
                          <span className="text-zinc-300">
                            &quot;@/components/ui/card&quot;
                          </span>
                          <br />
                          <br />
                          <span className="text-zinc-100">&lt;Card&gt;</span>
                          <br />
                          <span className="text-zinc-100">
                            {" "}
                            &lt;CardHeader&gt;
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            {" "}
                            &lt;CardTitle&gt;
                          </span>
                          <span className="text-zinc-300">
                            {t("documentation.codeExamples.card.title")}
                          </span>
                          <span className="text-zinc-100">
                            &lt;/CardTitle&gt;
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            {" "}
                            &lt;/CardHeader&gt;
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            {" "}
                            &lt;CardContent&gt;
                          </span>
                          <br />
                          <span className="text-zinc-100"> &lt;p&gt;</span>
                          <span className="text-zinc-300">
                            {t("documentation.codeExamples.card.content")}
                          </span>
                          <span className="text-zinc-100">&lt;/p&gt;</span>
                          <br />
                          <span className="text-zinc-100">
                            {" "}
                            &lt;/CardContent&gt;
                          </span>
                          <br />
                          <span className="text-zinc-100">&lt;/Card&gt;</span>
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Badge Component */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {t("documentation.shadcnComponents.badge.title")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t("documentation.shadcnComponents.badge.description")}
                    </p>
                    <div className="bg-zinc-900 dark:bg-zinc-500/10 p-6 rounded-lg">
                      <pre className="text-sm text-left">
                        <code className="block">
                          <span className="text-zinc-100">import</span>{" "}
                          <span className="text-zinc-300">{"{ Badge }"}</span>{" "}
                          <span className="text-zinc-100">from</span>{" "}
                          <span className="text-zinc-300">
                            &quot;@/components/ui/badge&quot;
                          </span>
                          <br />
                          <br />
                          <span className="text-zinc-100">&lt;Badge</span>{" "}
                          <span className="text-zinc-300">variant=</span>
                          <span className="text-zinc-300">
                            &quot;default&quot;
                          </span>
                          <span className="text-zinc-100">&gt;</span>
                          <span className="text-zinc-300">
                            {t("documentation.codeExamples.badge.default")}
                          </span>
                          <span className="text-zinc-100">&lt;/Badge&gt;</span>
                          <br />
                          <span className="text-zinc-100">&lt;Badge</span>{" "}
                          <span className="text-zinc-300">variant=</span>
                          <span className="text-zinc-300">
                            &quot;secondary&quot;
                          </span>
                          <span className="text-zinc-100">&gt;</span>
                          <span className="text-zinc-300">
                            {t("documentation.codeExamples.badge.secondary")}
                          </span>
                          <span className="text-zinc-100">&lt;/Badge&gt;</span>
                          <br />
                          <span className="text-zinc-100">&lt;Badge</span>{" "}
                          <span className="text-zinc-300">variant=</span>
                          <span className="text-zinc-300">
                            &quot;outline&quot;
                          </span>
                          <span className="text-zinc-100">&gt;</span>
                          <span className="text-zinc-300">
                            {t("documentation.codeExamples.badge.outline")}
                          </span>
                          <span className="text-zinc-100">&lt;/Badge&gt;</span>
                          <br />
                          <span className="text-zinc-100">&lt;Badge</span>{" "}
                          <span className="text-zinc-300">variant=</span>
                          <span className="text-zinc-300">
                            &quot;destructive&quot;
                          </span>
                          <span className="text-zinc-100">&gt;</span>
                          <span className="text-zinc-300">
                            {t("documentation.codeExamples.badge.destructive")}
                          </span>
                          <span className="text-zinc-100">&lt;/Badge&gt;</span>
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Installation Commands */}
              <section aria-labelledby="installation-commands">
                <h2
                  id="installation-commands"
                  className="text-3xl font-bold text-black dark:text-white mb-6"
                >
                  {t("documentation.installationCommands.title")}
                </h2>

                <div className="space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t("documentation.installationCommands.description")}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {t("documentation.installationCommands.shadcn.title")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {t(
                        "documentation.installationCommands.shadcn.description"
                      )}
                    </p>
                    <div className="bg-zinc-900 dark:bg-zinc-500/10 p-6 rounded-lg">
                      <pre className="text-sm text-left">
                        <code className="block">
                          <span className="text-zinc-400">
                            #{" "}
                            {t(
                              "documentation.installationCommands.shadcn.comments.init"
                            )}
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            npx shadcn@latest init
                          </span>
                          <br />
                          <br />
                          <span className="text-zinc-400">
                            #{" "}
                            {t(
                              "documentation.installationCommands.shadcn.comments.addComponents"
                            )}
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            npx shadcn@latest add button
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            npx shadcn@latest add card
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            npx shadcn@latest add badge
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            npx shadcn@latest add tooltip
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            npx shadcn@latest add dropdown-menu
                          </span>
                        </code>
                      </pre>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {t(
                        "documentation.installationCommands.dependencies.title"
                      )}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {t(
                        "documentation.installationCommands.dependencies.description"
                      )}
                    </p>
                    <div className="bg-zinc-900 dark:bg-zinc-500/10 p-6 rounded-lg">
                      <pre className="text-sm text-left">
                        <code className="block">
                          <span className="text-zinc-400">
                            #{" "}
                            {t(
                              "documentation.installationCommands.dependencies.comment"
                            )}
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            npm install @radix-ui/react-slot
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            npm install class-variance-authority
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            npm install clsx tailwind-merge
                          </span>
                          <br />
                          <span className="text-zinc-100">
                            npm install lucide-react
                          </span>
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Step-by-Step Guide */}
              <section aria-labelledby="step-guide">
                <h2
                  id="step-guide"
                  className="text-3xl font-bold text-black dark:text-white mb-6"
                >
                  {t("documentation.stepGuide.title")}
                </h2>

                <div className="space-y-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t("documentation.stepGuide.description")}
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    <a
                      href="/documentation/1/welcome"
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-sm font-medium">
                          1
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {t("documentation.stepGuide.welcome.title")}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("documentation.stepGuide.welcome.description")}
                      </p>
                    </a>
                    <a
                      href="/documentation/2/install"
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-sm font-medium">
                          2
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {t("documentation.stepGuide.install.title")}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("documentation.stepGuide.install.description")}
                      </p>
                    </a>
                    <a
                      href="/documentation/3/setup"
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-sm font-medium">
                          3
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {t("documentation.stepGuide.setup.title")}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("documentation.stepGuide.setup.description")}
                      </p>
                    </a>
                  </div>
                </div>
              </section>

              {/* GitHub Link */}
              <section aria-labelledby="github">
                <h2
                  id="github"
                  className="text-3xl font-bold text-black dark:text-white mb-6"
                >
                  {t("documentation.github.title")}
                </h2>

                <div className="space-y-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t("documentation.github.description")}
                  </p>
                  <Button asChild>
                    <a
                      href={getGitHubUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                      aria-label="View Boiler.click on GitHub (opens in new tab)"
                    >
                      <Github className="h-4 w-4" />
                      {t("documentation.github.button")}
                    </a>
                  </Button>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
