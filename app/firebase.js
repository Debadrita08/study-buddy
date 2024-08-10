// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuyJpWOH4eBMaZRxzfiwZU0jxxDzSaARg",
  authDomain: "inventory-management-75740.firebaseapp.com",
  projectId: "inventory-management-75740",
  storageBucket: "inventory-management-75740.appspot.com",
  messagingSenderId: "33971394676",
  appId: "1:33971394676:web:1c556a4cd6021aab8e5921",
  measurementId: "G-R4RG502VTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword};