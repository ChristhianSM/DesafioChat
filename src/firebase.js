import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA17nfwCbJy9sJtSpuuvtcaAjUm0OgCGH4",
    authDomain: "chat-c56ff.firebaseapp.com",
    projectId: "chat-c56ff",
    storageBucket: "chat-c56ff.appspot.com",
    messagingSenderId: "963559160866",
    appId: "1:963559160866:web:4bf4c81135188d25131e7b"
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);

  const db = getFirestore();
  const googleAuthProvider = new GoogleAuthProvider();

  export {
      db,
      googleAuthProvider
  }
