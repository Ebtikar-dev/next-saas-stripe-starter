# Google OAuth Redirect URI Fix

## Problem

The `redirect_uri_mismatch` error occurs when the redirect URI configured in your Google Cloud Console doesn't match what your Next.js app is sending.

## Solution Steps

### 1. Update Your Google Cloud Console

Go to your Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs

**Add these Authorized redirect URIs:**

```
http://localhost:3000/api/auth/callback/google
https://yourdomain.com/api/auth/callback/google
```

### 2. Update Your Environment Variables

Make sure your `.env` file has:

```env
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_SECRET=your_auth_secret
```

### 3. For Production

When deploying to production:

```env
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 4. Restart Your Development Server

After updating environment variables, restart:

```bash
npm run dev
```

## Common Issues

1. **Missing NEXTAUTH_URL** - This is the most common cause
2. **Wrong redirect URI in Google Console** - Must exactly match
3. **Environment variables not loaded** - Restart server after changes
4. **HTTP vs HTTPS mismatch** - Use https in production, http in development

## Testing

1. Clear your browser cookies for localhost
2. Try signing in again
3. Check the URL in your browser when redirected to Google - it should show the correct redirect_uri
