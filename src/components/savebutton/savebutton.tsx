import React from 'react'
import styles from './save.module.css'
import {BsSave} from 'react-icons/bs'

function SaveButton(props:{isShown:boolean,onClick?:()=>void,value?:string}) {
  return (
    <div className={(props&&props.isShown)?styles.container:styles.container+ " "+styles.offRight} onClick={()=>{
        if(props && props.onClick)props.onClick()

    }} >
        <div className={styles.insideContainer + (props && props.value?" "+styles.text:"")} >
            <BsSave className={styles.saveicon}/>
            {
              props && props.value?
              props.value:<></>
            }
        </div>
    </div>
  )
}

export default SaveButton