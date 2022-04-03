// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDec9OlzBjIS_e5JyXwWjPknuWWnxTBQAM",
  authDomain: "crwn-clothing-db-dd95c.firebaseapp.com",
  projectId: "crwn-clothing-db-dd95c",
  storageBucket: "crwn-clothing-db-dd95c.appspot.com",
  messagingSenderId: "74362130514",
  appId: "1:74362130514:web:027721e5a45cf1169e8f8b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
