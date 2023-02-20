import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import geofunctions from "../services/nominatim";
import { GeoDaten } from "../types/geodaten";

export function useGeo(suchstring:string){
    const {enqueueSnackbar} = useSnackbar()
    let query = useQuery<GeoDaten[]>(['geo'+suchstring],()=>geofunctions.geoservice(suchstring))
    if(query.isError){
        enqueueSnackbar("Fehler in useObjektGet",{variant:"error"})
    }
    return query
}