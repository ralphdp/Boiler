# Environment Variables Configuration

This document describes all the environment variables used in the Boiler.click project.

## Required Environment Variables

### Google Analytics

```bash
# Google Analytics 4 Measurement ID
# Get this from: https://analytics.google.com/
# Format: G-XXXXXXXXXX
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### BotID (Bot Detection)

```bash
# BotID Site Key (Public)
# Get this from: https://vercel.com/botid
# This is safe to expose in client-side code
NEXT_PUBLIC_BOTID_SITE_KEY="your_site_key"

# BotID Secret Key (Private)
# Get this from: https://vercel.com/botid
# Keep this secret - only used server-side
BOTID_SECRET_KEY="your_secret_key"
```

### GitHub Repository

```bash
# GitHub username for repository links
NEXT_PUBLIC_GITHUB_USER="ralphdp"

# GitHub repository name
NEXT_PUBLIC_GITHUB_REPO="boiler"
```

## Optional Environment Variables

### Build Information

```bash
# Version number for display
NEXT_PUBLIC_VERSION="1.0.0"

# Build timestamp
NEXT_PUBLIC_BUILD_TIME="2024-01-01T00:00:00.000Z"
```

## Development vs Production Behavior

### Google Analytics

- **Development**: Disabled automatically
- **Production**: Enabled when `NEXT_PUBLIC_GA_ID` is set

### Google reCAPTCHA

- **Development**: Disabled automatically, shows "reCAPTCHA disabled in development" message
- **Production**: Enabled when both `NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY` and `GOOGLE_RECAPTCHA_SECRET_KEY` are set

## Setup Instructions

1. **Create `.env.local` file** in your project root
2. **Copy the required variables** from this documentation
3. **Fill in your actual values** (get keys from respective services)
4. **Never commit `.env.local`** to version control

## Getting API Keys

### Google Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property
3. Get your Measurement ID (starts with G-)

### Google reCAPTCHA

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Create a new site
3. Choose reCAPTCHA type (v2 or v3)
4. Add your domain
5. Get Site Key and Secret Key

## Security Notes

- **NEXT*PUBLIC*\*** variables are exposed to the client-side
- **Non-NEXT*PUBLIC*\*** variables are server-side only
- Never commit secret keys to version control
- Use different keys for development and production
