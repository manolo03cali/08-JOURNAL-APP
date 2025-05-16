// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzRkWZDGkJOrL8eV8ybeniKpl9v87HesI",
  authDomain: "react-cursos-6ae67.firebaseapp.com",
  projectId: "react-cursos-6ae67",
  storageBucket: "react-cursos-6ae67.firebasestorage.app",
  messagingSenderId: "37182457037",
  appId: "1:37182457037:web:793b3485f8dc8691dd5584",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
