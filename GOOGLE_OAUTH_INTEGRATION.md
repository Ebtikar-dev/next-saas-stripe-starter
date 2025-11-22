# Google OAuth Integration with Backend

This document explains how the Google OAuth integration works between the Next.js frontend and the Express.js backend.

## Overview

The integration connects the existing Google OAuth implementation in the backend (`/backEnd/Alforkan-BackEnd`) with the Next.js frontend (`/next-saas-stripe-starter`).

## Architecture

### Backend (Express.js)
- **Google OAuth Strategy**: Uses `passport-google-oauth20` strategy
- **Endpoints**:
  - `GET /api/v1/auth/google` - Initiates Google OAuth flow
  - `GET /api/v1/auth/google/callback` - Handles Google callback
- **Callback URL**: Redirects to `http://127.0.0.1:3001/ar/login/google-auth-success?token={jwt_token}`

### Frontend (Next.js)
- **API Client**: `lib/api-client.ts` - Handles backend communication
- **Auth Hook**: `hooks/use-auth.tsx` - Provides authentication state and methods
- **Callback Handler**: `app/(auth)/login/google-auth-success/page.tsx` - Processes OAuth success

## Setup Instructions

### 1. Environment Variables

Add these to your `.env.local` file:

```env
# Backend API URL
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:4000

# Existing NextAuth variables (keep for backward compatibility)
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 2. Backend Configuration

Make sure your backend has these environment variables:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:4000/api/v1/auth/google/callback` (backend)
   - `http://localhost:3000/api/auth/callback/google` (NextAuth, for backup)

## How It Works

### Google OAuth Flow

1. **User clicks "Google" button** in login form
2. **Frontend calls** `loginWithGoogle()` from `useAuth` hook
3. **Redirects to** `/api/v1/auth/google` (backend endpoint)
4. **Backend redirects** to Google OAuth consent screen
5. **User authenticates** with Google
6. **Google redirects** to backend callback `/api/v1/auth/google/callback`
7. **Backend processes** callback, creates/updates user, generates JWT
8. **Backend redirects** to frontend success page with token: `http://127.0.0.1:3001/ar/login/google-auth-success?token={jwt}`
9. **Frontend success page** processes token via `AuthProvider`
10. **Token stored** in localStorage and user state updated
11. **Redirect to** `/dashboard`

### Token Management

- **Storage**: JWT tokens stored in `localStorage` as `auth_token`
- **API Calls**: Token sent as `Bearer` token in Authorization header
- **Auto-logout**: Invalid tokens are cleared automatically

## Testing the Integration

### 1. Start Backend Server

```bash
cd backEnd/Alforkan-BackEnd
npm install
npm run dev
```

Backend should run on `http://localhost:4000`

### 2. Start Frontend Server

```bash
cd next-saas-stripe-starter
npm install
npm run dev
```

Frontend should run on `http://localhost:3000`

### 3. Test Google OAuth

1. Navigate to `http://localhost:3000/login`
2. Click the "جوجل" (Google) button
3. Complete Google authentication
4. Should redirect to dashboard after successful login

### 4. Debugging Tips

**Check browser console for:**
- Network requests to `/api/v1/auth/google`
- Token storage in localStorage
- Any JavaScript errors

**Check backend logs for:**
- Google OAuth requests
- User creation/update operations
- JWT generation

**Common issues:**
- CORS errors: Check backend CORS configuration
- Redirect URI mismatch: Verify Google Console settings
- Token not stored: Check localStorage and network requests

## Files Modified/Created

### New Files
- `lib/api-client.ts` - Backend API communication
- `hooks/use-auth.tsx` - Authentication state management
- `app/(auth)/login/google-auth-success/page.tsx` - OAuth callback handler
- `app/(auth)/login-failer/page.tsx` - OAuth failure page

### Modified Files
- `env.mjs` - Added backend API URL
- `components/forms/user-auth-form.tsx` - Updated to use backend auth
- `app/layout.tsx` - Added AuthProvider
- `lib/session.ts` - Updated to check backend auth
- `middleware.ts` - Updated for compatibility

## Migration Notes

The integration maintains backward compatibility with NextAuth. You can gradually migrate existing authentication features to use the backend API.

### Current State
- ✅ Google OAuth via backend
- ✅ JWT token management
- ✅ User session state
- ⏳ Email/password login (backend ready, frontend needs UI updates)
- ⏳ Email verification (backend ready, frontend needs UI updates)
- ⏳ Password reset (backend ready, frontend needs UI updates)

### Next Steps
1. Update login form to support email/password
2. Add email verification UI
3. Add password reset UI
4. Migrate user management to backend
5. Remove NextAuth dependencies (optional)