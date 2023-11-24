import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {

  apiKey: "AIzaSyDwSETbFe29XObQuhfVLrhhPO0uJsG9_kQ",

  authDomain: "movie-fusion.firebaseapp.com",

  projectId: "movie-fusion",

  storageBucket: "movie-fusion.appspot.com",

  messagingSenderId: "670845466962",

  appId: "1:670845466962:web:bfb78ce7e0e713fb67a28b",

  measurementId: "G-QT0SH5EDLR"

};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


// const analytics = getAnalytics(app);

export {auth, db, storage}