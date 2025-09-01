import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE__API_KEY,
  authDomain: import.meta.env.VITE__AUTH_DOMAIN,
  projectId: import.meta.env.VITE__PROJECT_ID,
  storageBucket: import.meta.env.VITE__STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE__MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE__APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
