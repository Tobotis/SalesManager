import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAPsdSU85dH3wnAHpWB719kMHE7_w2f-JI",
  authDomain: "finanz-komitee.firebaseapp.com",
  projectId: "finanz-komitee",
  storageBucket: "finanz-komitee.appspot.com",
  messagingSenderId: "402888676864",
  appId: "1:402888676864:web:e6735b6e6357d4d0b96ae5",
  measurementId: "G-EEH7GPCR18",
});

export const auth = getAuth(app);
export const firestore = getFirestore();
export default app;
