import { Objekt } from "../../types/allgemein"
import { dynamicurl } from "../globals";


async function get(params?:{[key:string]:any},cb?:(data:any)=>void){
    const url = dynamicurl + "/objekte" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
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
      }
      })
}
async function add(objekt:Objekt,cb?:(data:any)=>void){
  
  const url = dynamicurl + "/auftraggeber"
  fetch(url,{
    credentials: "include",
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(objekt.prepForSave())
  }).then(response=>{
    return response.json()})
    .then(obj=>{
      if(obj && obj.data){
        if(cb)cb(obj.data)
    }
    })
  
}
async function change(objekt:Objekt,cb?:(data:any)=>void){
  const url = dynamicurl + "/objekte/"+objekt.id
  fetch(url,{
    credentials: "include",
    method:"PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(objekt.prepForSave())
  }).then(response=>{
    return response.json()})
    .then(obj=>{
      if(obj && obj.data){
        if(cb)cb(obj.data)
    }
    })
}
async function deleteO(id:number,cb?:(data:any)=>void){
  const url = dynamicurl + "/objekte/"+id
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
    deleteO
}

export default functions