import { Rauchmelder,  } from "../../types/allgemein"
import { dynamicurl } from "../globals";



async function get(params?:{[key:string]:any},cb?:(data:any)=>void){
    const url = dynamicurl + "/rauchmelder" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
    fetch(url,{
      credentials: "include",
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response=>{
      return response.json()})
      .then(obj=>{
        if(obj && obj.data){
          if(cb)cb(obj.data)
        }else if(obj && obj.error){
          if(cb)cb(obj)
        }
      })
}
async function add(rauchmelder:Rauchmelder,cb?:(data:any)=>void){
  const url = dynamicurl + "/rauchmelder"
  fetch(url,{
    credentials: "include",
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(rauchmelder.prepForSave())
  }).then(response=>{
    return response.json()})
    .then(obj=>{
      if(obj && obj.data){
        if(cb)cb(obj.data)
    }
    })
}
async function change(rauchmelder:Rauchmelder,cb?:(data:any)=>void){
  const url = dynamicurl + "/rauchmelder/"+rauchmelder.id
  fetch(url,{
    credentials: "include",
    method:"PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(rauchmelder.prepForSave())
  }).then(response=>{
    return response.json()})
    .then(obj=>{
      if(obj && obj.data){
        if(cb)cb(obj.data)
    }
    })
}
async function deleteR(id:number,cb?:(data:any)=>void){
  const url = dynamicurl + "/rauchmelder/"+id
  fetch(url,{
    credentials: "include",
    method:"DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
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
    add,
    change,
    deleteR
}

export default functions