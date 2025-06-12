// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "auth-a7e48.firebaseapp.com",
//   projectId: "auth-a7e48",
//   storageBucket: "auth-a7e48.firebasestorage.app",
//   messagingSenderId: "175497246336",
//   appId: "1:175497246336:web:32acabbfe44dc5201e5865",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dubagari-estate.firebaseapp.com",
  projectId: "dubagari-estate",
  storageBucket: "dubagari-estate.firebasestorage.app",
  messagingSenderId: "979694900795",
  appId: "1:979694900795:web:09b35b94268626f77d6e1e",
  measurementId: "G-WP0W5VER9X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
