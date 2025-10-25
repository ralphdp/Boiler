import articlesData from "@/data/articles.json";

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  featuredImage: string;
  tags: string[];
  publishedAt: string;
  author: string;
  featured: boolean;
  readTime: string;
  excerpt: string;
}

export interface ArticlesData {
  articles: Article[];
}

// Get all articles
export function getAllArticles(): Article[] {
  return articlesData.articles;
}

// Get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articlesData.articles.find((article) => article.slug === slug);
}

// Get featured articles
export function getFeaturedArticles(): Article[] {
  return articlesData.articles.filter((article) => article.featured);
}

// Get articles by tag
export function getArticlesByTag(tag: string): Article[] {
  return articlesData.articles.filter((article) =>
    article.tags.some(
      (articleTag) => articleTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

// Get all unique tags
export function getAllTags(): string[] {
  const allTags = articlesData.articles.flatMap((article) => article.tags);
  return [...new Set(allTags)].sort();
}

// Get recent articles (last 5)
export function getRecentArticles(limit: number = 5): Article[] {
  return articlesData.articles
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

// Search articles
export function searchArticles(query: string): Article[] {
  const lowercaseQuery = query.toLowerCase();
  return articlesData.articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.description.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}

// Get related articles (by tags)
export function getRelatedArticles(
  currentArticle: Article,
  limit: number = 3
): Article[] {
  const currentTags = currentArticle.tags;
  return articlesData.articles
    .filter(
      (article) =>
        article.id !== currentArticle.id &&
        article.tags.some((tag) => currentTags.includes(tag))
    )
    .slice(0, limit);
}

// Generate article URL
export function getArticleUrl(slug: string): string {
  return `/articles/${slug}`;
}

// Generate tag URL
export function getTagUrl(tag: string): string {
  return `/articles?tag=${encodeURIComponent(tag)}`;
}

// Format date for display
export function formatArticleDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Generate meta description
export function generateMetaDescription(article: Article): string {
  return article.excerpt || article.description;
}

// Generate Open Graph data
export function generateOpenGraphData(article: Article) {
  return {
    title: article.title,
    description: article.excerpt || article.description,
    image: article.featuredImage,
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://boiler.click"
    }/articles/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    author: article.author,
    tags: article.tags,
  };
}

// Generate structured data (JSON-LD)
export function generateStructuredData(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt || article.description,
    image: article.featuredImage,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Boiler.click",
      logo: {
        "@type": "ImageObject",
        url: `${
          process.env.NEXT_PUBLIC_SITE_URL || "https://boiler.click"
        }/logo.png`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://boiler.click"
      }/articles/${article.slug}`,
    },
    keywords: article.tags.join(", "),
    articleSection: "Technology",
    wordCount: article.content.split(" ").length,
  };
}
