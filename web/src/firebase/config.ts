import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4FTzXdYnZp1ASmVUWugJNEQSIcCpmysQ",
  authDomain: "myifce.firebaseapp.com",
  projectId: "myifce",
  storageBucket: "myifce.appspot.com",
  messagingSenderId: "905536320468",
  appId: "1:905536320468:web:23fc00bb2ff10bafbe9c41",
  measurementId: "G-XK1JEDF0PW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)



export { app, auth, db };