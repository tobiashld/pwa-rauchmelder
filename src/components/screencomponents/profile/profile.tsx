import { useSnackbar } from 'notistack';
import React from 'react'
import { RiLockPasswordLine } from 'react-icons/ri';
import data from '../../../services/datafunctions';
import { ClientStatus } from '../../../types/statusenum';
import Button from '../../button/button';
import TextInput from '../../textinput/textinput';
import styles from './profile.module.css'

function ProfileComponent() {
  const passwordOneRef = React.createRef<HTMLInputElement>();
  const passwordTwoRef = React.createRef<HTMLInputElement>();
  const { enqueueSnackbar } = useSnackbar();

  const handlePwChange = (event:React.KeyboardEvent<HTMLInputElement>)=>{
    if(!passwordOneRef.current || !passwordTwoRef.current || !validateInput()){
      enqueueSnackbar("Alle Felder müssen ausgefüllt sein", {variant:"error"})
      return;
    }
    if(passwordOneRef.current.value !== passwordTwoRef.current.value){
      enqueueSnackbar("Die Passwörter müssen gleich sein!",{variant:"error"})
      return;
    }
    if(passwordOneRef.current.value.length < 5){
      enqueueSnackbar("Das Passwort muss mindestens 5 Stellen haben!",{variant:"error"})
      return;
    }
    data[ClientStatus.online].user.changepw(passwordOneRef.current.value,(response)=>{
      if(response.error){
        enqueueSnackbar(response.error,{variant:"error"})
      }else if(response.status === 200){
        enqueueSnackbar("Passwort erfolgreich geändert!", {variant:"success"})
      }
    })
  }

  const validateInput = ()=>{
    if(!passwordOneRef.current || !passwordTwoRef.current || passwordOneRef.current.value === "" || passwordTwoRef.current.value === ""){
      return false;
    }
    return true
  }

  return (
    <div className={styles.container}>
      <div className={styles.outerbox}>
        <div className={styles.profiledetails}>

        </div>
        <div className={styles.changepw}>
          <h2>Passwort ändern </h2>
          <TextInput
            placeholder='Passwort'
            type='password'
            icon={<RiLockPasswordLine />}
            ref={passwordOneRef}
          />
          <TextInput
            placeholder='Passwort bestätigen'
            type='password'
            icon={<RiLockPasswordLine />}
            ref={passwordTwoRef}
          />
          <Button value="Passwort ändern" onClick={handlePwChange}></Button>
        </div>
        <div>
          
        </div>
        <div className={styles.changepw}>
        <h2>Email ändern </h2>
          <TextInput
            placeholder='Email'
            type='text'
            icon={<RiLockPasswordLine />}
            ref={passwordOneRef}
          />
          <TextInput
            placeholder='Email bestätigen'
            type='text'
            icon={<RiLockPasswordLine />}
            ref={passwordTwoRef}
          />
          <Button value="Email ändern" onClick={handlePwChange}></Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileComponent