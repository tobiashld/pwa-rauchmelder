import React, { useEffect, useState } from 'react'
import { Switch } from '@mui/material';
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import styles from './navbar.module.css'
import { ClientStatus } from '../../types/statusenum';
import {HiStatusOffline, HiStatusOnline} from 'react-icons/hi'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { setOfflineMode } from '../../store/slice';
import data from '../../services/datafunctions';
import Loadingspinner from '../loadingspinner/loadingspinner';


function TopNavBar(props:{onMenuChange:()=>void}) {
  const clientStatus = useSelector((state:RootState)=>state.isOffline)
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
 

  const handleSwitchChange = (event:any,checked:boolean)=>{
    if(checked){
      setIsLoading(true)
      
      data[ClientStatus.online].prepareOffline(()=>{
        
        dispatch(setOfflineMode({isOffline:ClientStatus.offline}))
        setTimeout(()=>{
          setIsLoading(false)
        },500)
    })
    }else{
      dispatch(setOfflineMode({isOffline:ClientStatus.online}))
    }

  }

  return (
    <div className={styles.topnavbarcontainer}>
        <div className={styles.bmcontainer} onClick={props &&props.onMenuChange?props.onMenuChange:undefined}>
            <div className={styles.burgermenu}>

            </div>
            
        </div>
        <div className={styles.backbutton} onClick={()=>navigate(-1)}>
              <BsArrowLeft />
        </div>
        {
          isLoading?
          <div className={styles.offlineSlider}>
            <Loadingspinner size='Small' />
          </div>
          :
          <div className={styles.offlineSlider}>
            <HiStatusOnline />
            <Switch onChange={handleSwitchChange} 
              defaultChecked={clientStatus?false:true}
            />
            <HiStatusOffline />
          </div>
        }
        
    </div>
  )
}

export default TopNavBar