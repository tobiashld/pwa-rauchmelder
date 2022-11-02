import { Objekt } from "../../types/allgemein"
import { dynamicurl } from "../globals";



async function get(params?:{[key:string]:any},cb?:(data:any)=>void){
    const http = new XMLHttpRequest();
    const url = dynamicurl + "/objekte" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
    http.open("GET",url);
    http.send();
    
    http.onreadystatechange=(e:Event)=>{
      if(http.readyState === 4 && http.status === 200){
        let obj = JSON.parse(http.responseText)

        if(obj && obj.data){
            if(cb)cb(obj.data)
        }        
      }
    }
}
async function add(objekt:Objekt,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/auftraggeber"
  http.open("POST",url);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
  http.send(JSON.stringify(objekt.prepForSave()));
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }        
    }
  }
}
async function change(objekt:Objekt,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/objekte/"+objekt.id
  http.open("PUT",url);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
  http.send(JSON.stringify(objekt.prepForSave()));
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }        
    }
  }
}
async function deleteO(id:number,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/objekte/"+id
  http.open("DELETE",url);
  http.send();
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }        
    }
  }
}




const functions = {
    get,
    add,
    change,
    deleteO
}

export default functions