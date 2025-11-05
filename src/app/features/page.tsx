import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { FeaturesClient } from "./features-client";
import { LazyFooter } from "./lazy-footer";

export const metadata: Metadata = {
  title: "Features | Boiler.click",
  description:
    "Explore all the features of Boiler.click - a production-ready Next.js boilerplate with authentication, database management, and beautiful UI components.",
  openGraph: {
    title: "Features | Boiler.click",
    description:
      "Everything you need to build production-ready SaaS applications",
    url: "https://boiler.click/features",
  },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans dark:bg-black">
      <Navigation />
      <FeaturesClient />
      <LazyFooter />
    </div>
  );
}
