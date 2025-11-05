"use client";

import dynamic from "next/dynamic";

// Lazy load Footer since it's not critical
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: () => (
    <div className="h-32 bg-gray-100 dark:bg-gray-800 animate-pulse" />
  ),
});

export function LazyFooter() {
  return <Footer />;
}
