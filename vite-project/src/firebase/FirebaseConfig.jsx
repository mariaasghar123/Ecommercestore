// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCors-uAEUBD7MJHSBnWLWG3aM5zHCJF1s",
  authDomain: "my-ecomme-92e11.firebaseapp.com",
  projectId: "my-ecomme-92e11",
  storageBucket: "my-ecomme-92e11.firebasestorage.app",
  messagingSenderId: "437082188837",
  appId: "1:437082188837:web:9adb7c2fd7964bdc7463cc",
  measurementId: "G-GQCVT8QZHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB= getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };