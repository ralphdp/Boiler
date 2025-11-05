import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { ExamplesClient } from "./examples-client";
import { LazyFooter } from "./lazy-footer";

export const metadata: Metadata = {
  title: "Examples | Boiler.click",
  description:
    "Explore UI components, layouts, and design patterns available in Boiler.click. Interactive examples ready to use in your projects.",
  openGraph: {
    title: "Examples | Boiler.click",
    description: "UI Components & Layout Examples",
    url: "https://boiler.click/examples",
  },
};

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans dark:bg-black">
      <Navigation />
      <ExamplesClient />
      <LazyFooter />
    </div>
  );
}
