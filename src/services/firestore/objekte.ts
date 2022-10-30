
import db from "../../config/firebase.config"
import { Objekt } from "../../types/allgemein"

const dynamicurl="http://localhost:3000"

async function getObjekte(params?:{[key:string]:any},cb?:(data:any)=>void){
    const http = new XMLHttpRequest();
    const url = dynamicurl + "/objekte" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
    console.log(url)
    http.open("GET",url);
    http.send();
    
    http.onreadystatechange=(e:Event)=>{
      if(http.readyState === 4 && http.status === 200){
        console.log(http.responseText)
        let obj = JSON.parse(http.responseText)

        if(obj && obj.data){
            if(cb)cb(obj.data)
        }        
      }
    }
}
async function getObjekteWithParam(key:string,value:any){
    
    
}
async function getObjekteWithParams(params:[{key:string,value:any}]){
    
}

async function addObjekt(objekt:Objekt){
    
}




const functions = {
    getObjekte,
    getObjekteWithParam,
    getObjekteWithParams,
    addObjekt
}

export default functions