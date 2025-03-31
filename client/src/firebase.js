// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Meta } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-ab4ea.firebaseapp.com",
  projectId: "realestate-ab4ea",
  storageBucket: "realestate-ab4ea.firebasestorage.app",
  messagingSenderId: "774071940397",
  appId: "1:774071940397:web:91a2fc9610864cd5e40fa4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
