import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyB3t9ItpmN59htZ40uB_MxckhDMOc3M7iE",
    authDomain: "chit-chat-92c50.firebaseapp.com",
    projectId: "chit-chat-92c50",
    storageBucket: "chit-chat-92c50.appspot.com",
    messagingSenderId: "101640238703",
    appId: "1:101640238703:web:af417623895bc1c681bf9a",
    measurementId: "G-F598CN7H3W",
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const myFirebase = firebase;
export const db = firebase.firestore();
export const now = firebase.firestore.FieldValue;



// Initialize Firebase Authentication and get a reference to the service
export default firebase.auth();




