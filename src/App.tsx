import React, { useEffect, useState } from 'react';
import './App.css';
import SignInScreen from './screens/signin/signinscreen';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './store/store';
import HomeScreen from './screens/homescreen/homescreen';
import { ClientStatus } from './types/statusenum';
import { BrowserRouter } from 'react-router-dom';
import data from './services/datafunctions';
import { login, logout } from './store/slice';
import { useSnackbar } from 'notistack';
import Loadingspinner from './components/loadingspinner/loadingspinner';
import secureLocalStorage from 'react-secure-storage'



function App(props:{status:'online'|'offline'}) {
  const [readyToRender,setReadyToRender] = useState(false)
  const isSignedin = useSelector((state:RootState)=>state.isAuthenticated)
  const dispatch = useAppDispatch()
  const {enqueueSnackbar} = useSnackbar()
  //data[ClientStatus.online].auftraggeber.getWithParams([{key:"id",operator:"<=",value:4}])
  useEffect(()=>{
  
    data[ClientStatus.online].user.get(undefined,(data:any)=>{
      console.log(data)
      if(data.error){
        if(data.status !== 479){
          enqueueSnackbar(data?data.error:"Backend ist nich erreichbar",{variant:"error"})
        }
        dispatch(logout())
      }else if(data && data.status < 300 && data.status >= 200 && data.data){
        enqueueSnackbar("Automatisch angemeldet",{variant:"success"})
        dispatch(login({successfull:true,username:data.data.username}))
      }
      setReadyToRender(true)
    })
  },[dispatch, enqueueSnackbar])
  
  
  return (
    <>
    
    {
      readyToRender?
        isSignedin?
        <>
          <BrowserRouter basename='/frontend'>
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
