import { Objekt, toObjektConverter } from "../../types/allgemein"
import { dynamicurl } from "../globals";


async function get(params?:{[key:string]:any},cb?:(data:any)=>void):Promise<{status:number,data:Objekt[],error?:string}>{
    const url = dynamicurl + "/objekte" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
    return fetch(url,{
      credentials: "include",
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response=>response.json())
    .then(obj=>{
      if(cb)cb({
        ...obj,
        data:obj.data.map((item:any)=>toObjektConverter(item))
      })
      if(obj.error)return obj
      return {
        ...obj,
        data:obj.data.map((item:any)=>toObjektConverter(item))
      }
    })
}
async function add(objekt:Objekt,cb?:(data:any)=>void){
  
  const url = dynamicurl + "/auftraggeber"
  return fetch(url,{
    credentials: "include",
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(objekt.prepForSave())
  }).then(response=>response.json())
  .then(obj=>{
    if(cb)cb(obj)
    return obj
  })
  
}
async function change(objekt:Objekt,cb?:(data:any)=>void){
  const url = dynamicurl + "/objekte/"+objekt.id
  return fetch(url,{
    credentials: "include",
    method:"PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(objekt.prepForSave())
  }).then(response=>response.json())
  .then(obj=>{
    if(cb)cb(obj)
    return obj
  })
}
async function deleteO(id:number,cb?:(data:any)=>void){
  const url = dynamicurl + "/objekte/"+id
  return fetch(url,{
    credentials: "include",
    method:"DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(response=>response.json())
    .then(obj=>{
      if(cb)cb(obj)
      return obj
    })
}




const functions = {
    get,
    add,
    change,
    deleteO
}

export default functions