import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cookies } from '../services/cookieService'
import { User } from '../types/allgemein'
import { Error, ErrorType } from '../types/errortype'
import { ClientStatus } from '../types/statusenum'

interface InitialState{
    errorListe:Error[],
    isAuthenticated:boolean,
    username:string | undefined,
    isOffline:ClientStatus,
    colorScheme:'light'|'dark',
}

const initialState : InitialState = {
  errorListe: [],
  isAuthenticated:false,
  username:undefined,
  isOffline:ClientStatus.online,
  colorScheme:'light',
}
export const slice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    login(state,action:PayloadAction<{successfull:boolean,username:string}>){
        return ({
            ...state,
            isAuthenticated:action.payload.successfull,
            username:action.payload.username
        })
    },
    setOfflineMode(state,action:PayloadAction<{isOffline:ClientStatus}>){
        return ({
            ...state,
            isOffline:action.payload.isOffline
        })
    },
    logout(state){
        cookies.remove("token")
        return ({
            ...state,
            username:undefined,
            isAuthenticated:false
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
        id:number,
        type:ErrorType,
        title:string,
        message:string,
    }>) {
        let helpArray : any = [...state.errorListe]
        helpArray.push({
            id:action.payload.id,
            type:action.payload.type,
            title:action.payload.title,
            message:action.payload.message,
        })
        
        
        return ({
            ...state,
            errorListe:helpArray,
        })
    },
    clearError(state,action:PayloadAction<{id:number}>) {
        let helpArray = [...state.errorListe]
        if(helpArray.length <=1){
            return ({
                ...state,
                errorListe:[]
            })
        }else{
            helpArray = helpArray.filter(item=>item.id!==action.payload.id)
            return ({
                ...state,
                errorListe:helpArray
            })
        }
        
    },
  },
})


export const { addError,clearError,changeColorScheme,login,logout,setOfflineMode } = slice.actions

export default slice.reducer