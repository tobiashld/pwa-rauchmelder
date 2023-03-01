import { User } from "../../types/allgemein";
import { dynamicurl } from "../globals";



async function get(params?:{[key:string]:any},cb?:(data:any)=>void){
    const url = dynamicurl + "/user" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
    fetch(url,{
      credentials: "include",
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response=>{
      return response.json()})
      .then(obj=>{
        if(obj && obj.status === 200){
          if(cb)cb(obj)
        }else{
          if(cb)cb(obj)
        }
      })
}
async function add(user:User,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/user"
  http.open("POST",url);
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
    const url = dynamicurl + "/login"
    fetch(url,{
      credentials: "include",
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({username:username,password:password})
    }).then(response=>{
      return response.json()})
      .then(obj=>{
        if(obj && obj){
          if(cb)cb(obj)
      }
      })    
}
async function logout(cb?:(obj:any)=>void) {
  const url = dynamicurl + "/logout"
  return fetch(url,{
    credentials: "include",
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(response=>{
    return response.json()})
    .then(obj=>{
      if(obj && obj){
        if(cb)cb(obj)
    }
    })    
}
function changepw(password:string,cb?:(obj:any)=>void) {
    const url = dynamicurl + "/changepw"
    fetch(url,{
      credentials: "include",
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({password:password})
    }).then(response=>{
      return response.json()})
      .then(obj=>{
        if(obj && obj.data){
          if(cb)cb(obj.data)
      }
      })    
}






const functions = {
    get,
    change,
    add,
    deleteU,
    login,
    changepw,
    logout
    
}

export default functions