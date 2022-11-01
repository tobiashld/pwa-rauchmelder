import React, { ReactHTMLElement, useState } from 'react'
import TextInput from '../components/textinput/textinput';
import { addError, clearError } from '../store/slice';
import {ErrorType} from '../types/errortype' 
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import CustomSelect from '../components/customselect/customselect';
export type KeyType = 'id'|'objekt'|'produktionsdatum'|'timestamp'|'raum'|'seriennr'|'mieter'|'user'|'etage'|'adresse'

export const getFittingInputsForKey = (key:KeyType,placeholder:any,onChange:(event:React.ChangeEvent<any>,zusatz?:string)=>void)=>{
    switch(key){
        case "id":return (<>{placeholder.toString()}</>)
        case "user":return (<>{placeholder.toString()}</>)
        case "etage":return (<div>
            <select
                onChange={onChange}
                className={"selectElement"}
            >
                <option>Souterrain</option>
                <option>EG</option>
                <option>1.OG</option>
                <option>2.OG</option>
                <option>3.OG</option>
                <option>4.OG</option>
                <option>5.OG</option>
                <option>6.OG</option>
                <option>7.OG</option>
                <option>DG</option>
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