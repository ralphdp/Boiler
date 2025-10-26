import { getGitHubCloneCommand } from "./github";

export interface DocumentationStep {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: {
    sections: {
      title: string;
      content: string;
      codeBlocks?: {
        language: string;
        code: string;
        description?: string;
      }[];
      images?: {
        src: string;
        alt: string;
        caption?: string;
      }[];
    }[];
  };
}

export const documentationSteps: DocumentationStep[] = [
  {
    id: 1,
    slug: "welcome",
    title: "Welcome",
    description:
      "Get started with Boiler.click and understand what you're building",
    content: {
      sections: [
        {
          title: "What is Boiler.click?",
          content:
            "Boiler.click is a comprehensive, production-ready Next.js boilerplate designed to accelerate your SaaS development. It's more than just a starter template – it's a complete foundation that includes everything you need to build, deploy, and scale modern web applications.",
        },
        {
          title: "Why Choose Boiler.click?",
          content:
            "Built with enterprise-grade practices and modern development standards, Boiler.click eliminates the tedious setup process and lets you focus on building your unique features. Whether you're creating a SaaS platform, e-commerce site, or any web application, this boilerplate provides a solid, scalable foundation that grows with your project. The boilerplate is specifically optimized for Vercel deployment but works seamlessly with other hosting platforms. It includes built-in performance optimizations, security best practices, and developer experience enhancements that would typically take weeks to implement from scratch.",
        },
        {
          title: "What's Included",
          content:
            "Our boilerplate comes with a complete set of modern tools and features:",
          codeBlocks: [
            {
              language: "text",
              code: "• Next.js 16 with App Router\n• TypeScript for type safety\n• Tailwind CSS for styling\n• Shadcn/ui components\n• Authentication system\n• Database integration\n• API routes\n• SEO optimization\n• Performance monitoring",
              description: "Key features included in the boilerplate",
            },
          ],
        },
      ],
    },
  },
  {
    id: 2,
    slug: "install",
    title: "Install & Configure",
    description:
      "Install dependencies and configure your environment to get started",
    content: {
      sections: [
        {
          title: "Prerequisites",
          content:
            "Before you begin, make sure you have the following installed on your system:",
          codeBlocks: [
            {
              language: "bash",
              code: "# Check Node.js version (18+ required)\nnode --version\n\n# Check npm version\nnpm --version\n\n# Check Git version\ngit --version",
              description: "Verify your development environment",
            },
          ],
        },
        {
          title: "Installation Steps",
          content:
            "Follow these steps to get Boiler.click running on your machine:",
          codeBlocks: [
            {
              language: "bash",
              code: `# 1. Clone the repository\n${getGitHubCloneCommand()}\ncd boiler\n\n# 2. Install dependencies\nnpm install\n\n# 3. Set up environment variables\ncp .env.example .env.local\n\n# 4. Start the development server\nnpm run dev`,
              description: "Complete installation process",
            },
          ],
        },
        {
          title: "Environment Variables",
          content:
            "Copy the .env.example file to .env.local and configure your environment variables including database URL, authentication secrets, and API keys.",
          codeBlocks: [
            {
              language: "bash",
              code: "# Copy environment file\ncp .env.example .env.local",
              description: "Create your local environment configuration",
            },
            {
              language: "env",
              code: '# Maintenance Mode\nMAINTENANCE_MODE=false\n\nNEXT_PUBLIC_VERSION="0.0.1-alpha"\nNEXT_PUBLIC_BUILD_TIME="Jan. 01, 2025"\nNEXT_PUBLIC_GITHUB_USER=""\nNEXT_PUBLIC_GITHUB_REPO=""\n\n# Brand\nNEXT_PUBLIC_SITE_TITLE=""\nNEXT_PUBLIC_SITE_EMAIL_SUPPORT=""\nNEXT_PUBLIC_SITE_PHYSICAL_ADDRESS=""\nNEXT_PUBLIC_SITE_TELEPHONE=""\nNEXT_PUBLIC_SOCIAL_GITHUB=""\nNEXT_PUBLIC_SOCIAL_X=""\nNEXT_PUBLIC_SOCIAL_FACEBOOK=""\nNEXT_PUBLIC_SOCIAL_YOUTUBE=""\nNEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"\n\n# Database Connections\n# Database\nDATABASE_LOCAL_URL="postgresql://username:password@localhost:5432/boiler"\nDATABASE_REMOTE_URL="postgresql://neondb_owner:[password]@[server].c-2.us-east-1.aws.neon.tech/[database_name]?sslmode=require"\n# Redis\nREDIS_LOCAL_URL="redis://localhost:6379"\nREDIS_REMOTE_URL="redis://default:[password]@redis-[server_id]].c323.us-east-1-2.ec2.redns.redis-cloud.com:[server_id]"\n\n# Authentication & Security\n# JWT Secret for token signing (if using JWT auth)\nJWT_SECRET=""\n\n# Session Configuration\nSESSION_SECRET=""\n\n# Third-Party Services\n# OAuth Providers\nGOOGLE_CLIENT_ID=[602141741836]-[id].apps.googleusercontent.com\nGOOGLE_CLIENT_SECRET=""\nGITHUB_CLIENT_ID=""\nGITHUB_CLIENT_SECRET=""\nDISCORD_CLIENT_ID="your-discord-client-id"\nDISCORD_CLIENT_SECRET="your-discord-client-secret"\nFACEBOOK_CLIENT_ID="your-facebook-client-id"\nFACEBOOK_CLIENT_SECRET="your-facebook-client-secret"\nTWITTER_CLIENT_ID="your-twitter-client-id"\nTWITTER_CLIENT_SECRET="your-twitter-client-secret"\n# Payment Processing\nSTRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"\nSTRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"\nSTRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"\n\n# Email\nSMTP_HOST="smtp.example.com"\nSMTP_PORT="587"\nSMTP_USER=""\nSMTP_PASS=""',
              description: "Complete environment variables configuration",
            },
          ],
        },
        {
          title: "Database Setup",
          content:
            "Set up your PostgreSQL database and run migrations to create the necessary tables and relationships.",
          codeBlocks: [
            {
              language: "bash",
              code: "# Install PostgreSQL (if not already installed)\n# macOS with Homebrew\nbrew install postgresql\nbrew services start postgresql\n\n# Create database\ncreatedb boilerclick\n\n# Run migrations\nnpx prisma migrate dev\n\n# Generate Prisma client\nnpx prisma generate",
              description: "Database setup and migration process",
            },
          ],
        },
        {
          title: "Authentication Configuration",
          content: "Configure Passport.js for user authentication:",
          codeBlocks: [
            {
              language: "typescript",
              code: `// src/lib/auth.ts\nimport passport from 'passport';\nimport { Strategy as GoogleStrategy } from 'passport-google-oauth20';\nimport { Strategy as GitHubStrategy } from 'passport-github2';\n\nexport const authConfig = {\n  google: {\n    clientID: process.env.GOOGLE_CLIENT_ID!,\n    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,\n    callbackURL: '/auth/google/callback'\n  },\n  github: {\n    clientID: process.env.GITHUB_CLIENT_ID!,\n    clientSecret: process.env.GITHUB_CLIENT_SECRET!,\n    callbackURL: '/auth/github/callback'\n  }\n};\n\n// Configure Google OAuth\npassport.use(new GoogleStrategy(authConfig.google, async (accessToken, refreshToken, profile, done) => {\n  // Your authentication logic here\n  return done(null, profile);\n}));\n\n// Configure GitHub OAuth\npassport.use(new GitHubStrategy(authConfig.github, async (accessToken, refreshToken, profile, done) => {\n  // Your authentication logic here\n  return done(null, profile);\n}));`,
              description: "Passport.js configuration with OAuth providers",
            },
          ],
        },
        {
          title: "Customization",
          content: "Customize your application's appearance and functionality:",
          codeBlocks: [
            {
              language: "css",
              code: "/* src/app/globals.css */\n:root {\n  --primary: 222.2 84% 4.9%;\n  --primary-foreground: 210 40% 98%;\n  --secondary: 210 40% 96%;\n  --secondary-foreground: 222.2 84% 4.9%;\n  /* Add your custom colors */\n}",
              description: "Customize your color scheme",
            },
          ],
        },
      ],
    },
  },
  {
    id: 3,
    slug: "development",
    title: "Development Workflow",
    description:
      "Learn about the development workflow and available scripts for building your application",
    content: {
      sections: [
        {
          title: "Available Scripts",
          content: "Use these npm scripts to manage your development workflow:",
          codeBlocks: [
            {
              language: "bash",
              code: "# Start the development server with hot reload\nnpm run dev\n\n# Build the application for production\nnpm run build\n\n# Start the production server\nnpm run start\n\n# Run ESLint to check code quality\nnpm run lint",
              description: "Essential development commands",
            },
          ],
        },
        {
          title: "Development Workflow",
          content: "Follow this workflow for efficient development:",
          codeBlocks: [
            {
              language: "text",
              code: "1. Start the development server: npm run dev\n2. Make your changes in the src/ directory\n3. Test your changes in the browser\n4. Run linting: npm run lint\n5. Build for production: npm run build\n6. Test production build: npm run start",
              description: "Step-by-step development process",
            },
          ],
        },
        {
          title: "Hot Reload",
          content:
            "The development server automatically reloads when you make changes to your code. This includes:\n\n• React components\n• CSS and Tailwind classes\n• TypeScript files\n• API routes\n• Configuration files",
          codeBlocks: [
            {
              language: "bash",
              code: "# Start development with hot reload\nnpm run dev\n\n# The server will start on http://localhost:3000\n# Changes will be reflected automatically",
              description: "Development server with hot reload",
            },
          ],
        },
      ],
    },
  },
  {
    id: 4,
    slug: "shadcn-components",
    title: "Shadcn/UI Components",
    description:
      "Learn how to use the most common shadcn/ui components with practical code examples",
    content: {
      sections: [
        {
          title: "Introduction",
          content:
            "This boilerplate includes shadcn/ui components for building beautiful, accessible user interfaces. Visit the official shadcn/ui website: ui.shadcn.com",
        },
        {
          title: "Button Component",
          content:
            "Versatile button component with multiple variants for different use cases:",
          codeBlocks: [
            {
              language: "tsx",
              code: 'import { Button } from "@/components/ui/button"\n\n<Button variant="default">Click me</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="destructive">Delete</Button>',
              description: "Button component with different variants",
            },
          ],
        },
        {
          title: "Card Component",
          content:
            "Flexible card component for displaying content in a structured layout:",
          codeBlocks: [
            {
              language: "tsx",
              code: 'import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"\n\n<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n  </CardHeader>\n  <CardContent>\n    <p>Card content goes here</p>\n  </CardContent>\n</Card>',
              description: "Card component with header and content",
            },
          ],
        },
        {
          title: "Badge Component",
          content:
            "Small status indicators and labels with different variants:",
          codeBlocks: [
            {
              language: "tsx",
              code: 'import { Badge } from "@/components/ui/badge"\n\n<Badge variant="default">Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="outline">Outline</Badge>\n<Badge variant="destructive">Destructive</Badge>',
              description: "Badge component with different variants",
            },
          ],
        },
        {
          title: "Installation Commands",
          content:
            "Essential commands to set up shadcn/ui components and required dependencies:",
          codeBlocks: [
            {
              language: "bash",
              code: "# Install shadcn/ui CLI\nnpx shadcn@latest init\n\n# Add components\nnpx shadcn@latest add button\nnpx shadcn@latest add card\nnpx shadcn@latest add badge\nnpx shadcn@latest add tooltip\nnpx shadcn@latest add dropdown-menu",
              description: "Shadcn/UI setup and component installation",
            },
            {
              language: "bash",
              code: "# Install required dependencies\nnpm install @radix-ui/react-slot\nnpm install class-variance-authority\nnpm install clsx tailwind-merge\nnpm install lucide-react",
              description: "Required dependencies for shadcn/ui components",
            },
          ],
        },
        {
          title: "Additional Components",
          content: "The boilerplate includes several other useful components:",
          codeBlocks: [
            {
              language: "text",
              code: "• Tooltip - Hover tooltips for better UX\n• Dropdown Menu - Contextual menus\n• Modal - Overlay dialogs\n• Input - Form input fields\n• Separator - Visual dividers\n• Scroll Area - Custom scrollable areas\n• Sheet - Slide-out panels",
              description: "Additional available components",
            },
          ],
        },
      ],
    },
  },
  {
    id: 5,
    slug: "vercel-optimization",
    title: "Vercel Optimization",
    description:
      "This boilerplate is specifically optimized for Vercel deployment with built-in features and configurations",
    content: {
      sections: [
        {
          title: "Why Vercel?",
          content:
            "Vercel provides several advantages for modern web applications:",
          codeBlocks: [
            {
              language: "text",
              code: "• Lightning-fast global CDN and edge computing\n• Seamless developer experience with instant deployments\n• Built-in performance monitoring and error tracking\n• Enterprise-grade security and compliance\n• Pay-as-you-scale pricing with generous free tier",
              description: "Key benefits of using Vercel",
            },
          ],
        },
        {
          title: "Vercel-Specific Features",
          content:
            "This boilerplate includes several Vercel-optimized features out of the box:",
          codeBlocks: [
            {
              language: "text",
              code: "• Built-in BotID bot detection (automatic in production)\n• Edge Runtime optimization for faster response times\n• Vercel Analytics integration for performance monitoring\n• Automatic image optimization and CDN delivery\n• Zero-config deployment with automatic builds\n• Serverless functions with optimal cold start performance\n• Automatic HTTPS and security headers\n• Automatic scaling based on traffic patterns",
              description: "Built-in Vercel optimizations",
            },
          ],
        },
        {
          title: "Deployment Configuration",
          content:
            "The boilerplate includes optimized Vercel configuration files:",
          codeBlocks: [
            {
              language: "json",
              code: '{\n  "functions": {\n    "src/app/api/**/*.ts": {\n      "runtime": "nodejs18.x"\n    }\n  },\n  "headers": [\n    {\n      "source": "/(.*)",\n      "headers": [\n        {\n          "key": "X-Content-Type-Options",\n          "value": "nosniff"\n        },\n        {\n          "key": "X-Frame-Options",\n          "value": "DENY"\n        },\n        {\n          "key": "X-XSS-Protection",\n          "value": "1; mode=block"\n        }\n      ]\n    }\n  ]\n}',
              description: "vercel.json configuration for optimal performance",
            },
          ],
        },
      ],
    },
  },
];

export function getStepBySlug(slug: string): DocumentationStep | undefined {
  return documentationSteps.find((step) => step.slug === slug);
}

export function getStepByNumber(
  stepNumber: number
): DocumentationStep | undefined {
  return documentationSteps.find((step) => step.id === stepNumber);
}

export function getAllSteps(): DocumentationStep[] {
  return documentationSteps;
}
