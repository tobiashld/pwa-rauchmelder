import React from 'react'
import { useSelector } from 'react-redux'
import { logout } from '../../store/slice'
import { RootState, useAppDispatch } from '../../store/store'
import NavBarLink from '../navbarlink/navbarlink'
import { BiLogOut } from 'react-icons/bi'
import styles from './navbar.module.css'
import { useSnackbar } from 'notistack'
import { Avatar } from '@mui/material'

const navbarElemente = [
    {
        name:"Home",
        route:"/"
    },
    {
        name:"Prüfungen",
        route:"/pruefungen"
    },
    {
        name:"Rauchmelder",
        route:"/rauchmelder"
    },
    {
        name:"Wohnungen",
        route:"/wohnungen"
    },
    {
        name:"Objekte",
        route:"/objekte"
    },
    {
        name:"Auftraggeber",
        route:"/auftraggeber"
    },
  ]
function NavBar(props:{isShown:boolean,changeComponent:(route:string)=>void}) {
    const username = useSelector((state:RootState)=>state.username)
    const dispatch = useAppDispatch()
    const {enqueueSnackbar} = useSnackbar()

  return (
    <div className={styles.widthcontroller+(props.isShown?` ${styles.fullwidth}`:"")}>
        <div className={styles.container+(props.isShown?` ${styles.navactive}`:"")}>
            
            <div className={styles.links}>
                {navbarElemente.map((item,index)=>{
                    return (
                        <NavBarLink key={index} name={item.name} onClick={()=>props.changeComponent(item.route)} />
                    )
                })}
            </div>
            <div className={styles.auth}>
                <NavBarLink name={username?username:""} icon={<Avatar {...stringAvatar(username && username.length > 2 && username !== "0"?username:"Test mann")}>{username && username.length > 2?username.slice(0,2):undefined}</Avatar>} flexi={true} onClick={()=>props.changeComponent("/profile")} />
                <NavBarLink name="Logout" flexi={true} icon={<BiLogOut />} onClick={()=>{
                        enqueueSnackbar("Erfolgreich ausgeloggt!",{variant:"success"})
                        dispatch(logout())
                    }} />
            </div>
        </div>
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