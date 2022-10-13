import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import NavBarLink from '../navbarlink/navbarlink'
import styles from './navbar.module.css'


function NavBar(props:{isShown:boolean,changeComponent:(component:()=>JSX.Element)=>void}) {
    const navBarElemente = useSelector((state:RootState)=>state.navbarElemente)
  return (
    <div className={styles.container}>
        
        <div className={styles.links}>
            {navBarElemente.map(item=>{
                return (
                    <NavBarLink name={item.name} onClick={()=>props.changeComponent(item.component)} />
                )
            })}
        </div>
    </div>
  )
}

export default NavBar