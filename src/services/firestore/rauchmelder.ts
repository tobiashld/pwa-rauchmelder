
import db from "../../config/firebase.config"
import { Rauchmelder,  } from "../../types/allgemein"

const dynamicurl="http://localhost:3000"

async function getRauchmelder(params?:{[key:string]:any},cb?:(data:any)=>void){
    const http = new XMLHttpRequest();
    const url = dynamicurl + "/rauchmelder" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
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
async function getRauchmelderWithParam(key:string,value:any){
   
}
async function getRauchmelderWithParams(params:[{key:string,value:any}]){
    
}

async function addRauchmelder(rauchmelder:Rauchmelder){
    

}




const functions = {
    getRauchmelder,
    getRauchmelderWithParam,
    getRauchmelderWithParams,
    addRauchmelder
}

export default functions