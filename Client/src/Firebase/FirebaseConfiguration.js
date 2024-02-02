import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getStorage, } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3t9ItpmN59htZ40uB_MxckhDMOc3M7iE",
  authDomain: "chit-chat-92c50.firebaseapp.com",
  projectId: "chit-chat-92c50",
  storageBucket: "chit-chat-92c50.appspot.com",
  messagingSenderId: "101640238703",
  appId: "1:101640238703:web:af417623895bc1c681bf9a",
  measurementId: "G-F598CN7H3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
auth.useDeviceLanguage();

// Google Authentication Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');



