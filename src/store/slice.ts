import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AuftraggeberComponent from '../components/screencomponents/auftraggeber/auftraggeber'
import ObjekteComponent from '../components/screencomponents/objekte/objekte'
import OverviewComponent from '../components/screencomponents/overview/overview'
import PruefungenComponent from '../components/screencomponents/pruefungen/pruefungen'
import RauchmelderComponent from '../components/screencomponents/rauchmelder/rauchmelder'
import WohnungenComponent from '../components/screencomponents/wohnungen/wohnungen'
import data from '../services/datafunctions'
import { Error, ErrorType } from '../types/errortype'
import { ClientStatus } from '../types/statusenum'

interface InitialState{
    errorListe:Error[],
    authentication:{
        isSignedIn:boolean,
        username:string | undefined,
    },
    isOffline:ClientStatus,
    colorScheme:'light'|'dark',
    navbarElemente:{name:string,component:()=>JSX.Element}[]
}

const initialState : InitialState = {
  errorListe: [],
  authentication:{
    isSignedIn:false,
    username:undefined,
  },
  isOffline:ClientStatus.online,
  colorScheme:'light',
  navbarElemente:[
    {
        name:"Home",
        component:OverviewComponent
    },
    {
        name:"Prüfungen",
        component:PruefungenComponent
    },
    {
        name:"Rauchmelder",
        component:RauchmelderComponent
    },
    {
        name:"Wohnungen",
        component:WohnungenComponent
    },
    {
        name:"Objekte",
        component:ObjekteComponent
    },
    {
        name:"Auftraggeber",
        component:AuftraggeberComponent
    },
  ]
}
export const slice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    login(state,action:PayloadAction<{username:string,password:string}>){

        data[ClientStatus.online].user.getWithParam("full_name",action.payload.username).then(matches=>{
            
        })

        return ({
            ...state,
            authentication:{
                isSignedIn:true,
                username:action.payload.username,
            }
        })
    },
    setOfflineMode(state,action:PayloadAction<{isOffline:ClientStatus}>){
        return ({
            ...state,
            isOffline:action.payload.isOffline
        })
    },
    logout(state){
        return ({
            ...state,
            authentication:{
                isSignedIn:false,
                username:undefined,
            }
        })
    },
    changeColorScheme(state,action:PayloadAction<{
        colorScheme:'light'|'dark'
    }>){
        return ({
            ...state,
            colorScheme:action.payload.colorScheme
            
        })
    },
    addError(state, action:PayloadAction<{
        type:ErrorType,
        title:string,
        message:string,
        handleClose:(id:number)=>void
    }>) {
        let helpArray : any = [...state.errorListe]
        let id = state.errorListe.length+1
        helpArray.push({
            id:id,
            type:action.payload.type,
            title:action.payload.title,
            message:action.payload.message,
            handleClose:()=>action.payload.handleClose(id)
        })
        
        setTimeout(action.payload.handleClose,5000)
        return ({
            ...state,
            errorListe:helpArray,
            
        })
    },
    clearError(state,action:PayloadAction<{id:number}>) {
        let helpArray = [...state.errorListe]
        helpArray.splice(action.payload.id,1)
        return ({
            ...state,
            errorListe:helpArray
        })
    },
  },
})


export const { addError,clearError,changeColorScheme,login,logout,setOfflineMode } = slice.actions

export default slice.reducer