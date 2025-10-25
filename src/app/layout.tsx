import { Cabin, PT_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollRestoration } from "@/components/ScrollRestoration";
import { FloatingSocialIcons } from "@/components/FloatingSocialIcons";

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
  display: "swap",
  preload: true,
});

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-sans",
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />

        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="Boiler.click" />
        <meta name="generator" content="Next.js" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Boiler.click" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@boilerclick" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Boiler.click" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Boiler.click" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldBeDark = theme === 'dark' || (!theme && prefersDark);
                  document.documentElement.className = shouldBeDark ? 'dark' : 'light';
                } catch (e) {
                  document.documentElement.className = 'light';
                }
              })();
            `,
          }}
        />

        {/* Force scroll to top on page load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Force scroll to top immediately
                window.scrollTo(0, 0);
                
                // Prevent scroll restoration during page load
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                
                // Additional scroll to top after DOM is ready
                document.addEventListener('DOMContentLoaded', function() {
                  window.scrollTo(0, 0);
                });
                
                // Final scroll to top after page is fully loaded
                window.addEventListener('load', function() {
                  window.scrollTo(0, 0);
                });
              })();
            `,
          }}
        />

        {/* Language detection and localStorage setup */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Set initial language in localStorage if not already set
                if (!localStorage.getItem('boiler-click-language')) {
                  const browserLang = navigator.language.split('-')[0];
                  const supportedLangs = ['en', 'es', 'fr', 'ja'];
                  const detectedLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
                  localStorage.setItem('boiler-click-language', detectedLang);
                }
              })();
            `,
          }}
        />

        {/* Analytics and Performance Monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize analytics and performance monitoring
              (function() {
                // Service Worker registration
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                      });
                  });
                }
                
                // Analytics initialization removed
              })();
            `,
          }}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Boiler.click",
              description:
                "Next generation full-stack SaaS boilerplate. Powered with Next.js, Prisma, Shadcn, and other performant technologies.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              url: "https://boiler.click",
              author: {
                "@type": "Organization",
                name: "Boiler.click Team",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "150",
              },
            }),
          }}
        />
      </head>
      <body className={`${cabin.variable} ${ptSans.variable} font-pt-sans`}>
        {/* Skip Navigation Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>

        <LanguageProvider>
          <ScrollRestoration>{children}</ScrollRestoration>
          <FloatingSocialIcons />
        </LanguageProvider>
      </body>
    </html>
  );
}
