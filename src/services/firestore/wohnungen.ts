import { Wohnung,  } from "../../types/allgemein"

const dynamicurl="http://localhost:3000"

async function get(params?:{[key:string]:any},cb?:(data:any)=>void){
    const http = new XMLHttpRequest();
    const url = dynamicurl + "/wohnungen" + (params?"?".concat(Object.keys(params!).map(key=>`${key}=${params![key]}`).join("&")):"")
    http.open("GET",url);
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

async function add(wohnung:Wohnung,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/wohnungen"
  http.open("POST",url);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
  http.send(JSON.stringify(wohnung.prepForSave()));
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }        
    }
  }
}
async function change(wohnung:Wohnung,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/wohnungen/"+wohnung.id
  http.open("PUT",url);
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
  http.send(JSON.stringify(wohnung.prepForSave()));
  
  http.onreadystatechange=(e:Event)=>{
    if(http.readyState === 4 && http.status === 200){
      let obj = JSON.parse(http.responseText)

      if(obj && obj.data){
          if(cb)cb(obj.data)
      }        
    }
  }
}
async function deleteW(id:number,cb?:(data:any)=>void){
  const http = new XMLHttpRequest();
  const url = dynamicurl + "/wohnungen/"+id
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


const functions = {
    get,
    add,
    change,
    deleteW
}

export default functions