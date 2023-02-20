import { DBResponse } from "../types/allgemein"
import { GeoDaten, toGeoDatenConverter } from "../types/geodaten"

const geofunctions = {
    geoservice
}

async function geoservice(suchstring:string):Promise<GeoDaten[]>{
    const url = `https://nominatim.openstreetmap.org/search/${suchstring.split(" ").join("%20")}?format=json&addressdetails=1&limit=5`
    return fetch(url,{
      credentials: "include",
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response=>{
      return response.json()})
      .then((obj:GeoDaten[])=>{
        return obj.map((item:any)=>toGeoDatenConverter(item))
      })
  }

  export default geofunctions