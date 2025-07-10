// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAAIl7Ks-MkccYb1TjVs8AlJnLzk9ngIY",
  authDomain: "capstone-jobseeker-a5358.firebaseapp.com",
  projectId: "capstone-jobseeker-a5358",
  storageBucket: "capstone-jobseeker-a5358.firebasestorage.app",
  messagingSenderId: "347777124386",
  appId: "1:347777124386:web:7fd27d1a8c5287f6f9a27b",
  measurementId: "G-YDRPFRR9HF"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { serverTimestamp };