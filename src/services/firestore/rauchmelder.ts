import { Rauchmelder,  } from "../../types/allgemein"
import { cookies } from "../cookieService";
import { dynamicurl } from "../globals";



async function get(params?:{[key:string]:any},cb?:(data:any)=>void){
    const http = new XMLHttpRequest();
    const url = dynamicurl + "/rauchmelder" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
    http.open("GET",url);
    http.setRequestHeader("Authorization","Bearer "+cookies.get("token"))
    http.send();
    
    http.onreadystatechange=(e:Event)=>{
      if(http.readyState === 4){
        let obj = JSON.parse(http.responseText)

        if(obj && obj.data){
            if(cb)cb(obj.data)
        }else{
          if(cb)cb(obj)
        }        
      }
    }
}
async function add(rauchmelder:Rauchmelder,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/rauchmelder"
  http.open("POST",url);
  http.setRequestHeader("Authorization","Bearer "+cookies.get("token"))
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
  http.send(JSON.stringify(rauchmelder.prepForSave()));
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }        
    }
  }
}
async function change(rauchmelder:Rauchmelder,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/rauchmelder/"+rauchmelder.id
  http.open("PUT",url);
  http.setRequestHeader("Authorization","Bearer "+cookies.get("token"))
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
  http.send(JSON.stringify(rauchmelder.prepForSave()));
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }        
    }
  }
}
async function deleteR(id:number,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/rauchmelder/"+id
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
    deleteR
}

export default functions