import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
}

const initialState : InitialState = {
  errorListe: [],
  authentication:{
    isSignedIn:false,
    username:undefined,
  },
  isOffline:ClientStatus.online,
  colorScheme:'light',
}
export const slice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    login(state,action:PayloadAction<{isSuccessfull:boolean,username?:string | undefined}>){
        if(action.payload.isSuccessfull && action.payload.username){
            return ({
                ...state,
                authentication:{
                    isSignedIn:true,
                    username:action.payload.username,
                }
            })
        }else{
            return  ({
                ...state,
                authentication:{
                    isSignedIn:false,
                    username:undefined,
                }
            })
        }
        
                
        
        
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
    }>) {
        let helpArray : any = [...state.errorListe]
        let id = state.errorListe.length+1
        helpArray.push({
            id:id,
            type:action.payload.type,
            title:action.payload.title,
            message:action.payload.message,
        })
        
        
        return ({
            ...state,
            errorListe:helpArray,
            
        })
    },
    clearError(state,action:PayloadAction) {
        let helpArray = [...state.errorListe]
        if(helpArray.length <=1){
            return ({
                ...state,
                errorListe:[]
            })
        }else{
            return ({
                ...state,
                errorListe:helpArray.slice(1,undefined)
            })
        }
        
    },
  },
})


export const { addError,clearError,changeColorScheme,login,logout,setOfflineMode } = slice.actions

export default slice.reducer