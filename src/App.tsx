import React, { useEffect } from 'react';
import './App.css';
import SignInScreen from './screens/signin/signinscreen';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import HomeScreen from './screens/homescreen/homescreen';
import { ClientStatus } from './types/statusenum';
import ErrorComponent from './components/errorcomponent/errorcomponent';
import { BrowserRouter } from 'react-router-dom';
function App(props:{status:'online'|'offline'}) {
  
  const isSignedin = useSelector((state:RootState)=>state.authentication.user)
  const errorListe = useSelector((state:RootState)=>state.errorListe)
  //data[ClientStatus.online].auftraggeber.getWithParams([{key:"id",operator:"<=",value:4}])
  useEffect(()=>{
    

    
  },[props,props.status])
  
  
  return (
    <>
    {
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
    }
      <ErrorComponent errorListe={errorListe} />
    </>
  );
}

export default App;
