// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnIZgY3PSur1-kqnFOhrx5MqsuloY8jR8",
  authDomain: "bohdan-react.firebaseapp.com",
  databaseURL: "https://bohdan-react-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bohdan-react",
  storageBucket: "bohdan-react.firebasestorage.app",
  messagingSenderId: "382618075868",
  appId: "1:382618075868:web:7542541fe3cde93f8eaa19",
  measurementId: "G-C0X7GEQX3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);