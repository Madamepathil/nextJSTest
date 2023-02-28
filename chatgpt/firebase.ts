import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkUOZFYgOL8ipgf1EfjIVdp8sczmsFYUg",
  authDomain: "chatgpt-4c771.firebaseapp.com",
  projectId: "chatgpt-4c771",
  storageBucket: "chatgpt-4c771.appspot.com",
  messagingSenderId: "414781640095",
  appId: "1:414781640095:web:467f9eaf590c2e914c01aa",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
