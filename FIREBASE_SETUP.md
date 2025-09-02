# Firebase Setup Guide

This document provides step-by-step instructions for setting up Firebase authentication for the Borkha Order Taking System.

## Prerequisites

1. A Google account
2. Basic understanding of Firebase
3. Node.js and npm installed

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `soudia-tailors-borkha` (or your preferred name)
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project dashboard, click "Authentication" from the left sidebar
2. Click "Get started" if this is your first time
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" provider:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

## Step 3: Create Web App

1. In your Firebase project dashboard, click the gear icon (⚙️) and select "Project settings"
2. Scroll down to "Your apps" section
3. Click the web icon `</>`
4. Enter app nickname: `borkha-order-app`
5. Check "Also set up Firebase Hosting" (optional)
6. Click "Register app"
7. Copy the Firebase configuration object (you'll need this in Step 5)

## Step 4: Set up Environment Variables

1. In the project root, copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and replace the placeholder values with your Firebase configuration:
   ```env
   VITE__API_KEY=your_actual_api_key
   VITE__AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE__PROJECT_ID=your_actual_project_id
   VITE__STORAGE_BUCKET=your_project_id.appspot.com
   VITE__MESSAGING_SENDER_ID=your_actual_sender_id
   VITE__APP_ID=your_actual_app_id
   ```

## Step 5: Create Admin User

Since this is an admin system, you need to create the first admin user:

### Option 1: Using Firebase Console
1. Go to Firebase Console > Authentication > Users
2. Click "Add user"
3. Enter email and password for your admin account
4. Click "Add user"

### Option 2: Using Firebase CLI (Advanced)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Create user via CLI or custom script

## Step 6: Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin/login`
3. Try logging in with your admin credentials
4. You should be redirected to `/admin/dashboard` on successful login

## Step 7: Production Setup

For production deployment:

1. Create a separate Firebase project for production
2. Update environment variables in your hosting platform (Netlify/Vercel)
3. Set up proper security rules
4. Consider enabling additional security features like multi-factor authentication

## Security Best Practices

1. **Never commit `.env.local` to version control**
2. Use different Firebase projects for development and production
3. Regularly rotate your API keys
4. Enable email verification for new users
5. Set up proper security rules for Firestore (if used in future)
6. Monitor authentication logs in Firebase Console

## Troubleshooting

### Common Issues:

1. **"Firebase not found" error:**
   - Ensure Firebase is installed: `npm install firebase`
   - Check that environment variables are correctly set

2. **"Invalid API key" error:**
   - Verify your API key in `.env.local`
   - Ensure the API key belongs to the correct project

3. **"Auth domain not found" error:**
   - Check your auth domain format: `project-id.firebaseapp.com`
   - Verify the project ID is correct

4. **Login fails but no error message:**
   - Check Firebase Console > Authentication to see if the user exists
   - Verify the user's email and password are correct

### Getting Help:

- Firebase Documentation: https://firebase.google.com/docs/auth/web/start
- Firebase Support: https://firebase.google.com/support/
- Project Issues: Create an issue in the project repository

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE__API_KEY` | Firebase API Key | `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `VITE__AUTH_DOMAIN` | Authentication domain | `project-id.firebaseapp.com` |
| `VITE__PROJECT_ID` | Firebase project ID | `soudia-tailors-borkha` |
| `VITE__STORAGE_BUCKET` | Storage bucket URL | `project-id.appspot.com` |
| `VITE__MESSAGING_SENDER_ID` | Messaging sender ID | `123456789012` |
| `VITE__APP_ID` | App ID | `1:123456789012:web:xxxxxxxxxxxxx` |

## Next Steps

After completing this setup:

1. Test the authentication flow thoroughly
2. Consider implementing password reset functionality
3. Set up user management features
4. Implement proper error logging
5. Add backup admin access methods

---

**Note:** This guide assumes you're using Firebase v9+ with the modular SDK, which is what this project uses.