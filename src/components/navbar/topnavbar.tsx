import React, {  useState } from 'react'
import { Avatar,Box,IconButton,Menu,MenuItem,Breadcrumbs, Divider, Link, LinkProps, Switch, Typography, Tooltip, ListItemIcon, Badge, } from '@mui/material';
import { BsArrowLeft } from 'react-icons/bs'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useNavigate } from 'react-router-dom'
import styles from './navbar.module.css'
import { ClientStatus } from '../../types/statusenum';
import {HiStatusOffline, HiStatusOnline} from 'react-icons/hi'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { logout, setOfflineMode } from '../../store/slice';
import dataFunctions from '../../services/datafunctions';
import Loadingspinner from '../loadingspinner/loadingspinner';
import {
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { BiLogOut } from 'react-icons/bi';
import { useSnackbar } from 'notistack';
import { AlternateEmail, Notifications, Password, Settings } from '@mui/icons-material';
import ChangeEmailDialog from '../dialogs/changeEmailDialog/changeEmailDialog';
import ChangePasswordDialog from '../dialogs/changePasswordDialog/changePasswordDialog';
import Chat from '../chat/chat';



const breadcrumbNameMap: { [key: string]: string } = {
  '/pruefungen': 'Prüfungen',
  '/rauchmelder': 'Rauchmelder',
  '/rauchmelder/add': 'Hinzufügen',
  '/wohnungen': 'Wohnungen',
  '/objekte': 'Objekte',
  '/auftraggeber': 'Auftraggeber',
  '/auftraggeber/add':'Hinzufügen',
  '/pruefungen/':'Prüfungen',
  '/pruefungen/-1':'Hinzufügen',
  '/profile':'Profil',
  '/settings':'Einstellungen'
};
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


function TopNavBar(props:{isShown:boolean,onMenuChange:()=>void}) {
  const {width} = useWindowDimensions()
  const [menueOpen,setMenueOpen] = useState(true)
  const location = useLocation();
  const username = useSelector((state:RootState)=>state.username)
  const dispatch = useAppDispatch()
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showEmailDialog,setShowEmailDialog] = useState(false)
  const [showPasswordDialog,setShowPasswordDialog] = useState(false)
  const [showChat,setShowChat] = useState(false)
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
        <div className={styles.breadcrumbDiv}>
        <Breadcrumbs className={styles.breadcrumbs} aria-label="breadcrumb">
              <LinkRouter underline="hover" color="inherit" to="/">
                Home
              </LinkRouter>
              {pathnames.map((value, index) => {
                const last: any = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last ? (
                  <Typography className={styles.lastBreadcrumb} color="text.primary" key={to}>
                    {breadcrumbNameMap[to]?breadcrumbNameMap[to]:value}
                  </Typography>
                ) : (
                  <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                    {breadcrumbNameMap[to]}
                  </LinkRouter>
                );
              })}
            </Breadcrumbs>
        </div>
        <Divider variant="middle" orientation='vertical' flexItem/>
        <Box className={styles.logoutTest} display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <Tooltip title={"Nachrichten"}>
                  <IconButton className={styles.iconbutton}>
                    <Badge badgeContent={4} color="error">
                      <Notifications />
                    </Badge>
                    <Chat isShown={showChat} onClose={()=>setShowChat(false)} />
                  </IconButton>
                </Tooltip>
                
                <div className={styles.userInfo}>
                <h5>{username}</h5>
                <Typography variant={"caption"} >Martin Herhold Sud</Typography>
                </div>
                <Menu
                  id="account-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={(event)=>handleClose(event,"")}
                  MenuListProps={{
                    'aria-labelledby': 'account-button',
                  }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem className={styles.menueitem} onClick={(event)=>handleClose(event,"profile")}>
                    <ListItemIcon>
                      <Avatar {...stringAvatar(username && username.length > 2 && username !== "0"?username:"Test mann")}>{username && username.length > 2?username.slice(0,2):undefined}</Avatar>
                    </ListItemIcon>
                    Account
                  </MenuItem>
                  <MenuItem className={styles.menueitem} onClick={(event)=>{
                    setAnchorEl(null);
                    setShowEmailDialog(true)
                  }}>
                    <ListItemIcon>
                      <AlternateEmail fontSize='small'></AlternateEmail>
                    </ListItemIcon>
                    Email ändern
                  </MenuItem>
                  <MenuItem className={styles.menueitem} onClick={(event)=>{
                    setAnchorEl(null);
                    setShowPasswordDialog(true)
                  }}>
                    <ListItemIcon>
                      <Password fontSize="small"></Password>
                    </ListItemIcon>
                    Passwort ändern
                  </MenuItem>
                  <Divider />
                  <MenuItem className={styles.menueitem} onClick={(event)=>handleClose(event,"settings")}>
                    <ListItemIcon>
                      <Settings fontSize='small' />
                    </ListItemIcon>
                    Einstellungen
                  </MenuItem>
                  <MenuItem 
                    className={styles.logoutmenuoption+" "+styles.menueitem}

                    onClick={()=>{
                      enqueueSnackbar("Erfolgreich ausgeloggt!",{variant:"success"})
                      dispatch(logout())
                    }}
                  >
                    <ListItemIcon>
                      <BiLogOut className={styles.logoutmenuoption}/>
                    </ListItemIcon>
                    Log Out
                  </MenuItem>
                  
                  {/* <MenuItem onClick={(event)=>handleClose(event,"logout")}>Logout</MenuItem> */}
                </Menu>
                <Tooltip title="Account">
                  <IconButton className={styles.iconbutton} size='small' 
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}>  
                    <Avatar {...stringAvatar(username && username.length > 2 && username !== "0"?username:"Test mann")}>{username && username.length > 2?username.slice(0,2):undefined}</Avatar>
                  </IconButton>
                </Tooltip>
                
              </Box>
              <ChangeEmailDialog isShown={showEmailDialog} handleClose={()=>setShowEmailDialog(false)}/>
              <ChangePasswordDialog isShown={showPasswordDialog} handleClose={()=>setShowPasswordDialog(false)}/>
        
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