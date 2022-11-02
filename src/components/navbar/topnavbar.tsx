import React, { useEffect } from 'react'
import { Switch } from '@mui/material';
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import styles from './navbar.module.css'
import { ClientStatus } from '../../types/statusenum';
import {HiStatusOffline, HiStatusOnline} from 'react-icons/hi'


function TopNavBar(props:{onMenuChange:()=>void,onClientStatusChange:(status:ClientStatus)=>void,offlineSwitchState:boolean}) {
  const navigate = useNavigate()
  useEffect(()=>{
  })
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
          <HiStatusOnline />
          <Switch onChange={(event:any,checked:boolean)=>{
            props.onClientStatusChange(checked?ClientStatus.offline:ClientStatus.online);
            }} 
            value={props.offlineSwitchState}
            defaultChecked={props.offlineSwitchState}
          />
          <HiStatusOffline />
        </div>
    </div>
  )
}

export default TopNavBar