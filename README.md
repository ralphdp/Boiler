# Boiler.click - Full-Stack SaaS Boilerplate

A comprehensive, production-ready Next.js boilerplate for building modern SaaS applications with internationalization, analytics, and performance monitoring.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```text
src/
├── app/                          # Next.js App Router
│   ├── about/                   # About page
│   ├── api/                     # API routes
│   │   └── analytics/           # Analytics endpoints
│   ├── articles/                # Articles system
│   │   ├── [slug]/              # Dynamic article pages
│   │   └── page.tsx             # Articles listing
│   ├── documentation/           # Documentation system
│   │   ├── [step-number]/       # Dynamic step pages
│   │   │   └── [step-name]/     # Step content pages
│   │   └── page.tsx             # Documentation overview
│   ├── faq/                     # FAQ page
│   ├── legal/                   # Legal information page
│   ├── mission/                 # Mission page
│   ├── support/                 # Support page
│   ├── test/                    # Test page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── robots.ts                # Robots.txt generator
│   └── sitemap.ts               # Sitemap generator
├── components/                  # Reusable components
│   ├── ui/                      # UI components (shadcn/ui)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── scroll-area.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   └── tooltip.tsx
│   ├── DocumentationSidebar.tsx # Documentation navigation
│   ├── FloatingSocialIcons.tsx  # Social media icons
│   ├── Footer.tsx               # Site footer
│   ├── LazyComponents.tsx      # Lazy loading components
│   ├── Navigation.tsx           # Site navigation
│   ├── OptimizedImage.tsx       # Image optimization
│   ├── QuickStart.tsx           # Quick start component
│   ├── ScrollRestoration.tsx   # Scroll position restoration
│   ├── SimpleLanguageSwitcher.tsx # Language switcher
│   ├── SocialShare.tsx          # Social sharing
│   ├── TechnologyShowcase.tsx   # Technology display
│   └── theme-toggle.tsx         # Dark/light mode toggle
├── contexts/                    # React contexts
│   └── LanguageContext.tsx     # Internationalization context
├── data/                        # Data files
│   └── articles.json            # Articles content
├── languages/                   # Translation files
│   ├── en.json                 # English translations
│   ├── es.json                 # Spanish translations
│   ├── fr.json                 # French translations
│   └── ja.json                 # Japanese translations
├── lib/                        # Utility libraries
│   ├── analytics.ts            # Analytics and performance monitoring
│   ├── api-validation.ts       # API request validation
│   ├── api-versioning.ts       # API versioning utilities
│   ├── articles.ts             # Articles management
│   ├── config.ts               # Configuration management
│   ├── documentation-steps.ts  # Documentation content
│   ├── rate-limit.ts           # Rate limiting utilities
│   ├── utils.ts                # General utilities
│   └── validation.ts           # Validation schemas
└── i18n.ts                     # Internationalization setup
```

## 🌟 Features

### Core Features

- **Next.js 16.0.0** with App Router and Turbopack
- **TypeScript** with strict type checking
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **shadcn/ui** components
- **Lucide React** icons
- **Articles System** with JSON-based content management
- **Documentation System** with step-by-step guides
- **Admin Panel Setup** for analytics integration

### Internationalization

- **Multi-language support**: English, Spanish, French, Japanese
- **Dynamic language switching**
- **Context-based translation system**
- **Fallback to English** for missing translations

### Performance & Analytics

- **Web Vitals monitoring** (LCP, FID, CLS)
- **Performance tracking** with custom metrics
- **Error tracking** and reporting
- **Resource loading monitoring**
- **Rate limiting** for API endpoints

### SEO & Accessibility

- **Meta tags** optimization
- **Open Graph** and Twitter cards
- **Sitemap** generation
- **Robots.txt** configuration
- **ARIA labels** and semantic HTML
- **Dark/light theme** support

### Articles & Documentation

- **JSON-based content management** for articles
- **Dynamic routing** for articles and documentation
- **Search and filtering** capabilities
- **SEO optimization** with meta tags and structured data
- **Step-by-step documentation** system
- **Responsive sidebar** navigation
- **Featured articles** support
- **Related articles** functionality
- **Tag-based categorization**

### Security

- **Content Security Policy** headers
- **Rate limiting** with IP blocking
- **Input validation** with Zod
- **Secure headers** configuration

## 🛠️ Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_TITLE="Boiler.click"
NEXT_PUBLIC_SITE_URL="https://boiler.click"
NEXT_PUBLIC_SITE_EMAIL_SUPPORT="hi@boiler.click"
NEXT_PUBLIC_SITE_PHYSICAL_ADDRESS="123 Oak St."

# Analytics
NEXT_PUBLIC_GA_ID="your-google-analytics-id"

# Social Media
NEXT_PUBLIC_SOCIAL_GITHUB="https://github.com/your-org"
NEXT_PUBLIC_SOCIAL_X="https://x.com/your-handle"

# Database (for future features)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
REDIS_URL="redis://localhost:6379"

# Authentication (for future features)
JWT_SECRET="your-jwt-secret"
SESSION_SECRET="your-session-secret"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Payment Processing (for future features)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (for future features)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## 📄 Pages Overview

### Homepage (`/`)

- Hero section with animated elements
- Technology showcase
- Call-to-action buttons
- Responsive design

### About Page (`/about`)

- Company information
- Technology stack
- Core features overview
- Developer experience highlights

### Articles System (`/articles`)

- **Articles listing** with search and filtering
- **Featured articles** section
- **Tag-based categorization**
- **Dynamic article pages** (`/articles/[slug]`)
- **SEO optimization** with meta tags and structured data
- **Related articles** functionality

### Documentation System (`/documentation`)

- **Step-by-step guides** with dynamic routing
- **Responsive sidebar** navigation
- **Rich content** with code blocks and images
- **Mobile-friendly** collapsible navigation
- **Theme toggle** integration

### Mission Page (`/mission`)

- Company mission statement
- Goals and objectives
- GitHub repository link

### Support Page (`/support`)

- GitHub repository access
- Email support contact
- Dynamic contact information from environment variables

### Legal Page (`/legal`)

- Privacy Policy
- Terms of Service
- Cookie Policy
- Contact Information
- Multi-language support

### FAQ Page (`/faq`)

- Frequently asked questions
- Searchable content
- Responsive design

## 🔧 API Endpoints

### Analytics API

- `POST /api/analytics/web-vitals` - Web Vitals tracking
- `POST /api/analytics/errors` - Error reporting
- `POST /api/analytics/performance` - Performance metrics
- `POST /api/analytics/slow-resources` - Slow resource tracking

All endpoints include:

- Rate limiting (100 requests per 15 minutes)
- Input validation
- Error handling
- Logging

## 🎨 Styling & Theming

### Tailwind CSS Configuration

- **Tailwind CSS 4** with PostCSS
- **Custom color palette**
- **Dark mode** support
- **Responsive design** utilities
- **Animation** utilities

### Component Styling

- **shadcn/ui** component library
- **Consistent design system**
- **Accessible components**
- **Custom variants** and themes

## 🌐 Internationalization

### Language Support

- **English (en)** - Default language
- **Spanish (es)** - Complete translation
- **French (fr)** - Complete translation
- **Japanese (ja)** - Complete translation

### Translation System

- **Context-based** translations
- **Nested key** support (`legal.privacyPolicy.title`)
- **Fallback** to English for missing translations
- **Dynamic language switching**

### Adding New Languages

1. Create new JSON file in `src/languages/`
2. Add language to `LanguageContext.tsx`
3. Update language switcher component

## 📊 Analytics & Monitoring

### Web Vitals

- **Largest Contentful Paint (LCP)**
- **First Input Delay (FID)**
- **Cumulative Layout Shift (CLS)**

### Performance Monitoring

- **Resource loading times**
- **Custom performance metrics**
- **Error tracking**
- **User interaction tracking**

### Analytics Integration

- **Google Analytics** support
- **Custom analytics** endpoints
- **Performance reporting**
- **Error logging**

## 🔒 Security Features

### Headers

- **Content Security Policy**
- **X-Frame-Options: DENY**
- **X-Content-Type-Options: nosniff**
- **Strict-Transport-Security**
- **Referrer-Policy**

### Rate Limiting

- **API rate limiting** (100 req/15min)
- **Authentication rate limiting** (5 req/15min)
- **Contact form rate limiting** (3 req/hour)
- **IP-based blocking**

## 🚀 Deployment

### Build Process

```bash
# Production build
npm run build

# Analyze bundle size
npm run analyze
npm run analyze:server
npm run analyze:browser
```

### Vercel Deployment (Recommended)

Boiler.click is optimized for Vercel deployment with zero configuration required.

#### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**

   ```bash
   # Initialize git (if not already done)
   git init

   # Add all files
   git add .

   # Commit changes
   git commit -m "Initial commit"

   # Add remote origin (replace with your GitHub repo)
   git remote add origin https://github.com/your-username/boiler-click.git

   # Push to GitHub
   git push -u origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add all required variables from the `.env.local` section below

#### Option 2: Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   # Deploy to preview
   vercel

   # Deploy to production
   vercel --prod
   ```

4. **Configure Environment Variables**

   ```bash
   # Set environment variables
   vercel env add NEXT_PUBLIC_SITE_TITLE
   vercel env add NEXT_PUBLIC_SITE_URL
   # ... add all required variables
   ```

#### Vercel Configuration

Create a `vercel.json` file for advanced configuration:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["iad1"],
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=300"
        }
      ]
    }
  ]
}
```

### Environment Variables for Production

Set these in your Vercel dashboard or via CLI:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_TITLE="Boiler.click"
NEXT_PUBLIC_SITE_URL="https://your-domain.vercel.app"
NEXT_PUBLIC_SITE_EMAIL_SUPPORT="hi@boiler.click"
NEXT_PUBLIC_SITE_PHYSICAL_ADDRESS="123 Oak St."
NEXT_PUBLIC_SITE_TELEPHONE="+18885551234"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Social Media
NEXT_PUBLIC_SOCIAL_GITHUB="https://github.com/your-org"
NEXT_PUBLIC_SOCIAL_X="https://x.com/your-handle"
NEXT_PUBLIC_SOCIAL_FACEBOOK="https://facebook.com/your-page"
NEXT_PUBLIC_SOCIAL_YOUTUBE="https://youtube.com/your-channel"

# Database (for future features)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
REDIS_URL="redis://localhost:6379"

# Authentication (for future features)
JWT_SECRET="your-jwt-secret"
SESSION_SECRET="your-session-secret"

# OAuth Providers (for future features)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Payment Processing (for future features)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (for future features)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### Other Deployment Platforms

- **Netlify**: Compatible with Next.js static export
- **AWS**: Use AWS Amplify or custom server setup
- **Docker**: Use the included Dockerfile for containerized deployment

## 📊 Admin Panel Setup

### Analytics & Advertising Integration

Boiler.click includes comprehensive setup guides for analytics and advertising platforms:

- **Google Analytics 4** integration
- **Google Ads API** connection
- **Bing Ads API** (Microsoft Advertising) integration
- **Performance monitoring** setup
- **Custom dashboard** creation

### Setup Guide

See `ADMIN_PANEL_SETUP.md` for detailed instructions on:

1. **Google Analytics Setup**

   - GA4 property creation
   - API key generation
   - Event tracking configuration

2. **Google Ads Integration**

   - API credentials setup
   - Campaign data retrieval
   - Performance metrics

3. **Bing Ads Integration**

   - Microsoft Advertising API setup
   - Campaign management
   - Cross-platform analytics

4. **Environment Configuration**
   - Required API keys
   - Security best practices
   - Rate limiting setup

## 🧪 Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size

### Code Quality

- **ESLint** configuration
- **TypeScript** strict mode
- **Prettier** formatting
- **Husky** git hooks (optional)

## 📈 Performance

### Optimizations

- **Image optimization** with Next.js
- **Code splitting** and lazy loading
- **Bundle analysis** tools
- **Performance monitoring**
- **Web Vitals** tracking

### Metrics

- **Core Web Vitals** compliance
- **Lighthouse** scores
- **Bundle size** optimization
- **Loading performance**

## 🔮 Future Enhancements

### Planned Features

- **Authentication system** with NextAuth.js
- **Database integration** with Prisma
- **Payment processing** with Stripe
- **Email system** with SMTP
- **Admin dashboard**
- **User management**
- **API documentation**

### Roadmap

- [ ] Authentication implementation
- [ ] Database schema design
- [ ] Payment integration
- [ ] Email system setup
- [ ] Admin panel development
- [ ] API documentation
- [ ] Testing suite
- [ ] CI/CD pipeline

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

- **GitHub Issues**: [Create an issue](https://github.com/your-org/boiler-click/issues)
- **Email**: [hi@boiler.click](mailto:hi@boiler.click)
- **Documentation**: [Coming soon]

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Vercel** for hosting and deployment
- **Tailwind CSS** for the utility-first CSS framework
- **shadcn/ui** for the component library
- **Framer Motion** for animations
- **Lucide** for the icon library

---

## Built with ❤️ by the Boiler.click team
