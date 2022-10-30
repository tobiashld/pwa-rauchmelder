
import db from "../../config/firebase.config"
import { Wohnung,  } from "../../types/allgemein"

const dynamicurl="http://localhost:3000"

async function getWohnung(params?:{[key:string]:any},cb?:(data:any)=>void){
    const http = new XMLHttpRequest();
    const url = dynamicurl + "/wohnungen" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
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
async function getWohnungWithParam(key:string,value:any){
    
    
}
async function getWohnungWithParams(params:[{key:string,value:any}]){
    
}

async function addWohnung(wohnung:Wohnung){
    

}




const functions = {
    getWohnung,
    getWohnungWithParam,
    getWohnungWithParams,
    addWohnung
}

export default functions