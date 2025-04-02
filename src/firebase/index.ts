import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // Import GoogleAuthProvider
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
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

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Export GoogleAuthProvider

// Export Firestore database
export const db = getFirestore(app);
