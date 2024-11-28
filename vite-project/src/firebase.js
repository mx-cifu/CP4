// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACdtsVj1qXY3nWRDR__9tJylqDl2V-vFo",
  authDomain: "cp4database.firebaseapp.com",
  projectId: "cp4database",
  storageBucket: "cp4database.firebasestorage.app",
  messagingSenderId: "953028660245",
  appId: "1:953028660245:web:4300fe5d7a561f828e121c",
  measurementId: "G-74J6C9C3FQ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export { firebaseApp, database };