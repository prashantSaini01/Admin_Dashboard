// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxUJuvPqhLGEs-TjAKXZfz36OOk0LaxBY",
  authDomain: "admin-dashboar-07-2001.firebaseapp.com",
  projectId: "admin-dashboar-07-2001",
  storageBucket: "admin-dashboar-07-2001.appspot.com",
  messagingSenderId: "21910787602",
  appId: "1:21910787602:web:620ce16eb822f6ae976acb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db  = getFirestore(app);


export const auth=getAuth(app);


export default app;