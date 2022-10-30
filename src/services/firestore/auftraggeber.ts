
import { Auftraggeber } from "../../types/allgemein"


const dynamicurl="http://localhost:3000"

async function getAuftraggeber(params?:{[key:string]:any},cb?:(data:any)=>void){
    const http = new XMLHttpRequest();
    const url = dynamicurl + "/auftraggeber" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
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
async function getAuftraggeberWithParam(key:string,value:any){
    
}
async function getAuftraggeberWithParams(params:[{key:string,operator:any,value:any}],filter?:any){
   
}

async function addAuftraggeber(auftraggeber:Auftraggeber){
    
}




const functions = {
    getAuftraggeber,
    getAuftraggeberWithParam,
    getAuftraggeberWithParams,
    addAuftraggeber
}

export default functions