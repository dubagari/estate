// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-a7e48.firebaseapp.com",
  projectId: "auth-a7e48",
  storageBucket: "auth-a7e48.firebasestorage.app",
  messagingSenderId: "175497246336",
  appId: "1:175497246336:web:32acabbfe44dc5201e5865",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
