import React from 'react'
import styles from './navbarlink.module.css'
import { Box } from '@mui/material'

function NavBarLink(props:{name:string,onClick:()=>void,flexi?:boolean,icon?:JSX.Element,active?:boolean}) {
  let berName = props.name
  if(props && props.name && props.name.split("").length > 15){
    berName = berName.split("").slice(0,15).join("")
  }
  return (
    <Box sx={{color:'text.primary',":hover":{backgroundColor:'secondary.light'}}} onClick={props.onClick} className={styles.container+ (props&&props.flexi?" "+styles.flexi:"") + (props&&props.active?" "+styles.active:"")}>
      {props.icon?
      <Box sx={{color:'text.primary'}} className={styles.icon}>
        {props.icon}
      </Box>
      :
      <></>
      }
      {berName}
      </Box>
  )
}

export default NavBarLink