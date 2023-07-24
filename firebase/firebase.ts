import { initializeApp,getApps } from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getFunctions} from "firebase/functions"
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBNPh12hStUCjzHZEqsOwwxC_39hdk6nJw",
  authDomain: "who-are-you-f1b7e.firebaseapp.com",
  projectId: "who-are-you-f1b7e",
  storageBucket: "who-are-you-f1b7e.appspot.com",
  messagingSenderId: "395977945572",
  appId: "1:395977945572:web:0370e50af483813fbd97f1",
  measurementId: "G-0CQENNYN9R"
};

if (!getApps()?.length) {
 const app = initializeApp(firebaseConfig);
}


export const db = getFirestore()
export const auth = getAuth()
export const functions=getFunctions()
export const storage=getStorage()