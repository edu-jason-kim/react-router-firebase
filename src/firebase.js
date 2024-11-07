import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDywUmPXLlqTsaS7K91UgeAzOHtkTUCNmk",
  authDomain: "react-router-firebase-19d38.firebaseapp.com",
  projectId: "react-router-firebase-19d38",
  storageBucket: "react-router-firebase-19d38.firebasestorage.app",
  messagingSenderId: "1078334595932",
  appId: "1:1078334595932:web:abe17bef3562d5dd881799",
  measurementId: "G-GZYX62QE1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
