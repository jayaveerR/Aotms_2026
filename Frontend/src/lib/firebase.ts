import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuO7bos0pv-K5iRWg968hJ9ssi0pRdCoc",
    authDomain: "aotms-813bd.firebaseapp.com",
    projectId: "aotms-813bd",
    storageBucket: "aotms-813bd.firebasestorage.app",
    messagingSenderId: "384596349925",
    appId: "1:384596349925:web:1bb4815b2f68b12597550c",
    measurementId: "G-77VVQX1TSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, db, googleProvider, signInWithPopup, signOut };
