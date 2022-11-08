import React from 'react'
import TextInput from '../components/textinput/textinput';
import { addError, clearError } from '../store/slice';
import {ErrorType} from '../types/errortype' 
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { Objekt } from '../types/allgemein';
import { BsTextareaResize } from 'react-icons/bs';
export type KeyType = 'id'|'objekt'|'produktionsdatum'|'timestamp'|'raum'|'seriennr'|'mieter'|'user'|'etage'|'adresse'
export const etagen = [
    'Souterrain',
    'EG',
    '1. OG',
    '2. OG',
    '3. OG',
    '4. OG',
    '5. OG',
    '6. OG',
    '7. OG',
    'DG',
]

export const getFittingInputsForKey = (key:KeyType,placeholder:any,onChange:(event:React.ChangeEvent<any>,zusatz?:string)=>void,options?:any[])=>{
    
    switch(key){
        case "id":return (<>{placeholder.toString()}</>)
        case "user":return (<>{placeholder.toString()}</>)
        case "objekt":return(
            <div>
                <select
                    onChange={onChange}
                    className={"selectElement"}
                >
                    {options!.map((objekt:Objekt)=>{
                        return <option selected={(objekt.name === placeholder || (placeholder.id && placeholder.id === objekt.id))?true:false} value={objekt.id}>{objekt.name}</option>
                    })}
                </select>
            </div>
            )
        case "etage":return (<div>
            <select
                onChange={onChange}
                className={"selectElement"}
            >
                {etagen.map(etage=>{
                    return <option selected={placeholder.toString()===etage?true:false} value={etage}>{etage}</option>
                })}
            </select>
        </div>)
        case "adresse":return(
            <div className='adressDiv'>
                <div className='adressDivDiv'>
                    <TextInput onChange={(event)=>onChange(event,"straße")} size={"Small"}  placeholder={placeholder.straße} className={"adressDiv-straße"}/>
                    <TextInput onChange={(event)=>onChange(event,"hausnummer")} size={"Small"}  placeholder={placeholder.hausnummer} className={"adressDiv-hausnummer"}/>
                </div>
                <div className='adressDivDiv'>
                    <TextInput onChange={(event)=>onChange(event,"plz")} size={"Small"} placeholder={placeholder.plz} className={"adressDiv-plz"}/>
                    <TextInput onChange={(event)=>onChange(event,"ort")} size={"Small"}  placeholder={placeholder.ort} className={"adressDiv-ort"}/>
                </div>
            </div>)
        default:return (<TextInput placeholder={placeholder.toString()} onChange={onChange} size='Small'/>)
    }
}

export const useAddError = (props:{
    title:string,
    message:string,
    type:ErrorType
})=>{
    const id = useSelector((state:RootState)=>state.errorListe)
    const dispatch = useAppDispatch()
    dispatch(addError({
      id:id.length,
      title:"test",
      message:"test",
      type:"log"  
    }))
    setTimeout(()=>{
        dispatch(clearError({id:id.length}))
    },3000)
    return id
}