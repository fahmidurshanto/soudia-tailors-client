# Cloudinary Integration Setup Guide

This document provides step-by-step instructions for setting up Cloudinary for secure file uploads in the Borkha Order Taking System.

## Prerequisites

1. A Cloudinary account (free tier available)
2. Basic understanding of Cloudinary
3. Node.js and npm installed

## Step 1: Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Click "Sign Up" or "Get Started for Free"
3. Create your account with email/password or social login
4. Verify your email address
5. Complete the initial setup

## Step 2: Get Your Credentials

1. After login, go to your [Cloudinary Dashboard](https://cloudinary.com/console)
2. You'll see your credentials in the "Account Details" section:
   - **Cloud Name**: Your unique cloud identifier
   - **API Key**: Your public API key
   - **API Secret**: Your private API secret (keep this secure)

## Step 3: Create Upload Preset

1. In your Cloudinary Dashboard, go to "Settings" → "Upload"
2. Scroll down to "Upload presets"
3. Click "Add upload preset"
4. Configure the preset:
   - **Preset name**: `borkha_unsigned_preset`
   - **Signing Mode**: `Unsigned` (for frontend uploads)
   - **Folder**: `borkha-designs` (optional, organizes uploads)
   - **Allowed formats**: `jpg,png,gif,pdf`
   - **Transformation**: 
     - **Quality**: `auto`
     - **Format**: `auto`
     - **Max file size**: `5000000` (5MB)
5. Click "Save"

## Step 4: Configure Environment Variables

1. In your project root, update `.env.local`:
   ```env
   # Cloudinary Configuration
   VITE_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
   VITE_CLOUDINARY_API_KEY=your_actual_api_key
   VITE_CLOUDINARY_API_SECRET=your_actual_api_secret
   VITE_CLOUDINARY_UPLOAD_PRESET=borkha_unsigned_preset
   ```

2. Replace the placeholder values:
   - `your_actual_cloud_name` → Your cloud name from dashboard
   - `your_actual_api_key` → Your API key from dashboard
   - `your_actual_api_secret` → Your API secret from dashboard
   - `borkha_unsigned_preset` → The preset name you created

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the order page (`/order`)
3. Go to "ডিজাইন রেফারেন্স" section
4. Try uploading a file or taking a photo
5. Check your Cloudinary Media Library to see uploaded files

## Step 6: Security Configuration (Production)

### For Production Deployment:

1. **Environment Variables**: Set up environment variables on your hosting platform:
   - Netlify: Site Settings → Environment Variables
   - Vercel: Project Settings → Environment Variables
   - Other platforms: Follow their documentation

2. **Upload Preset Security**: 
   - Consider using signed uploads for production
   - Set up folder restrictions
   - Enable content moderation if needed

3. **Access Control**:
   - Set up resource access permissions
   - Configure allowed domains for uploads
   - Enable secure URLs if handling sensitive content

## Step 7: Monitoring and Optimization

### Dashboard Monitoring:
1. **Usage Tracking**: Monitor your usage in Cloudinary Dashboard
2. **Transformation Usage**: Track optimization usage
3. **Bandwidth Monitoring**: Keep an eye on CDN usage

### Optimization Settings:
- **Auto Quality**: Automatically optimizes image quality
- **Auto Format**: Delivers best format (WebP, AVIF) based on browser
- **Responsive Breakpoints**: Generate multiple sizes for responsive design

## Troubleshooting

### Common Issues:

1. **"Invalid cloud name" error:**
   - Verify your cloud name in `.env.local`
   - Ensure no typos or extra spaces
   - Check if environment variables are loaded correctly

2. **"Upload preset not found" error:**
   - Verify the preset name matches exactly
   - Ensure the preset is set to "Unsigned" mode
   - Check if the preset is saved and active

3. **File upload fails:**
   - Check file size limits (default 5MB)
   - Verify allowed file formats in preset
   - Check browser console for detailed errors

4. **Images not displaying:**
   - Verify the Cloudinary URLs are correctly formatted
   - Check if images exist in your Media Library
   - Ensure HTTPS URLs are used

### Getting Help:

- Cloudinary Documentation: https://cloudinary.com/documentation
- Cloudinary Support: https://support.cloudinary.com/
- Community Forum: https://community.cloudinary.com/

## Features Enabled

✅ **Secure File Uploads**: Files uploaded directly to Cloudinary
✅ **Image Optimization**: Automatic format and quality optimization
✅ **CDN Delivery**: Fast global content delivery
✅ **Thumbnail Generation**: Automatic thumbnail creation
✅ **Mobile Optimization**: Perfect for mobile uploads
✅ **Bengali Error Messages**: User-friendly error handling
✅ **Progress Tracking**: Upload progress indicators
✅ **File Validation**: Size and format restrictions

## Cost Optimization

- **Free Tier**: 25GB storage + 25GB bandwidth/month
- **Optimization**: Auto-format and quality reduce bandwidth usage
- **Smart Cropping**: Reduces storage by generating optimized versions on-demand
- **Cache**: CDN caching reduces repeated delivery costs

---

**Status**: 🟢 **Ready for Production** - Cloudinary integration is fully configured and secure!