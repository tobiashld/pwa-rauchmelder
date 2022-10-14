import { addDoc, collection, getDocs,query, where, WhereFilterOp } from "firebase/firestore"
import db from "../../config/firebase.config"
import { Rauchmelder, RauchmelderConverter } from "../../types/allgemein"



async function getRauchmelder(){
    const rauchmelderCol = collection(db,'rauchmelder').withConverter(RauchmelderConverter)
    const rauchmelderSnapshot = await getDocs(rauchmelderCol)
    const rauchmelderListe = rauchmelderSnapshot.docs.map(doc=>doc.data())
    return rauchmelderListe;
}
async function getRauchmelderWithParam(key:string,value:any){
    
    const rauchmelderCol = collection(db,'rauchmelder').withConverter(RauchmelderConverter)
    const q = query(rauchmelderCol,where(key,"==",value))
    const rauchmelderSnapshot = await getDocs(q)
    const rauchmelderListe = rauchmelderSnapshot.docs.map(doc=>doc.data());
    return rauchmelderListe
}
async function getRauchmelderWithParams(params:[{key:string,operator:WhereFilterOp,value:any}]){
    const rauchmelderCol = collection(db,'rauchmelder').withConverter(RauchmelderConverter)
    const q = query(rauchmelderCol,...(params.map(item=>where(item.key,item.operator,item.value))))
    const rauchmelderSnapshot = await getDocs(q)
    const rauchmelderListe = rauchmelderSnapshot.docs.map(doc=>doc.data());
    return rauchmelderListe
}

async function addRauchmelder(rauchmelder:Rauchmelder){
    const snapshot = await addDoc(collection(db,'rauchmelder'),rauchmelder)
    snapshot.withConverter(RauchmelderConverter)

}




const functions = {
    getRauchmelder,
    getRauchmelderWithParam,
    getRauchmelderWithParams,
    addRauchmelder
}

export default functions