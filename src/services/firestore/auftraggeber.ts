import { addDoc, collection, DocumentData, getDocs,query, where, WhereFilterOp } from "firebase/firestore"
import db from "../../config/firebase.config"
import { Auftraggeber, AuftraggeberConverter } from "../../types/allgemein"



async function getAuftraggeber(){
    const auftraggeberCol = collection(db,'auftraggeber').withConverter(AuftraggeberConverter)
    const auftraggeberSnapshot = await getDocs(auftraggeberCol)
    const auftraggeberListe = auftraggeberSnapshot.docs.map(doc=>doc.data())
    return auftraggeberListe;
}
async function getAuftraggeberWithParam(key:string,value:any){
    
    const auftraggeberCol = collection(db,'auftraggeber').withConverter(AuftraggeberConverter)
    const q = query(auftraggeberCol,where(key,"==",value))
    const auftraggeberSnapshot = await getDocs(q)
    const auftraggeberListe = auftraggeberSnapshot.docs.map(doc=>doc.data());
    return auftraggeberListe
}
async function getAuftraggeberWithParams(params:[{key:string,operator:WhereFilterOp,value:any}]){
    const auftraggeberCol = collection(db,'auftraggeber').withConverter(AuftraggeberConverter)
    const q = query(auftraggeberCol,...(params.map(item=>where(item.key,item.operator,item.value))))
    const auftraggeberSnapshot = await getDocs(q)
    const auftraggeberListe = auftraggeberSnapshot.docs.map(doc=>doc.data());
    return auftraggeberListe
}

async function addAuftraggeber(auftraggeber:Auftraggeber){
    const snapshot = await addDoc(collection(db,'auftraggeber'),auftraggeber)
    

}




const functions = {
    getAuftraggeber,
    getAuftraggeberWithParam,
    getAuftraggeberWithParams,
    addAuftraggeber
}

export default functions