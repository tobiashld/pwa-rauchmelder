import { collection, getDocs } from "firebase/firestore/lite"
import db from "../config/firebase.config"



async function getUsers(){
    const userCol = collection(db,'users')
    const userSnapshot = await getDocs(userCol)
    const userListe = userSnapshot.docs.map(doc=>doc.data())
    return userListe;
}



const functions = {
    getUsers
}

export default functions