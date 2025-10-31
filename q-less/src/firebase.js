// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD95SkubMSJExv2wwNW2yb88VSRJXdi4tU",
  authDomain: "q-less-c1380.firebaseapp.com",
  projectId: "q-less-c1380",
  storageBucket: "q-less-c1380.firebasestorage.app",
  messagingSenderId: "475792713163",
  appId: "1:475792713163:web:27e232fab0b68b220c424e",
};

const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Firestore
export const db = getFirestore(app);

export default app;
