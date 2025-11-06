# Next.js 16 Project Setup with Prisma, Passport.js, Stripe, Redis, and Vercel

## Overview
Set up a Next.js 16 project with TypeScript, App Router, shadcn/ui, Prisma (PostgreSQL), Passport.js authentication with complete auth flow including MFA and GDPR account deletion, Stripe integration, Redis (Redis Cloud), i18n support, GDPR-compliant cookie banner, error pages, security/performance enhancements, WordPress-like core/theme architecture, AI Chat API, dark/light theme toggle, and Vercel deployment configuration.

## Architecture: Core vs Theme System (WordPress-like)

### Core Structure (Never Modified by Users)
- `app/core/` - Core application logic, API routes, middleware
- `components/core/` - Core reusable components (auth UI, forms, etc.)
- `lib/core/` - Core utilities, database, auth, email, etc.
- `themes/core/` - Default base theme as fallback

### Theme Structure (User-Customizable)
- `themes/[theme-name]/` - Each theme directory
  - `themes/[theme-name]/app/` - Theme-specific pages and layouts
  - `themes/[theme-name]/components/` - Theme-specific components
  - `themes/[theme-name]/styles/` - Theme-specific styles
  - `themes/[theme-name]/theme.json` - Theme configuration
  - `themes/[theme-name]/templates/` - Custom page templates

### Module Resolution Strategy
- Check `themes/[active-theme]/` first, then fall back to `app/core/`
- Dynamic theme loading based on database configuration
- Theme API for extending core functionality
- Theme switching without code changes

## Implementation Steps

### 1. Initialize Next.js 16 Project
- Run `npx create-next-app@latest` specifying Next.js 16 with TypeScript, App Router, Tailwind CSS, and ESLint
- Ensure all dependencies use latest stable versions
- Configure project settings (src directory, import aliases, etc.)

### 2. Install and Configure shadcn/ui
- Install shadcn/ui CLI dependencies (latest versions)
- Initialize shadcn/ui with `npx shadcn@latest init`
- Configure `components.json` with appropriate paths and styling options
- Set up Tailwind CSS configuration to work with shadcn/ui

### 3. Prisma Setup with PostgreSQL
- Install Prisma and PostgreSQL client (latest versions)
- Initialize Prisma with `npx prisma init`
- Configure `schema.prisma` with PostgreSQL provider
- Create User model with:
  - Email verification fields (isVerified, verificationToken, verificationTokenExpiry)
  - MFA fields (mfaEnabled, mfaMethod, mfaSecret, mfaPhoneNumber, mfaBackupCodes, mfaVerified)
- Create VerificationToken model for email verification
- Create PasswordResetToken model for password reset functionality
- Create SiteSettings model for storing site configuration and active theme
- Create Theme model for theme configuration and metadata
- Set up database connection string in `.env`
- Generate Prisma client

### 4. Core vs Theme Architecture Setup
- Create core directory structure (`app/core/`, `components/core/`, `lib/core/`)
- Create theme directory structure (`themes/`, `themes/core/`, `themes/[theme-name]/`)
- Implement module resolution system (check theme first, then core)
- Create theme configuration system (theme.json, theme registration)
- Create theme API (hooks, utilities, extension points)
- Set up theme switching mechanism
- Create migration system that preserves custom themes during core updates

### 5. Reusable Auth UI Components (Core)
- Create core auth components in `components/core/auth/`:
  - `LoginForm` - Reusable login form component
  - `RegisterForm` - Reusable registration form component
  - `ProfileForm` - Reusable profile form component
  - `PasswordResetForm` - Reusable password reset form component
  - `ForgotPasswordForm` - Forgot password request form
  - `EmailVerificationBanner` - Verification status display component
  - `AuthGuard` - Route protection component
  - `ResendVerificationForm` - Resend verification email form
  - `DeleteAccountForm` - Account deletion form component (GDPR)
- Create MFA components in `components/core/auth/mfa/`:
  - `MFAVerificationForm` - Core reusable MFA verification form
  - `TOTPVerificationForm` - Authenticator app code input
  - `SMSVerificationForm` - SMS code input
  - `EmailMFAVerificationForm` - Email code input
  - `MFAEnableForm` - MFA setup form component
  - `MFADisableForm` - MFA disable form component
- Design components to be fully customizable, theme-aware, accessible, i18n ready, with Zod validation

### 6. Redis Setup and Configuration
- Install Redis client (`ioredis` or `@upstash/redis`)
- Configure Redis connection using Redis Cloud: `redis://default:[pass]@redis-18324.c323.us-east-1-2.ec2.redns.redis-cloud.com:18324`
- Set up Redis client utility with connection pooling
- Create Redis connection singleton
- Configure environment variable `REDIS_URL`

### 7. Passport.js Authentication Setup with Redis Sessions
- Install Passport.js and session middleware (latest versions)
- Install `connect-redis` for Redis session store
- Configure Redis session store with `connect-redis`
- Set up authentication strategies (local, OAuth providers as needed)
- Create authentication routes and middleware
- Create authentication utilities and session management
- Integrate with Prisma for user management
- Set up email verification system
- Configure password reset functionality
- Implement account verification flow
- Create password hashing utilities using bcrypt

### 8. Multi-Factor Authentication (MFA) Setup
- Install MFA dependencies:
  - `speakeasy` or `otplib` for TOTP authenticator apps
  - `qrcode` for QR code generation
  - `twilio` for SMS-based MFA
- Create MFA setup flow:
  - MFA setup page (`app/core/[locale]/auth/mfa/setup`)
  - MFA method selection (email, authenticator, SMS)
  - TOTP secret generation and QR code display
  - Phone number verification for SMS MFA
  - Backup codes generation and display
  - MFA verification step to confirm setup
- Create MFA API routes (`app/core/api/auth/mfa/`):
  - `/api/auth/mfa/setup` - Initialize MFA setup
  - `/api/auth/mfa/verify-setup` - Verify and complete MFA setup
  - `/api/auth/mfa/verify` - Verify MFA code during login
  - `/api/auth/mfa/enable` - Enable MFA for user
  - `/api/auth/mfa/disable` - Disable MFA for user
  - `/api/auth/mfa/methods` - Get available MFA methods
  - `/api/auth/mfa/backup-codes` - Generate new backup codes
  - `/api/auth/mfa/verify-backup-code` - Verify backup code for recovery
- Implement TOTP authenticator MFA (generate secrets, QR codes, verify codes)
- Implement email-based MFA (send codes via Resend, expiration, rate limiting)
- Implement SMS-based MFA with Twilio (send SMS codes, phone verification, rate limiting)
- Create MFA pages (setup, verify, settings, recover)
- Implement backup codes system
- Integrate MFA into login flow (check MFA after password verification, redirect to MFA page)
- Create MFA middleware and profile settings

### 9. Email Service Setup with Resend
- Install Resend SDK (`resend` package - latest version)
- Configure Resend with API key from environment variables
- Create Resend email service utility functions
- Create email templates (verification, password reset, welcome, MFA codes, account deletion)
- Set up email template rendering with i18n support
- Configure email sending with error handling and retry logic
- Set up React Email templates for better email design (optional)

### 10. Authentication Pages and Flow (Core)
- Create core authentication pages in `app/core/[locale]/auth/`:
  - Registration page with email verification requirement
  - Login page (with MFA check)
  - Profile page (protected)
  - Password recovery page
  - Password reset page (with token validation)
  - Resend verification email page
  - Email verification page (token validation)
  - Account deletion page (`app/core/[locale]/profile/delete-account`)
- Create authentication API routes in `app/core/api/auth/`:
  - `/api/auth/register` - User registration with email verification
  - `/api/auth/login` - User login (check for verified account, MFA check)
  - `/api/auth/logout` - User logout
  - `/api/auth/verify-email` - Email verification endpoint
  - `/api/auth/resend-verification` - Resend verification email
  - `/api/auth/forgot-password` - Request password reset
  - `/api/auth/reset-password` - Reset password with token
  - `/api/auth/profile` - Get/update user profile
  - `/api/auth/delete-account` - Delete user account (GDPR compliance)
- Implement account deletion functionality:
  - Password confirmation for account deletion
  - Data anonymization/deletion process
  - Cleanup of related records (sessions, tokens, orders, Stripe customers, etc.)
  - Email notification of account deletion
  - GDPR compliance (right to be forgotten)
  - Complete data removal from database
- Integrate MFA verification step into login flow
- Implement protected route middleware
- Design pages to be theme-overridable

### 11. Type-Safe Validation with Zod
- Install Zod (latest version) for runtime validation
- Create Zod schemas for:
  - User registration and login forms
  - Profile update forms
  - Password reset forms
  - MFA forms
  - API request/response validation
  - Environment variables validation
  - Theme configuration validation
  - Setup wizard form validation
- Set up type-safe form validation with Zod
- Create API route validation middleware using Zod
- Configure environment variable validation on startup
- Create reusable validation utilities

### 12. Code Quality Tools Setup
- Install and configure ESLint with Next.js and TypeScript rules
- Install and configure Prettier with project-specific formatting rules
- Create `.eslintrc.json` with appropriate rules
- Create `.prettierrc` configuration file
- Create `.prettierignore` file
- Install Husky for git hooks
- Install lint-staged for staged file processing
- Configure Husky pre-commit hook to run linting and formatting
- Set up Husky pre-push hook (optional)
- Add lint and format scripts to `package.json`

### 13. Playwright Testing Setup
- Install Playwright (latest version) for E2E testing
- Configure Playwright with TypeScript support
- Set up Playwright configuration file (`playwright.config.ts`)
- Create test utilities and helpers
- Set up test database seeding for E2E tests
- Create authentication test helpers
- Create test fixtures for common test scenarios
- Set up test directories structure:
  - `tests/e2e/` - End-to-end tests
  - `tests/e2e/auth/` - Authentication flow tests (including MFA)
  - `tests/e2e/api/` - API endpoint tests
  - `tests/e2e/themes/` - Theme switching tests
  - `tests/fixtures/` - Test fixtures and helpers
- Configure Playwright for CI/CD
- Add test scripts to `package.json`

### 14. Health Check Endpoints
- Create `/api/health` endpoint for basic health check
- Create `/api/health/database` endpoint to check database connection
- Create `/api/health/redis` endpoint to check Redis connection
- Create `/api/health/full` endpoint for comprehensive health check
- Set up health check middleware
- Configure health check responses with status codes
- Add health check endpoints to Vercel configuration
- Set up monitoring/alerting for health checks (if needed)

### 15. Redis Caching Utilities
- Create caching utilities for Stripe API calls
- Implement caching layer for database queries (Prisma results)
- Set up cache key naming conventions
- Create cache invalidation strategies
- Add cache utilities for common data patterns

### 16. Rate Limiting Middleware with Redis
- Implement rate limiting middleware using Redis
- Configure rate limits for authentication endpoints
- Set up rate limits for API routes
- Configure rate limits for password reset and verification resend requests
- Configure rate limits for MFA code requests
- Configure rate limits for AI chat requests
- Create rate limiting utilities with configurable limits
- Add rate limit headers and error responses

### 17. Stripe Integration
- Install Stripe SDK (latest version)
- Configure Stripe API keys in environment variables
- Set up Stripe webhook handlers with Redis caching
- Create Stripe utility functions for payments (with caching)
- Configure Stripe checkout and payment flows
- Handle Stripe customer deletion on account deletion

### 18. AI Chat API Setup
- Install AI provider SDK (OpenAI or Anthropic) - latest version
- Configure AI API keys in environment variables
- Create AI service abstraction layer (`lib/core/ai/`)
- Create AI client utility (`lib/core/ai/ai-client.ts`)
- Implement AI provider client (OpenAI or Anthropic)
- Create AI API routes (`app/core/api/ai/`):
  - `/api/ai/chat` - Chat completion endpoint
- Implement AI response caching with Redis
- Set up rate limiting for AI endpoints
- Create AI chat component (`components/core/ai/chat/`)
- Create AI chat page (`app/core/[locale]/ai/chat`)
- Integrate AI chat with user authentication
- Set up AI usage tracking per user
- Configure AI response streaming (if supported)
- Add error handling and retry logic
- Make AI chat components theme-aware

### 19. Dark/Light Theme Toggle Setup
- Install theme toggle library (`next-themes` or custom implementation)
- Create theme toggle component (`components/core/theme-toggle/`)
- Configure Tailwind CSS for dark mode support
- Set up theme provider in app layout
- Create theme context/utilities (`lib/core/theme/theme-provider.ts`)
- Store user theme preference (localStorage or database)
- Create theme toggle button component
- Integrate theme toggle with user profile settings
- Add theme transition animations
- Configure shadcn/ui components for dark mode
- Make theme toggle theme-aware (themes can override)
- Add system theme detection (prefers-color-scheme)
- Support theme persistence across sessions

### 20. Internationalization (i18n) Setup
- Install `next-intl` or `next-i18next` (latest version for App Router)
- Configure i18n routing with locale detection
- Set up translation files structure (JSON or other formats)
- Configure language switching functionality
- Set up RTL (Right-to-Left) language support
- Create language selector component
- Configure middleware for locale detection and routing
- Set up translation utilities and hooks
- Add translations for all authentication pages and messages
- Make i18n theme-aware (themes can provide translations)

### 21. Error Pages Setup
- Create `app/core/error.tsx` for 5xx error handling (global error boundary)
- Create `app/core/not-found.tsx` for 404 error pages
- Create custom error pages for 400, 401, 403, 500 errors
- Set up error logging and monitoring
- Create error boundary components with proper error handling
- Add user-friendly error messages with i18n support
- Make error pages theme-overridable

### 22. GDPR-Compliant Cookie Banner
- Install cookie consent library (`react-cookie-consent` or custom implementation)
- Create GDPR-compliant cookie banner component
- Implement cookie preference management
- Set up cookie categories (necessary, analytics, marketing, etc.)
- Create cookie policy page
- Integrate with i18n for multi-language cookie messages
- Store cookie preferences in localStorage/sessionStorage
- Implement cookie consent API route

### 23. Security Enhancements
- Configure Content Security Policy (CSP) headers
- Set up security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Implement CSRF protection
- Configure secure session cookies (HttpOnly, Secure, SameSite)
- Set up input validation and sanitization
- Implement SQL injection protection (Prisma handles this, but add validation)
- Configure rate limiting on sensitive endpoints (auth, password reset, verification, MFA, AI)
- Set up CORS configuration
- Add security middleware
- Configure environment variable protection
- Implement password hashing best practices (bcrypt with salt rounds)
- Set up security headers in `next.config.js` and middleware
- Implement token expiration and validation for verification and password reset

### 24. Performance Enhancements
- Configure Next.js Image optimization
- Set up font optimization (next/font)
- Implement code splitting and dynamic imports
- Configure React Server Components optimization
- Set up Redis caching for API responses
- Implement database query optimization
- Configure static asset optimization
- Set up lazy loading for components
- Implement service worker for offline support (optional)
- Configure compression (gzip/brotli)
- Set up performance monitoring
- Optimize bundle size and tree shaking
- Configure ISR (Incremental Static Regeneration) where appropriate

### 25. Setup Wizard (First-Time Installation)
- Create setup wizard flow similar to WordPress installation
- Create setup wizard page (`app/core/setup` or theme-overridable) with multi-step form
- Setup wizard should collect:
  - Site information (title, email, address, telephone, social media links)
  - Database configuration (DATABASE_URL, test connection)
  - Redis configuration (REDIS_URL, test connection)
  - Authentication configuration (SESSION_SECRET, OAuth credentials)
  - Email configuration (RESEND_API_KEY, EMAIL_FROM_ADDRESS, EMAIL_FROM_NAME, test email)
  - Payment configuration (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET, test Stripe)
  - AI configuration (AI_API_KEY, AI provider selection, test AI connection)
  - Application configuration (APP_URL, supported locales, default locale, cookie consent, initial theme)
  - Create initial admin user account
- Create setup API route (`/api/setup`) to:
  - Validate all configuration inputs with Zod
  - Test database connection
  - Test Redis connection
  - Test email service
  - Test Stripe connection
  - Test AI service
  - Save configuration to database (SiteSettings model)
  - Create initial admin user
  - Mark setup as complete
- Create setup completion check middleware
- Redirect to setup wizard if configuration not complete
- Create setup status check API endpoint
- Add validation for all setup fields
- Create setup wizard UI with progress indicator
- Add step-by-step navigation (previous/next)
- Store setup completion status in database
- Create setup lock file or database flag to prevent re-running setup

### 26. Vercel Configuration
- Create `vercel.json` with deployment settings
- Configure Vercel BotID (bot protection) with proper setup and integration
- Configure environment variables for Vercel (including Redis URL)
- Set up build settings and serverless function configuration
- Configure Prisma for Vercel deployment (build scripts)
- Add Vercel-specific configurations including BotID middleware
- Ensure Redis connection works with Vercel serverless functions
- Configure edge functions for performance-critical routes

### 27. SEO and Metadata Files
- Set up favicon configuration (app/icon.ico or favicon files)
- Create `app/core/robots.txt` route for robots configuration (theme-overridable)
- Create `app/core/sitemap.xml` route for dynamic sitemap generation (multi-language, theme-overridable)
- Configure metadata for SEO optimization with i18n support
- Set up Open Graph and Twitter Card metadata
- Configure canonical URLs for each locale
- Make SEO files theme-customizable

### 28. Essential Configuration Files
- Update `tsconfig.json` with proper paths and compiler options (including theme paths)
- Configure `tailwind.config.ts` for shadcn/ui compatibility and RTL support
- Configure `tailwind.config.ts` for dark mode support
- Set up `next.config.js` with appropriate settings (security headers, redirects, theme module resolution, etc.)
- Create comprehensive `.env.example` with all required variables
- Configure `package.json` with Prisma scripts and build commands
- Set up i18n configuration file
- Create theme configuration schema

### 29. Cursor Development Configuration
- Create `.cursorrules` file with project-specific development guidelines
- Document coding standards, component patterns, and best practices
- Include guidelines for:
  - Component structure and organization
  - Authentication flow patterns
  - API route conventions
  - Database schema patterns
  - Email template structure
  - i18n translation patterns
  - Error handling conventions
  - Security best practices
  - Performance optimization guidelines
  - Theme development guidelines
  - Core vs custom file separation
  - AI integration patterns

### 30. GitHub Repository Setup
- Initialize git repository
- Create `.gitignore` with Next.js, Prisma, and environment file patterns
- Set up `.gitignore` to exclude custom themes but include core theme structure
- Set remote origin to https://github.com/ralphdp/Boiler
- Stage all files for initial commit
- Prepare for force push to clear existing repository content

## Files to be created/modified:

### Configuration Files
- `package.json` - Dependencies and scripts (latest versions)
- `tsconfig.json` - TypeScript configuration (with theme paths)
- `tailwind.config.ts` - Tailwind CSS configuration (with RTL and dark mode support)
- `components.json` - shadcn/ui configuration
- `prisma/schema.prisma` - Prisma database schema (includes User, VerificationToken, PasswordResetToken, SiteSettings, Theme models)
- `prisma/migrations/` - Database migrations
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore patterns
- `vercel.json` - Vercel deployment configuration
- `i18n.config.ts` or `i18n.ts` - i18n configuration file
- `theme.config.ts` - Theme system configuration
- `.cursorrules` - Cursor AI development guidelines and conventions
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `.prettierignore` - Prettier ignore patterns
- `playwright.config.ts` - Playwright configuration
- `.husky/` - Husky git hooks
- `.git/` - Git repository initialization

### Core Application Structure
- `app/core/` - Core application pages, layouts, and API routes
- `app/core/[locale]/auth/` - Core authentication pages
- `app/core/[locale]/profile/` - Profile pages (including delete-account)
- `app/core/[locale]/ai/chat` - AI chat page
- `app/core/api/auth/` - Core authentication API routes
- `app/core/api/auth/mfa/` - MFA API routes
- `app/core/api/ai/` - AI chat API routes
- `app/core/api/setup/` - Setup wizard API routes
- `app/core/api/health/` - Health check endpoints
- `app/core/error.tsx` - Global error boundary (5xx errors)
- `app/core/not-found.tsx` - 404 error page
- `app/core/global-error.tsx` - Global error handler
- `app/core/robots.txt` - Robots configuration
- `app/core/sitemap.xml` - Sitemap generation

### Theme System Structure
- `themes/` - Root themes directory
- `themes/core/` - Default base theme
- `themes/core/app/` - Base theme pages
- `themes/core/components/` - Base theme components
- `themes/core/theme.json` - Base theme configuration
- `themes/[theme-name]/` - Custom theme template structure

### Components Structure
- `components/core/` - Core reusable components
- `components/core/auth/` - Core auth UI components (LoginForm, RegisterForm, ProfileForm, DeleteAccountForm, etc.)
- `components/core/auth/mfa/` - MFA components
- `components/core/ai/chat/` - AI chat components
- `components/core/theme-toggle/` - Dark/light theme toggle component
- `components/core/cookie-banner/` - GDPR cookie banner component
- `components/core/language-selector/` - Language switching component
- `components/core/error-pages/` - Custom error page components
- `components/custom/` - Custom user components (never overwritten)

### Library Structure
- `lib/core/` - Core utilities (auth, stripe, prisma client, redis client, cache utilities)
- `lib/core/redis/` - Redis client configuration and connection utilities
- `lib/core/cache/` - Caching utilities for Stripe and database queries
- `lib/core/rate-limit/` - Rate limiting middleware and utilities
- `lib/core/i18n/` - Internationalization configuration and utilities
- `lib/core/security/` - Security utilities and middleware
- `lib/core/auth/` - Authentication utilities and helpers
- `lib/core/email/` - Email service and templates (Resend)
- `lib/core/email/templates/` - Email templates for verification and password reset
- `lib/core/ai/` - AI service abstraction and utilities
- `lib/core/theme/` - Theme system utilities and resolvers (including theme provider)
- `lib/core/setup/` - Setup wizard utilities and configuration management
- `lib/custom/` - Custom user utilities (never overwritten)

### Testing Structure
- `tests/e2e/` - End-to-end tests
- `tests/e2e/auth/` - Authentication flow tests (including MFA)
- `tests/e2e/api/` - API endpoint tests
- `tests/e2e/themes/` - Theme switching tests
- `tests/fixtures/` - Test fixtures and helpers

### Configuration Files
- `messages/` or `locales/` - Translation files for each language
- `middleware.ts` - Next.js middleware for authentication, rate limiting, locale detection, theme resolution, and security headers

## Key Dependencies (Latest Versions):

- next@latest (16.x)
- react, react-dom
- typescript, @types/node, @types/react, @types/react-dom
- tailwindcss, postcss, autoprefixer
- @prisma/client, prisma
- pg (PostgreSQL client)
- ioredis or @upstash/redis (Redis client)
- connect-redis (Redis session store)
- passport, passport-local, passport-oauth2 (or other strategies)
- express-session (session management)
- stripe
- resend (email service - Resend SDK)
- openai or @anthropic-ai/sdk (AI chat API)
- next-themes (dark/light theme toggle)
- next-intl or next-i18next (i18n for App Router)
- react-cookie-consent or custom cookie banner
- bcrypt (password hashing)
- crypto or uuid (token generation)
- zod (form validation and schema validation)
- speakeasy or otplib (TOTP MFA)
- qrcode (QR code generation)
- twilio (SMS MFA)
- @playwright/test (E2E testing)
- eslint, prettier (code quality)
- husky, lint-staged (git hooks)
- shadcn/ui core dependencies

## Environment Variables Required:

- DATABASE_URL (PostgreSQL connection string)
- REDIS_URL (Redis connection string: redis://default:[pass]@redis-18324.c323.us-east-1-2.ec2.redns.redis-cloud.com:18324)
- SESSION_SECRET (session encryption secret)
- STRIPE_SECRET_KEY
- STRIPE_PUBLISHABLE_KEY
- STRIPE_WEBHOOK_SECRET
- RESEND_API_KEY (Resend API key)
- EMAIL_FROM_ADDRESS (sender email address - must be verified in Resend)
- EMAIL_FROM_NAME (sender name for email display)
- APP_URL (application URL for email verification and password reset links)
- TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER (for SMS MFA)
- OPENAI_API_KEY or ANTHROPIC_API_KEY (for AI chat API)
- OAuth provider credentials (if using OAuth strategies)
- Supported locales (e.g., en, es, ar for RTL)
- Cookie consent configuration

## Supported Languages (Example):
- English (en) - LTR
- Spanish (es) - LTR
- Arabic (ar) - RTL
- Additional languages as needed

## Authentication Flow:

**Registration Flow:**
1. User registers → Account created with `isVerified: false`
2. Verification email sent with token
3. User clicks verification link → Account verified (`isVerified: true`)
4. User can now login

**Login Flow (with MFA):**
1. User enters email and password → Password verified
2. If MFA is enabled for user:
   - Temporary session token created (password verified, MFA pending)
   - Redirect to MFA verification page
   - User enters MFA code (email/authenticator/SMS)
   - MFA code verified
   - Full session created → Login complete
3. If MFA is not enabled:
   - Full session created → Login complete
4. User can access profile page (protected route)

**MFA Setup Flow:**
1. User goes to profile → MFA settings
2. User selects MFA method (email, authenticator, SMS)
3. If authenticator: Generate TOTP secret, show QR code
4. If SMS: Verify phone number
5. User verifies MFA code to confirm setup
6. Backup codes generated and displayed
7. MFA enabled and verified

**MFA Recovery Flow:**
1. User loses access to MFA device
2. User can use backup codes to verify
3. User can request account recovery via email
4. After verification, user can disable/change MFA

**Password Recovery Flow:**
1. User requests password reset
2. Password reset email sent with token
3. User clicks reset link → Password reset page
4. User enters new password
5. Password updated → User can login

**Account Deletion Flow (GDPR Compliance):**
1. User goes to profile → Account settings → Delete account
2. User confirms account deletion (with warning about data loss)
3. User enters password for confirmation (security check)
4. Account deletion request processed:
   - All user data anonymized or deleted
   - Related records cleaned up (orders, sessions, tokens, Stripe customers, etc.)
   - Email notification sent
5. Account permanently deleted
6. User redirected to home page or logout

**Additional Flows:**
- User can request password reset if needed
- User can resend verification email if not received
- User can change MFA method in profile settings
- User can regenerate backup codes
- User can delete their account (GDPR right to be forgotten)
- User can toggle dark/light theme
- User can access AI chat interface

## Theme System Flow:
1. Core provides base functionality and default theme
2. Themes can override any page, component, or layout
3. Module resolution checks theme first, then core
4. Themes can extend core functionality via theme API
5. Active theme stored in database (SiteSettings)
6. Theme switching updates database and reloads application

## AI Chat API Flow:
1. User accesses AI chat page
2. User authentication checked
3. User sends message
4. Request rate limited (if applicable)
5. AI API called with message
6. Response cached in Redis (if applicable)
7. Streaming response sent to user (if supported)
8. Usage tracked per user
9. Response displayed in chat interface

## Dark/Light Theme Flow:
1. User toggles theme preference
2. Theme preference saved (localStorage or database)
3. Theme provider updates context
4. Tailwind CSS classes updated
5. shadcn/ui components adapt to theme
6. Theme persists across sessions
7. System theme detection supported (optional)

