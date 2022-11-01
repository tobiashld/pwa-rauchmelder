import React from 'react'
import styles from './save.module.css'
import {BsSave} from 'react-icons/bs'

function SaveButton(props:{isShown:boolean,onClick?:()=>void}) {
  return (
    <div className={(props&&props.isShown)?styles.container:styles.container+ " "+styles.offRight} onClick={()=>{
        if(props && props.onClick)props.onClick()

    }} >
        <div className={styles.insideContainer} >
            <BsSave className={styles.saveicon}/>
        </div>
    </div>
  )
}

export default SaveButton