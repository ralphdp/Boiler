"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Tag, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import {
  getAllArticles,
  getAllTags,
  formatArticleDate,
  getArticleUrl,
  getTagUrl,
} from "@/lib/articles";
import Link from "next/link";
import Image from "next/image";

export default function ArticlesPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allArticles = getAllArticles();
  const allTags = getAllTags();

  const filteredArticles = useMemo(() => {
    let filtered = allArticles;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          article.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter((article) =>
        article.tags.includes(selectedTag)
      );
    }

    return filtered;
  }, [allArticles, searchQuery, selectedTag]);

  const featuredArticle = allArticles.find((article) => article.featured);
  const otherArticles = filteredArticles.filter((article) => !article.featured);

  return (
    <>
      <Head>
        <title>Articles & Updates - Boiler.click</title>
        <meta
          name="description"
          content="Stay updated with the latest developments, tutorials, and insights from the Boiler.click team. Learn about our development process, mission, and upcoming features."
        />
        <meta
          name="keywords"
          content="articles, updates, development, boilerplate, SaaS, Next.js, React, TypeScript, tutorials, insights"
        />
        <meta property="og:title" content="Articles & Updates - Boiler.click" />
        <meta
          property="og:description"
          content="Stay updated with the latest developments, tutorials, and insights from the Boiler.click team."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boiler.click/articles" />
        <meta property="og:image" content="https://boiler.click/og-image.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Articles & Updates - Boiler.click"
        />
        <meta
          name="twitter:description"
          content="Stay updated with the latest developments, tutorials, and insights from the Boiler.click team."
        />
        <meta
          name="twitter:image"
          content="https://boiler.click/og-image.svg"
        />
        <link rel="canonical" href="https://boiler.click/articles" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Articles & Updates - Boiler.click",
              description:
                "Stay updated with the latest developments, tutorials, and insights from the Boiler.click team.",
              url: "https://boiler.click/articles",
              mainEntity: {
                "@type": "ItemList",
                itemListElement: allArticles.map((article, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Article",
                    headline: article.title,
                    description: article.excerpt,
                    url: `https://boiler.click/articles/${article.slug}`,
                    datePublished: article.publishedAt,
                    author: {
                      "@type": "Person",
                      name: article.author,
                    },
                  },
                })),
              },
            }),
          }}
        />
      </Head>
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Articles & Updates
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              Stay updated with the latest developments, tutorials, and insights
              from the Boiler.click team.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
              >
                Clear Filters
              </Button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Featured Article */}
          {featuredArticle && !selectedTag && !searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <Image
                      src={featuredArticle.featuredImage}
                      alt={featuredArticle.title}
                      width={600}
                      height={400}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Featured</Badge>
                      <span className="text-sm text-zinc-500">
                        {featuredArticle.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredArticle.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatArticleDate(featuredArticle.publishedAt)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredArticle.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link href={getArticleUrl(featuredArticle.slug)}>
                      <Button>Read More</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Articles Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {otherArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-zinc-500">
                        {article.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatArticleDate(article.publishedAt)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{article.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Link href={getArticleUrl(article.slug)}>
                      <Button variant="outline" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                No articles found
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Try adjusting your search or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
