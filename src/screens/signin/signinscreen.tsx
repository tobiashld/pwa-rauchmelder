import React from 'react'
import TextInput from '../../components/textinput/textinput';
import styles from './signinscreen.module.css'
import { FiUser } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useAppDispatch } from '../../store/store';
import { login } from '../../store/slice';
import dataFunctions from '../../services/datafunctions';
import { ClientStatus } from '../../types/statusenum';
import { useSnackbar } from 'notistack'

function SignInScreen() {
  const usernameRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch()

  const handleLoginbutton = (event:any)=>{

    if(!usernameRef.current || !passwordRef.current || !validateInput()){
      enqueueSnackbar("Alle Felder Müssen ausgefüllt sein", {variant:"error"})
      return;
    }
    dataFunctions[ClientStatus.online].user.login(usernameRef.current.value,passwordRef.current.value,response=>{
      if(response.error){
        enqueueSnackbar(response.error,{variant:"error"})
      }else if(response.token && response.status === 200){
        enqueueSnackbar("Erfolgreich eingelogt!", {variant:"success"})
        dispatch(login({successfull:true,username:usernameRef.current!.value}))
      }
    })
  }
  const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if(validateInput()){
        handleLoginbutton(null)
      }else{
        // dispatch(addError({
        //   type:"error",
        //   message:"Entweder das Passwort oder der Benutzername sind Falsch",
        //   title:"Login Failed!"
        // }))

      }
      
    }
  }
  const validateInput = ()=>{
    if(!usernameRef.current || !passwordRef.current || usernameRef.current.value === "" || passwordRef.current.value === ""){
      return false;
    }
    return true
  }


  return (
    <div className={styles.container}>
      <div className={styles.loginboxcontainer}>

        <div className={styles.loginbox}>
          <div className={styles.headertext}>
            <h2>
              Welcome Back
            </h2>
          </div>
          <div className={styles.divider}>
            
          </div>
          <div className={styles.usereingabe}>
            
              <div className={styles.username}>
                <TextInput 
                  ref={usernameRef}
                  placeholder='Benutzername'
                  onKeyDown={handleKeyDown}
                  icon={<FiUser />}
                  
                />
              </div>
              <div className={styles.password}>
                <TextInput 
                  placeholder='Passwort'
                  type='password'
                  icon={<RiLockPasswordLine />}
                  onKeyDown={handleKeyDown}
                  ref={passwordRef}
                />
              </div>
              <div className={styles.loginbuttoncontainer}>
                <button tabIndex={0} onClick={handleLoginbutton} className={styles.loginButton}>Login</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInScreen