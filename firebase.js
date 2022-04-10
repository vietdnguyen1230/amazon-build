// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjG8vqaDwIkYZZQrD5kRMFj0UNqSVzRTY",
  authDomain: "build-586b7.firebaseapp.com",
  projectId: "build-586b7",
  storageBucket: "build-586b7.appspot.com",
  messagingSenderId: "643132852426",
  appId: "1:643132852426:web:1d76ca842bcbd266018c33",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
