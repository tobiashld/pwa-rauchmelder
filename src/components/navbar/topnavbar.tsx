import React, {  useState } from 'react'
import { Breadcrumbs, Link, LinkProps, Switch, Typography, } from '@mui/material';
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import styles from './navbar.module.css'
import { ClientStatus } from '../../types/statusenum';
import {HiStatusOffline, HiStatusOnline} from 'react-icons/hi'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { setOfflineMode } from '../../store/slice';
import dataFunctions from '../../services/datafunctions';
import Loadingspinner from '../loadingspinner/loadingspinner';
import {
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';



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



function TopNavBar(props:{isShown:boolean,onMenuChange:()=>void}) {
  const clientStatus = useSelector((state:RootState)=>state.isOffline)
  const {width} = useWindowDimensions()
  const [isLoading,setIsLoading] = useState(false)
  const [menueOpen,setMenueOpen] = useState(true)
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
 

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
    <div className={styles.topnavbarcontainer}>
      {
        width < 800?
        <div className={styles.bmcontainer} onClick={props &&props.onMenuChange?props.onMenuChange:undefined}>
          <div className={styles.menuIcon}>
            <svg className={"ham hamRotate ham1 " +(props&&props.isShown?"active":"")} viewBox="0 0 100 100" width="60" height="60" onClick={()=>setMenueOpen(!menueOpen)}>
              <path
                    className={"line top"}
                    d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
              <path
                    className={"line middle"}
                    d="m 30,50 h 40" />
              <path
                    className={"line bottom"}
                    d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
            </svg>
          </div>
        </div>:<></>
      }
        
        <div className={styles.backbutton} onClick={()=>navigate(-1)}>
              <BsArrowLeft />
        </div>
        <div>
        <Breadcrumbs className={styles.breadcrumbs} aria-label="breadcrumb">
              <LinkRouter underline="hover" color="inherit" to="/">
                Home
              </LinkRouter>
              {pathnames.map((value, index) => {
                const last: any = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last ? (
                  <Typography className={styles.lastBreadcrumb} color="text.primary" key={to}>
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