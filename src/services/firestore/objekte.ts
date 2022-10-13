import { addDoc, collection, DocumentData, getDocs,query, where, WhereFilterOp } from "firebase/firestore"
import db from "../../config/firebase.config"
import { Objekt, ObjektConverter } from "../../types/allgemein"



async function getObjekte(){
    const objektCol = collection(db,'objekte').withConverter(ObjektConverter)
    const objektSnapshot = await getDocs(objektCol)
    const objektListe = objektSnapshot.docs.map(doc=>doc.data())
    return objektListe;
}
async function getObjekteWithParam(key:string,value:any){
    
    const objektCol = collection(db,'objekte').withConverter(ObjektConverter)
    const q = query(objektCol,where(key,"==",value))
    const objektSnapshot = await getDocs(q)
    const objektListe = objektSnapshot.docs.map(doc=>doc.data());
    return objektListe
}
async function getObjekteWithParams(params:[{key:string,operator:WhereFilterOp,value:any}]){
    const objektCol = collection(db,'objekte').withConverter(ObjektConverter)
    const q = query(objektCol,...(params.map(item=>where(item.key,item.operator,item.value))))
    const objektSnapshot = await getDocs(q)
    const objektListe = objektSnapshot.docs.map(doc=>doc.data());
    return objektListe
}

async function addObjekt(objekt:Objekt){
    const snapshot = await addDoc(collection(db,'Objekt'),objekt)
    

}




const functions = {
    getObjekte,
    getObjekteWithParam,
    getObjekteWithParams,
    addObjekt
}

export default functions