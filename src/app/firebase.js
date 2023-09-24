import { initializeApp } from "firebase/app";
import { getFirestore, collection,getDocs,updateDoc,doc,Firestore } from "firebase/firestore";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBR_i5VIOkfN2jCKYcgz53MCp1Gd4MFlsE",
  authDomain: "expense-tracker-a33d9.firebaseapp.com",
  projectId: "expense-tracker-a33d9",
  storageBucket: "expense-tracker-a33d9.appspot.com",
  messagingSenderId: "137135096366",
  appId: "1:137135096366:web:515f45bd50136f5c9615bf"
};
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);