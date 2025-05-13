import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAaLVKywr6k6YJV994Df7gO_WjXRb3tVa8", 
  authDomain: "apptimeguard.firebaseapp.com",
  projectId: "pptimeguard",
  storageBucket: "apptimeguard.firebasestorage.app",
  messagingSenderId: "102357769180",
  appId: "1:102357769180:web:3c892f5602051eefd54d19"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);