import React from 'react'
import { Switch } from '@mui/material';
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import styles from './navbar.module.css'
import { ClientStatus } from '../../types/statusenum';
import {HiStatusOffline, HiStatusOnline} from 'react-icons/hi'


function TopNavBar(props:{onMenuChange:()=>void,onClientStatusChange:(status:ClientStatus)=>void}) {

  const navigate = useNavigate()
  return (
    <div className={styles.topnavbarcontainer}>
        <div className={styles.bmcontainer} onClick={props &&props.onMenuChange?props.onMenuChange:undefined}>
            <div className={styles.burgermenu}>

            </div>
            
        </div>
        <div className={styles.backbutton} onClick={()=>navigate(-1)}>
              <BsArrowLeft />
        </div>
        <div className={styles.offlineSlider}>
          <HiStatusOffline />
          <Switch onChange={(event:any,checked:boolean)=>props.onClientStatusChange(checked?ClientStatus.online:ClientStatus.offline)}/>
          <HiStatusOnline />
        </div>
    </div>
  )
}

export default TopNavBar