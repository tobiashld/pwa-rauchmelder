import React, { ReactHTMLElement, useState } from 'react'
import TextInput from '../components/textinput/textinput';
import { addError, clearError } from '../store/slice';
import {ErrorType} from '../types/errortype' 
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import CustomSelect from '../components/customselect/customselect';
export type KeyType = 'id'|'objekt'|'produktionsdatum'|'timestamp'|'raum'|'seriennr'|'mieter'|'user'|'etage'

export const getFittingInputsForKey = (key:KeyType,placeholder:string,onChange:(event:React.ChangeEvent<any>)=>void)=>{
    switch(key){
        case "id":return (<>{placeholder}</>)
        case "user":return (<>{placeholder}</>)
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
        default:return (<TextInput placeholder={placeholder} onChange={onChange} value="" size='Small'/>)
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