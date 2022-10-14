import React from 'react'
import TextInput from '../../components/textinput/textinput';
import styles from './signinscreen.module.css'
import { FiUser } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useAppDispatch } from '../../store/store';
import { addError, clearError, login } from '../../store/slice';
import data from '../../services/datafunctions';
import { ClientStatus } from '../../types/statusenum';

function SignInScreen() {
  const usernameRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();
  const dispatch = useAppDispatch()

  const handleLoginbutton = (event:any)=>{

    if(!usernameRef.current || !passwordRef.current || !validateInput()){
      return;
    }
    data[ClientStatus.online].user.getWithParam("full_name",usernameRef.current.value).then(user=>{
      dispatch(login({username:usernameRef.current!.value,password:passwordRef.current!.value,user:user[0]}))
    })
    
    
  }
  const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if(validateInput()){
        handleLoginbutton(null)
      }else{
        dispatch(addError({
          type:"error",
          handleClose:(id)=>dispatch(clearError({id:id})),
          message:"Entweder das Passwort oder der Benutzername sind Falsch",
          title:"Login Failed!"
        }))
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
      <div className={styles.header}>
        <h1>Martin Herhold SuD</h1>
      </div>
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