import React, { useEffect } from 'react'
import styles from './customselect.module.css'

function CustomSelect(props:{onChange:(event:any)=>void,currentChoice:string}) {

    useEffect(()=>{

    },[])
  return (
    <div>
        <select
            value={props.currentChoice}
            onChange={props.onChange}
        >

        </select>
    </div>
  )
}

export default CustomSelect