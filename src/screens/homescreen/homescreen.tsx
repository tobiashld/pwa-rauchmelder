import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/navbar'
import TopNavBar from '../../components/navbar/topnavbar'
import OverviewComponent from '../../components/screencomponents/overview/overview'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { ClientStatus } from '../../types/statusenum'
import styles from './homescreen.module.css';
import {
  Navigate,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import ProfileComponent from '../../components/screencomponents/profile/profile'
import ObjekteComponent from '../../components/screencomponents/objekte/objekte'
import RauchmelderComponent from '../../components/screencomponents/rauchmelder/rauchmelder'
import WohnungenComponent from '../../components/screencomponents/wohnungen/wohnungen'
import AuftraggeberComponent from '../../components/screencomponents/auftraggeber/auftraggeber'
import PruefungenComponent from '../../components/screencomponents/pruefungen/pruefungen'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import Add from '../../components/screencomponents/add/add'
import AddPruefung from '../../components/screencomponents/add/pruefung/addpruefung'

function HomeScreen(props:{clientstatus:ClientStatus}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [navBarActive,setNavBarActive] = useState(true)
  const prevStatus = useSelector((state:RootState)=>state.isOffline)
  const [isOfflineOhneSaven,setIsOfflineOhneSaven] = useState(false) 

  useEffect(()=>{
    if(props.clientstatus === ClientStatus.offline && prevStatus === ClientStatus.online){
      setIsOfflineOhneSaven(true)
    }else{
      setIsOfflineOhneSaven(isOfflineOhneSaven)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[prevStatus, props, props.clientstatus])

  const {width} = useWindowDimensions();
  const navigate = useNavigate()
  const handleChangeComponent = (route:string)=>{
    if(width < 600)setNavBarActive(false);
    navigate(route)
  }
  

  return (
    <>
      {
        <div className={styles.anwendung}>
        <NavBar isShown={navBarActive} changeComponent={(route=>handleChangeComponent(route))}/>
        <div className={styles.activeElement}>
          <TopNavBar onMenuChange={()=>setNavBarActive(!navBarActive)} />
          <Routes>
            <Route path="/" element={<OverviewComponent />}/>
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/objekte" element={<ObjekteComponent />} />
            <Route path="/rauchmelder" element={<RauchmelderComponent />} />
            <Route path="/wohnungen" element={<WohnungenComponent />} />
            <Route path="/auftraggeber" element={<AuftraggeberComponent />} />
            <Route path="/pruefungen" element={<PruefungenComponent />} />
            <Route path="/pruefung/:id" element={<AddPruefung />} />
            <Route path="/pruefung" element={<AddPruefung />} />
            <Route path="/add/:element" element={<Add />} />
            <Route path="/pwa-rauchmelder" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </div>
      }
    </>
  )
}

export default HomeScreen