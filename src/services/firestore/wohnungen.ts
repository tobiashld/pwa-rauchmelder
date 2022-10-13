import { addDoc, collection, getDocs,query, where, WhereFilterOp } from "firebase/firestore"
import db from "../../config/firebase.config"
import { Wohnung, WohnungConverter } from "../../types/allgemein"



async function getWohnung(){
    const wohnungCol = collection(db,'wohnungen').withConverter(WohnungConverter)
    const wohnungSnapshot = await getDocs(wohnungCol)
    const wohnungListe = wohnungSnapshot.docs.map(doc=>doc.data())
    return wohnungListe;
}
async function getWohnungWithParam(key:string,value:any){
    
    const wohnungCol = collection(db,'wohnungen').withConverter(WohnungConverter)
    const q = query(wohnungCol,where(key,"==",value))
    const wohnungSnapshot = await getDocs(q)
    const wohnungListe = wohnungSnapshot.docs.map(doc=>doc.data());
    return wohnungListe
}
async function getWohnungWithParams(params:[{key:string,operator:WhereFilterOp,value:any}]){
    const wohnungCol = collection(db,'wohnungen').withConverter(WohnungConverter)
    const q = query(wohnungCol,...(params.map(item=>where(item.key,item.operator,item.value))))
    const wohnungSnapshot = await getDocs(q)
    const wohnungListe = wohnungSnapshot.docs.map(doc=>doc.data());
    return wohnungListe
}

async function addWohnung(wohnung:Wohnung){
    const snapshot = await addDoc(collection(db,'Wohnung'),wohnung)
    snapshot.withConverter(WohnungConverter)

}




const functions = {
    getWohnung,
    getWohnungWithParam,
    getWohnungWithParams,
    addWohnung
}

export default functions