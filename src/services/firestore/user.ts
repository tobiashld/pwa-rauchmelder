import { collection, getDocs,query, where, WhereFilterOp } from "firebase/firestore"
import db from "../../config/firebase.config"



async function getUsers(){
   
}
async function getUsersWithParam(key:string,value:any){
    
    
}
async function getUsersWithParams(params:[{key:string,operator:WhereFilterOp,value:any}]){
    
    
}




const functions = {
    getUsers,
    getUsersWithParam,
    getUsersWithParams,
}

export default functions