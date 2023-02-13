import { DBResponse, toRauchmelderConverter,  } from "../../types/allgemein"
import { Rauchmelder, RauchmelderBeziehung, RauchmelderHistorie, toRauchmelderBzConverter,toRauchmelderConverter as toRauchmelderNewConverter, toRauchmelderHistorienConverter } from "../../types/rauchmelder";
import { dynamicurl } from "../globals";



async function get(params?:{[key:string]:any},cb?:(data:DBResponse<RauchmelderBeziehung>)=>void):Promise<{status:number,data:RauchmelderBeziehung[],error?:string}>{
    const url = dynamicurl + "/rauchmelder" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
    return fetch(url,{
      credentials: "include",
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response=>{
      return response.json()})
      .then(obj=>{
        if(cb)cb({
          ...obj,
          data:obj.data.map((rauchmelderBz:any)=>toRauchmelderBzConverter(rauchmelderBz))
        })
        if(obj.error)return obj
        return {
          ...obj,
          data:obj.data.map((rauchmelderBz:any)=>toRauchmelderBzConverter(rauchmelderBz))
        }
      })
}
async function getForObject(queryKey:any,cb?:(data:DBResponse<RauchmelderBeziehung>)=>void):Promise<{status:number,data:RauchmelderBeziehung[],error?:string}>{
    const url = dynamicurl + "/rauchmelder/objekt/" + queryKey
    return fetch(url,{
      credentials: "include",
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response=>{
      return response.json()})
      .then(obj=>{
        if(cb)cb({
          ...obj,
          data:obj.data.map((item:any)=>toRauchmelderConverter(item))
        })
        if(obj.error)return obj
        return {
          ...obj,
          data:obj.data.map((item:any)=>toRauchmelderConverter(item))
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
    body:JSON.stringify(rauchmelder)
  }).then(response=>{
    return response.json()})
    .then(obj=>{
      if(obj && obj.data){
        if(cb)cb(obj.data)
    }
    })
}

async function getHistory(rauchmelderhistorienid:number):Promise<DBResponse<RauchmelderHistorie>>{
  const url = dynamicurl + "/rauchmelder/history/" + rauchmelderhistorienid
    return fetch(url,{
      credentials: "include",
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response=>{
      return response.json()})
      .then(obj=>{
        if(obj.error)return obj
        return {
          ...obj,
          data:obj.data.map((item:any)=>toRauchmelderHistorienConverter(item))
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
    body:JSON.stringify(rauchmelder)
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

async function switchRauchmelder(neuerRauchmelder:Rauchmelder,alteRauchmelderBz:RauchmelderBeziehung){
  const url = dynamicurl + "/rauchmelder/switch/create"
  fetch(url,{
    credentials: "include",
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({newRauchmelder:neuerRauchmelder,altRauchmelderBz:alteRauchmelderBz})
  }).then(response=>{
    return response.json()})
    .then(obj=>{
      console.log(obj)
      if(obj.error)return obj
      return {
        ...obj,
        data:obj.data.map((item:any)=>toRauchmelderHistorienConverter(item))
      }
    })
}




const functions = {
    get,
    add,
    change,
    deleteR,
    getForObject,
    getHistory,
    switchRauchmelder
}

export default functions