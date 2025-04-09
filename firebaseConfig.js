// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0aIbXG9wqCM-AbIYXS41jKEdntV8RUEs",
  authDomain: "nativenreacten.firebaseapp.com",
  projectId: "nativenreacten",
  storageBucket: "nativenreacten.firebasestorage.app",
  messagingSenderId: "678762994507",
  appId: "1:678762994507:web:dd6c85c584eb11e2ade6ce",
  measurementId: "G-0SNV20B5ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);