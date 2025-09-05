# Borkha Order Taking App

A full-stack order management system for tailors built with React, Node.js, and MongoDB.

## Features

- Customer order management
- Digital measurement sketching
- Order status tracking
- Admin dashboard
- Print functionality for order details
- Responsive design

## Deployment to Vercel

### Frontend Deployment

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set the build command to: `npm run build`
4. Set the output directory to: `dist`
5. Set the install command to: `npm install`
6. Add environment variables:
   - `VITE_API_BASE_URL` - Your backend API URL
   - `VITE_FIREBASE_API_KEY` - Your Firebase API key
   - `VITE_FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain
   - `VITE_FIREBASE_PROJECT_ID` - Your Firebase project ID
   - `VITE_FIREBASE_STORAGE_BUCKET` - Your Firebase storage bucket
   - `VITE_FIREBASE_MESSAGING_SENDER_ID` - Your Firebase messaging sender ID
   - `VITE_FIREBASE_APP_ID` - Your Firebase app ID

### Backend Deployment

Deploy your Node.js backend to a platform like:
- Render
- Heroku
- DigitalOcean App Platform
- AWS Elastic Beanstalk

Make sure to update the API URL in your frontend environment variables and in the `vercel.json` file.

### Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```
VITE_API_BASE_URL=https://your-backend-url.com
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Vercel Configuration

The `vercel.json` file handles routing for the SPA and API proxying:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend-deployment-url.com/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Update the backend URL to point to your actual backend deployment.

## Development

### Frontend

1. Navigate to the frontend directory: `cd order-taking-app`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Backend

1. Navigate to the backend directory: `cd order-taking-app-backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB connection string and other environment variables
4. Start the development server: `npm run dev`

## Build

### Frontend

To build the frontend for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Learn More

To learn more about the technologies used:

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)