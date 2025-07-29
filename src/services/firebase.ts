// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4r38YZM1SAJqUBkstqsHav8A_p7btmXM",
  authDomain: "jobmate-465516.firebaseapp.com",
  projectId: "jobmate-465516",
  storageBucket: "jobmate-465516.firebasestorage.app",
  messagingSenderId: "819767094904",
  appId: "1:819767094904:web:020294df1d3f485e97878d",
  measurementId: "G-WBWP7GSMK7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { serverTimestamp };