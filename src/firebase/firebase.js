import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Firebase configuration keeping them here for the assignment to be run locally
const firebaseConfig = {
  apiKey: "AIzaSyA_HK9l-XTOcQz3KVk7gtpbzdIvMzYCfZ8",
  authDomain: "ad-group-47e4f.firebaseapp.com",
  projectId: "ad-group-47e4f",
  storageBucket: "ad-group-47e4f.appspot.com",
  messagingSenderId: "884541682757",
  appId: "1:884541682757:web:9e40a02e330ac585b01f2c",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
