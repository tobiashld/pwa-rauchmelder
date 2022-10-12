import React, { useState } from 'react'
import NavBar from '../../components/navbar/navbar'
import SignUpScreen from '../signup/signupscreen'
import styles from './homescreen.module.css'

function HomeScreen() {
  const [navBarActive,setNavBarActive] = useState(true)
  const [activeComponent,setActiveComponent] = useState<JSX.Element>(SignUpScreen())
  return (
    <div className={styles.anwendung}>
      {navBarActive?<NavBar changeComponent={(component=>setActiveComponent(component()))}/>:<></>}
      <div className={styles.activeElement}>
        {activeComponent}
      </div>
    </div>
  )
}

export default HomeScreen