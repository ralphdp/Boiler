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

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Internationalized routes (optional)
│   ├── about/                   # About page
│   ├── api/                     # API routes
│   │   └── analytics/           # Analytics endpoints
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
│   │   └── button.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── LanguageSwitcher.tsx
│   ├── SimpleLanguageSwitcher.tsx
│   ├── OptimizedImage.tsx
│   ├── LazyComponents.tsx
│   └── theme-toggle.tsx
├── contexts/                    # React contexts
│   └── LanguageContext.tsx     # Internationalization context
├── languages/                   # Translation files
│   ├── en.json                 # English translations
│   ├── es.json                 # Spanish translations
│   ├── fr.json                 # French translations
│   └── ja.json                 # Japanese translations
├── lib/                        # Utility libraries
│   ├── analytics.ts            # Analytics and performance monitoring
│   ├── config.ts               # Configuration management
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

### Deployment Platforms

- **Vercel** (recommended)
- **Netlify**
- **AWS**
- **Docker**

### Environment Setup

1. Set environment variables
2. Configure domain and SSL
3. Set up monitoring
4. Configure CDN (optional)

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

- **GitHub Issues**: [Create an issue](https://github.com/your-org/boiler.click/issues)
- **Email**: hi@boiler.click
- **Documentation**: [Coming soon]

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Vercel** for hosting and deployment
- **Tailwind CSS** for the utility-first CSS framework
- **shadcn/ui** for the component library
- **Framer Motion** for animations
- **Lucide** for the icon library

---

**Built with ❤️ by the Boiler.click team**
