import React, {  useState } from 'react'
import { Breadcrumbs, Link, LinkProps, ListItem, ListItemProps, ListItemText, Switch, Typography } from '@mui/material';
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
import {
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';



const breadcrumbNameMap: { [key: string]: string } = {
  '/pruefungen': 'Prüfungen',
  '/rauchmelder': 'Rauchmelder',
  '/wohnungen': 'Wohnungen',
  '/objekte': 'Objekte',
  '/auftraggeber': 'Auftraggeber',
  '/auftraggeber/add':'Hinzufügen',
  '/pruefungen/':'Prüfungen',
  '/pruefungen/add':'Hinzufügen',
  '/profile':'Einstellungen'
};



function TopNavBar(props:{onMenuChange:()=>void}) {
  const clientStatus = useSelector((state:RootState)=>state.isOffline)
  const [isLoading,setIsLoading] = useState(false)
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
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
        <div>
        <Breadcrumbs aria-label="breadcrumb">
              <LinkRouter underline="hover" color="inherit" to="/">
                Home
              </LinkRouter>
              {pathnames.map((value, index) => {
                const last: any = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last ? (
                  <Typography color="text.primary" key={to}>
                    {breadcrumbNameMap[to]}
                  </Typography>
                ) : (
                  <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                    {breadcrumbNameMap[to]}
                  </LinkRouter>
                );
              })}
            </Breadcrumbs>
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

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}

export default TopNavBar