
import { Pruefung } from "../../types/allgemein"
import { cookies } from "../cookieService";
import { dynamicurl } from "../globals";



async function get(params?:{[key:string]:any},cb?:(data:any)=>void){
    const http = new XMLHttpRequest();
    const url = dynamicurl + "/pruefungen" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
    http.open("GET",url);
    http.setRequestHeader("Authorization","Bearer "+cookies.get("token"))
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
async function add(pruefung:Pruefung,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/auftraggeber"
  http.open("POST",url);
  http.setRequestHeader("Authorization","Bearer "+cookies.get("token"))
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
  http.send(JSON.stringify(pruefung.prepForSave()));
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }        
    }
  }
}
async function change(pruefung:Pruefung,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/pruefungen/"+pruefung.id
  http.open("PUT",url);
  http.setRequestHeader("Authorization","Bearer "+cookies.get("token"))
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
  http.send(JSON.stringify(pruefung.prepForSave()));
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }        
    }
  }
}
async function deleteP(id:number,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/pruefungen/"+id
  http.open("DELETE",url);
  http.setRequestHeader("Authorization","Bearer "+cookies.get("token"))
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
    deleteP
}

export default functions