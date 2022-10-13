import React from 'react'
import styles from './navbar.module.css'

function TopNavBar(props:{onMenuChange:()=>void}) {
  return (
    <div className={styles.topnavbarcontainer}>
        <div className={styles.bmcontainer} onClick={props &&props.onMenuChange?props.onMenuChange:undefined}>
            <div className={styles.burgermenu}>

            </div>
        </div>
    </div>
  )
}

export default TopNavBar