import React from 'react'
import styles from './navbarlink.module.css'

function NavBarLink(props:{name:string,onClick:()=>void}) {
  return (
    <div onClick={props.onClick} className={styles.container}>{props.name}</div>
  )
}

export default NavBarLink