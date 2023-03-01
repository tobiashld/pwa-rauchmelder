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

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
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
import AddAuftraggeber from '../../components/screencomponents/add/auftraggeber/addAuftraggeber'
import { LocalizationProvider } from '@mui/x-date-pickers'
import AddRauchmelder from '../../components/screencomponents/add/rauchmelder/addRauchmelder'
import Logout from '../logout/logout'

function HomeScreen(props:{clientstatus:ClientStatus}) {
  const {width} = useWindowDimensions()
  const [navBarActive,setNavBarActive] = useState(width < 800?false:true)
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

  const navigate = useNavigate()
  const handleChangeComponent = (route:string)=>{
    if(width < 800)setNavBarActive(false);
    navigate(route)
  }
  

  return (
    <>
      {
        <div className={styles.anwendung}>
        <NavBar isShown={navBarActive} changeComponent={(route=>handleChangeComponent(route))}/>
        <TopNavBar isShown={navBarActive} onMenuChange={()=>setNavBarActive(!navBarActive)} />
        <div className={styles.activeElement}>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="de">
          <Routes>
            <Route path="/" element={<OverviewComponent />}/>
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/objekte" element={<ObjekteComponent />} />
            <Route path="/rauchmelder" element={<RauchmelderComponent />} />
            <Route path="/rauchmelder/:id" element={<AddRauchmelder />} />
            <Route path="/wohnungen" element={<WohnungenComponent />} />
            <Route path="/auftraggeber" element={<AuftraggeberComponent />} />
            <Route path="/auftraggeber/add" element={<AddAuftraggeber />} />
            <Route path="/pruefungen" element={<PruefungenComponent />} />
            <Route path="/pruefungen/:id" element={<AddPruefung />} />
            <Route path="/pruefung" element={<AddPruefung />} />
            <Route path="/add/:element" element={<Add />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/pwa-rauchmelder" element={<Navigate replace to="/" />} />
            <Route path="*" element={<OverviewComponent />} />
          </Routes>
          </LocalizationProvider>
        </div>
      </div>
      }
    </>
  )
}

export default HomeScreen