import React from 'react'
import styles from './button.module.css'

function Button(props:{onClick:(event:any)=>void,value:string,icon?:React.ReactNode}) {

  return (
    <div className={styles.button} onClick={props.onClick}>
        {
            props.icon?
            props.icon
            :
            <></>
        }
        {props.value}
    </div>
  )
}

export default Button