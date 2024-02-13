import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDp2OzaSsjFAGfcmHKrYVPBJfx9T7pe55U",
    authDomain: "timer-tahbert.firebaseapp.com",
    projectId: "timer-tahbert",
    storageBucket: "timer-tahbert.appspot.com",
    messagingSenderId: "554438517842",
    appId: "1:554438517842:web:d9caa44b73bcc5a78b6b8b",
    measurementId: "G-WYR628QCH7",
}
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db
