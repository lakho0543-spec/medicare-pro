// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6qaKxQ5S8gNQpWiX8_PejqPvd2zJz2T0",
  authDomain: "medicare-pro-8619a.firebaseapp.com",
  projectId: "medicare-pro-8619a",
  storageBucket: "medicare-pro-8619a.firebasestorage.app",
  messagingSenderId: "208256404646",
  appId: "1:208256404646:web:116a2ca348b10cdb5e7867"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;