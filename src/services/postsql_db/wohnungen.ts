import { DBResponse,  } from "../../types/allgemein"
import { dynamicurl } from "../globals";
import { toWohnungConverter,Wohnung } from "../../types/wohnung";


async function get(params?:{[key:string]:any},cb?:(data:DBResponse<Wohnung>)=>void):Promise<DBResponse<Wohnung>>{
    const url = dynamicurl + "/wohnungen" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
    return fetch(url,{
      credentials: "include",
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(data=>data.json())
    .then((response:DBResponse<Wohnung>)=>{
      if(response.error)return response
      if(cb)cb({
        ...response,
        data:response.data!.map((item:any)=>toWohnungConverter(item))
      })
      return {
        ...response,
        data:response.data!.map((item:any)=>toWohnungConverter(item))
      }
      })
}

async function add(wohnung:Wohnung,cb?:(data:any)=>void){
  
  const url = dynamicurl + "/wohnungen"
  fetch(url,{
    credentials: "include",
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(wohnung)
  }).then(response=>{
    return response.json()})
    .then(obj=>{
      if(obj && obj.data){
        if(cb)cb(obj.data)
    }
    })
}
async function change(wohnung:Wohnung,cb?:(data:any)=>void){
  
  const url = dynamicurl + "/wohnungen/"+wohnung.id
  fetch(url,{
    credentials: "include",
    method:"PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(wohnung)
  }).then(response=>{
    return response.json()})
    .then(obj=>{
      if(obj && obj.data){
        if(cb)cb(obj.data)
    }
    })
}
async function deleteW(id:number,cb?:(data:any)=>void){
  const url = dynamicurl + "/wohnungen/"+id
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
    deleteW
}

export default functions