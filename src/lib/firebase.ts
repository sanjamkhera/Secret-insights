import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABvXJ0rdRaetJMy9kMC0S-xwQdzqdrV5g",
  authDomain: "celestialinsights-93307.firebaseapp.com",
  projectId: "celestialinsights-93307",
  storageBucket: "celestialinsights-93307.firebasestorage.app",
  messagingSenderId: "542289095260",
  appId: "1:542289095260:web:a4668492bb888f64b41499",
  measurementId: "G-CND0YHWC6X"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);