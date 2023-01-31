import React from 'react'
import styles from './loadingspinner.module.css'

function Loadingspinner(props:{size:'Big'|'Medium'|'Small'}) {
  return (
    <div className={styles.spinnerwrapper}>
        <div className={(props && props.size)?styles.spinner +' '+styles[props.size+"spinner"]:styles.spinner + " "+ styles.Mediumspinner}></div>
    </div>
  )
}

export default Loadingspinner