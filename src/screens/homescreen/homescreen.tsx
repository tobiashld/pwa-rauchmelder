import React, { useState } from 'react'
import NavBar from '../../components/navbar/navbar'
import TopNavBar from '../../components/navbar/topnavbar'
import OverviewComponent from '../../components/screencomponents/overview/overview'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { ClientStatus } from '../../types/statusenum'
import styles from './homescreen.module.css';
import {
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
import { useAppDispatch } from '../../store/store'
import { setOfflineMode } from '../../store/slice'

function HomeScreen(props:{clientstatus:ClientStatus}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [navBarActive,setNavBarActive] = useState(true)
  const {width} = useWindowDimensions();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleChangeComponent = (route:string)=>{
    if(width < 600)setNavBarActive(false);
    navigate(route)
  }
  const toOffline = (status:ClientStatus)=>{
    dispatch(setOfflineMode({isOffline:status}))
    if(status === ClientStatus.offline){
      
    }
  }

  return (
    
      <div className={styles.anwendung}>
        <NavBar isShown={navBarActive} changeComponent={(route=>handleChangeComponent(route))}/>
        <div className={styles.activeElement}>
          <TopNavBar onMenuChange={()=>setNavBarActive(!navBarActive)} onClientStatusChange={(status:ClientStatus)=>toOffline(status)}/>
          <Routes>
            <Route path="/" element={<OverviewComponent />}/>
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/objekte" element={<ObjekteComponent />} />
            <Route path="/rauchmelder" element={<RauchmelderComponent />} />
            <Route path="/wohnungen" element={<WohnungenComponent />} />
            <Route path="/auftraggeber" element={<AuftraggeberComponent />} />
            <Route path="/pruefungen" element={<PruefungenComponent />} />
          </Routes>
        </div>
      </div>
  )
}

export default HomeScreen