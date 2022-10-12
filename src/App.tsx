import React from 'react';
import './App.css';
import SignInScreen from './screens/signin/signinscreen';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import HomeScreen from './screens/homescreen/homescreen';

function App() {
  const isSignedin = useSelector((state:RootState)=>state.authentication.isSignedIn)

  //data[ClientStatus.online].auftraggeber.getWithParams([{key:"id",operator:"<=",value:4}])

  return (
    isSignedin?
      <HomeScreen />
      :
      <SignInScreen />
  );
}

export default App;
