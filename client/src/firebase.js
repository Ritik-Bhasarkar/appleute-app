import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjjzQcfLVzNpfuv0r6cdHy1jo1o_aekTA",
  authDomain: "appleute-app.firebaseapp.com",
  projectId: "appleute-app",
  storageBucket: "appleute-app.appspot.com",
  messagingSenderId: "141003816683",
  appId: "1:141003816683:web:2019519a52baa785e908ae",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
