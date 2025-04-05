// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ecoshop-79a80.firebaseapp.com",
  databaseURL: "https://ecoshop-79a80-default-rtdb.firebaseio.com",
  projectId: "ecoshop-79a80",
  storageBucket: "ecoshop-79a80.appspot.com",
  messagingSenderId: "1002201941207",
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: "G-0JRSE7DE6Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);
