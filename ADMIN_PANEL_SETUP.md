# Admin Panel Setup Guide

This guide will help you set up Google Analytics, Google Ads, and Bing Ads API integration for the admin panel.

## 📋 Table of Contents

- [Google Analytics 4 API Setup](#google-analytics-4-api-setup)
- [Google Ads API Setup](#google-ads-api-setup)
- [Bing Ads API Setup](#bing-ads-api-setup)
- [Environment Variables](#environment-variables)
- [Required Packages](#required-packages)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)

## 🔑 Google Analytics 4 API Setup

### Step 1: Google Cloud Console Setup

1. **Go to**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Create/Select Project**:
   - Click "Select a project" dropdown
   - Click "New Project" or select existing project
   - Give it a name like "Boiler Click Admin"
3. **Enable APIs**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Analytics Reporting API"
   - Click "Enable"
   - Search for "Google Analytics Data API" (for GA4)
   - Click "Enable"

### Step 2: Create Service Account

1. **Navigate to**: "APIs & Services" → "Credentials"
2. **Create Credentials**: Click "Create Credentials" → "Service Account"
3. **Fill Details**:
   - Service account name: `boiler-click-analytics`
   - Service account ID: `boiler-click-analytics@your-project.iam.gserviceaccount.com`
   - Description: `Service account for Boiler Click admin panel`
4. **Create Key**:
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key" → "JSON"
   - Download and save the JSON file securely

### Step 3: Grant Analytics Permissions

1. **Go to**: [Google Analytics](https://analytics.google.com/)
2. **Admin Section**: Click "Admin" (gear icon) in bottom left
3. **Property Access**:
   - Select your property from the dropdown
   - Click "Property access management"
4. **Add Service Account**:
   - Click "+" → "Add users"
   - Enter your service account email: `boiler-click-analytics@your-project.iam.gserviceaccount.com`
   - Role: Select "Viewer" (minimum required) or "Editor"
   - Click "Add"

### Step 4: Get Property ID

1. **In GA4**: Admin → Property Settings
2. **Copy Property ID**: It looks like `123456789`
3. **Save this ID**: You'll need it for environment variables

## 🔑 Google Ads API Setup

### Step 1: Google Ads API Center

1. **Go to**: [Google Ads API Center](https://ads.google.com/home/tools/api-center/)
2. **Sign in**: With your Google Ads account
3. **Create Application**:
   - Click "Create Application"
   - Application name: `Boiler Click Admin`
   - Description: `Admin panel for analytics and ads management`

### Step 2: Get Developer Token

1. **In API Center**: Go to "API Center" tab
2. **Developer Token**: Copy your developer token
3. **Status Check**: Make sure status is "Approved" (may take time for approval)

### Step 3: OAuth2 Setup

1. **Go to**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Same Project**: Use the same project as Analytics
3. **Enable Google Ads API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Ads API"
   - Click "Enable"
4. **OAuth Consent Screen**:
   - Go to "APIs & Services" → "OAuth consent screen"
   - Configure if not already done
   - Add your domain to authorized domains
5. **Create OAuth Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Name: `Boiler Click Admin OAuth`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`

### Step 4: Get Customer ID

1. **In Google Ads**: Look at the top right corner
2. **Copy Customer ID**: Format like `123-456-7890`
3. **Save this ID**: You'll need it for API calls

## 🔑 Bing Ads API Setup

### Step 1: Microsoft Advertising Center

1. **Go to**: [Microsoft Advertising](https://ads.microsoft.com/)
2. **Sign in**: With your Microsoft account
3. **API Center**:
   - Go to "Tools" → "API Center"
   - Click "Create Application"
   - Application name: `Boiler Click Admin`
   - Description: `Admin panel for analytics and ads management`

### Step 2: Get Developer Token

1. **In API Center**: Go to "API Center" tab
2. **Developer Token**: Copy your developer token
3. **Status Check**: Make sure status is "Approved" (may take time for approval)
4. **Note**: Bing Ads API approval can take several days to weeks

### Step 3: OAuth2 Setup

1. **Go to**: [Azure Portal](https://portal.azure.com/)
2. **App Registrations**:
   - Go to "Azure Active Directory" → "App registrations"
   - Click "New registration"
   - Name: `Boiler Click Admin`
   - Supported account types: "Accounts in this organizational directory only"
3. **API Permissions**:
   - Go to "API permissions" → "Add a permission"
   - Select "Microsoft Advertising API"
   - Grant admin consent for required permissions
4. **Client Credentials**:
   - Go to "Certificates & secrets"
   - Click "New client secret"
   - Copy the secret value (you won't see it again)

### Step 4: Get Customer ID

1. **In Bing Ads**: Look at the top right corner
2. **Copy Customer ID**: Format like `123456789`
3. **Save this ID**: You'll need it for API calls

### Step 5: Test API Access

1. **Get Access Token**: Use OAuth2 flow to get access token
2. **Test API Call**: Make a simple API call to verify access
3. **Check Permissions**: Ensure you have required permissions

## 🔧 Environment Variables

Create or update your `.env.local` file with these variables:

```env
# Google Analytics 4
GOOGLE_ANALYTICS_PROPERTY_ID=123456789
GOOGLE_ANALYTICS_SERVICE_ACCOUNT_EMAIL=boiler-click-analytics@your-project.iam.gserviceaccount.com
GOOGLE_ANALYTICS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Google Ads
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token_here
GOOGLE_ADS_CLIENT_ID=your_oauth_client_id_here
GOOGLE_ADS_CLIENT_SECRET=your_oauth_client_secret_here
GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token_here
GOOGLE_ADS_CUSTOMER_ID=123-456-7890

# Bing Ads
BING_ADS_CLIENT_ID=your_bing_client_id_here
BING_ADS_CLIENT_SECRET=your_bing_client_secret_here
BING_ADS_DEVELOPER_TOKEN=your_bing_developer_token_here
BING_ADS_CUSTOMER_ID=123456789
BING_ADS_REFRESH_TOKEN=your_bing_refresh_token_here

# Admin Panel Security
ADMIN_SECRET_KEY=your_secure_admin_key_here
ADMIN_ALLOWED_IPS=127.0.0.1,192.168.1.1
ADMIN_SESSION_SECRET=your_session_secret_here

# Database (if using for admin data storage)
DATABASE_URL="postgresql://username:password@localhost:5432/boilerclick"
```

### How to Get Private Key

1. **Open the JSON file** you downloaded from Google Cloud Console
2. **Find the `private_key` field**
3. **Copy the entire value** including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts
4. **Replace all `\n` with actual newlines** in your environment file

## 📦 Required Packages

Install the necessary packages:

```bash
# Google APIs
npm install googleapis google-ads-api
npm install @types/google-ads-api --save-dev

# Bing Ads API
npm install microsoft-advertising-api
# or alternative
npm install bing-ads-api

# Additional utilities
npm install axios date-fns
```

## 🔐 Security Best Practices

### 1. Environment Variables

- ✅ **Never commit API keys** to version control
- ✅ **Use `.env.local`** for local development
- ✅ **Use environment variables** in production
- ✅ **Add `.env.local` to `.gitignore`**

### 2. API Key Management

- ✅ **Rotate keys regularly** (every 90 days)
- ✅ **Limit API permissions** to minimum required
- ✅ **Monitor API usage** in Google Cloud Console
- ✅ **Use different keys** for development and production

### 3. Admin Panel Security

- ✅ **IP restrictions** for admin access
- ✅ **Strong authentication** for admin users
- ✅ **Rate limiting** on API endpoints
- ✅ **Audit logging** for admin actions

### 4. Data Protection

- ✅ **Encrypt sensitive data** in database
- ✅ **Use HTTPS** for all admin communications
- ✅ **Regular security updates**
- ✅ **Backup and recovery** procedures

## 🎯 Enhanced Admin Panel Features

### **Cross-Platform Analytics Dashboard**

- **Unified Metrics**: Total spend, clicks, conversions across Google and Bing
- **Performance Comparison**: Side-by-side Google vs Bing metrics
- **ROI Analysis**: Combined return on investment across platforms
- **Budget Allocation**: Spend distribution and optimization suggestions

### **Platform-Specific Features**

- **Google Analytics**: Real-time data, audience insights, conversion tracking
- **Google Ads**: Campaign performance, keyword analytics, quality scores
- **Bing Ads**: Campaign metrics, keyword performance, audience demographics
- **Combined Reports**: Cross-platform performance analysis

### **Advanced Analytics**

- **Attribution Modeling**: Multi-touch attribution across platforms
- **Customer Journey**: Track users across Google and Bing
- **Seasonal Analysis**: Platform performance trends over time
- **Smart Insights**: AI-powered recommendations for optimization

## 🛠 Implementation Steps

### 1. Basic Admin Structure

```bash
mkdir -p src/app/admin/{dashboard,analytics,google-ads,bing-ads,comparison,settings}
mkdir -p src/lib/admin
mkdir -p src/components/admin
```

### 2. Authentication Setup

```typescript
// src/lib/admin/auth.ts
export function verifyAdminAccess(request: Request) {
  // Implement admin authentication
}
```

### 3. API Routes

```typescript
// src/app/api/admin/analytics/route.ts
export async function GET(request: Request) {
  // Fetch Google Analytics data
}

// src/app/api/admin/google-ads/route.ts
export async function GET(request: Request) {
  // Fetch Google Ads data
}

// src/app/api/admin/bing-ads/route.ts
export async function GET(request: Request) {
  // Fetch Bing Ads data
}

// src/app/api/admin/comparison/route.ts
export async function GET(request: Request) {
  // Fetch combined Google + Bing data for comparison
}
```

## 🚨 Troubleshooting

### Common Issues

#### 1. "API key not valid"

- ✅ Check if APIs are enabled in Google Cloud Console
- ✅ Verify service account has correct permissions
- ✅ Ensure environment variables are set correctly

#### 2. "Insufficient permissions"

- ✅ Add service account to Google Analytics property
- ✅ Grant appropriate role (Viewer/Editor)
- ✅ Check if property ID is correct

#### 3. "Rate limit exceeded"

- ✅ Implement exponential backoff
- ✅ Cache API responses
- ✅ Monitor usage in Google Cloud Console

#### 4. "OAuth token expired"

- ✅ Implement token refresh logic
- ✅ Store refresh tokens securely
- ✅ Handle token expiration gracefully

#### 5. "Bing Ads API access denied"

- ✅ Check if Microsoft Advertising API is enabled in Azure
- ✅ Verify OAuth permissions are granted
- ✅ Ensure developer token is approved
- ✅ Check customer ID format (numeric only)

#### 6. "Rate limit exceeded for Bing"

- ✅ Implement exponential backoff for Bing API
- ✅ Cache Bing API responses
- ✅ Monitor usage in Microsoft Advertising Center
- ✅ Consider upgrading API tier if needed

### Debug Steps

1. **Check API Status**:

   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        "https://analyticsdata.googleapis.com/v1beta/properties/PROPERTY_ID:runReport"
   ```

2. **Verify Environment Variables**:

   ```bash
   echo $GOOGLE_ANALYTICS_PROPERTY_ID
   ```

3. **Test API Connection**:

```typescript
// Test Google Analytics
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_ANALYTICS_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_ANALYTICS_PRIVATE_KEY,
  },
  scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
});

// Test Bing Ads
import { BingAdsApi } from "microsoft-advertising-api";

const bingApi = new BingAdsApi({
  clientId: process.env.BING_ADS_CLIENT_ID,
  clientSecret: process.env.BING_ADS_CLIENT_SECRET,
  developerToken: process.env.BING_ADS_DEVELOPER_TOKEN,
  customerId: process.env.BING_ADS_CUSTOMER_ID,
});
```

## 📚 Additional Resources

- **Google Analytics 4 API**: [Official Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
- **Google Ads API**: [Official Documentation](https://developers.google.com/google-ads/api/docs/start)
- **Bing Ads API**: [Microsoft Advertising API Documentation](https://docs.microsoft.com/en-us/advertising/)
- **OAuth2 Flow**: [Google OAuth2 Guide](https://developers.google.com/identity/protocols/oauth2)
- **Microsoft OAuth2**: [Azure AD OAuth2 Guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow)
- **Google Cloud Console**: [Console Home](https://console.cloud.google.com/)
- **Google Ads API Center**: [API Center](https://ads.google.com/home/tools/api-center/)
- **Microsoft Advertising**: [Advertising Center](https://ads.microsoft.com/)
- **Azure Portal**: [Azure Portal](https://portal.azure.com/)

## ⚠️ Important Notes

1. **Google Ads API Approval**: The approval process can take several days to weeks
2. **Bing Ads API Approval**: Microsoft approval can also take several days to weeks
3. **Rate Limits**: All APIs have usage limits - implement proper caching
4. **Billing**: Google Ads API may have associated costs
5. **Testing**: Always test with sandbox/test accounts first
6. **Production**: Use production credentials only in production environment
7. **Cross-Platform Data**: Consider data synchronization between Google and Bing
8. **Token Management**: Handle multiple OAuth tokens (Google + Microsoft)

## 🆘 Support

If you encounter issues:

1. **Check the logs** in Google Cloud Console
2. **Verify all environment variables** are set correctly
3. **Test API access** using the debug steps above
4. **Review Google's documentation** for specific error messages
5. **Contact support** if issues persist

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Status**: Ready for Implementation
