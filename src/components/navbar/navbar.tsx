import React from 'react'
import { useSelector } from 'react-redux'
import { logout } from '../../store/slice'
import { RootState, useAppDispatch } from '../../store/store'
import NavBarLink from '../navbarlink/navbarlink'
import { BiLogOut } from 'react-icons/bi'
import styles from './navbar.module.css'
import { useSnackbar } from 'notistack'
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom'
import { Home } from '@mui/icons-material'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import SensorsIcon from '@mui/icons-material/Sensors';
import WorkIcon from '@mui/icons-material/Work';
import GiteIcon from '@mui/icons-material/Gite';
import ApartmentIcon from '@mui/icons-material/Apartment';
import logo from './logo_transparent.png'

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
    const username = useSelector((state:RootState)=>state.username)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (event:any,link:string) => {
      setAnchorEl(null);
      if(link && link !== ""){
        navigate("/"+link)
      }
    };

  return (
    <div className={styles.widthcontroller+(props.isShown?` ${styles.fullwidth}`:"")}>
        <div className={styles.container+(props.isShown?` ${styles.navactive}`:"")}>
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
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <IconButton size='small' onClick={()=>{navigate("/profile")}}>  
                  <Avatar {...stringAvatar(username && username.length > 2 && username !== "0"?username:"Test mann")}>{username && username.length > 2?username.slice(0,2):undefined}</Avatar>
                </IconButton>
                <Typography>{username}</Typography>
                <IconButton 
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MoreHorizIcon className={styles.moreButton}></MoreHorizIcon>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={(event)=>handleClose(event,"")}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={(event)=>handleClose(event,"profile")}>Profile</MenuItem>
                  <MenuItem onClick={(event)=>handleClose(event,"settings")}>Settings</MenuItem>
                  {/* <MenuItem onClick={(event)=>handleClose(event,"logout")}>Logout</MenuItem> */}
                </Menu>
              </Box>
                <div className={styles.logout} onClick={
                  ()=>{
                    enqueueSnackbar("Erfolgreich ausgeloggt!",{variant:"success"})
                        dispatch(logout())
                  }
                }>

                <BiLogOut />
                <Typography>Log Out</Typography>
                </div>
                {/* <NavBarLink name="Logout" flexi={true} icon={<BiLogOut />} onClick={()=>{
                        
                    }} /> */}
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