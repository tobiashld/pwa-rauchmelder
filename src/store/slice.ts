import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/allgemein'
import { Error, ErrorType } from '../types/errortype'
import { ClientStatus } from '../types/statusenum'

interface InitialState{
    errorListe:Error[],
    authentication:{
        isSignedIn:boolean,
        user:User | undefined,
    },
    isOffline:ClientStatus,
    colorScheme:'light'|'dark',
}

const initialState : InitialState = {
  errorListe: [],
  authentication:{
    isSignedIn:false,
    user:undefined,
  },
  isOffline:ClientStatus.online,
  colorScheme:'light',
}
export const slice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    login(state,action:PayloadAction<{password:string,username:string}>){
        // const http = new XMLHttpRequest();
        // const url = dynamicurl + "/user"
        // http.open("POST",url);
        // http.setRequestHeader("Content-Type", "application/json;charset=UTF-16");
        // http.send(JSON.stringify({username:action.payload.username,password:action.payload.username}));
        
        // http.onreadystatechange=(e:Event)=>{
        //     if(http.readyState === 4 && http.status === 200){
        //     let obj = JSON.parse(http.responseText)

        //     if(obj && obj.data){
        //         if(cb)cb(obj.data)
        //     }        
        //     }
        // }
        return ({
            ...state,
            authentication:{
                isSignedIn:true,
                user:new User(1,"admin"),
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
                user:undefined,
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