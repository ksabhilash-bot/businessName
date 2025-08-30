// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRESTORE_API,
  authDomain: "businessgenerator-cf70d.firebaseapp.com",
  projectId: "businessgenerator-cf70d",
  storageBucket: "businessgenerator-cf70d.appspot.com", // fixed suffix
  messagingSenderId: "157528483727",
  appId: "1:157528483727:web:a3952f02de541797ad0dfa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth & Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
