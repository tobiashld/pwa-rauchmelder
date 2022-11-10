import React, { useEffect, useState } from 'react';
import './App.css';
import SignInScreen from './screens/signin/signinscreen';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './store/store';
import HomeScreen from './screens/homescreen/homescreen';
import { ClientStatus } from './types/statusenum';
import ErrorComponent from './components/errorcomponent/errorcomponent';
import { BrowserRouter } from 'react-router-dom';
import data from './services/datafunctions';
import { cookies } from './services/cookieService';
import { login, logout } from './store/slice';
import { useSnackbar } from 'notistack';
import jwtDecode from 'jwt-decode'
import { CustomJwtPayload } from './types/allgemein';
import Loadingspinner from './components/loadingspinner/loadingspinner';



function App(props:{status:'online'|'offline'}) {
  const [readyToRender,setReadyToRender] = useState(false)
  const isSignedin = useSelector((state:RootState)=>state.isAuthenticated)
  const dispatch = useAppDispatch()
  const {enqueueSnackbar} = useSnackbar()
  //data[ClientStatus.online].auftraggeber.getWithParams([{key:"id",operator:"<=",value:4}])
  useEffect(()=>{
    let token = cookies.get("token")
    if(token){
      data[ClientStatus.online].rauchmelder.get(undefined,(data:any)=>{
        if(data.error){
          enqueueSnackbar(data.error,{variant:"error"})
        }else{
          let payload = jwtDecode<CustomJwtPayload>(token)
          dispatch(login({successfull:true,username:payload.username}))
        }
        setReadyToRender(true)

      })
    }else{
      dispatch(logout())
    }
  },[])
  
  
  return (
    <>
    
    {
      readyToRender?
        isSignedin?
        <>
          <BrowserRouter>
            {props.status === 'online'?
            <HomeScreen clientstatus={ClientStatus.online}/>
            :
            <HomeScreen clientstatus={ClientStatus.offline}/>
            }
          </BrowserRouter>
          
        </>
        :
        <SignInScreen />
      :
      <div className='fullscreen-center'>
        <Loadingspinner size='Big' />
      </div>
    }
    </>
  );
}

export default App;
