
import { Pruefung } from "../../types/allgemein"
import { dynamicurl } from "../globals";



async function get(params?:{[key:string]:any},cb?:(data:any)=>void){
    const url = dynamicurl + "/pruefungen" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
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
async function add(pruefung:Pruefung,cb?:(data:any)=>void){
  const url = dynamicurl + "/pruefungen"
  console.log(pruefung)
  fetch(url,{
    credentials: "include",
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(pruefung.prepForSave())
  }).then(response=>{
    return response.json()})
    .then(obj=>{
      if(obj && obj.data){
        if(cb)cb(obj.data)
    }
    })
}
async function change(pruefung:Pruefung,cb?:(data:any)=>void){
  const url = dynamicurl + "/pruefungen/"+pruefung.id
  fetch(url,{
    credentials: "include",
    method:"PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(pruefung.prepForSave())
  }).then(response=>{
    return response.json()})
    .then(obj=>{
      if(obj && obj.data){
        if(cb)cb(obj.data)
    }
    })
}
async function deleteP(id:number,cb?:(data:any)=>void){
  const url = dynamicurl + "/pruefungen/"+id
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

async function statistics(cb?:(data:any)=>void){
  const url = dynamicurl + "/statistics/pruefungen"
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





const functions = {
    get,
    add,
    change,
    deleteP,
    statistics
}

export default functions