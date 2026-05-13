# SwapSkill Deployment Guide

## Pre-Deployment Checklist

### 1. Code Review
```bash
git log --oneline -10  # Check last 10 commits
npm run build          # Build should have zero errors
npm run lint          # No linting errors
```

### 2. Environment Variables
Create a `.env.production` (DO NOT COMMIT):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend (Email)
RESEND_API_KEY=re_4Ywgb4BN_5QA7SXJMev4URdifkqgStYtG

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Analytics & SEO
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://swapskill.com
NEXT_PUBLIC_APP_URL=https://swapskill.com
NEXT_PUBLIC_ADMIN_IDS=your-uuid
```

### 3. Supabase Production Checks
- [ ] Database: Run all SQL migrations
- [ ] Auth: Google OAuth configured
- [ ] Storage: 'avatars' bucket is public
- [ ] RLS: All policies verified
- [ ] Backups: Enable automatic daily backups
- [ ] Monitoring: Enable error logging

```bash
# In Supabase Studio:
1. Settings → API → Copy Project URL and Anon Key
2. Authentication → Providers → Google → Enable + add credentials
3. Storage → Create 'avatars' bucket → Set to public
4. RLS → Verify all policies are correct
5. Backups → Set to daily
6. API Settings → CORS Allowed Origins: Add your Vercel URL (https://swapskill.vercel.app) and localhost (http://localhost:3000)
```

### 4. Vercel Deployment

```bash
# 1. Push to GitHub
git add .
git commit -m "Production ready v1"
git push origin main

# 2. Go to https://vercel.com/dashboard
# 3. Click "Add New..." → Import Project
# 4. Select your GitHub repo
# 5. Configure project:
#    - Framework: Next.js
#    - Root Directory: ./
#    - Build Command: npm run build
#    - Output Directory: .next

# 6. Add Environment Variables in Vercel Dashboard:
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_APP_URL=https://swapskill.com
NEXT_PUBLIC_ADMIN_IDS=your-uuid
RESEND_API_KEY=...

# 7. Deploy
# Vercel auto-deploys on push to main
```

### 5. Domain Setup

```bash
# 1. Buy domain: Namecheap, GoDaddy, Hostinger
#    Recommended: swapskill.in or swapskill.com

# 2. In Vercel:
#    - Deployments → Settings → Domains
#    - Add your domain
#    - Follow DNS instructions

# 3. In your domain registrar:
#    - Go to DNS settings
#    - Add CNAME record:
#      Name: (blank or www)
#      Value: cname.vercel-dns.com
#    - Wait 24-48 hours for DNS propagation

# 4. Verify:
#    - https://swapskill.com should load
#    - SSL certificate auto-generated
```

### 6. Google OAuth Setup

```bash
# 1. Go to https://console.cloud.google.com
# 2. Create new project: "SwapSkill"
# 3. Enable Google+ API
# 4. Create OAuth 2.0 credentials:
#    - Application type: Web application
#    - Authorized redirect URIs:
#      https://swapskill.supabase.co/auth/v1/callback
#      https://localhost:3000/auth/callback (dev)
# 5. Copy Client ID and Secret
# 6. Go to Supabase → Authentication → Google
#    - Paste Client ID and Secret
#    - Enable
# 7. Test: Try Google OAuth on login page

### 6.1 Supabase CORS Configuration
To prevent `Load failed` or `CORS` errors in production:
1. Go to Supabase Dashboard → Settings → API.
2. Find the **CORS Allowed Origins** section.
3. Add your production domain: `https://swapskill.com` (or your Vercel URL).
4. Add `http://localhost:3000` for development.
5. Click **Save**.
```

### 7. Email Setup (Resend)

```bash
# 1. Go to https://resend.com
# 2. Create account
# 3. Add domain: swapskill.com
# 4. Follow DNS setup for DKIM/SPF/DMARC
# 5. Copy API key
# 6. Add to Vercel env: RESEND_API_KEY
# 7. Test: Send a test email from your code
```

### 8. Admin Access

```bash
# 1. Create your admin account
# 2. Get your user UUID from Supabase Auth
# 3. Add to Vercel env:
#    NEXT_PUBLIC_ADMIN_IDS=your-uuid-here
# 4. Access https://swapskill.com/admin
# 5. Verify you can see stats and manage users
```

### 9. Analytics Setup

```bash
# Google Analytics
1. Go to https://analytics.google.com
2. Create new property: "SwapSkill"
3. Copy measurement ID: G-XXXXXXXXXX
4. Add to /app/layout.tsx
5. Test: Open site, check Real Time in GA

# Vercel Analytics
1. Automatically enabled in Vercel
2. Go to Vercel Dashboard → Analytics
3. View performance metrics
```

### 10. Monitoring & Alerting

```bash
# Sentry (Error Tracking)
1. Go to https://sentry.io
2. Create account
3. Create new project: Next.js
4. Copy DSN
5. Install: npm install @sentry/nextjs
6. Configure in next.config.js

# Supabase Monitoring
1. Go to Supabase → Logs
2. Check realtime logs for errors
3. Set up email alerts for errors

# Vercel Deployment
1. Enable "Deployment Protection"
2. Set up "Analytics" for Core Web Vitals
3. Configure "Alerts" for failing deployments
```

## Launch Day Timeline
- [ ] 09:00 AM: Final build test
- [ ] 10:00 AM: Push to production
- [ ] 11:00 AM: Verification of all core flows
- [ ] 12:00 PM: Official social media announcement
