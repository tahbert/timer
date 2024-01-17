import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB62lUyuRSEau7B2KsluYUyH1qNggJJLDg",
    authDomain: "tahbert-engmindmap.firebaseapp.com",
    projectId: "tahbert-engmindmap",
    storageBucket: "tahbert-engmindmap.appspot.com",
    messagingSenderId: "780374631725",
    appId: "1:780374631725:web:f22dbd0a3bca107788dfa4",
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db
