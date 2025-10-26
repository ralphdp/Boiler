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
            "Boiler.click is a comprehensive, production-ready Next.js boilerplate designed to accelerate your SaaS development. It includes everything you need to build and deploy a modern web application.",
          codeBlocks: [
            {
              language: "bash",
              code: `# Clone the repository\n${getGitHubCloneCommand()}\ncd boiler`,
              description:
                "Start by cloning the repository to your local machine",
            },
          ],
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
    title: "Install",
    description: "Install dependencies and set up your development environment",
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
            "Configure your environment variables for proper functionality:",
          codeBlocks: [
            {
              language: "env",
              code: '# Maintenance Mode\nMAINTENANCE_MODE=false\n\nNEXT_PUBLIC_VERSION="0.0.1-alpha"\nNEXT_PUBLIC_BUILD_TIME="Oct. 25, 2025"\nNEXT_PUBLIC_GITHUB_USER="ralphdp"\nNEXT_PUBLIC_GITHUB_REPO="boiler"\n\n# Brand\nNEXT_PUBLIC_SITE_TITLE="Boiler.click"\nNEXT_PUBLIC_SITE_EMAIL_SUPPORT="hi@boiler.click"\nNEXT_PUBLIC_SITE_PHYSICAL_ADDRESS="123 Oak St."\nNEXT_PUBLIC_SITE_TELEPHONE="+18885551234"\nNEXT_PUBLIC_SOCIAL_GITHUB="Boiler.click"\nNEXT_PUBLIC_SOCIAL_X="Boiler.click"\nNEXT_PUBLIC_SOCIAL_FACEBOOK="Boiler.click"\nNEXT_PUBLIC_SOCIAL_YOUTUBE="Boiler.click"\nNEXT_PUBLIC_GA_ID="G-DH9HJEP4VV"\n\n# Database Connections\n# Database\nDATABASE_URL="postgresql://username:password@localhost:5432/boiler"\n# DATABASE_URL="postgresql://neondb_owner:neondb_password@ep-polished-band-adiag2vf-pooler.c-2.us-east-1.aws.neon.tech/boiler?sslmode=require"\nREDIS_URL="redis://localhost:6379"\n# REDIS_URL="redis://default:password@redis-18324.c323.us-east-1-2.ec2.redns.redis-cloud.com:18324"\n\n# Authentication & Security\n# JWT Secret for token signing (if using JWT auth)\nJWT_SECRET=""\n\n# Session Configuration\nSESSION_SECRET=""\n\n# Third-Party Services\n# OAuth Providers\nGOOGLE_CLIENT_ID=602141741836-[id].apps.googleusercontent.com\nGOOGLE_CLIENT_SECRET=""\nGITHUB_CLIENT_ID=""\nGITHUB_CLIENT_SECRET=""\nDISCORD_CLIENT_ID="your-discord-client-id"\nDISCORD_CLIENT_SECRET="your-discord-client-secret"\nFACEBOOK_CLIENT_ID="your-facebook-client-id"\nFACEBOOK_CLIENT_SECRET="your-facebook-client-secret"\nTWITTER_CLIENT_ID="your-twitter-client-id"\nTWITTER_CLIENT_SECRET="your-twitter-client-secret"\n# Payment Processing\nSTRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"\nSTRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"\nSTRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"\n\n# Email\nSMTP_HOST="smtp.example.com"\nSMTP_PORT="587"\nSMTP_USER=""\nSMTP_PASS=""',
              description: "Complete environment variables configuration",
            },
          ],
        },
      ],
    },
  },
  {
    id: 3,
    slug: "setup",
    title: "Setup",
    description:
      "Configure your database, authentication, and customize your application",
    content: {
      sections: [
        {
          title: "Database Setup",
          content:
            "Set up your PostgreSQL database and run the initial migrations:",
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
