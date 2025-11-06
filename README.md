# Boilerplate - Next.js 16 Full-Stack Application

A comprehensive Next.js 16 boilerplate with enterprise-grade features including authentication, payments, AI, and more.

## Features

### Architecture
- 🏗️ **WordPress-like Core/Theme System** - Separate core functionality from custom implementations
- 🎨 **Theme Support** - Full theming system with easy customization
- 🌍 **Internationalization** - Multi-language support with RTL capabilities
- 🌓 **Dark Mode** - Built-in dark/light theme toggle

### Authentication & Security
- 🔐 **Passport.js Authentication** - Robust authentication with email verification
- 🛡️ **Multi-Factor Authentication** - Email, TOTP (Google Authenticator), and SMS via Twilio
- 🔑 **Session Management** - Redis-backed sessions for scalability
- 🚨 **Rate Limiting** - Protect endpoints from abuse
- 🍪 **GDPR Compliance** - Cookie consent, account deletion, data export

### Database & Caching
- 🗄️ **Prisma** - Type-safe database access
- 🐘 **PostgreSQL** - Powerful relational database
- ⚡ **Redis** - Caching and session storage
- 📊 **Health Checks** - Monitor database and Redis connectivity

### Payments & AI
- 💳 **Stripe Integration** - Complete payment processing
- 🤖 **AI Chat API** - OpenAI/Anthropic integration with caching
- 📧 **Resend Email** - Transactional emails with templates

### Development Experience
- 📝 **TypeScript** - Full type safety
- 🎭 **Playwright** - E2E testing
- 🎨 **shadcn/ui** - Beautiful UI components
- ✨ **Code Quality** - ESLint, Prettier, Husky
- 🔍 **Zod Validation** - Runtime type checking

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Redis instance
- Resend API key (for emails)
- Stripe account (for payments)
- Twilio account (for SMS MFA, optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ralphdp/Boiler.git
cd Boiler
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `RESEND_API_KEY` - Resend API key
- `STRIPE_SECRET_KEY` - Stripe secret key
- And more...

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Generate Prisma client:
```bash
npx prisma generate
```

6. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
├── app/
│   ├── core/              # Core application (DO NOT MODIFY in production)
│   │   ├── api/          # Core API routes
│   │   └── [locale]/     # Locale-specific pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   ├── core/             # Core components (DO NOT MODIFY)
│   └── custom/           # Your custom components
├── lib/
│   ├── core/             # Core utilities (DO NOT MODIFY)
│   │   ├── auth/        # Authentication utilities
│   │   ├── cache/       # Caching utilities
│   │   ├── email/       # Email service
│   │   ├── redis/       # Redis client
│   │   └── theme/       # Theme system
│   └── custom/          # Your custom utilities
├── themes/
│   └── core/            # Default theme
├── prisma/
│   └── schema.prisma    # Database schema
├── tests/
│   └── e2e/            # End-to-end tests
└── PLAN.md             # Complete implementation plan
```

## Core vs Custom Architecture

This boilerplate uses a WordPress-inspired architecture:

- **Core files** (`app/core/`, `components/core/`, `lib/core/`) contain the framework and should not be modified
- **Custom files** (`components/custom/`, `lib/custom/`) are for your customizations
- **Themes** (`themes/`) allow you to override any core component or page

This separation allows you to:
- Update the core framework without losing customizations
- Create multiple themes for different use cases
- Keep your custom code organized and maintainable

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Run database migrations
- `npm run test:e2e` - Run Playwright tests

## API Endpoints

### Health Checks
- `GET /api/health` - Basic health check
- `GET /api/health/database` - Database connectivity
- `GET /api/health/redis` - Redis connectivity
- `GET /api/health/full` - Comprehensive health check

### Authentication (Coming Soon)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### MFA (Coming Soon)
- `POST /api/auth/mfa/setup` - Setup MFA
- `POST /api/auth/mfa/verify` - Verify MFA code
- `POST /api/auth/mfa/enable` - Enable MFA
- `POST /api/auth/mfa/disable` - Disable MFA

## Environment Variables

See `.env.example` for all required environment variables.

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `SESSION_SECRET` - Session encryption secret
- `RESEND_API_KEY` - Resend API key
- `EMAIL_FROM_ADDRESS` - Sender email address
- `APP_URL` - Application URL

### Optional
- `STRIPE_SECRET_KEY` - Stripe secret key
- `TWILIO_ACCOUNT_SID` - Twilio account SID (for SMS MFA)
- `OPENAI_API_KEY` - OpenAI API key (for AI features)

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy

The project is pre-configured for Vercel deployment with:
- Automatic Prisma client generation
- Redis compatibility for serverless
- Optimized build settings

## Documentation

- [Full Implementation Plan](./PLAN.md) - Complete feature roadmap
- [Development Guidelines](./.cursorrules) - Coding standards and best practices

## Contributing

This is a boilerplate project designed to be forked and customized for your needs. Feel free to modify, extend, and adapt it to your requirements.

## License

MIT

## Support

For issues and questions, please refer to the [PLAN.md](./PLAN.md) document which contains the complete implementation details.
