import React from 'react'
import { useParams } from 'react-router-dom';
import styles from './add.module.css'
import AddAuftraggeber from './auftraggeber/addAuftraggeber';

type addOptions = 'auftraggeber' | 'objekt' | 'rauchmelder' | 'wohnung';

function Add() {
    let {element} = useParams<{element:addOptions}>();

    const getElementForString = (string:addOptions|undefined)=>{
        if(string){
            switch(string){
                case "auftraggeber":return (<AddAuftraggeber />);
                case "objekt":return (<></>);
                case "rauchmelder":return (<></>);
                case "wohnung":return(<></>);
                default:return (<></>);
            }
        }else{
            return (<></>)
        }
    }

    return getElementForString(element)
}

export default Add