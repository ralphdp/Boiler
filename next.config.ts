import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
    // optimizeCss: true, // Disabled due to critters dependency issues
  },
  // Turbopack configuration for Next.js 16
  turbopack: {
    // Turbopack handles bundle optimization automatically
    // No need for custom webpack config
  },
  // Fallback webpack config for when not using Turbopack
  webpack: (config, { dev, isServer }) => {
    // Only apply webpack optimizations when not using Turbopack
    if (!process.env.TURBOPACK && !dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          styles: {
            name: "styles",
            test: /\.(css|scss)$/,
            chunks: "all",
            enforce: true,
          },
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            priority: 10,
          },
          // Split large animation library
          framerMotion: {
            name: "framer-motion",
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            chunks: "async",
            priority: 15,
          },
          // Split UI component libraries
          radixUI: {
            name: "radix-ui",
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            chunks: "async",
            priority: 12,
          },
          // Split icon library
          lucideIcons: {
            name: "lucide-icons",
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            chunks: "async",
            priority: 11,
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
  headers: async () => [
    {
      source: "/api/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=300" },
        {
          key: "Access-Control-Allow-Origin",
          value:
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_SITE_URL || "https://boiler.click"
              : "*",
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET, POST, PUT, DELETE, OPTIONS",
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "Content-Type, Authorization, X-CSRF-Token",
        },
        {
          key: "Access-Control-Max-Age",
          value: "86400",
        },
      ],
    },
    {
      source: "/_next/static/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/:path*",
      headers: [
        { key: "X-DNS-Prefetch-Control", value: "on" },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: https: blob:",
            "font-src 'self' data: https://fonts.gstatic.com",
            "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://vercel.live",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-src 'self'",
            "object-src 'none'",
            "upgrade-insecure-requests",
          ].join("; "),
        },
        {
          key: "Permissions-Policy",
          value: [
            "geolocation=()",
            "microphone=()",
            "camera=()",
            "payment=()",
            "usb=()",
          ].join(", "),
        },
        {
          key: "Cross-Origin-Embedder-Policy",
          value: "require-corp",
        },
        {
          key: "Cross-Origin-Opener-Policy",
          value: "same-origin",
        },
        {
          key: "Cross-Origin-Resource-Policy",
          value: "same-origin",
        },
      ],
    },
  ],
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
