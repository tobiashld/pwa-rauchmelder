import React, { useEffect } from 'react';
import './App.css';
import SignInScreen from './screens/signin/signinscreen';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import HomeScreen from './screens/homescreen/homescreen';
import { Offline, Online } from 'react-detect-offline'
import { ClientStatus } from './types/statusenum';
function App() {
  const isSignedin = useSelector((state:RootState)=>state.authentication.isSignedIn)

  //data[ClientStatus.online].auftraggeber.getWithParams([{key:"id",operator:"<=",value:4}])
  useEffect(()=>{
    // dataFunctions[ClientStatus.online].objekte.getWithParam("id",24).then(objekte=>{
    //   if(objekte.length === 1){
    //     dataFunctions[ClientStatus.online].prepareOffline(objekte[0]).then(data=>{
    //       dataFunctions[ClientStatus.offline].rauchmelder.addRauchmelder(new GeprRauchmelder(1,1,{
    //         baulichUnveraendert:true,
    //         hindernisseUmgebung:true,
    //         oeffnungenFrei:true,
    //         pruefungErfolgreich:true,
    //         relevanteBeschaedigung:true,
    //         selberRaum:true,
    //         warnmelderGereinigt:true},1,"test","pruefung","20.9.2022")).then(data=>{
    //           dataFunctions[ClientStatus.offline].rauchmelder.getAllRauchmelder().then(data=>console.log(data))
    //         })
    //     })
    //   }
      
    // })
  })
  
  
  return (
    isSignedin?
      <>
        <Online>
          <HomeScreen clientstatus={ClientStatus.online}/>
        </Online>
        <Offline>
          <HomeScreen clientstatus={ClientStatus.offline}/>
        </Offline>
      </>
      :
      <SignInScreen />
  );
}

export default App;
