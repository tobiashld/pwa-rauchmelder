import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import dataFunctions from "../services/datafunctions";
import { DBResponse, Objekt } from "../types/allgemein";
import { ClientStatus } from "../types/statusenum";

export function useObjekteGet(params?:{[key:string]:any}){
    const {enqueueSnackbar} = useSnackbar()
    let query = useQuery<DBResponse<Objekt>>('objekte',()=>dataFunctions[ClientStatus.online].objekte.get(params))
    if(query.isError || query.data?.error){
        enqueueSnackbar(query.data?.error?query.data?.error:"Fehler in useObjektGet",{variant:"error"})
    }
    return query
}
export function useObjektePost(params:{[key:string]:any}){
    const {enqueueSnackbar} = useSnackbar()
    let query = useQuery<DBResponse<Objekt>>('objekte',()=>dataFunctions[ClientStatus.online].objekte.get(params))
    if(query.isError || query.data?.error){
        enqueueSnackbar(query.data?.error?query.data?.error:"Fehler in useObjektGet",{variant:"error"})
    }
    return query
}
export function useObjektePut(params:{[key:string]:any}){
    const {enqueueSnackbar} = useSnackbar()
    let query = useQuery<DBResponse<Objekt>>('objekte',()=>dataFunctions[ClientStatus.online].objekte.get(params))
    if(query.isError || query.data?.error){
        enqueueSnackbar(query.data?.error?query.data?.error:"Fehler in useObjektGet",{variant:"error"})
    }
    return query
}
export function useObjekteDelete(params:{[key:string]:any}){
    const {enqueueSnackbar} = useSnackbar()
    let query = useQuery<DBResponse<Objekt>>('objekte',()=>dataFunctions[ClientStatus.online].objekte.get(params))
    if(query.isError || query.data?.error){
        enqueueSnackbar(query.data?.error?query.data?.error:"Fehler in useObjektGet",{variant:"error"})
    }
    return query
}