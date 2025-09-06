// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCxS1DIonCjr56LMIqH1dyodzFal_EV6J4",
    authDomain: "dev-app-8cab3.firebaseapp.com",
    projectId: "dev-app-8cab3",
    storageBucket: "dev-app-8cab3.firebasestorage.app",
    messagingSenderId: "297568305120",
    appId: "1:297568305120:web:f885fc8fb113cf034a7585",
    measurementId: "G-HK67G1YL6R"
  };

// ✅ Initialize Firebase once
const app = initializeApp(firebaseConfig);

// ✅ Export initialized services
export const auth = getAuth(app);
export const db = getFirestore(app);
