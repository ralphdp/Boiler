import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load Footer with loading skeleton
export const LazyFooter = dynamic(() => import("./Footer"), {
  loading: () => (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-48"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
        </div>
      </div>
    </div>
  ),
  ssr: true,
});

// Lazy load Navigation with loading skeleton
export const LazyNavigation = dynamic(() => import("./Navigation").then(mod => ({ default: mod.Navigation })), {
  loading: () => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8"></div>
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: true,
});

// Lazy load Language Switcher
export const LazyLanguageSwitcher = dynamic(
  () =>
    import("./SimpleLanguageSwitcher").then((mod) => ({
      default: mod.SimpleLanguageSwitcher,
    })),
  {
    loading: () => (
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
    ),
    ssr: false,
  }
);

// Lazy load Theme Toggle
export const LazyThemeToggle = dynamic(
  () => import("./theme-toggle").then((mod) => ({ default: mod.ThemeToggle })),
  {
    loading: () => (
      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    ),
    ssr: false,
  }
);

// Lazy load Technology Showcase
export const LazyTechnologyShowcase = dynamic(() => import("./TechnologyShowcase"), {
  loading: () => (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  ),
  ssr: false,
});

// Lazy load Quick Start
export const LazyQuickStart = dynamic(() => import("./QuickStart"), {
  loading: () => (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
      </div>
    </div>
  ),
  ssr: false,
});

// Lazy load Social Share
export const LazySocialShare = dynamic(() => import("./SocialShare").then(mod => ({ default: mod.SocialShare })), {
  loading: () => (
    <div className="flex gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
        ></div>
      ))}
    </div>
  ),
  ssr: false,
});

// Lazy load with Suspense wrapper
export function LazyWrapper({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={fallback || <div className="animate-pulse">Loading...</div>}
    >
      {children}
    </Suspense>
  );
}
