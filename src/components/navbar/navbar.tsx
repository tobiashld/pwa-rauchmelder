import React from 'react'
import { useSelector } from 'react-redux'
import { logout } from '../../store/slice'
import { RootState, useAppDispatch } from '../../store/store'
import NavBarLink from '../navbarlink/navbarlink'
import { FaRegUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import styles from './navbar.module.css'

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
    const username = useSelector((state:RootState)=>state.authentication.user?state.authentication.user.username:undefined)
    const dispatch = useAppDispatch()

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
                <NavBarLink name={username?username:""} icon={<FaRegUser />} flexi={true} onClick={()=>props.changeComponent("/profile")} />
                <NavBarLink name="Logout" flexi={true} icon={<BiLogOut />} onClick={()=>dispatch(logout())} />
            </div>
        </div>
    </div>
  )
}

export default NavBar