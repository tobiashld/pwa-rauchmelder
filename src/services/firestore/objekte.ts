import { Objekt } from "../../types/allgemein"
import { cookies } from "../cookieService";
import { dynamicurl } from "../globals";


async function get(params?:{[key:string]:any},cb?:(data:any)=>void){
    const http = new XMLHttpRequest();
    const url = dynamicurl + "/objekte" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
    http.open("GET",url);
    http.setRequestHeader("Authorization","Bearer "+cookies.get("token"))
    http.send();
    
    http.onreadystatechange=(e:Event)=>{
      if(http.readyState === 4 && http.status === 200){
        let obj = JSON.parse(http.responseText)

        if(obj && obj.data){
            if(cb)cb(obj.data)
        }else{
          if(cb)cb(obj)
        }        
      }
    }
}
async function add(objekt:Objekt,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/auftraggeber"
  http.open("POST",url);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
  http.setRequestHeader("Authorization","Bearer "+cookies.get("token"))
  http.send(JSON.stringify(objekt.prepForSave()));
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }else{
        if(cb)cb(obj)
      }        
    }
  }
}
async function change(objekt:Objekt,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/objekte/"+objekt.id
  http.open("PUT",url);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
  http.setRequestHeader("Authorization","Bearer "+cookies.get("token"))
  http.send(JSON.stringify(objekt.prepForSave()));
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }else{
        if(cb)cb(obj)
      }        
    }
  }
}
async function deleteO(id:number,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/objekte/"+id
  http.open("DELETE",url);
  http.setRequestHeader("Authorization","Bearer "+cookies.get("token"))
  http.send();
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }else{
        if(cb)cb(obj)
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