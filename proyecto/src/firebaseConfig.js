import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoVGhbrW38FqhE1djDNma8bnOvXe2t-fg",
  authDomain: "rickandmorty-e1394.firebaseapp.com",
  projectId: "rickandmorty-e1394",
  storageBucket: "rickandmorty-e1394.firebasestorage.app",
  messagingSenderId: "467524200288",
  appId: "1:467524200288:web:7417c02a5442577ae62005",
  measurementId: "G-3KJYK28EYL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
