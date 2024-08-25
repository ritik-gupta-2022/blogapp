// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-a5227.firebaseapp.com",
  projectId: "blog-app-a5227",
  storageBucket: "blog-app-a5227.appspot.com",
  messagingSenderId: "651505969265",
  appId: "1:651505969265:web:4f74449ffc8447fe3d53d0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);