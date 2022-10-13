import React, { useState } from 'react'
import NavBar from '../../components/navbar/navbar'
import TopNavBar from '../../components/navbar/topnavbar'
import SignUpScreen from '../signup/signupscreen'
import styles from './homescreen.module.css'

function HomeScreen() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [navBarActive,setNavBarActive] = useState(true)
  const [activeComponent,setActiveComponent] = useState<JSX.Element>(SignUpScreen())
  return (
    <div className={styles.anwendung}>
      {navBarActive?<NavBar isShown={navBarActive} changeComponent={(component=>setActiveComponent(component()))}/>:<></>}
      <div className={styles.activeElement}>
        <TopNavBar onMenuChange={()=>setNavBarActive(!navBarActive)}/>
        {activeComponent}
      </div>
    </div>
  )
}

export default HomeScreen