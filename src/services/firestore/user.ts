import { User } from "../../types/allgemein";
import { cookies } from "../cookieService";
import { dynamicurl } from "../globals";



async function get(params?:{[key:string]:any},cb?:(data:any)=>void){
    const http = new XMLHttpRequest();
    const url = dynamicurl + "/user" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
    http.open("GET",url);
    http.setRequestHeader("Authorization",cookies.get("token"))
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
async function add(user:User,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/user"
  http.open("POST",url);
  http.setRequestHeader("Authorization",cookies.get("token"))
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
  http.send(JSON.stringify(user.prepForSave()));
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }        
    }
  }
}
async function change(user:User,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/user/"+user.id
  http.open("PUT",url);
  http.setRequestHeader("Authorization",cookies.get("token"))
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
  http.send(JSON.stringify(user.prepForSave()));
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }        
    }
  }
}
async function deleteU(id:number,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/user/"+id
  http.open("DELETE",url);
  http.setRequestHeader("Authorization",cookies.get("token"))
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

function login(username:string,password:string,cb?:(obj:any)=>void) {
  const http = new XMLHttpRequest();
    const url = dynamicurl + "/login"
    http.open("POST",url);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
    http.setRequestHeader("Authorization",cookies.get("token"))
    http.send(JSON.stringify({username:username,password:password}));
    
    http.onreadystatechange=(e:Event)=>{
      console.log(http.responseText)
      let obj = http.responseText && http.responseText !== ""?JSON.parse(http.responseText):undefined
      if(obj && obj.status && obj.status === 200){
          cookies.set("token",obj.token)
          if(cb)cb(obj)
      }else{
        if(cb)cb(obj)
      }        
      }
    
}
function changepw(password:string,cb?:(obj:any)=>void) {
  const http = new XMLHttpRequest();
    const url = dynamicurl + "/changepw"
    http.open("POST",url);
    http.setRequestHeader("Authorization","Bearer "+cookies.get("token"))
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
    http.send(JSON.stringify({password:password}));
    
    http.onreadystatechange=(e:Event)=>{
      let obj = http.responseText && http.responseText !== ""?JSON.parse(http.responseText):undefined
      if(obj && obj.status && obj.status === 200){
          cookies.set("token",obj.token)
          if(cb)cb(obj)
      }else{
        if(cb)cb(obj)
      }        
      }
    
}






const functions = {
    get,
    change,
    add,
    deleteU,
    login,
    changepw
    
}

export default functions