import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import NavBar from '../components/navbar/navbar'
import TextInput from '../components/textinput/textinput'
import SignInScreen from '../screens/signin/signinscreen'
import SignUpScreen from '../screens/signup/signupscreen'
import { Error, ErrorType } from '../types/errortype'

interface InitialState{
    errorListe:Error[],
    authentication:{
        isSignedIn:boolean,
        signedInAt:Date | null,
    },
    isOffline:boolean,
    colorScheme:'light'|'dark',
    navbarElemente:{name:string,component:()=>JSX.Element}[]
}

const initialState : InitialState = {
  errorListe: [],
  authentication:{
    isSignedIn:false,
    signedInAt:null
  },
  isOffline:false,
  colorScheme:'light',
  navbarElemente:[
    {
        name:"Prüfungen",
        component:SignUpScreen
    },
    {
        name:"Rauchmelder",
        component:SignUpScreen
    },
    {
        name:"Wohnungen",
        component:SignUpScreen
    },
    {
        name:"Objekte",
        component:SignUpScreen
    },
    {
        name:"Auftraggeber",
        component:SignUpScreen
    },
  ]
}
export const slice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    login(state,action:PayloadAction<{username:string,password:string}>){
        return ({
            ...state,
            authentication:{
                isSignedIn:true,
                signedInAt:new Date()
            }
        })
    },
    setOfflineMode(state,action:PayloadAction<{isOffline:boolean}>){
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
                signedInAt:null
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
    clearError(state,action) {
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