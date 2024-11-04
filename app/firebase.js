// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt9KvTFxmrrrf1NZREytyGjjpRggYowOk",
  authDomain: "studyplanner-52376.firebaseapp.com",
  projectId: "studyplanner-52376",
  storageBucket: "studyplanner-52376.appspot.com", // fixed typo here
  messagingSenderId: "663054976448",
  appId: "1:663054976448:web:1909f1848ad34e569c3425"
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
