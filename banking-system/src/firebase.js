import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC-1L3YgHU4RJBefUmMnkT5Sb7z5t4hHUs",
  authDomain: "banking-system-8284c.firebaseapp.com",
  projectId: "banking-system-8284c",
  storageBucket: "banking-system-8284c.firebasestorage.app",
  messagingSenderId: "81608819484",
  appId: "1:81608819484:web:f1cd36fd2df0d59b2030d9",
  measurementId: "G-XK1B5V7GVC",
  databaseURL: "https://console.firebase.google.com/u/0/project/banking-system-8284c/firestore/databases/-default-/data" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export {app, auth};
