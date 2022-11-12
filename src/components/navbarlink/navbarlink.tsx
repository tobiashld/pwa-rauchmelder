import React from 'react'
import styles from './navbarlink.module.css'

function NavBarLink(props:{name:string,onClick:()=>void,flexi?:boolean,icon?:any,active?:boolean}) {
  let berName = props.name
  if(props && props.name && props.name.split("").length > 15){
    berName = berName.split("").slice(0,15).join("")
  }
  return (
    <div onClick={props.onClick} className={styles.container+ (props&&props.flexi?" "+styles.flexi:"") + (props&&props.active?" "+styles.active:"")}>
      {props.icon?
      <div className={styles.icon}>
        {props.icon}
      </div>
      :
      <></>
      }
      {berName}
      </div>
  )
}

export default NavBarLink