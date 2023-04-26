import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { logout, setOfflineMode } from '../../store/slice'
import { RootState, useAppDispatch } from '../../store/store'
import NavBarLink from '../navbarlink/navbarlink'
import { BiLogOut } from 'react-icons/bi'
import styles from './navbar.module.css'
import { useSnackbar } from 'notistack'
import { Avatar, Box, IconButton, Menu, MenuItem, Switch, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom'
import { Home } from '@mui/icons-material'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import SensorsIcon from '@mui/icons-material/Sensors';
import WorkIcon from '@mui/icons-material/Work';
import GiteIcon from '@mui/icons-material/Gite';
import ApartmentIcon from '@mui/icons-material/Apartment';
import logo from './logo_transparent.png'
import Loadingspinner from '../loadingspinner/loadingspinner'
import { HiStatusOffline, HiStatusOnline } from 'react-icons/hi'
import dataFunctions from '../../services/datafunctions'
import { ClientStatus } from '../../types/statusenum'

const navbarElemente = [
    {
        name:"Home",
        route:"/",
        icon:<Home />
    },
    {
        name:"Prüfungen",
        route:"/pruefungen",
        icon:<DocumentScannerIcon />
    },
    {
        name:"Rauchmelder",
        route:"/rauchmelder",
        icon:<SensorsIcon />
    },
    {
        name:"Wohnungen",
        route:"/wohnungen",
        icon:<ApartmentIcon />
    },
    {
        name:"Objekte",
        route:"/objekte",
        icon:<GiteIcon />
    },
    {
        name:"Auftraggeber",
        route:"/auftraggeber",
        icon:<WorkIcon />
    },
  ]
function NavBar(props:{isShown:boolean,changeComponent:(route:string)=>void}) {
    const dispatch = useAppDispatch()
    const [isLoading,setIsLoading] = useState(false)
    const clientStatus = useSelector((state:RootState)=>state.isOffline)
    const {enqueueSnackbar} = useSnackbar()
    

    const handleSwitchChange = (event:any,checked:boolean)=>{
      if(checked){
        setIsLoading(true)
        
        dataFunctions[ClientStatus.online].prepareOffline(()=>{
          
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
    <div className={styles.widthcontroller+(props.isShown?` ${styles.fullwidth}`:"")}>
        <Box sx={{backgroundColor:'secondary'}}  className={styles.container+(props.isShown?` ${styles.navactive}`:"")}>
            <div className={styles.logo}>
              <img src={logo} alt="firmenlogo"></img>
            </div>
            <div className={styles.links}>
                {navbarElemente.map((item,index)=>{
                    return (
                        <NavBarLink key={index} name={item.name} icon={item.icon} onClick={()=>props.changeComponent(item.route)} />
                    )
                })}
            </div>
            <div className={styles.auth}>
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
        </Box>
    </div>
  )
}

function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
    };
  }

export default NavBar