import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD95SkubMSJExv2wwNW2yb88VSRJXdi4tU",
  authDomain: "q-less-c1380.firebaseapp.com",
  projectId: "q-less-c1380",
  storageBucket: "q-less-c1380.appspot.com",
  messagingSenderId: "475792713163",
  appId: "1:475792713163:web:27e232fab0b68b220c424e",
};

const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
