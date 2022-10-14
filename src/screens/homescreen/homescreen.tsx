import React, { useState } from 'react'
import NavBar from '../../components/navbar/navbar'
import TopNavBar from '../../components/navbar/topnavbar'
import OverviewComponent from '../../components/screencomponents/overview/overview'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { ClientStatus } from '../../types/statusenum'
import styles from './homescreen.module.css'

function HomeScreen(props:{clientstatus:ClientStatus}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [navBarActive,setNavBarActive] = useState(true)
  const [activeComponent,setActiveComponent] = useState<JSX.Element>(OverviewComponent())
  const {width} = useWindowDimensions();
  const handleChangeComponent = (item:JSX.Element)=>{
    if(width < 600)setNavBarActive(false);
    setActiveComponent(item)
  }

  return (
    <div className={styles.anwendung}>
      {navBarActive?<NavBar isShown={navBarActive} changeComponent={(component=>handleChangeComponent(component()))}/>:<></>}
      <div className={styles.activeElement}>
        <TopNavBar onMenuChange={()=>setNavBarActive(!navBarActive)}/>
        {activeComponent}
      </div>
    </div>
  )
}

export default HomeScreen