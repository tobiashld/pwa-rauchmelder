import React from 'react'
import { useSelector } from 'react-redux'
import { logout } from '../../store/slice'
import { RootState, useAppDispatch } from '../../store/store'
import NavBarLink from '../navbarlink/navbarlink'
import { FaRegUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import styles from './navbar.module.css'
import ProfileComponent from '../screencomponents/profile/profile'


function NavBar(props:{isShown:boolean,changeComponent:(component:()=>JSX.Element)=>void}) {
    const navBarElemente = useSelector((state:RootState)=>state.navbarElemente)
    const username = useSelector((state:RootState)=>state.authentication.username)
    const dispatch = useAppDispatch()
  return (
    <div className={styles.container}>
        
        <div className={styles.links}>
            {navBarElemente.map((item,index)=>{
                return (
                    <NavBarLink key={index} name={item.name} onClick={()=>props.changeComponent(item.component)} />
                )
            })}
        </div>
        <div className={styles.auth}>
            <NavBarLink name={username?username:""} icon={<FaRegUser />} flexi={true} onClick={()=>props.changeComponent(ProfileComponent)} />
            <NavBarLink name="Logout" flexi={true} icon={<BiLogOut />} onClick={()=>dispatch(logout())} />
        </div>
    </div>
  )
}

export default NavBar