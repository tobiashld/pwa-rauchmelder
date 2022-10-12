import { collection, getDocs,query, where, WhereFilterOp } from "firebase/firestore"
import db from "../../config/firebase.config"
import { UserConverter } from "../../types/allgemein"



async function getUsers(){
    const userCol = collection(db,'users').withConverter(UserConverter)
    const userSnapshot = await getDocs(userCol)
    const userListe = userSnapshot.docs.map(doc=>doc.data())
    return userListe;
}
async function getUsersWithParam(key:string,value:any){
    
    const userCol = collection(db,'users').withConverter(UserConverter)
    const q = query(userCol,where(key,"==",value))
    const userSnapshot = await getDocs(q)
    const userListe = userSnapshot.docs.map(doc=>doc.data());
    console.log(userListe)
    return userListe
}
async function getUsersWithParams(params:[{key:string,operator:WhereFilterOp,value:any}]){
    
    const userCol = collection(db,'users').withConverter(UserConverter)
    const q = query(userCol,...(params.map(item=>where(item.key,item.operator,item.value))))
    const userSnapshot = await getDocs(q)
    const userListe = userSnapshot.docs.map(doc=>doc.data());
    console.log(userListe)
    return userListe
}




const functions = {
    getUsers,
    getUsersWithParam,
    getUsersWithParams,
}

export default functions