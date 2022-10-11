import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
const firebaseConfig = {
    apiKey: "AIzaSyBr835JaHIRx__SLjsopWhKrYLyKJzz4_8",
    authDomain: "rauchmelder-database.firebaseapp.com",
    projectId: "rauchmelder-database",
    storageBucket: "rauchmelder-database.appspot.com",
    messagingSenderId: "1098886130786",
    appId: "1:1098886130786:web:44be04cdcad38d7e2e753b"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig); 
  const db = getFirestore(app)
  export default db